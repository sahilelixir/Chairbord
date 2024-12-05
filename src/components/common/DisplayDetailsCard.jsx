import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DisplayDetailsCard = ({ cardData }) => {
  return (
    <View style={styles.WalletDetailsCard}>
      <View
        style={{
          justifyContent: 'space-between'
        }}
      >
        {cardData.map((data, index) => (
          <View style={styles.customerDetailsContainer} key={index}>
            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
            <Text style={styles.customerValueText}>{data.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  customerDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '3%'
  },
  customerDetailsTitleText: {
    color: 'grey',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  customerValueText: {
    color: '#000000',
    width: '45%',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16
  },
  WalletDetailsCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 25
    // elevation: 2
  }
})
export default DisplayDetailsCard
