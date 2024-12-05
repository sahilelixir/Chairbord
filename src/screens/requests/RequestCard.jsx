import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'
import Status from '../../components/common/Status'

const RequestCard = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/requestScreen/returnRequest.png')}
            />
            <Text style={styles.requestText}>{data.requestType}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.dateAndTimeText}>{data.requestTime}</Text>
            <VerticalDivider />
            <Text style={styles.dateAndTimeText}>{data.requestDate}</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.transactionIdText}>{data.transactionId}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.orderNumberText}>{data.orderNumber}</Text>
              <Status status={'pending'} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 16,
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    marginBottom: 15
  },
  requestText: {
    marginStart: '7%',
    color: '#737373',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  dateAndTimeText: {
    color: '#848484',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  transactionIdText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    paddingVertical: '3%'
  },
  orderNumberText: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400'
  }
})

export default RequestCard
