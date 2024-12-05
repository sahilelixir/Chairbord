import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { FC, useState } from 'react'
import InputTextSbi from './InputTextSbi'
import { client } from '../../client/Axios'

interface mobileNoModalInterface {
    setMobileModalVisible: (visible: boolean) => void,
    mobileModalVisible: boolean,
    customerId?: string | number,
    regExecutiveId?: string | number,
    vehicleNumber?: string,
}

const MobileNumberModal: FC<mobileNoModalInterface> = ({ mobileModalVisible, setMobileModalVisible, customerId, regExecutiveId, vehicleNumber }) => {
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    // Handle mobile number submission
    const handleMobileSubmit = async () => {
        setLoading(true);
        try {
            const res = await client.post('/sbi/update-mobileNo', {
                mobileNumber: mobile,
                customerId: customerId,
                regExecutiveId: regExecutiveId
            });
            setMobileModalVisible(false);
            setMobile('');

            Alert.alert('Mobile Numebr Update Success', 'Mobile Number updated successfully', [{ text: 'OK' }], { cancelable: false });
            if (res.data.status === 200) {
                console.log('Mobile updated successfully');
            }
        } catch (error: any) {
            console.log('Error while updating mobile:', error);
            Alert.alert(error.response.data.message || 'Error while updating mobile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={mobileModalVisible}
            onRequestClose={() => setMobileModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo1} />
                        <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo2} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.modalText}>Please change Mobile Number</Text>
                        <Text style={styles.modalText}>{vehicleNumber}</Text>
                        <InputTextSbi maxLength={10} placeholder="Enter mobile number" value={mobile} onChangeText={setMobile} keyboardType='numeric' />
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity
                            onPress={() => setMobileModalVisible(false)}
                            // disabled={!pan}
                            style={styles.closeButtonContainer}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={handleMobileSubmit}
                            disabled={
                                mobile.length < 10
                            }
                            style={[styles.appButtonContainer, { backgroundColor: mobile.length >= 10 ? '#5ECD4C' : '#EFE6F7' }]}
                        >
                            <Text style={styles.appButtonText}>
                                {loading ? 'Updating...' : 'Submit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    // detailsContainer: {
    //     margin: 10,
    //     padding: 10,
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     elevation: 3,
    // },
    // headerText: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
    // inputContainer: {
    //     marginBottom: 15,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // icon: {
    //     width: 30,
    //     height: 30,
    //     marginRight: 10,
    // },
    // buttonContainer: {
    //     marginVertical: 20,
    //     alignItems: 'center',
    // },
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


export default MobileNumberModal