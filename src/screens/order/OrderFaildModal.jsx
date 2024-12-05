import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native';

const InsufficientBalanceModal = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Image
              source={require('../../assets/DrawerNavigation/closeLogout.png')}
              style={styles.closeIcon}
            />
          </Pressable>
          <Image
            source={require('../../assets/screens/orderFailed.png')} // Replace with the path to your wallet icon
            style={styles.icon}
          />
          <Text style={styles.message}>
            You don’t have sufficient balance to place this order
          </Text>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#02546D',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#02546D',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InsufficientBalanceModal;
