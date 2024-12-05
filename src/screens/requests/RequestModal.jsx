import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, Pressable, Image } from 'react-native'
import SecondaryButton from '../../components/common/SecondaryButton'
import Status from '../../components/common/Status'
import VerticalDivider from '../../components/common/VerticalDivider'
import { useNavigation } from '@react-navigation/native'

const RequestModal = ({ visible, onClose, onApply, data }) => {
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '15%'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>{'16-03-2024'}</Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>{'20:19:36'}</Text>
            </View>
            <View>
              <Pressable onPress={onClose}>
                <Image
                  source={require('../../assets/DrawerNavigation/closeLogout.png')}
                  alt="closeBtn"
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '3%'
            }}
          >
            <Text style={styles.titleText}>Request Type</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row'
              }}
            >
              <Text style={{ marginRight: '5%', color: 'grey' }}>:</Text>
              <Text style={styles.valueText}>Request Return</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '3%'
            }}
          >
            <Text style={styles.titleText}>Request No.</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row'
              }}
            >
              <Text style={{ marginRight: '5%', color: 'grey' }}>:</Text>
              <Text style={styles.valueText}>TRR: 8844851</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '3%'
            }}
          >
            <Text style={styles.titleText}>Order No.</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row'
              }}
            >
              <Text style={{ marginRight: '5%', color: 'grey' }}>:</Text>
              <Text style={styles.valueText}>TOR: 8794646</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '10%'
            }}
          >
            <Text style={styles.titleText}>Status</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row'
              }}
            >
              <Text style={{ marginRight: '5%', color: 'grey' }}>:</Text>
              <Status status={'pending'} />
            </View>
          </View>
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
    width: '90%'
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
  },
  titleText: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 14,
    lineHeight: 19
  },
  valueText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 14,
    lineHeight: 19
  },
  dateAndTimeText: {
    color: '#666666',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  }
})

export default RequestModal
