import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCache } from '../../helper/Storage'
import OverlayHeader from '../../components/OverlayHeader'
import CustomerDetailsCard from '../../components/CustomerDetailsCard'
import InputText from '../../components/common/InputText'
import SelectField from '../../components/common/SelectFieldBig'
import SecondaryButton from '../../components/common/SecondaryButton'
import SuccessModal from '../../components/SuccessModal'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'
import showAlert from '../../utils/showAlert'
import { fuelData, stateData } from '../tagRegistration/staticData'
import CustomLabelText from '../../components/ui/CustomLabelText'
import CustomInputText from '../../components/common/CustomInputText'

const replacementReason = [
  {
    id: 1,
    reasonId: '1',
    title: 'Tag Damaged'
  },
  {
    id: 2,
    reasonId: '2',
    title: 'Lost Tag'
  },
  {
    id: 3,
    reasonId: '3',
    title: 'Tag Not Working'
  },
  {
    id: 4,
    reasonId: '99',
    title: 'Others'
  }
]

const TagReplacementForm = (props: any) => {
  const {
    response,
    customerId,
    userData,
    sessionId: _sessionId
  } = props?.route?.params
  const { mobileNo, walletId } = response.custDetails

  const {
    vehicleNo,
    chassisNo,
    repTagCost: debitAmt,
    engineNo,
    isNationalPermit: nationalPermit,
    permitExpiryDate: _permitExpiryDate
    // stateOfRegistration,
    // vehicleDescriptor
  } = response?.vrnDetails

  console.log(response?.vrnDetails, 'response?.vrnDetails')

  const [modalShow, setModalShow] = useState<null | boolean>(null)
  const [modelIsSuccess, setModelIsSuccess] = useState<null | boolean>(null)
  const [tagSerialNumber, setTagSerialNumber] = useState('')
  const [sessionId, setSessionId] = React.useState()
  const [reasonOfReplacement, setReasonOfReplacement] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<any>()
  const [stateOfRegistration, setStateOfRegistration] = useState(
    response.vrnDetails.stateOfRegistration
  )
  const [vehicleDescriptor, setVehicleDescriptor] = useState(
    response.vrnDetails.vehicleDescriptor
  )
  const [permitExpiryDate, setPermitExpiryDate] = useState(_permitExpiryDate)
  const [selectNationPermit, setSelectNationPermit] = useState(nationalPermit)
  const [chassisNumber, setChasisNumber] = useState(chassisNo)
  const [engineNumber, setEngineNumber] = useState(engineNo)

  const getUserData = async () => {
    try {
      const value = await getCache('userData')
      setUserInfo(value)
      if (value !== null) {
        return JSON.parse(value)
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const replaceFastag = async () => {
    setLoading(true)
    try {
      const body = {
        mobileNo: mobileNo,
        walletId: walletId,
        vehicleNo: vehicleNo,
        agentId: parseInt(userInfo.user.id),
        masterId: parseInt(userInfo.user.master_id) || '',
        debitAmt: debitAmt,
        requestId: response?.requestId,
        sessionId: _sessionId,
        serialNo: '608268-001-' + tagSerialNumber,
        reason: reasonOfReplacement,
        reasonDesc: description || '',
        chassisNo: chassisNumber,
        engineNo: engineNumber,
        isNationalPermit: selectNationPermit || '2',
        permitExpiryDate: permitExpiryDate || '',
        stateOfRegistration: stateOfRegistration || '',
        vehicleDescriptor: vehicleDescriptor || '',
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: ''
      }
      console.log(body, 'body data')
      const res = await client.post(`/bajaj/replaceFastag`, body)
      setModelIsSuccess(true)
      setModalShow(true)
    } catch (err: any) {
      console.log(err)
      showAlert(
        err.response.data.error.msg ||
          err.response.data.error.errorDesc ||
          'Tag replacement failed',
        () => setLoading(false)
      )
    } finally {
      setLoading(false)
    }
  }

  const customerDetailsData = [
    {
      title: 'Name',
      value: `:  ${response.custDetails.name}`
    },
    {
      title: 'Mobile Number',
      value: `:  ${response.custDetails.mobileNo}`
    }
  ]

  const existingTagDetailData = [
    {
      title: 'Chassis No.',
      value: `:  ${response.vrnDetails.chassisNo}`
    },
    {
      title: 'Engine No.',
      value: `:  ${response.vrnDetails.engineNo}`
    },
    {
      title: 'Commercial Status',
      value: `:  ${response.vrnDetails.commercial}`
    },
    {
      title: 'Vehicle Type',
      value: `:  ${response.vrnDetails.vehicleType}`
    }
  ]

  const getSessionId = async () => {
    const session = await getCache('session')
    setSessionId(session)
  }

  useEffect(() => {
    getSessionId()
  }, [sessionId])

  const handleDateChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, '')
    if (cleaned?.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2)
    }
    if (cleaned?.length >= 5) {
      cleaned = cleaned.slice(0, 5) + '-' + cleaned.slice(5)
    }
    setPermitExpiryDate(cleaned)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <OverlayHeader title={'Tag Replacement'} showBackButton={true} />
        {loading && <Loader loading={loading} />}
        <View style={styles.container}>
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <CustomerDetailsCard
            customerDetailsData={customerDetailsData}
            errorMessage={'*Minimum balance should be 250 in customer FASTag'}
          />

          <Text style={styles.label}>Vehicle number</Text>
          <View style={{ flex: 1 }}>
            <InputText placeholder={''} value={vehicleNo} isEditable={false} />
          </View>

          <View style={{ marginTop: '5%' }}>
            <CustomLabelText label={'Chasis Number'} />
            {response?.vrnDetails &&
            response?.vrnDetails?.chassisNo?.length > 2 ? (
              <InputText
                placeholder={'Enter Chasis number'}
                value={response?.vrnDetails?.chassisNo}
                isEditable={false}
              />
            ) : (
              <CustomInputText
                placeholder={'Enter Chasis number'}
                value={chassisNumber}
                onChangeText={(text: string) =>
                  setChasisNumber(text?.toUpperCase())
                }
                borderColor={chassisNumber?.length < 2 ? 'red' : '#263238'}
              />
            )}
          </View>
          <View style={{ marginTop: '5%' }}>
            <CustomLabelText label={'Engine Number'} />
            {response?.vrnDetails &&
            response?.vrnDetails?.engineNo?.length > 2 ? (
              <InputText
                placeholder={'Enter Engine number'}
                value={response?.vrnDetails?.engineNo}
                isEditable={false}
              />
            ) : (
              <CustomInputText
                placeholder={'Enter Engine number'}
                value={engineNumber}
                onChangeText={(text: string) =>
                  setEngineNumber(text?.toUpperCase())
                }
                borderColor={engineNumber?.length < 2 ? 'red' : '#263238'}
              />
            )}
          </View>

          <CustomerDetailsCard
            customerDetailsData={existingTagDetailData}
            title="Existing tag details"
          />
          <Text style={styles.subDescription}>
            Only Tag Serial number will be updated, all other details will
            remain the same
          </Text>

          <Text style={styles.label}>Tag serial number</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1 }}>
              <InputText placeholder={''} value="608268" isEditable={false} />
            </View>
            <View style={{ flex: 1, marginHorizontal: '5%' }}>
              <InputText placeholder={''} value="001" isEditable={false} />
            </View>
            <View style={{ flex: 1 }}>
              <InputText
                borderColor={tagSerialNumber.length < 2 ? 'red' : '#263238'}
                placeholder={'xxxxxx'}
                onChangeText={(text: string) => setTagSerialNumber(text)}
                value={tagSerialNumber}
              />
            </View>
          </View>

          {nationalPermit === '0' && (
            <View style={{ marginVertical: '5%' }}>
              <CustomLabelText label={'National Permit'} />
              <SelectField
                dataToRender={[
                  { id: 1, title: 'Yes', code: '1' },
                  { id: 2, title: 'No', code: '2' }
                ]}
                title={'Select National Permit'}
                selectedValue={(value: any) =>
                  setSelectNationPermit(value.code)
                }
                borderColor={selectNationPermit === '0' ? 'red' : 'black'}
              />
            </View>
          )}

          {selectNationPermit === '1' && (
            <View>
              <CustomLabelText label={'Enter Permit Expiry of Vehicle'} />
              <CustomInputText
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#263238"
                style={styles.dateInput}
                value={permitExpiryDate}
                onChangeText={(text: string) => handleDateChange(text)}
                keyboardType="numeric"
                maxLength={10}
                borderColor={!permitExpiryDate ? 'red' : 'black'}
              />
            </View>
          )}
          {response.vrnDetails && !response.vrnDetails.stateOfRegistration && (
            <View style={{ marginVertical: '5%' }}>
              <CustomLabelText label={'State of Registration'} />
              <SelectField
                dataToRender={stateData}
                title={'Select Vehicle State'}
                selectedValue={(value: any) =>
                  setStateOfRegistration(value.code)
                }
                borderColor={!stateOfRegistration ? 'red' : 'black'}
              />
            </View>
          )}
          <View style={{ marginVertical: '5%' }}>
            <CustomLabelText label={'Fuel Type'} />
            {response?.vrnDetails && response?.vrnDetails?.vehicleDescriptor ? (
              <CustomInputText
                placeholder={'Enter fuel type'}
                value={response?.vrnDetails?.vehicleDescriptor}
                isEditable={false}
              />
            ) : (
              <SelectField
                dataToRender={fuelData}
                title={'Select fuel type'}
                selectedValue={(value: any) =>
                  setVehicleDescriptor(value.title)
                }
                borderColor={!vehicleDescriptor ? 'red' : 'black'}
              />
            )}
          </View>

          <Text style={styles.label}>Replacement reason</Text>
          <SelectField
            selectedValue={(value: any) =>
              setReasonOfReplacement(value.reasonId)
            }
            dataToRender={replacementReason}
            borderColor={!reasonOfReplacement ? 'red' : 'black'}
            title={'Select replacement reason'}
          />

          {reasonOfReplacement === '99' && (
            <View>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#000000',
                  borderRadius: 25,
                  color: '#000000'
                }}
                placeholder={'Enter description'}
                onChangeText={(text: string) => setDescription(text)}
                value={description}
                multiline
                numberOfLines={4}
              />
            </View>
          )}

          <Text style={styles.label}>Replacement charges: {debitAmt}</Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 5,
              marginVertical: '5%'
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'black',
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#263238',
                    fontSize: 28,
                    lineHeight: 33,
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: '45%' }}>
              <SecondaryButton
                title={'Submit'}
                onPress={() => replaceFastag()}
              />
            </View>
          </View>
        </View>

        <SuccessModal
          isSuccess={modelIsSuccess}
          visible={modalShow}
          title={'Tag replaced successfully'}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '5%'
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '3%'
  },
  errorText: {
    padding: '2%',
    paddingHorizontal: '4%',
    color: '#FF0000'
  },
  subDescription: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    marginTop: '3%',
    width: '80%'
  },
  dateInput: {
    borderColor: '#263238',
    borderWidth: 1,
    color: '#000000',
    width: '100%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: '5%',
    backgroundColor: '#F3F3F3',
    textAlign: 'center'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10
  }
})

export default TagReplacementForm
