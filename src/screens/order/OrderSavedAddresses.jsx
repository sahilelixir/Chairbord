import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import LinearButton from '../../components/common/LinearButton'
import OrderSuccessModal from './OrderSuccessModal'
import OrderFaildModal from './OrderFaildModal'
import { client } from '../../client/Axios'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

// Import the context for orders
import { useOrders } from '../../orderContext/OrderContext'
import DeliveryAddressModal from './DeliveryAddressModal'
import LinearGradient from 'react-native-linear-gradient'
import DeleteAddressModal from './deleteAddressModal'
import CheckBox from '@react-native-community/checkbox'

const OrderSavedAddresses = (props) => {
  const { ordersArray, setOrdersArray } = useOrders()
  const [loading, setLoading] = useState(false)
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState({
    address: '',
    state: '',
    pincode: '',
    phone: '',
    alternate_mobile_number: ''
  })

  function calculateTotalAmount(ordersArray) {
    return ordersArray.reduce((total, order) => total + order.amount, 0)
  }

  const responseAmount = calculateTotalAmount(ordersArray)

  const [totalOrderAmount, setTotalAmountCost] = useState(0)

  useEffect(() => {
    setTotalAmountCost(calculateTotalAmount(ordersArray))
  }, [ordersArray])

  const [deliveryAddressModal, setDeliveryAddressModal] = useState(false)
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)
  const [isOrderFailed, setIsOrderFailed] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [userId, setUserId] = useState(props?.route?.params?.userId)

  const [addressArray, setAddressArray] = useState([])
  const [checkboxStates, setCheckboxStates] = useState([])

  useEffect(() => {
    if (addressArray.length > 0) {
      setCheckboxStates(new Array(addressArray.length).fill(false))
    }
  }, [addressArray])

  const handleCheckboxChange = (index) => {
    setCheckboxStates((prevState) => {
      const updatedStates = prevState.map((state, i) =>
        i === index ? !state : false
      )
      return updatedStates
    })
  }

  const [addressIndex, setAddressIndex] = useState(-1)

  const [deleteAddressModal, setDeleteAddressModal] = useState(false)

  const handleDeleteOrder = () => {
    setOrdersArray([])
    setTotalAmountCost(0)
  }

  const handleSavedAddressFetching = async () => {
    setLoading(true)
    try {
      const response = await client.get(
        `/order/fastag/get-saved-addresses/${userId}`
      )
      setAddressArray(response.data.addresses)
    } catch (error) {
      console.log(error.messsage)
    } finally {
      setLoading(false)
    }
  }

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 }
    // { title: 'PNB', id: 3 },
    // { title: 'KOTAK', id: 4 }
  ]

  const handleSubmit = async () => {
    setDeliveryAddressModal(true)
  }

  useFocusEffect(
    useCallback(() => {
      if (userId != 0) {
        handleSavedAddressFetching()
      }
    }, [])
  )

  useEffect(() => {
    if (deliveryAddressModal == false) handleSavedAddressFetching()
  }, [deliveryAddressModal])

  const handleAddressSelect = (address, index) => {
    setCurrentDeliveryAddress(address)
    setAddressIndex(index)
  }

  const handleOutsideClick = () => {
    setCurrentDeliveryAddress({
      address: '',
      state: '',
      pincode: '',
      phone: '',
      alternate_mobile_number: ''
    })

    setCheckboxStates(new Array(checkboxStates.length).fill(false))
  }

  const checkIfAddressIsSame = (address) => {
    return (
      address.address === currentDeliveryAddress.address &&
      address.state === currentDeliveryAddress.state &&
      address.pincode === currentDeliveryAddress.pincode &&
      address.phone === currentDeliveryAddress.phone &&
      address.alternate_mobile_number ===
        currentDeliveryAddress.alternate_mobile_number
    )
  }

  const checkIfCurrentAddress = () => {
    return (
      currentDeliveryAddress.address &&
      currentDeliveryAddress.state &&
      currentDeliveryAddress.pincode &&
      currentDeliveryAddress.phone &&
      currentDeliveryAddress.alternate_mobile_number
    )
  }

  const handleOrderSubmit = async () => {
    if (!ordersArray || ordersArray.length === 0) {
      return
    }
    setLoading(true)
    try {
      const response = await client.post('/order/fastag/request-complete', {
        fromUserId: userId, // Agent's user ID
        toUserId: 1, // Admin user ID (default)
        fromUserType: 'agent', // User type (default is agent)
        toUserType: 'admin', // User type (default is admin)
        orders: ordersArray,
        deliveryAddress: currentDeliveryAddress
      })
      console.log(response, 'res')

      if (response.status === 201) {
        setTransactionId(response.data.transactionId)
        setOrderId(response.data.completeOrder.orderId)
        setIsOrderSuccess(true)
      }
    } catch (error) {
      console.error(
        'Error creating order:',
        error.response ? error.response.data : error.message
      )
      setIsOrderFailed(true)
    } finally {
      handleDeleteOrder()
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader loading={loading} />}
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={{ flex: 1 }}>
          <OverlayHeader title="Saved Addresses" isOrderSection={false} />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {addressArray?.map((address, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  checkIfAddressIsSame(address)
                    ? styles.selectedAddress
                    : styles.addressCard
                ]}
                onPress={() => {
                  handleCheckboxChange(index)
                  if (!checkboxStates[index]) {
                    handleAddressSelect(address, index)
                  } else {
                    handleOutsideClick()
                  }
                }}
              >
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    key={index}
                    value={checkboxStates[index]}
                    onValueChange={() => {
                      handleCheckboxChange(index)
                      if (!checkboxStates[index]) {
                        handleAddressSelect(address, index)
                      } else {
                        handleOutsideClick()
                      }
                    }}
                    style={styles.checkbox}
                    tintColors={{ true: '#0066cc', false: '#999999' }}
                  />
                  <Text style={styles.addressText}>{address.address}</Text>
                </View>

                <Text style={styles.detailText}>
                  <View style={styles.inlineContainer}>
                    <Text style={styles.inlineText}>
                      State: {address.state}
                    </Text>
                    <Text style={styles.inlineText}>
                      Pincode: {address.pincode}
                    </Text>
                  </View>
                </Text>

                <Text style={styles.detailText}>
                  <View style={styles.inlineContainer}>
                    <Text style={styles.inlineText}>
                      Phone: {address.phone}
                    </Text>
                    <Text style={styles.inlineText}>
                      Alternate: {address.alternate_mobile_number}
                    </Text>
                  </View>
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            {checkIfCurrentAddress() ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={handleOrderSubmit}
                >
                  <LinearGradient
                    colors={['#02546D', '#142D40']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.appButtonText}>Proceed</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => setDeleteAddressModal(true)}
                >
                  <LinearGradient
                    colors={['#02546D', '#142D40']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.appButtonText}>Delete</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <LinearButton
                title="Add New Delivery Address"
                onPress={handleSubmit}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <OrderSuccessModal
        visible={isOrderSuccess}
        onClose={setIsOrderSuccess}
        transactionId={transactionId}
        orderId={orderId}
        responseAmount={responseAmount}
        orders={ordersArray}
        totalOrderAmount={calculateTotalAmount(ordersArray)}
      />
      <OrderFaildModal visible={isOrderFailed} onClose={setIsOrderFailed} />
      <DeliveryAddressModal
        visible={deliveryAddressModal}
        onClose={() => setDeliveryAddressModal(false)}
        userId={userId}
      />
      <DeleteAddressModal
        visible={deleteAddressModal}
        onClose={() => setDeleteAddressModal(false)}
        address={currentDeliveryAddress}
        deleteAddressId={
          addressArray && addressIndex !== -1
            ? addressArray[addressIndex]?.id
            : -1
        }
        handleSavedAddressFetching={handleSavedAddressFetching}
        handleOutsideClick={handleOutsideClick}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  scrollContent: {
    padding: 20
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  selectedAddress: {
    borderColor: '#ff0000', // Red border for selected address
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 3
  },
  detailText: {
    fontSize: 14,
    color: '#555'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  appButtonContainer: {
    flex: 1,
    borderRadius: 25,
    height: 68,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'inter'
  },
  footer: {
    padding: 20
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute inline items evenly
    width: '100%', // Ensure full-width for alignment
    marginBottom: 5 // Spacing between rows
  },
  inlineText: {
    fontSize: 14,
    // color: '#333',
    fontWeight: 'bold',
    marginHorizontal: 5 // Adds space between State and Pincode
  },
  checkbox: {
    marginRight: 10,
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }]
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 6,
    marginTop: 2
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'justify'
  }
})
export default OrderSavedAddresses
