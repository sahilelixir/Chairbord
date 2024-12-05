import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import InputText from '../../components/common/InputText'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'

const DeliveryAddressModal = ({ visible, onClose, userId }) => {
  const [loading, setLoading] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    state: '',
    pincode: '',
    phone: '',
    alternate_mobile_number: ''
  })

  console.log(deliveryAddress)

  const formDataHandler = (field, value) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }))
  }

  const isButtonEnabled = Object.values(deliveryAddress).every(
    (field) => field !== ''
  )

  const handleSubmit = async () => {
    setLoading(true)
    console.log(userId, '<----------------userId')
    try {
      const response = await client.post(
        `/order/fastag/save-address/${userId}`,
        {
          address: deliveryAddress.address,
          state: deliveryAddress.state,
          pincode: deliveryAddress.pincode,
          phone: deliveryAddress.phone,
          alternate_mobile_number: deliveryAddress.alternate_mobile_number
        }
      )
      onClose()
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {loading && <Loader loading={loading} />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '5%'
              }}
            >
              <Text style={styles.titleText}>Delivery Address</Text>
              <Pressable onPress={onClose}>
                <Image
                  source={require('../../assets/DrawerNavigation/closeLogout.png')}
                  alt="closeBtn"
                  style={{ width: 20, height: 20 }}
                />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, marginVertical: 5 }}
            >
              {/* Address Field */}
              <InputText
                value={deliveryAddress.address}
                placeholder="Address"
                onChangeText={(value) => formDataHandler('address', value)}
              />

              {/* State Field */}
              <InputText
                value={deliveryAddress.state}
                placeholder="State"
                onChangeText={(value) => formDataHandler('state', value)}
              />

              {/* Pincode Field */}
              <InputText
                value={deliveryAddress.pincode}
                placeholder="Pincode"
                keyboardType="numeric"
                onChangeText={(value) => formDataHandler('pincode', value)}
              />

              {/* Phone Field */}
              <InputText
                value={deliveryAddress.phone}
                placeholder="Phone"
                keyboardType="numeric"
                onChangeText={(value) => formDataHandler('phone', value)}
              />

              {/* Alternate Mobile Field */}
              <InputText
                value={deliveryAddress.alternate_mobile_number}
                placeholder="Alternate Mobile"
                keyboardType="numeric"
                onChangeText={(value) =>
                  formDataHandler('alternate_mobile_number', value)
                }
              />

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.button,
                    styles.applyButton,
                    isButtonEnabled ? {} : { opacity: 0.5 }
                  ]}
                  disabled={!isButtonEnabled}
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
    height: 'auto',
    maxHeight: '80%',
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
  applyButton: {
    backgroundColor: '#02546D',
    marginLeft: '5%'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#263238'
  },
  applyButtonText: {
    color: '#fff'
  }
})

export default DeliveryAddressModal
