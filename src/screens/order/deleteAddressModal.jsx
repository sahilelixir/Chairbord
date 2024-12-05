import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image
} from 'react-native'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'

const DeleteAddressModal = ({
  visible,
  onClose,
  address,
  deleteAddressId,
  handleSavedAddressFetching,
  handleOutsideClick
}) => {
  const [loading, setLoading] = useState(false)

  const handleDeleteAddress = async () => {
    if (deleteAddressId == -1) {
      return
    }
    console.log(deleteAddressId, 'delete address id')
    setLoading(false)
    try {
      const response = await client.post(
        `/order/fastag/delete-address/${deleteAddressId}`
      )
      handleSavedAddressFetching()
      handleOutsideClick()
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
            {/* Close Button */}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Image
                source={require('../../assets/DrawerNavigation/closeLogout.png')}
                alt="closeBtn"
                style={{ width: 15, height: 15 }}
              />
            </Pressable>

            {/* Modal Content */}
            <View style={styles.contentContainer}>
              <Text style={styles.modalTitle}>
                Are you sure you want to delete this address?
              </Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleDeleteAddress}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000'
  },
  contentContainer: {
    marginBottom: 20,
    marginTop: 15
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    width: '45%',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default DeleteAddressModal
