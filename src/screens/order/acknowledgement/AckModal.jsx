import React, { useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AckModal = ({ visible, onClose, title, isSuccess, setAckModalData }) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (isSuccess && visible) {
      const timer = setTimeout(() => {
        setAckModalData({ visible: false, isSuccess: true })
        navigation.navigate('dashboard') // Navigates to the dashboard after 3 seconds
      }, 3000)

      return () => clearTimeout(timer) // Clear timeout on unmount or if visible changes
    }
  }, [isSuccess, visible, navigation, setAckModalData])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {isSuccess ? (
            <Image
              source={require('../../../assets/screens/success.png')}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../../../assets/screens/fail.png')}
              style={styles.icon}
            />
          )}

          <Text style={isSuccess ? styles.SuccessMessage : styles.failMessage}>
            {isSuccess ? title || 'Tag assigned successfully' : 'Tag not recharged. Please try again.'}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (isSuccess) {
                setAckModalData({ visible: false, isSuccess: true })
                navigation.navigate('orders')
              } else {
                setAckModalData({ visible: false, isSuccess: false })
              }
            }}
            style={styles.okButton}
          >
            <Text style={styles.okButtonText}>
              {isSuccess ? 'OK' : 'Cancel'}
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
    backgroundColor: '#263238',
    borderRadius: 12,
    paddingVertical: '4%',
    paddingHorizontal: '15%'
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default AckModal
