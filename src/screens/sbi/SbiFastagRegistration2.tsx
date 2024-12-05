import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import SelectFieldSbi from './SelectFieldSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';
import { client } from '../../client/Axios';
import useUserData from '../../hooks/useUserData';
import OtpModal from './OtpModal';
import { getSocket } from '../../utils/socket';
import Loader from '../../components/ui/Loader';

const SbiFastagRegistration2 = (props: any) => {

    const vehiclePropData = props.route.params?.vehicleDetails?.data
    console.log(vehiclePropData, "data")
    const reportPropsData = props.route.params?.reportsData
    const customerPropData = props.route.params?.customer
    const { userId } = useUserData();
    // State declarations
    const [pincode, setPincode] = useState('');
    const [chasisNumber, setChasisNumber] = useState(vehiclePropData.vehicle_chasi_number || '');
    const [ownername, setOwnerName] = useState(vehiclePropData.owner_name || '');
    const [engineNumber, setEngineNumber] = useState(vehiclePropData.vehicle_engine_number || '');
    const [vehicleNumber, setVehicleNumber] = useState(vehiclePropData.rc_number || '');
    const [selectedFuel, setSelectedFuel] = useState(vehiclePropData.fuel_type || null);
    const [selectedState, setSelectedState] = useState(vehiclePropData.registered_at || null);
    const [selectedTagsrno, setSelectedTagsrno] = useState<any>({});
    const [isDisabled, setIsDisabled] = useState(true);
    // models
    const [tagSerialNumber, setTagSerialNumber] = useState({})
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otpModalData, setOtpModalData] = useState({});
    const [loading, setLoading] = useState(false);

    // Dropdown data
    const fuelData = [
        { title: 'Petrol' },
        { title: 'CNG' },
        { title: 'Diesel' },
    ];

    const stateData = [
        { title: 'Delhi' },
        { title: 'Rajasthan' },
        { title: 'Mumbai' },
        { title: 'Kerala' },
    ];

    // Check if all fields are filled to enable/disable the button
    useEffect(() => {
        const allFieldsFilled = [
            pincode, chasisNumber, ownername, engineNumber, vehicleNumber,
            selectedFuel, selectedState, selectedTagsrno
        ].every(field => field !== '' && field !== null);
        setIsDisabled(!allFieldsFilled);
    }, [pincode, chasisNumber, ownername, engineNumber, vehicleNumber, selectedFuel, selectedState, selectedTagsrno]);



    const fetchSerialNumber = async (agentId: number) => {
        console.log(agentId, "called")
        try {
            const res = await client.get(`/inventory/fastag/agent/acknowledged-tags/${agentId}`, {
                params: {
                    serialNumber: true,
                    bankId: 2
                }
            });
            console.log(res.data.tags, "tag data")
            setTagSerialNumber(res?.data?.tags)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDetailsSubmit = async () => {
        setLoading(true);
        try {
            const data = {
                "pincode": pincode,
                "vehicleNo": vehicleNumber?.toUpperCase(),
                "chassisNo": chasisNumber?.toUpperCase(),
                "engineNo": engineNumber?.toUpperCase(),
                "ownerName": ownername?.toUpperCase(),
                "fuel_type": selectedFuel,
                "state_of_registration": selectedState,
                "tag_serial_number": selectedTagsrno.serialNumber,
                "tagreferenceId": selectedTagsrno.referenceId,
                "tagreferenceCode": selectedTagsrno.referenceCode,
                "reportId": reportPropsData.id,
                "customerId": customerPropData.id,
            }
            console.log(data, "<<-----body data")
            const res = await client.post('/sbi/create_vehicle_details', data)
            props.navigation.navigate('sbi3', {
                agentId: userId,
                vehicleData: vehiclePropData,
                customerData: customerPropData,
                serialNo: selectedTagsrno.serialNumber,
                reportData: reportPropsData
            })
            console.log(res, "response")
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchSerialNumber(userId);
        }
    }, [userId]);

    useEffect(() => {
        const socket = getSocket();
        console.log(socket, "socket")

        const handleOpenModal = (data: any) => {
            if (data && data.modalType === "OTP") {
                console.log("OTP Modal Triggered:", data.modalType);
                setOtpModalVisible(true)
                setOtpModalData(data.data)
            }
        };

        const handleIsReportApproved = (data: any) => {
            console.log(data, "report cancelled");
            props.navigation.navigate('sbi5', {
                data: data
            });
        };

        socket.on('isReportApproved', handleIsReportApproved);

        socket.on('openModal', handleOpenModal);

        return () => {
            socket.off('openModal', handleOpenModal);
        };
    }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration 2'} />
            {<Loader loading={loading} />}
            <View style={styles.detailsContainer}>
                <Text style={styles.headerText}>Description details</Text>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/location.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter pincode"} value={pincode} onChangeText={setPincode} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/vehicle.png')} style={styles.icon} />
                    <InputTextSbi
                        placeholder={"Enter vehicle number"}
                        value={vehicleNumber}
                        onChangeText={setVehicleNumber}
                        isEditable={!vehiclePropData.rc_number.toUpperCase()}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter chasis number"} value={chasisNumber} onChangeText={setChasisNumber} isEditable={!vehiclePropData.vehicle_chasi_number} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter engine number"} value={engineNumber} onChangeText={setEngineNumber} isEditable={!vehiclePropData.vehicle_engine_number} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter owner name"} value={ownername} onChangeText={setOwnerName} isEditable={!vehiclePropData.owner_name} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    {!vehiclePropData.fuel_type ? (
                        <SelectFieldSbi
                            dataToRender={fuelData}
                            title={'Fuel Type'}
                            selectedValue={setSelectedFuel}
                            borderColor={selectedFuel ? '#0A74DA' : '#D3D3D3'}
                            initialValue={selectedFuel} // Set initial value
                        />
                    ) : (
                        <InputTextSbi placeholder={"Fuel Type"} value={vehiclePropData.fuel_type} isEditable={!vehiclePropData.fuel_type} />
                    )}


                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    {!vehiclePropData.registered_at ? (
                        <SelectFieldSbi
                            dataToRender={stateData}
                            title={'State of Registration'}
                            selectedValue={setSelectedState}
                            borderColor={selectedState ? '#0A74DA' : '#D3D3D3'}
                        />
                    ) : (
                        <InputTextSbi placeholder={"State of registration"} value={vehiclePropData.registered_at} isEditable={!vehiclePropData.registered_at} onChangeText={(value: any) => setSelectedState(value)} />
                    )}

                </View>
                <View style={styles.selectContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    <SelectFieldSbi
                        dataToRender={tagSerialNumber}
                        title={'Tag Serial Number'}
                        selectedValue={setSelectedTagsrno}
                        borderColor={selectedTagsrno ? '#0A74DA' : '#D3D3D3'}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => handleDetailsSubmit()} disabled={false} />
            </View>

            <OtpModal
                otpModalVisible={otpModalVisible}
                setOtpModalVisible={setOtpModalVisible}
                data={otpModalData}
            />

            {/* <TouchableOpacity onPress={() => setOtpModalVisible(true)} style={{ margin: 20 }}>
                <Text style={{ color: '#0A74DA', textAlign: 'center' }}>Open Otp modal</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectContainer: {
        marginBottom: 15,
        marginRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '100%',
        alignItems: 'center',
    },
    appButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SbiFastagRegistration2;
