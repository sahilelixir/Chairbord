import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  Pressable,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import UploadDoc from '../../components/common/UploadDoc'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import AadharVerifyOtp from '../opt/AadharVerifyOtp'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import Loader from '../../components/ui/Loader'
import OverlayHeader from '../../components/OverlayHeader'

const AadharAndPanVerification = (props) => {
  const [userData, setUserData] = useState({})
  const [showOtpField, setShowOtpField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [ref_id, setRefId] = useState(null)
  const [adharResData, setAdharResData] = useState(null)
  console.log(adharResData, 'adharResData')
  const [showPanVerification, setShowPanVerification] = useState(null)
  const [formData, setFormData] = useState({
    agentId: userData?.id,
    name: '',
    aadharNumber: '',
    panCardNumber: ''
  })
  const [files, setFiles] = useState({
    panCardPhoto: null,
    aadharFront: null,
    aadharBack: null
  })

  console.log(files, 'files')

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleFileUpload = (key, file) => {
    setFiles({ ...files, [key]: file })
  }

  const verifyPan = async () => {
    console.log('Pan verification')
    setLoading(true)
    const form = new FormData()
    form.append('pan_image', files.panCardPhoto)
    form.append('pan_number', formData.panCardNumber?.toUpperCase())

    try {
      const response = await client.post('/cashfree/verify-pan', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('Pan verification success', response)
      Alert.alert('Success', 'Pan Verified Successfully', [
        {
          text: 'Next',
          onPress: () =>
            props.navigation.navigate('additionalDetails', {
              adharResData: {
                ...adharResData,
                pan_verified: true,
                pan_number: formData.panCardNumber?.toUpperCase(),
                adhar_number: formData.aadharNumber
              }
            })
        }
      ])
    } catch (error) {
      console.error('Pan verification failed:', error)
      Alert.alert('Error', 'Failed to verify Pan')
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getUserdata()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const sendAdharOtp = async () => {
    setLoading(true)
    setShowOtpField(true)
    try {
      const form = new FormData()

      form.append('aadhar_number', formData.aadharNumber)
      form.append('adhar_front', files.aadharFront)
      form.append('adhar_back', files.aadharBack)

      const response = await client.post(
        '/cashfree/send-otp-verify-adhar',
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      setRefId(response.data.ref_id)
      console.log('Aadhar verification success', response)
    } catch (error) {
      console.error('Aadhar verification failed:', error)
      Alert.alert('Error', 'Failed to verify Aadhar')
      setShowOtpField(false)
    } finally {
      setLoading(false)
    }
  }

  const getUserdata = async () => {
    const data = await getCache('userData')
    setUserData(data?.user)
  }

  useEffect(() => {
    getUserdata()
  }, [userData?.user?.id])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Verification'} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && <Loader loading={loading} />}
        {/* <TagOfInput text="Personal Information" /> */}
        <View style={styles.aadharVerificationBorder}>
          <Text style={styles.borderText}>Aadhar Verification</Text>
          <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
            {files.aadharFront ? (
              <Pressable
                onPress={() => setFiles({ ...files, aadharFront: null })}
              >
                <Image
                  source={{ uri: files.aadharFront.uri }}
                  style={{
                    height: 200,
                    width: '100%',
                    borderRadius: 20,
                    borderColor: 'black',
                    borderWidth: 1
                  }}
                />
              </Pressable>
            ) : (
              <UploadDoc
                text={'Upload Aadhar Card Front'}
                setUploadFile={(source: any) =>
                  handleFileUpload('aadharFront', source)
                }
                backgroundType={'Aadhar-Card'}
                uploadDoc={true}
              />
            )}
            {/* </View> */}
          </View>
          <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
            {files.aadharBack ? (
              <Pressable
                onPress={() => setFiles({ ...files, aadharBack: null })}
              >
                <Image
                  source={{ uri: files.aadharBack.uri }}
                  style={{
                    height: 200,
                    width: '100%',
                    borderRadius: 20,
                    borderColor: 'black',
                    borderWidth: 1
                  }}
                />
              </Pressable>
            ) : (
              <UploadDoc
                text={'Upload Aadhar Card Back'}
                setUploadFile={(source: any) =>
                  handleFileUpload('aadharBack', source)
                }
                backgroundType={'Aadhar-Card'}
                uploadDoc={true}
              />
            )}
          </View>
          <InputText
            placeholder={'Enter Aadhar Number'}
            maxLength={12}
            keyboardType="numeric"
            value={formData.aadharNumber}
            onChangeText={(value) => formDataHandler('aadharNumber', value)}
            // editable={showOtpField}
          />

          {showOtpField ? (
            <View>
              <AadharVerifyOtp
                data={formData}
                setShowOtpField={setShowOtpField}
                setShowPanVerification={setShowPanVerification}
                setAdharResData={setAdharResData}
                ref_id={ref_id}
                sendAdharOtp={sendAdharOtp}
              />
            </View>
          ) : !showPanVerification ? (
            <View style={styles.getOtpButton}>
              <SecondaryButton title={'Get OTP'} onPress={sendAdharOtp} />
            </View>
          ) : null}
        </View>

        {showPanVerification && (
          <View style={styles.panVerificationBorder}>
            <Text style={styles.borderText}>Pan Verification</Text>
            <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
              {files.panCardPhoto ? (
                <Pressable
                  onPress={() => setFiles({ ...files, panCardPhoto: null })}
                >
                  <Image
                    source={{ uri: files.panCardPhoto.uri }}
                    style={{
                      height: 200,
                      width: '100%',
                      borderRadius: 20,
                      borderColor: 'black',
                      borderWidth: 1
                    }}
                  />
                </Pressable>
              ) : (
                <UploadDoc
                  text={'Upload Pan Card Image'}
                  setUploadFile={(source: any) =>
                    handleFileUpload('panCardPhoto', source)
                  }
                  backgroundType={'Pan-Card'}
                  uploadDoc={true}
                />
              )}
            </View>
            <InputText
              placeholder={'Enter PAN Number'}
              maxLength={10}
              value={formData.panCardNumber}
              onChangeText={(value) => formDataHandler('panCardNumber', value)}
            />
            <SecondaryButton title={'Verify'} onPress={verifyPan} />
          </View>
        )}
        {/* <View style={styles.nextButton}>
            <PrimaryBtn
              title={'Next'}
              onPress={() =>
                props.navigation.navigate('additionalDetails', {
                  adharResData: {
                    ...adharResData,
                    pan_verified: true,
                    pan_number: formData.panCardNumber?.toUpperCase(),
                    adhar_number: formData.aadharNumber
                  }
                })
              }
            />
          </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '90%',
    marginTop: 20
  },
  aadharVerificationBorder: {
    // position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000000', // Border color
    // Make sure the border is on top
    justifyContent: 'flex-start' // Align items to the top
  },
  borderText: {
    position: 'absolute',
    top: -12, // Position the text above the top border
    left: 20,
    backgroundColor: '#F3F3F3', // Background color to cover the border behind the text
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  panVerificationBorder: {
    // position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000000', // Border color
    // Make sure the border is on top
    justifyContent: 'flex-start' // Align items to the top
  },
  tabSection: {
    width: '50%'
  },
  activeState: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  activeContent: {
    color: '#000000'
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#CCCCCC'
  },
  text: {
    color: '#263238',
    margin: '5%',
    textAlign: 'center'
  },
  tabContent: {
    alignSelf: 'center',
    color: '#807C7C'
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  nextButton: {
    marginTop: 50
  }
  // nextButton: {
  //   justifyContent: 'flex-end',
  //   marginTop: 40
  // }
})

export default AadharAndPanVerification
