import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Status from '../../../components/common/Status'
import HorizontalDivider from '../../../components/common/HorizontalDivider'
import { RadioButton } from 'react-native-paper'

const AcknowlegementCard = ({ data }) => {
  const [acknowledgementRadioCheck, setAcknowledgementRadioCheck] = useState('')
  const acknowledgementCheckboxData = ['Missing', 'Damaged', 'Received']
  const bankMap = { 1: 'Bajaj', 2: 'SBI' }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View>
          {/* Replace with actual image source */}
          {/* <Image source={kotakLogo} style={styles.logo} /> */}
          <Text style={styles.serialNumber}>{data?.serialNumber}</Text>
        </View>
        <View>
          <Status status={data?.status} />
        </View>
      </View>

      <HorizontalDivider style={styles.divider} />

      <View style={styles.detailsContainer}>
        <Text style={styles.vehicleClassText}>{data?.vehicleClass}</Text>
        <Text style={styles.bankText}>{bankMap[data?.bankId]}</Text>
      </View>

      <View style={styles.radioGroup}>
        {acknowledgementCheckboxData.map((item, index) => (
          <Pressable
            key={index}
            style={styles.radioButtonContainer}
            onPress={() => setAcknowledgementRadioCheck(item)}
          >
            {/* <RadioButton
              color={'#02546D'}
              value={item}
              status={acknowledgementRadioCheck === item ? 'checked' : 'unchecked'}
            /> */}
            {/* <Text style={styles.label}>{item}</Text> */}
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0.5,
    borderColor: '#00000080',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serialNumber: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginVertical: 8,
  },
  divider: {
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  vehicleClassText: {
    marginRight: 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  bankText: {
    fontSize: 14,
    color: '#000000',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#000000',
  },
})

export default AcknowlegementCard
