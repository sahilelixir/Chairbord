import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import RegisterVerifyOtp from '../opt/RegisterVerifyOtp'
import showAlert from '../../utils/showAlert'

const Register = () => {
  const [showOtpField, setShowOtpField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    input_password: '',
    email_id: '',
    mobile_number: ''
  })

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const sendOtpRequest = async () => {
    setLoading(true)
    setShowOtpField(true)
    let bodyContent = JSON.stringify({
      email_id: formData.email_id,
      mobile_number: formData.mobile_number
    })

    try {
      let response = await client.post('/register/agent', bodyContent)
      console.log(response, 'response with register')
    } catch (error) {
      showAlert(error.response.data.error || 'User registration failed')
      console.log(error, 'error')
      setShowOtpField(false)
    } finally {
      setLoading(false)
    }
  }

  const getHomeApi = async () => {
    setLoading(true)

    try {
      let response = await client.get('/home')
      console.log(response.data, 'response with home')
    } catch (error) {
      Alert.alert('Something went wrong')
      console.log(error, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getHomeApi()
  }, [])

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Register'}
        showBackButton={true}
        navigateTo={'SignIn'}
      />
      {loading && <Loader loading={loading} />}
      <View style={styles.container}>
        <InputText
          value={formData.email_id}
          id={'email_id'}
          placeholder={'Enter email id'}
          onChangeText={(value) => formDataHandler('email_id', value)}
          editable={!showOtpField}
        />
        <InputText
          value={formData.mobile_number}
          id={'mobile_number'}
          placeholder={'Enter mobile number'}
          onChangeText={(value) => formDataHandler('mobile_number', value)}
          maxLength={10}
          editable={!showOtpField}
        />
        {showOtpField ? (
          <RegisterVerifyOtp
            data={formData}
            setShowOtpField={setShowOtpField}
          />
        ) : (
          <View style={styles.getOtpButton}>
            <SecondaryButton title={'Get OTP'} onPress={sendOtpRequest} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '5%'
  },
  getOtpButton: {
    marginTop: '10%'
  }
})

export default Register
