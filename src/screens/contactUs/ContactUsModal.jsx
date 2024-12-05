import React from 'react'
import { View, Text, Modal, StyleSheet, Image, Pressable } from 'react-native'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const ContactUsModal = ({ visible, onRequestClose }) => {
  const navigation = useNavigation()
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={onRequestClose}>
              <Image
                source={require('../../assets/DrawerNavigation/closeLogout.png')}
                alt="closeBtn"
              />
            </Pressable>
          </View>
          <Text style={styles.title}>
            Your request has been submitted successfully 123-456-789is your
            service request number.
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bolderText}>Note:</Text> This number is for
            future reference.
          </Text>
          <SecondaryButton
            title={'Back to dashboard'}
            onPress={() => navigation.navigate('dashboard')}
          />
        </View>
      </View>
    </Modal>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'relative'
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 30
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: '10%',
    lineHeight: 24,
    color: '#000000'
  },
  description: {
    textAlign: 'center',
    marginBottom: '6%',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000'
  },
  backButton: {
    backgroundColor: '#263238',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  bolderText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000'
  }
})

export default ContactUsModal
