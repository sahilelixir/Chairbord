import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import InputTextSbi from './InputTextSbi';
import { client } from '../../client/Axios';

const OtpModal = ({ otpModalVisible, setOtpModalVisible, data, vehicleNumber }: any) => {
    const reportId = data?.id
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const checkOtpLength = otp.length <= 5;
    // Handle OTP submission
    const handleOtpSubmit = async () => {
        setLoading(true);
        if (otp.length < 6) {
            Alert.alert('Invalid OTP', 'Please enter 6 digit OTP', [{ text: 'OK' }], { cancelable: false });
            return
        }

        try {
            const bodyData = {
                otp,
                reportId
            }
            console.log(bodyData, "otp body data")
            const res = await client.post('/sbi/submit-otp-to-otp-executive', bodyData);
            console.log(res, "otp response")

            Alert.alert('OTP Sent', 'OTP has been Sent successfully', [{ text: 'OK' }], { cancelable: false });
            setOtpModalVisible(false)
            setOtp('')
        } catch (error: any) {
            Alert.alert('Error', error.response.data.message || 'Something went wrong', [{ text: 'OK' }], { cancelable: false });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={otpModalVisible}
            onRequestClose={() => setOtpModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo1} />
                        <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo2} />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.modalText}>Please Insert Customer OTP</Text>
                        <Text style={styles.modalText}>{vehicleNumber || data?.customerDetail?.vehicleNumber}</Text>
                        <InputTextSbi placeholder="Enter OTP" keyboardType="numeric" value={otp} onChangeText={setOtp} maxLength={6} />
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity
                            onPress={() => setOtpModalVisible(false)}
                            // disabled={!pan}
                            style={styles.closeButtonContainer}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={handleOtpSubmit}
                            disabled={checkOtpLength || loading}
                            style={[styles.appButtonContainer, { backgroundColor: !checkOtpLength ? '#5ECD4C' : '#EFE6F7' }]}
                        >
                            <Text style={styles.appButtonText}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        margin: 20,
        // backgroundColor: 'white',
        backgroundColor: '#5F259E',
        borderRadius: 20,
        padding: 20,
        // alignItems: 'center',
        elevation: 5,
    },
    logoContainer: {
        // backgroundColor:"red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        // marginBottom: 20,
    },
    logo1: {
        width: 120,
        height: 40,
        // marginHorizontal: 10,
    },
    logo2: {
        width: 50,
        height: 50,
        // marginHorizontal: 10,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginVertical: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalText: {
        backgroundColor: '#5F259E',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        color: 'white',
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        gap: 22,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        // paddingHorizontal: 20,
        width: '46%',
        alignItems: 'center',
    },
    appButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButtonContainer: {
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '46%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default OtpModal