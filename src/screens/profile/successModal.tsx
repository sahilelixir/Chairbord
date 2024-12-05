import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SuccessModal = ({ visible, onClose, title, isSuccess }) => {
  const navigation = useNavigation()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {isSuccess === true ? (
            <Image
              source={require('../../assets/tagRegistration/success.png')}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../assets/tagRegistration/fail.png')}
              style={styles.icon}
            />
          )}

          {isSuccess === true ? (
            <Text style={styles.SuccessMessage}>
              {title || 'Tag assigned successfully'}
            </Text>
          ) : (
            <Text style={styles.failMessage}>
              Tag not recharged Please try again{' '}
            </Text>
          )}

          <Text style={styles.descriptionText}>
            {isSuccess === true
              ? ' For details: ask customer to visit bajaj fastag customer portal or contact 18002100260'
              : 'Please ask customer to contact NHAI FASTag Toll free no. 1033'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.okButton}
          >
            <Text style={styles.okButtonText}>
              {isSuccess === true ? 'OK' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    paddingVertical: '10%',
    width: '80%'
  },
  SuccessMessage: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'inter',
    color: '#32BA7C',
    marginVertical: '5%'
  },
  failMessage: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'inter',
    color: '#BA3232',
    marginVertical: '5%',
    width: '50%'
  },
  okButton: {
    backgroundColor: '#02546D',
    borderRadius: 12,
    paddingVertical: '4%',
    paddingHorizontal: '15%'
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'inter',
    color: '#000000',
    marginBottom: '10%',
    width: '90%'
  }
})

export default SuccessModal
