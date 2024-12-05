import { View, Text, SafeAreaView, StyleSheet, Alert, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import InputText from '../../components/common/InputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { client } from '../../client/Axios'
import { getCache, setCache } from '../../helper/Storage'
import { getSocket } from '../../utils/socket'
import showAlert from '../../utils/showAlert'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width < 400;

const Mobileverification = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>()
  const [VerificationFormData, setVerificationFormData] = useState({
    mobile: '',
    vehicleNo: '',
    engineNo: ''
  })

  const formHandler = (key: string, value: string) => {
    setVerificationFormData({ ...VerificationFormData, [key]: value })
  }

  const sendOTP = async () => {
    setLoading(true)
    try {
      let res = await client.post('/bajaj/sendOtp', {
        requestId: '',
        channel: '',
        agentId: userData?.user?.id,
        vehicleNo: VerificationFormData.vehicleNo?.toUpperCase(),
        chassisNo: '',
        engineNo: VerificationFormData.engineNo?.toUpperCase(),
        mobileNo: VerificationFormData.mobile,
        reqType: 'REG',
        resend: 0,
        isChassis: 0,
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: '',
      })

      await setCache('session', res?.data?.validateCustResp?.sessionId)
      props.navigation.navigate("OTP", {
        otpData: res.data,
        sessionId: res?.data?.validateCustResp?.sessionId,
        VerificationFormData: VerificationFormData,
      })
      console.log(res, "otp response")
    } catch (error: any) {
      showAlert(error.response.data.message, () => {
        props.navigation.navigate("topupWallet")
      })
      console.log(error.response.data.message, "<-----error")
      console.log(JSON.stringify(error), "error")
    } finally {
      setLoading(false)
    }
  }



  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const socket = getSocket();
  console.log(socket, "socket")

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Mobile Verification'}
        showBackButton={true}
      />
      <View style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <InputText
          placeholder={'Enter mobile number'}
          secure={false}
          value={VerificationFormData.mobile}
          onChangeText={(txt: string) => formHandler('mobile', txt)}
          keyboardType={'numeric'}
        />
        <InputText
          placeholder={'Enter Vehicle Number'}
          secure={false}
          value={VerificationFormData.vehicleNo}
          onChangeText={(txt: string) => formHandler('vehicleNo', txt)}
        />
        <InputText
          placeholder={'Enter last 5 digit engine number'}
          secure={false}
          value={VerificationFormData.engineNo}
          onChangeText={(txt: string) => formHandler('engineNo', txt)}
          maxLength={5}
          keyboardType={'default'}
        />
        {/* <Text style={styles.errorText}>
          *Details not found Invalid mobile number, tag serial number or bank
          name
        </Text> */}
        <View style={styles.bottomContainer}>
          <PrimaryBtn
            title={'Sent OTP'}
            onPress={sendOTP}
            disabled={VerificationFormData?.mobile?.length < 10 || VerificationFormData?.vehicleNo?.length < 7 || VerificationFormData?.engineNo?.length < 5}
          />
        </View>

      </View>
      {/* <View style={styles.bottomContainer}>
          <PrimaryBtn
            title={'Sent OTP'}
            onPress={sendOTP}
            disabled={VerificationFormData?.mobile?.length < 10 || VerificationFormData?.vehicleNo?.length < 7 || VerificationFormData?.engineNo?.length < 5}
          />
        </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  errorText: {
    paddingHorizontal: '2%',
    color: '#FF0000'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    // padding: "5%",
    height: isSmallScreen ? "50%" : "60%",

  },
})

export default Mobileverification
