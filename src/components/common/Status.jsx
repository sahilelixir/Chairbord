import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Status = ({ status }) => {
  const getStatusComponent = (status) => {
    switch (status) {
      case 'Pending':
        return <PendingStatus />
      case 'return':
        return <ReturnStatus />
      case 'confirm':
        return <ConfirmStatus />
      case 'Acknowledge':
        return <AcknowledgeStatus />
      case 'Acknowledged':
        return <AcknowledgeStatus />  
      case 'new':
        return <NewStatus />
      case 'Dispatched':
        return <DispatchedStatus />
      default:
        return <Text style={styles.defaultText}>Unknown Status</Text>
    }
  }

  return getStatusComponent(status)
}

const PendingStatus = () => {
  return (
    <View style={styles.pendingContainer}>
      <Text style={styles.pendingText}>Pending</Text>
    </View>
  )
}

const DispatchedStatus = () => {
  return (
    <View style={styles.dispatchedContainer}>
      <Text style={styles.dispatchedText}>Dispatched</Text>
    </View>
  )
}

const ReturnStatus = () => {
  return (
    <View style={styles.returnContainer}>
      <Text style={styles.returnText}>Return</Text>
    </View>
  )
}

const ConfirmStatus = () => {
  return (
    <View style={styles.confirmContainer}>
      <Text style={styles.confirmText}>Confirm</Text>
    </View>
  )
}

const AcknowledgeStatus = () => {
  return (
    <View style={styles.acknowledgeContainer}>
      <Text style={styles.acknowledgeText}>Acknowledged</Text>
    </View>
  )
}

const NewStatus = () => {
  return (
    <View style={styles.confirmContainer}>
      <Text style={[styles.confirmText, { textAlign: 'center' }]}>New</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  defaultText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  pendingText: {
    color: '#FC9E00',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  pendingContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFA20033',
    borderRadius: 20
  },
  returnText: {
    color: '#FC0000',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  returnContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FF000033',
    borderRadius: 20
  },
  confirmText: {
    color: '#17C75D',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  confirmContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#1EA62433',
    borderRadius: 20
  },
  acknowledgeText: {
    color: '#2577C3',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  acknowledgeContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#146CBE33',
    borderRadius: 20
  },
  // New styling for dispatched status
  dispatchedText: {
    color: '#008080', // Teal color for dispatched text
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14
  },
  dispatchedContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#E0FFFF', // Light cyan background for a fresh look
    borderRadius: 20
  }
})

export default Status
