import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import OtpInputText from './OtpInputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { useNavigation } from '@react-navigation/native'
import InputText from '../../components/common/InputText'

const RegisterVerifyOtp = ({ data, setShowOtpField }: any) => {
    const navigation: any = useNavigation()
    let sixStringArray = ['', '', '', '', '', '']

    const [showGeneratePassword, setShowGeneratePassword] = useState(false)
    const [formData, setFormData] = useState({
        password: ''
    })
    const [otp, setOtp] = useState(sixStringArray)
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState()

    const formDataHandler = (key: any, value: any) => {
        setFormData({ ...formData, [key]: value })
    }

    const verifyOtpApi = async () => {
        setLoading(true)

        const bodyContent = JSON.stringify({
            email_id: data.email_id,
            otp: otp.join(''),
            mobile_number: data.mobile_number
        });

        console.log(bodyContent, "verify reg otp");
        try {
            let response = await client.post('/register/agent-otp', bodyContent)
            setShowGeneratePassword(true)
            setUserId(response?.data?.newUserId)
        } catch (error) {
            Alert.alert('Something went wrong')
            console.log(error, 'error')
            setShowOtpField(false)
        } finally {
            setLoading(false)
        }
    }

    const generatePassword = async () => {
        setLoading(true)

        const bodyContent = JSON.stringify({
            userId: userId,
            input_password: formData.password
        })

        console.log(bodyContent, "generate password req");

        try {
            const response = await client.post(
                '/register/agent-otp-password',
                bodyContent
            )
            console.log(response, "generate password res");
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
                            onChangeText={(value: string) => formDataHandler('password', value)}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: '10%' }}>
                        <SecondaryButton
                            title={'Verify Password'}
                            onPress={() => generatePassword()}

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
export default RegisterVerifyOtp
