import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import OtpInputText from './OtpInputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { useNavigation } from '@react-navigation/native'
import InputText from '../../components/common/InputText'
import { setCache } from '../../helper/Storage'
import showAlert from '../../utils/showAlert'

const VerifyOTP = ({ data, setShowOtpField }) => {
  const navigation = useNavigation()
  let sixStringArray = ['', '', '', '', '', '']

  const [showGeneratePassword, setShowGeneratePassword] = useState(false)
  const [formData, setFormData] = useState({
    password: ''
  })
  const [otp, setOtp] = useState(sixStringArray)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState()

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const verifyOtpApi = async () => {
    setLoading(true)

    const bodyContent = JSON.stringify({
      phoneNumber: data.phoneNumber,
      otp: otp.join('')
    })
    try {
      let response = await client.post('/login/agent-otp', bodyContent)
      console.log(response, 'otp response')
      await setCache('token', response?.data?.token)
      await setCache('userData', response?.data)
      navigation.navigate('drawer')
    } catch (error) {
      showAlert(error.response.data.error.errorDesc || 'OTP Validation Failed')
      // Alert.alert('Something went wrong')
      console.log(JSON.stringify(error.response.data), 'otp error')
      setShowOtpField(false)
    } finally {
      setLoading(false)
    }
  }

  const generatePassword = async () => {
    setLoading(true)

    let bodyContent = JSON.stringify({
      userId: userId,
      input_password: formData.password
    })

    try {
      let response = await client.post(
        '/register/agent-otp-password',
        bodyContent
      )
      navigation.navigate('SignIn')
    } catch (error) {
      Alert.alert('Something went wrong')
      console.log(error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%'
        }}
      >
        {loading && <Loader loading={loading} />}
        <OtpInputText otp={otp} setOtp={setOtp} />
      </View>

      {showGeneratePassword && (
        <>
          <View style={{ marginTop: '5%' }}>
            <InputText
              id={'password'}
              placeholder={'Enter password'}
              onChangeText={(value) => formDataHandler('password', value)}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: '10%' }}>
            <SecondaryButton
              title={'Verify Password'}
              onPress={() => {
                generatePassword()
              }}
            />
          </View>
        </>
      )}

      {!showGeneratePassword && (
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <SecondaryButton
            title={'Verify OTP'}
            onPress={() => {
              verifyOtpApi()
            }}
          />
        </View>
      )}

      <View style={{ alignSelf: 'center', marginTop: '5%' }}>
        <Text style={styles.otpDescription}>
          Didn’t you recieve the OTP?
          <Text style={{ color: '#085AF8' }}> Resend OTP</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  otpDescription: {
    color: '#4D4D4DC4',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter',
    fontWeight: '400'
  }
})

export default VerifyOTP
