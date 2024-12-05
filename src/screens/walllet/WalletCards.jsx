import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// Utility function to format the date and time from ISO string
const formatDateAndTime = (isoString) => {
  const dateObj = new Date(isoString)
  // Extract day, month, and year
  const day = dateObj.getDate().toString().padStart(2, '0'); // Pad single digit day with leading zero
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Pad single digit month with leading zero
  const year = dateObj.getFullYear();

  // Format date as DD-MM-YYYY
  const date = `${day}-${month}-${year}`;

  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Formats time in "HH:MM" format
  return { date, time }
}

const WalletCards = ({
  amountValue,
  logo,
  title,
  reason,
  type,
  date, // Assuming this is in ISO 8601 format
  transactionId,
  referenceId
}) => {
  const navigation = useNavigation()
  const amountColor = type=== 'credit' ? '#25B73C' : '#FF0000'
  const { date: formattedDate, time: formattedTime } = formatDateAndTime(date)

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('walletDetails', {
          title,
          reason,
          date: formattedDate,
          type,
          time: formattedTime,
          transactionId,
          referenceId
        })
      }
    >
      <View style={styles.HeadingAndPriceSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}
            >
              {/* <View style={styles.ImageStyles}>
                <Image source={logo} />
              </View> */}
              <Text style={styles.heading}>{type.toUpperCase()}</Text>
            </View>
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
          <View>
            <Text style={[styles.amount, { color: amountColor }]}>
              {type=== 'credit'? '+' : '-'}₹{Math.abs(amountValue)}
            </Text>
            <View style={styles.amountAndDate}>
              <Text style={styles.dataAndTimeText}>{formattedDate}</Text>
              <View style={styles.verticalDivider} />
              <Text style={styles.dataAndTimeText}>{formattedTime}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginVertical: '5%' }}>
          <View style={styles.horizontalDivider}></View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <View style={styles.IdAndRefValues}>
              <Text style={styles.title}>ID:</Text>
              <Text style={styles.value}>{transactionId}</Text>
            </View>
            <View style={styles.IdAndRefValues}>
              <Text style={styles.title}>Ref no:</Text>
              <Text style={styles.value}>{referenceId ? referenceId : 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0.5,
    borderColor: '#00000080',
    borderRadius: 20,
    marginTop: '5%'
  },
  HeadingAndPriceSection: {
    padding: '5%'
  },
  heading: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    width:150,
  },
  ImageStyles: {
    backgroundColor: 'white',
    padding: '4%',
    borderColor: '#00000080',
    borderWidth: 0.4,
    borderRadius: 50
  },
  reasonText: {
    color: '#9C9C9C',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    marginTop: '10%'
  },
  amount: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'right'
  },
  dataAndTimeText: {
    color: '#9C9C9C',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12
  },
  amountAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  verticalDivider: {
    height: '80%',
    width: 1,
    backgroundColor: '#9C9C9C',
    marginHorizontal: 5
  },
  horizontalDivider: {
    width: '90%',
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8C8C8'
  },
  title: {
    color: '#9C9C9C',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  value: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  IdAndRefValues: {
    flexDirection: 'row',
    gap: 5
  }
})

export default WalletCards
