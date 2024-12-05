import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearButton from '../../components/common/LinearButton'
import ExcelButton from '../../components/ui/ExcelButton'

const OrderSummary = (props) => {
  const data = props.route.params.orderData;
  console.log(props.route.params.orderData, "milgya?")


  const customerDetailsData = [
    {
      title: 'Order Quantity',
      value: `:  ${data.tagsOrdered}`
    },
    {
      title: 'Dispatced Quantity',
      value: `:  ${data.tagsDispatched}`
    },
    {
      title: 'Returned Quantity',
      value: `:  ${data.tagsReturned}`
    },
    {
      title: 'Acknowledge Quantity',
      value: `:  ${data.tagsAcknowledged}`
    },
    {
      title: 'Pending',
      value: `:  ${data.tagsPending}`
    }
  ]

  return (
    <>
      <OverlayHeader title={'Order Summary'} navigateTo={'drawer'} />
      <ScrollView style={styles.container}>
        <View style={{ padding: '5%' }}>
          <View style={styles.WalletDetailsCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6%'
              }}
            >
              <Text style={styles.headingText}>Order ID: {data.orderId}</Text>
              <ExcelButton title={'Excel'} />
            </View>

            <View
              style={{
                marginBottom: '6%'
              }}
            >
              {customerDetailsData.map((data, index) => (
                <View style={styles.customerDetailsContainer} key={index}>
                  <Text style={styles.customerDetailsTitleText}>
                    {data.title}
                  </Text>
                  <Text style={styles.customerValueText}>{data.value}</Text>
                </View>
              ))}
            </View>
            <LinearButton
              title={'Acknowledgement'}
              onPress={() => props.navigation.navigate('acknowledgement', { orderId: data.orderId })}
            />
          </View>

          {/* <HorizontalDivider /> */}

          {/* <CardAccordian
            title={'Kotak Bank'}
            content={
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text style={styles.headingText}>Bank Image</Text>
                  <Text style={[styles.headingText]}>VC-4</Text>
                </View>
                <View
                  style={{
                    marginVertical: '6%'
                  }}
                >
                  {customerDetailsData.map((data, index) => (
                    <View style={styles.customerDetailsContainer} key={index}>
                      <Text style={styles.customerDetailsTitleText}>
                        {data.title}
                      </Text>
                      <Text style={styles.customerValueText}>{data.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            }
          /> */}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  WalletDetailsCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  headingText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    color: '#000000'
  },
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
  }
})

export default OrderSummary
