import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import NextButton from './NextButton';
import MobileNumberModal from './MobileNumberModal';
import PanModal from './PanModal';
import OtpModal from './OtpModal';
import { getSocket } from '../../utils/socket';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

const SbiProcessing = (props: any) => {
    const [pancardModal, setPancardModal] = useState(false);
    const [mobileNumberUpdateModal, setMobileNumberUpdateModal] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [data, setData] = useState<any>(null);
    const [reportApprovalStatus, setReportApprovalStatus] = useState<boolean>(false);

    const vehicleNumber = data?.customerDetail?.vehicleNumber;

    useEffect(() => {
        const socket = getSocket();

        const handleOpenModal = (data: any) => {
            if (data && data.modalType === "OTP") {
                setData(data.data);
                setOtpModal(true);
            } else if (data && data.modalType === "PAN") {
                setData(data.data);
                setPancardModal(true);
            } else if (data && data.modalType === "MOBILE") {
                setData(data.data);
                setMobileNumberUpdateModal(true);
            }
        };

        socket.on('openModal', handleOpenModal);
        const handleIsReportApproved = (data: any) => {
            console.log(data, "report cancelled");
            props.navigation.navigate('sbi5', {
                data: data
            });
        };

        socket.on('isReportApproved', handleIsReportApproved);

        return () => {
            socket.off('openModal', handleOpenModal);
            socket.off('isReportApproved', handleIsReportApproved)
        };
    }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30 }} />
                    <Image source={require('../../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40 }} />
                </View>
                <View style={styles.container1}>
                    <View style={styles.waitmsgTextContainer}>
                        <Text style={styles.Textwait}>Please wait!</Text>
                    </View>
                    <View style={styles.processmsgTextContainer}>
                        <Text style={styles.Textprocess}>Please completing soon!!</Text>
                    </View>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.Textcontainer2}>Usually it takes 5 to 7 minutes!!</Text>
                </View>
            </View>
            <Text style={{ textAlign: 'center', color: 'black', fontSize: 16, fontWeight: '600' }}>Get...Set...Go...</Text>

            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi5')} disabled={!reportApprovalStatus} />
            </View>

            <MobileNumberModal
                mobileModalVisible={mobileNumberUpdateModal}
                setMobileModalVisible={setMobileNumberUpdateModal}
                customerId={data?.customerDetail?.id}
                regExecutiveId={data?.registrationExecutive}
                vehicleNumber={vehicleNumber}
            />
            <PanModal
                panModalVisible={pancardModal}
                setPanModalVisible={setPancardModal}
                customerId={data?.customerDetail?.id}
                regExecutiveId={data?.registrationExecutive}
                vehicleNumber={vehicleNumber}
            />
            <OtpModal
                otpModalVisible={otpModal}
                setOtpModalVisible={setOtpModal}
                data={data}
                vehicleNumber={vehicleNumber}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#5F259E',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        elevation: 8,
        borderRadius: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    container1: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    waitmsgTextContainer: {
        backgroundColor: '#5F259E',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    processmsgTextContainer: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 10,
    },
    container2: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    Textcontainer2: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    Textwait: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    Textprocess: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
});

export default SbiProcessing;
