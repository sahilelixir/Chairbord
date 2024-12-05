import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomerDetailsCard = ({ customerDetailsData, errorMessage, title }) => {
  return (
    <>
      <Text style={styles.label}>{title || 'Customer details'}</Text>
      <View style={styles.dataDetailContainer}>
        {customerDetailsData.map((data, index) => (
          <View style={styles.customerDetailsContainer} key={index}>
            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
          </View>
        ))}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '3%'
  },
  dataDetailContainer: {
    borderWidth: 1,
    borderColor: '#263238',
    borderRadius: 20,
    padding: '5%'
  },
  customerDetailsValueText: {
    color: '#000000',
    width: '55%',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  customerValueText: {
    color: '#000000',
    width: '45%',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  customerDetailsTitleText: {
    color: 'grey',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  customerDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '3%'
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12
  }
})

export default CustomerDetailsCard
