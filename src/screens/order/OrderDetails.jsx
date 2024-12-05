import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import DisplayDetailsCard from '../../components/common/DisplayDetailsCard'
import HorizontalDivider from '../../components/common/HorizontalDivider'
import LinearButton from '../../components/common/LinearButton'
import AddBtn from '../../components/ui/AddBtn'
import VerticalDivider from '../../components/common/VerticalDivider'
import CreateOrderModal from './CreateOrderModal'
import { client } from '../../client/Axios'

// Import the context for orders
import { useOrders } from '../../orderContext/OrderContext'
import Loader from '../../components/ui/Loader'
import { getCache } from '../../helper/Storage'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OrderDetails = (props) => {
  const navigation = useNavigation()
  const [walletDetails, setWalletDetails] = useState([])
  const { ordersArray, setOrdersArray } = useOrders()

  const [loading, setLoading] = useState(false)

  const getWalletDetails = async () => {
    try {
      const response = await client.get(`/wallet/transactions/agent-get`)
      setWalletDetails(response.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  function calculateTotalAmount(ordersArray) {
    return ordersArray.reduce((total, order) => total + order.amount, 0)
  }

  const responseAmount = calculateTotalAmount(ordersArray)

  const [totalOrderAmount, setTotalAmountCost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    getWalletDetails()
    setTotalAmountCost(calculateTotalAmount(ordersArray))
  }, [ordersArray])

  const [createOrderModal, setCreateOrderModal] = useState(false)
  const [deliveryAddressModal, setDeliveryAddressModal] = useState(false)
  const [userId, setUserId] = useState(0)
  const [currentOrder, setCurrentOrder] = useState({
    bankId: 0,
    vehicleClass: 0,
    tagCost: 0,
    quantity: 0,
    amount: 0
  })
  const [currentOrderIndex, setCurrentOrderIndex] = useState(-1)

  const handleDeleteOrder = () => {
    setOrdersArray([])
    setTotalAmountCost(0)
  }

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 }
    // { title: 'PNB', id: 3 },
    // { title: 'KOTAK', id: 4 }
  ]

  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserId(userData.user.id)
  }

  useEffect(() => {
    getUserData()
  }, [])

  let TransactionID, OrderID

  const handleSubmit = async () => {
    setDeliveryAddressModal(true)
  }

  const handleNavigation = () => {
    navigation.navigate('OrderSavedAddresses', {
      userId: userId
    })
  }

  const allFieldsFilled = () => {
    return (
      currentOrder?.bankId !== 0 &&
      currentOrder?.vehicleClass !== 0 &&
      currentOrder?.quantity !== 0 &&
      currentOrder?.tagCost !== 0 &&
      currentOrder?.amount !== 0
    )
  }

  const checkIfOrderIsSame = (order) => {
    return (
      currentOrder?.bankId === order?.bankId &&
      currentOrder?.vehicleClass === order?.vehicleClass &&
      currentOrder?.quantity === order?.quantity &&
      currentOrder?.tagCost === order?.tagCost &&
      currentOrder?.amount === order?.amount
    )
  }

  useEffect(() => {
    if (allFieldsFilled(currentOrder) && currentOrderIndex !== -1) {
      setCreateOrderModal(true)
    }
  }, [currentOrder])

  useEffect(() => {
    if (!createOrderModal) {
      setCurrentOrder({
        bankId: 0,
        vehicleClass: 0,
        tagCost: 0,
        quantity: 0,
        amount: 0
      })
      setCurrentOrderIndex(-1)
    }
  }, [createOrderModal])

  return (
    <>
      {loading && <Loader loading={loading} />}
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable></Pressable>
        <OverlayHeader
          title={'Order Details'}
          isorderSection={true}
          handleDeleteOrder={handleDeleteOrder}
        />
        <ScrollView style={{ flex: 1, padding: '5%' }}>
          <DisplayDetailsCard
            cardData={[
              {
                title: 'Available wallet balance',
                value: `: ₹${walletDetails?.agent?.balance || 0}`
              },
              {
                title: 'Order value',
                value: `: ₹${totalOrderAmount || 0}`
                // value: `: ₹0`
              },
              {
                title: 'Remaining Balance',
                value: `: ₹${
                  (walletDetails?.agent?.balance || 0) - (totalOrderAmount || 0)
                }`
                // value: `: ₹0`
              }
            ]}
          />

          <HorizontalDivider />
          {/* Render each order in the ordersArray dynamically */}
          {ordersArray && ordersArray.length > 0 ? (
            ordersArray.map((order, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setCurrentOrder(order)
                  setCurrentOrderIndex(index)
                  // console.log(order);
                  // if (checkIfOrderIsSame(order)) {
                  //   console.log(currentOrder, 'current order is being set here')
                  //   setCreateOrderModal(true)
                  // }
                }} // Function to handle click
                activeOpacity={0.7} // Optional: Add a feedback effect
              >
                {/* Order content */}
                <View style={styles.orderContainer}>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                      {bankNameData.find((item) => item.id === order.bankId)
                        ?.title || 'Bank Not Found'}
                    </Text>

                    {/* <Image source={require('../../assets/screens/kotakLogo.png')} /> */}
                    <View style={styles.costQtyContainer}>
                      <Text style={styles.constAndQtyContainerText}>
                        Cost: {order.tagCost || 'N/A'}
                      </Text>
                      <VerticalDivider />
                      <Text style={styles.constAndQtyContainerText}>
                        Qty: {order.quantity || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.vcText}>
                      {order.vehicleClass || 'VC 4'}
                    </Text>
                    <Text style={[styles.amountText, { marginTop: '10%' }]}>
                      ₹{order.amount || 'N/A'}
                    </Text>
                  </View>
                </View>

                <HorizontalDivider />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.container}>
              <Text style={styles.message}>No orders yet</Text>
            </View>
          )}
        </ScrollView>

        {/* Buttons */}
        <View
          style={{
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <AddBtn
            title={'Add +'}
            disabled={totalOrderAmount > walletDetails?.agent?.balance}
            onPress={() => {
              if (totalOrderAmount <= walletDetails?.agent?.balance) {
                setCurrentOrder(null)
                setCreateOrderModal(true)
              }
            }}
          />

          <AddBtn title={'Cancel All Orders'} onPress={handleDeleteOrder} />
        </View>

        <View style={{ padding: '5%', paddingBottom: 20 }}>
          <LinearButton
            title={'Select Delivery Address'}
            // onPress={() => setSavedAddressModal(true)}
            disabled={
              totalOrderAmount > walletDetails?.agent?.balance ||
              ordersArray.length == 0
            }
            onPress={handleNavigation}
          />
        </View>

        <CreateOrderModal
          visible={createOrderModal}
          onClose={() => setCreateOrderModal(false)}
          currentOrder={currentOrder}
          currentOrderIndex={currentOrderIndex}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  constAndQtyContainerText: {
    color: '#848484',
    fontSize: 12,
    fontWeight: '400'
  },
  vcText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400'
  },
  amountText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600'
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#00000080',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    padding: '4%'
  },
  costQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#f44336', // Red background for close button
    borderRadius: 20
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  addressList: {
    maxHeight: 200, // Limit height for scrolling
    marginTop: 10
  },
  proceedButton: {
    backgroundColor: '#4CAF50', // Green button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  addressContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 2
  },
  container: {
    flex: 1, // Takes full screen height
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center' // Centers content horizontally
    // backgroundColor: '#f8f9fa', // Light background for better UI
  },
  message: {
    fontSize: 18, // Slightly larger text
    fontWeight: 'bold', // Bold for emphasis
    color: '#6c757d' // Neutral gray color
  }
})

export default OrderDetails
