import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native'
import InputText from '../../components/common/InputText'
import SelectField from '../../components/common/SelectFieldBig'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import { useOrders } from '../../orderContext/OrderContext'

const CreateOrderModal = ({
  visible,
  onClose,
  currentOrder = {
    bankId: 0,
    vehicleClass: 0,
    tagCost: 0,
    quantity: 0,
    amount: 0
  },
  currentOrderIndex
}) => {
  const navigation = useNavigation()

  // Access the ordersArray and setOrdersArray from context
  const { ordersArray, setOrdersArray } = useOrders()

  const [orderBodyData, setOrderBodyData] = useState(currentOrder)

  const all_FieldsFilled = () => {
    if (!currentOrder) {
      return false
    }
    return (
      currentOrder?.bankId !== 0 &&
      currentOrder?.vehicleClass !== 0 &&
      currentOrder?.quantity !== 0 &&
      currentOrder?.tagCost !== 0 &&
      currentOrder?.amount !== 0
    )
  }

  useEffect(() => {
    if (visible) {
      if (all_FieldsFilled()) {
        setOrderBodyData(currentOrder)
        console.log(currentOrderIndex, 'order index is this')
      }
    }
  }, [visible])

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [tagCost, setTagCost] = useState('')

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const formDataHandler = (key, value) => {
    setOrderBodyData({ ...orderBodyData, [key]: value })
    // setDeliveryAddress({ ...deliveryAddress, [key]: value })
  }

  const setBank = (selectedItem, index) => {
    formDataHandler('bankId', selectedItem.id)
  }

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 },
    { title: 'PNB', id: 3 },
    { title: 'KOTAK', id: 4 }
  ]

  const vehicleClassData = [
    { title: 'VC 4', id: 'VC4' },
    { title: 'VC 5', id: 'VC5' }
  ]

  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleTagCost = async () => {
    setLoading(true)
    if (
      !userData?.user?.id ||
      !orderBodyData?.bankId ||
      !orderBodyData?.vehicleClass
    ) {
      return
    }
    try {
      const response = await client.post('/order/fastag/get-tag-cost', {
        agentId: userData?.user?.id,
        bankId: orderBodyData?.bankId,
        vehicleClass: orderBodyData?.vehicleClass
      })
      setTagCost(JSON.stringify(response.data.cost))
      setOrderBodyData({ ...orderBodyData, tagCost: response.data.cost })
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderBodyData?.bankId !== 0 && orderBodyData?.vehicleClass !== 0) {
      handleTagCost()
    }
  }, [orderBodyData?.bankId, orderBodyData?.vehicleClass])

  useEffect(() => {
    setOrderBodyData({
      ...orderBodyData,
      amount: orderBodyData?.quantity * orderBodyData?.tagCost
    })
  }, [orderBodyData?.quantity, orderBodyData?.tagCost])

  const handleNext = () => {
    if (isButtonEnabled) {
      if (all_FieldsFilled()) {
        // Ensure currentOrderIndex is defined and valid
        if (
          currentOrderIndex !== undefined &&
          currentOrderIndex >= 0 &&
          currentOrderIndex < ordersArray.length
        ) {
          setOrdersArray((prevOrdersArray) => {
            const updatedOrders = [...prevOrdersArray]
            updatedOrders[currentOrderIndex] = {
              ...updatedOrders[currentOrderIndex],
              ...orderBodyData // Spread the new order data
            }
            return updatedOrders
          })
          handleClose()
        }
      } else {
        setOrdersArray((prevOrdersArray) => {
          const updatedOrders = [...prevOrdersArray, { ...orderBodyData }]
          handleClose()
          navigation.navigate('orderDetails')
          return updatedOrders
        })
      }
    }
  }

  const allFieldsFilled = () => {
    // Combine both objects into one array of values
    if (!orderBodyData) {
      return
    }
    const allValues = [
      ...Object.values(orderBodyData)
      // ...Object.values(deliveryAddress)
    ]

    // Check if all fields are filled (i.e., non-empty and non-zero)
    return allValues.every((value) => value !== '' && value !== 0)
  }

  useEffect(() => {
    // Update button state whenever `orderBodyData` or `deliveryAddress` changes
    setIsButtonEnabled(allFieldsFilled())
  }, [orderBodyData])

  const handleClose = () => {
    setOrderBodyData({
      bankId: 0,
      vehicleClass: 0,
      tagCost: 0,
      quantity: 0,
      amount: 0
    })
    setTagCost('')
    onClose()
  }

  const handlePassingDefBank = () => {
    const res = bankNameData.filter((item) => item.id === orderBodyData?.bankId)
    return res[0]
  }

  const handlePassingDefVC = () => {
    const res = vehicleClassData.filter(
      (item) => item.id === orderBodyData?.vehicleClass
    )
    return res[0]
  }

  const handleDelete = () => {
    // Check if currentOrderIndex is valid
    if (currentOrderIndex !== undefined && currentOrderIndex >= 0) {
      // Create a new ordersArray without the item at currentOrderIndex
      const updatedOrders = ordersArray.filter(
        (_, index) => index !== currentOrderIndex
      )

      // Update the ordersArray in context/state
      setOrdersArray(updatedOrders)

      // Close the modal
      handleClose()
    } else {
      console.log('Invalid order index')
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '5%'
              }}
            >
              <View>
                {!all_FieldsFilled() && (
                  <Text style={styles.titleText}>Create Order</Text>
                )}
                {all_FieldsFilled() && (
                  <Text style={styles.titleText}>Modify Order</Text>
                )}
              </View>
              <View>
                <Pressable onPress={handleClose}>
                  <Image
                    source={require('../../assets/DrawerNavigation/closeLogout.png')}
                    alt="closeBtn"
                    style={{ width: 20, height: 20 }}
                  />
                </Pressable>
              </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <SelectField
                dataToRender={bankNameData}
                title={'Select bank name'}
                selectedValue={setBank}
                defaultValue={handlePassingDefBank()}
              />
              <View style={{ marginTop: '5%' }}>
                <SelectField
                  dataToRender={vehicleClassData}
                  title={'Select vehicle class'}
                  selectedValue={(selectedItem, index) => {
                    formDataHandler('vehicleClass', selectedItem.id)
                  }}
                  defaultValue={handlePassingDefVC()}
                />
              </View>

              <View style={{ width: '100%', marginTop: '4%' }}>
                <InputText
                  value={tagCost}
                  placeholder="Tag Cost"
                  secure={false}
                  onChangeText={(value) => {
                    formDataHandler('tagcost', value)
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'Quantity'}
                    inputStyle={{ width: '100%' }}
                    value={orderBodyData?.quantity}
                    onChangeText={(value) => {
                      formDataHandler('quantity', value)
                    }}
                  />
                </View>
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'Amount'}
                    inputStyle={{ width: '100%' }}
                    value={JSON.stringify(orderBodyData?.amount)}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {all_FieldsFilled() && (
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={styles.deletebutton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
                {!all_FieldsFilled() && (
                  <TouchableOpacity onPress={handleClose} style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={handleNext}
                  style={[
                    styles.button,
                    styles.applyButton,
                    isButtonEnabled ? {} : { opacity: 0.5 } // Dim the button when disabled
                  ]}
                  disabled={!isButtonEnabled} // Disable button if fields are not filled
                >
                  <Text style={[styles.buttonText, styles.applyButtonText]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    height: 'auto',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
  },
  button: {
    flex: 1,
    paddingVertical: '3%',
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#263238'
  },
  deletebutton: {
    flex: 1,
    paddingVertical: '3%',
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: 'red'
  },
  applyButton: {
    backgroundColor: '#02546D',
    marginLeft: '5%'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#263238'
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  },
  applyButtonText: {
    color: '#fff'
  }
})

export default CreateOrderModal
