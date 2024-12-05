import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AddBtn from '../../components/ui/AddBtn'

const OrderSuccessModal = ({ visible, onClose, onApply, transactionId, orderId, totalOrderAmount, responseAmount, orders }) => {
  function calculateTotalAmount() {
    return orders.reduce((total, order) => total + order.amount, 0)
  }

  const handleClose = () => {
    onClose();
    navigation.navigate('orders');
  }

  const [amountToBeDisplay, setAmountToBeDisplay] = useState(calculateTotalAmount)
  console.log(amountToBeDisplay, "amint")
  const navigation = useNavigation()
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Image
              source={require('../../assets/DrawerNavigation/closeLogout.png')}
              alt="closeBtn"
              style={{ width: 20, height: 20 }}
            />
          </Pressable>
          <View style={styles.contentContainer}>
            <Image
              source={require('../../assets/screens/success.png')}
              style={styles.successImage}
            />
            <Text style={styles.titleText}>
              Your order has been placed successfully
            </Text>
            <View style={styles.orderDetails}>
              <View style={styles.orderDetailRow}>
                <Text style={styles.detailLabel}>Order ID</Text>
                <Text style={styles.detailValue}>: {orderId}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.detailLabel}>Amount Paid</Text>
                <Text style={styles.detailValue}>: {amountToBeDisplay}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.detailLabel}>Transaction Id.</Text>
                <Text style={styles.detailValue}>: {transactionId}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('drawer')} style={styles.button}>
              <Text style={styles.buttonText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('orders')} style={styles.historybutton} >
              <Text style={styles.historybuttonText}>Order history</Text>
            </TouchableOpacity>
            {/* <AddBtn
              title={'Order History'}
              onPress={() => navigation.navigate('Order')}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  successImage: {
    width: 100,
    height: 100
    // marginBottom: 20
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginVertical: 10
  },
  orderDetails: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  detailLabel: {
    fontSize: 14,
    color: '#000000'
  },
  detailValue: {
    fontSize: 14,
    color: '#000000',
    justifyContent:'flex-start',
    width:'70%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    gap:10
  },
  button: {
    borderWidth: 1,
    borderColor: '#02546D',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#02546D',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600'
  },
  historybutton: {
    borderWidth: 1,
    backgroundColor: '#02546D',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historybuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600'
  }
})

export default OrderSuccessModal
