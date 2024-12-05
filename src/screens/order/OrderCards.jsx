import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'
import Status from '../../components/common/Status'
import Loader from '../../components/ui/Loader'

function formatDateTime(dateTimeString) {
  // Create a new Date object from the string
  const date = new Date(dateTimeString)

  // Extract date parts
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0')

  // Extract time parts
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // Format the date and time
  const formattedDate = `${year}-${month}-${day}`
  const formattedTime = `${hours}:${minutes}:${seconds}`

  return { date: formattedDate, time: formattedTime }
}

const OrderCards = ({ data, key }) => {
  const [loading, setLoading] = useState(false)
  // console.log(data);
  return (
    <>
      {loading && <Loader loading={loading} />}

      <View style={styles.cardContainer} key={key}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.IdText}>{data?.orderId}</Text>
            </View>
            <Text style={styles.amountText}>₹{data?.totalAmount}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>
                {formatDateTime(data?.orderTime).time}
              </Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>
                {formatDateTime(data?.orderTime).date}
              </Text>
            </View>
            <Status status={data?.status} />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#00000040',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '3%'
  },
  dateAndTimeText: {
    color: '#848484',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  IdText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600'
  },
  orderNumberText: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400'
  },
  amountText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000000'
  }
})

export default OrderCards
