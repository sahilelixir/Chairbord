import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import OtpInputText from './OtpInputText'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { useNavigation } from '@react-navigation/native'
import SecondaryButton from '../../components/common/SecondaryButton'

interface adharVerifyInterface {
    setShowPanVerification: (value: boolean) => void
    verifyAadhar: any
    setShowOtpField: any,
    ref_id: string,
    setAdharResData: any,
    sendAdharOtp: any
}

const AadharVerifyOtp: React.FC<adharVerifyInterface> = ({ setShowPanVerification, verifyAadhar, setShowOtpField, ref_id, setAdharResData, sendAdharOtp }) => {
    const navigation: any = useNavigation()
    const [loading, setLoading] = useState(false)
    let sixStringArray = ['', '', '', '', '', '']
    const [otp, setOtp] = useState(sixStringArray)
    console.log('otp', otp)
    console.log('ref_id', ref_id)

    const verifyOtpApi = async () => {
        setLoading(true)
        const bodyData = {
            otp: otp.join(''),
            ref_id: ref_id
        }
        try {
            let response = await client.post('/cashfree/validate-otp-adhar', bodyData)
            console.log('response', response.data)
            setAdharResData(response.data)
            setShowPanVerification(true)
            verifyAadhar
            setShowOtpField(false)
            Alert.alert('Success', 'Aadhar Verified Successfully', [
                {
                  text: 'Ok',
                  onPress: () => console.log('OK Pressed')
                }
              ])
        } catch (error: any) {
            Alert.alert('Error', error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const resendOtp = () => {
        setOtp(['', '', '', '', '', '']) // Reset the OTP field
        sendAdharOtp() // Call the resend OTP function
    }
    return (
        <View>
            <View
                style={{
                    justifyContent: 'center',
                    // alignItems: 'center',
                    marginVertical: 10
                }}
            >
                {loading && <Loader loading={loading} />}
                <OtpInputText otp={otp} setOtp={setOtp} />
            </View>

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
                    onPress={resendOtp}
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
                            Resend
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ width: '45%' }}>
                    <SecondaryButton
                        title={'Verify'}
                        onPress={verifyOtpApi}
                    />
                </View>
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
export default AadharVerifyOtp
