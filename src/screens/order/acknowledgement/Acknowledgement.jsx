import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import OverlayHeader from '../../../components/OverlayHeader'
import SearchBar from '../../../components/common/SearchBar'
import LinearButton from '../../../components/common/LinearButton'
import { RadioButton } from 'react-native-paper'
import HorizontalDivider from '../../../components/common/HorizontalDivider'
import AcknowlegementCard from './AcknowlegementCard'
import AckModal from './AckModal'
import AckFilter from './AckFilter'
import useUserData from '../../../helper/useUserData'
import { client } from '../../../client/Axios'
import Loader from '../../../components/ui/Loader'
import CheckBox from '@react-native-community/checkbox'

const Acknowledgement = (props) => {
  const [ackModalData, setAckModalData] = useState({
    visible: false,
    isSuccess: true
  })
  const [searchText, setSearchText] = useState('')
  const [acknowledgementRadioCheck, setAcknowledgementRadioCheck] = useState('')
  const acknowledgementCheckboxData = ['Missing', 'Damaged', 'Received']
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dispatchedTags, setDispatchedTags] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [pendingTags, setPendingTags] = useState(null)
  const [refundResponseString, setRefundResponseString] = useState('')
  const [totalRefundAmount, setTotalRefundAmount] = useState(0)
  const bankMap = { 1: 'Bajaj', 2: 'SBI' }


  const agentId = useUserData()?.userId
  console.log(agentId, 'agent id');
  const orderId = props?.route?.params?.orderId
  console.log(orderId, 'order id');

  const fetchDispatchedTags = async () => {
    try {
      setLoading(true)
      const response = await client.post(
        `/order/fastag/dispatch/agent/${agentId}`,
        {
          orderId: orderId
        }
      )
      console.log(response.data, '<-------------------------- dispatched tags')
      setDispatchedTags(response?.data?.tags)
      setPendingTags(response?.data?.orderedTags)
    } catch (error) {
      console.log(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckBox = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    if (agentId && orderId) {
      fetchDispatchedTags()
    }
  }, [agentId, orderId])

  useEffect(() => {
    if (pendingTags) {
      let refundString = ''

      // Use Object.entries to iterate over the object
      Object.entries(pendingTags).forEach(([key, item]) => {
        if (item.quantity > 0) {
          refundString += `${bankMap[item.bankId]} ${item.vehicleClass}  (${item.quantity
            } * ${item.singleCost})  =  ₹${item.quantity * item.singleCost}, `
        }
      })

      // If the string is still empty, set a default value
      if (refundString === '') {
        setRefundResponseString('The refund amount is 0')
      } else {
        // Trim the trailing comma and space
        refundString = refundString.slice(0, -2) // Remove last comma and space

        // Calculate total refund amount
        const totalRefundAmount = Object.values(pendingTags).reduce(
          (total, item) => {
            return (
              total + (item.quantity > 0 ? item.quantity * item.singleCost : 0)
            )
          },
          0
        )

        // Append total refund amount
        refundString += `\nTotal refund amount is  ₹${totalRefundAmount}`

        setRefundResponseString(refundString)
        setTotalRefundAmount(totalRefundAmount)
      }
    }

    console.log(refundResponseString, 'refund string')
  }, [pendingTags])

  const handleSubmit = async () => {
    console.log('hit')
    setLoading(true)
    try {
      const reqBody = {
        orderId: orderId,
        tagsArray: dispatchedTags.map((data) => data.serialNumber),
        refundAmount: totalRefundAmount
      }
      console.log(reqBody, 'request body')
      const response = await client.post(
        `/order/fastag/dispatch-acknowledge/agent/${agentId}`,
        reqBody
      )
      console.log(response.data, 'submit response here')
      setAckModalData({ visible: true, isSuccess: true })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      <SafeAreaView style={{ flex: 1 }}>
        <OverlayHeader title={'Acknowledgement'} />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: '5%' }}>
            <View style={styles.searchAndfilter}>
              <View style={styles.searchField}>
                <Image
                  source={require('../../../assets/screens/wallet/searchLogo.png')}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor={'#9A9A9A'}
                  value={''}
                // onChangeText={}
                />
              </View>
              <Pressable
                onPress={() => setShowFilterModal(true)}
                style={styles.filterLogo}
              >
                <Image
                  source={require('../../../assets/screens/wallet/filter.png')}
                />
              </Pressable>
            </View>
            <View style={styles.divider}></View>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#1A7E9D',
              borderRadius: 25,
              paddingHorizontal: '5%',
              paddingVertical: '2%'
            }}
          >
            {acknowledgementCheckboxData.map((data, index) => (
              <Pressable
                key={index}
                style={styles.radioButtonContainer}
                onPress={() => setAcknowledgementRadioCheck(data)}
              >
                <RadioButton
                  color={'#02546D'}
                  value={data}
                  status={
                    acknowledgementRadioCheck === data ? 'checked' : 'unchecked'
                  }
                />
                <Text style={styles.label}>{data}</Text>
              </Pressable>
            ))}
          </View> */}

            {/* <HorizontalDivider /> */}

            {/* {Array.from({ length: 5 }).map((_, index) => (
            <AcknowlegementCard key={index} />
          ))} */}
            {!dispatchedTags || dispatchedTags.length === 0 ? (
              <View style={styles.container}>
                <Text style={styles.messageText}>No Tags Dispatched</Text>
              </View>
            ) : (
              <>
                {dispatchedTags.map((data, index) => (
                  <AcknowlegementCard data={data} key={index} />
                ))}
                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={isChecked}
                    onValueChange={handleCheckBox}
                    style={styles.checkbox}
                    tintColors={{ true: '#0066cc', false: '#999999' }}
                  />
                  <Text style={styles.checkboxText}>
                    {refundResponseString}
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <View style={{ padding: '5%', paddingBottom: 20 }}>
          <LinearButton
            title={'Submit'}
            onPress={handleSubmit}
            disabled={!isChecked} // Disable the button when isSuccess is false
          />
        </View>
        <AckFilter
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
        {/* success modal */}
        <AckModal
          isSuccess={ackModalData.isSuccess}
          title={'Tag acknowledged successfully'}
          visible={ackModalData.visible}
          setAckModalData={setAckModalData}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    gap: 20,
    marginTop: '5%'
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  searchIcon: {
    width: 20,
    height: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#9A9A9A',
    color: '#9A9A9A',
    backgroundColor: 'white'
  },
  filterLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#9A9A9A',
    marginVertical: '5%'
  },
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    gap: 20,
    marginTop: '5%'
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#858585',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000'
  },
  filterLogo: {
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 50,
    padding: 15
  },
  label: {
    fontSize: 16,
    color: '#000000'
  },
  checkbox: {
    marginRight: 10,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'justify'
  },
  container: {
    flex: 1, // Make sure the container takes up available space
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    padding: 20, // Add some padding around the text
    // backgroundColor: '#f9f9f9' // Light background color for the container
  },
  messageText: {
    fontSize: 20, // Increase font size for readability
    fontWeight: 'bold', // Bold text for emphasis
    color: '#333', // Darker text color for better contrast
    textAlign: 'center', // Center align the text
    marginTop: 10, // Add some spacing above the text
    marginBottom: 10, // Add some spacing below the text
    paddingHorizontal: 15, // Add padding to the left and right
    borderRadius: 8, // Add rounded corners for the text container
    backgroundColor: '#e0e0e0', // Light grey background to highlight the message
    elevation: 2 // Add subtle shadow effect for a raised look
  }
})

export default Acknowledgement
