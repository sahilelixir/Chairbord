import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image
} from 'react-native'
import OverlayHeader from '../../components/OverlayHeader'
import HorizontalDivider from '../../components/common/HorizontalDivider'
import CustomInputText from '../../components/common/CustomInputText'
import LinearButton from '../../components/common/LinearButton'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder
} from 'cashfree-pg-api-contract'
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk'
import { getCache } from '../../helper/Storage'

const TopupWallet = (props) => {
  const [walletBalance, setWalletBalance] = useState(props?.route?.params?.walletBalance)
  console.log(walletBalance, 'walletBalance')
  const [topupAmount, setTopupAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState()
  const [order, setOrder] = useState({
    payment_session_id: '',
    order_id: '',
    order_expiry_time: 'order_expiry_time'
  })

  const getWalletDetails = async () => {
    setLoading(true)
    try {
      const response = await client.get(`/wallet/transactions/agent-get`);
      setWalletBalance(response?.data?.agent?.balance)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (walletBalance === undefined) {
      getWalletDetails()
    }
  }, [walletBalance])

  useEffect(() => {
    const onReceivedEvent = (eventName, map) => {
      console.log(
        'Event received on screen: ' +
        eventName +
        ' map: ' +
        JSON.stringify(map)
      )
    }

    const onVerify = (orderId) => {
      console.log('Payment Successful:', orderId)
      // topupBalanceBackend()
      updateStatus(orderId)
      props.navigation.navigate('wallet')
    }

    const onError = (error, orderId) => {
      console.log(
        'Payment Failed: ' + JSON.stringify(error) + '\norderId is :' + orderId
      )
      updateStatus(JSON.stringify(error))
    }

    if (order.payment_session_id && order.order_id) {
      CFPaymentGatewayService.setEventSubscriber({ onReceivedEvent })
      CFPaymentGatewayService.setCallback({ onVerify, onError })
    }

    return () => {
      CFPaymentGatewayService.removeCallback()
      CFPaymentGatewayService.removeEventSubscriber()
    }
  }, [order])

  const createOrderCashfree = async () => {
    const response = await client.post('/cashfree/create-order', {
      amount: topupAmount
    })
    console.log(response.data, 'response dataaaa')
    setOrder({
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
      order_expiry_time: response.data.order_expiry_time
    })
    await savingUserAndOrderInfo(response.data.order_id)
  }

  const topUpApi = async () => {
    setLoading(true)
    await createOrderCashfree()
    setLoading(false)
  }

  const getSession = () => {
    return new CFSession(
      order.payment_session_id, // sessionId
      order.order_id, // orderId
      CFEnvironment.PRODUCTION // environment
    )
  }

  const startCheckout = async () => {
    try {
      const session = getSession()
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build()

      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#94ee95')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build()

      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme
      )

      CFPaymentGatewayService.doPayment(dropPayment)
    } catch (e) {
      console.error('Error starting checkout:', e)
    }
  }

  const verifyPayment = async () => {
    try {
      const res = await client.post('cashfree/web-hook-confirmPayment', {
        order_id: ''
      })
      console.log('Balance updated:', res)
    } catch (e) {
      console.error('Error updating balance:', e)
    }
  }

  const savingUserAndOrderInfo = async (orderId) => {
    try {
      const userData = await getCache('userData')
      const agentId = userData.user.id
      console.log('orderId is ', orderId)
      const res = await client.post('cashfree/save-user-and-order-info', {
        order_id: orderId,
        user_id: agentId
      })
      console.log('Info updated in backend: ', res)
    } catch (e) {
      console.error('Error updating info in backend:', e)
    }
  }

  const topupBalanceBackend = async () => {
    try {
      const res = await client.post('/wallet/agent/own-wallet/transactions', {
        amount: topupAmount,
        reason: 'Cashfree Credit'
      })
      console.log('Balance updated:', res)
    } catch (e) {
      console.error('Error updating balance:', e)
    }
  }

  useEffect(() => {
    if (order.payment_session_id && order.order_id) {
      startCheckout()
      console.log('Order state has been updated:', order)
    }
  }, [order])

  const updateStatus = (message) => {
    setOrderStatus(message)
  }

  return (
    <>
      <OverlayHeader title={'Wallet'} navigateTo={'drawer'} />
      {loading && <Loader loading={loading} />}
      <ScrollView style={styles.container}>
        <View style={{ padding: '5%' }}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.amountText}>{walletBalance}</Text>
            <HorizontalDivider />
            <Text
              style={[
                styles.miniText,
                { color: '#000000', marginBottom: '3%' }
              ]}
            >
              Topup Wallet
            </Text>
            <CustomInputText
              placeholder={'Enter amount'}
              keyboardType={'numeric'}
              value={topupAmount}
              onChangeText={(text) => setTopupAmount(text)}
            />
            <Text
              style={[
                styles.miniText,
                { color: '#858585', marginVertical: '3%' }
              ]}
            >
              Recommended
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: '8%' }}>
              {[500, 1000, 1500, 2000].map((amount, index) => (
                <Pressable
                  onPress={() => {
                    setTopupAmount(amount.toString())
                    console.log(amount)
                  }}
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: '#02546D',
                    borderRadius: 5,
                    backgroundColor: 'white'
                  }}
                >
                  <Text style={styles.recommendText}>₹{amount}</Text>
                </Pressable>
              ))}
            </View>
            <LinearButton
              title={'PROCEED TO TOPUP'}
              onPress={() => topUpApi()}
              style={{ marginTop: '5%' }}
            />
            <HorizontalDivider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Image
                  source={require('../../assets/screens/wallet/autoTopupIcon.png')}
                />
                <View>
                  <Text style={[styles.miniText, { color: '#000000' }]}>
                    Set auto Top-up
                  </Text>
                  <Text style={[styles.miniText, { color: '#9A9A9A' }]}>
                    Never run out of balance
                  </Text>
                </View>
              </View>
              <Image
                source={require('../../assets/screens/wallet/rightArrow.png')}
              />
            </View>
          </View>
          <View style={[styles.WalletDetailsCard, { marginTop: '5%' }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/screens/wallet/transactionIcon.png')}
                />
                <Text style={styles.accountNoText}>
                  Wallet Transaction History
                </Text>
              </View>
              <Image
                source={require('../../assets/screens/wallet/rightArrow.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  balanceCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  balanceText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#9A9A9A'
  },
  amountText: {
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: '2%',
    color: '#000000'
  },
  miniText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14
  },
  recommendText: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    paddingVertical: '2%',
    paddingHorizontal: '5%'
  },
  WalletDetailsCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  accountNoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  }
})

export default TopupWallet
