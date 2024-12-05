import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import OtpInputText from './OtpInputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { useNavigation, validatePathConfig } from '@react-navigation/native'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import showAlert from '../../utils/showAlert'

const OTP = (props) => {
  const userData = props.route.params?.VerificationFormData
  const otpType = props.route.params?.type
  const { sessionId: _sessionId } = props.route.params
  const [loading, setLoading] = useState(false)
  let sixStringArray = ['', '', '', '', '', '']
  const [otp, setOtp] = useState(sixStringArray)

  const verifyOtp = async () => {
    setLoading(true)
    try {
      const sessionId = await getCache('session')
      const response = await client.post('/bajaj/validateOtp', {
        otp: otp.join(''),
        sessionId: sessionId
      })
      console.log(response, "validate otp ress")
      if (otpType === 'tagReplacement') {
        return props.navigation.navigate('tagReplacementForm', {
          sessionId: _sessionId,
          response: response?.data?.validateOtpResp,
          customerId: response?.data?.customerId,
          userData: userData
        })
      }

      if (
        response?.data?.validateOtpResp?.custDetails?.walletStatus === 'Active'
      ) {
        navigation.navigate('imageGallary', {
          sessionId: sessionId,
          response: response?.data?.validateOtpResp,
          customerId: response?.data?.customerId,
          userData: userData
        })
      } else {
        navigation.navigate('customerRegistration', {
          otpData: response?.data,
          sessionId: sessionId,
          response: response?.data?.validateOtpResp,
          customerId: response?.data?.customerId,
          userData: userData
        })
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error codes or messages from the server
        if (error.response.status === 400 && error.response.data?.error) {
          showAlert(
            error.response.data.error.errorDesc || 'OTP Validation Failed',
            () => navigation.goBack()
          )
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View>
        <View style={styles.primaryImageContainer}>
          <Image source={require('../../assets/otpVerification.png')} />
        </View>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.OtpVerificationText}>OTP Verification</Text>
          <Text style={styles.otpDescription}>
            Enter the OTP sent to{' '}
            <Text style={{ color: '#000000' }}>{`+91${userData?.mobile || userData?.mobileNumber
              }`}</Text>
          </Text>

          <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
            <OtpInputText otp={otp} setOtp={setOtp} />
          </View>
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={styles.otpDescription}>
              Didn’t you recieve the OTP?
              <Text style={{ color: '#085AF8' }}> Resend OTP</Text>
            </Text>
            <PrimaryBtn
              title={'Verify'}
              disabled={loading}
              onPress={() => verifyOtp()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  primaryImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '10%'
  },
  OtpVerificationText: {
    color: '#000000',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: '4%'
  },
  otpDescription: {
    color: '#4D4D4DC4',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginBottom: 15
  }
})

export default OTP
