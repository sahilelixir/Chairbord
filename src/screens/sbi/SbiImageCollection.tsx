import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';
import { client } from '../../client/Axios';
import showAlert from '../../utils/showAlert';
import OtpModal from './OtpModal';
import { getSocket } from '../../utils/socket';
import Loader from '../../components/ui/Loader';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

const SbiImageCollection = (props: any) => {
    const customerData = props.route.params?.customerData
    const serialNo = props.route.params?.serialNo
    const vehicledata = props.route.params?.vehicleData;
    const reportPropData = props.route.params?.reportData

    console.log(customerData, serialNo, reportPropData.id, "<-----params data")
    const [rcFront, setRcFront] = useState(null);
    const [rcBack, setRcBack] = useState(null);
    const [vehicleFront, setVehicleFront] = useState(null);
    const [vehicleSide, setVehicleSide] = useState(null);
    const [tagImage, setTagImage] = useState(null);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpModalData, setOtpModalData] = useState({});

    const renderImagePreview = (imageData: any, clearImage: any) => (
        imageData ? (
            <TouchableOpacity onPress={clearImage}>
                <Image
                    source={{ uri: imageData.uri }}
                    style={styles.previewImage}
                />
            </TouchableOpacity>
        ) : null
    );

    // Determine if all images are uploaded
    const allImagesAreFilled = rcFront && rcBack && vehicleFront && vehicleSide && tagImage;

    const handleUploadDoc = async () => {
        setLoading(true);
        if (!allImagesAreFilled) {
            showAlert('Please upload all images');
            return;
        }
        // Create a new FormData instance
        const formData = new FormData();
        // Append each image to formData with appropriate keys
        formData.append('rc_front', rcFront);
        formData.append('rc_back', rcBack);
        formData.append('vehicle_front', vehicleFront);
        formData.append('vehicle_back', vehicleSide);
        formData.append('tag_image', tagImage);
        formData.append('vehicleId', vehicledata.rc_number);
        formData.append('customerId', customerData.id);
        formData.append('serialNo', serialNo)
        formData.append('reportId', reportPropData.id)

        console.log(formData, "formdata")
        try {
            const uploadDocRes = await client.post('/sbi/upload-docs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(uploadDocRes, "updaload doc res")
            props.navigation.navigate('sbi4', {
                customerData: customerData,
                serialNo: serialNo,
                vehicledata: vehicledata,
                reportPropData: reportPropData,
                uploadDocRes: uploadDocRes
            })
        } catch (error: any) {
            console.log(error)
            showAlert(error.response.data.message || error.response.data?.error || 'Tag registration failed');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const socket = getSocket();

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
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />
            {<Loader loading={loading} />}
            <View style={styles.detailsContainer}>
                <Text style={styles.headerText}>Description details</Text>

                {/* RC Front and Back Upload with Preview */}
                <View style={styles.row}>
                    <View style={styles.uploadBox}>
                        {!rcFront ? (
                            <UploadDoc uploadDoc={true} text={'Upload RC Front'} backgroundType={"RC"} setUploadFile={setRcFront} />
                        ) : renderImagePreview(rcFront, () => setRcFront(null))}
                    </View>
                    <View style={styles.uploadBox}>
                        {!rcBack ? (
                            <UploadDoc uploadDoc={true} text={'Upload RC Back'} backgroundType={"RC"} setUploadFile={setRcBack} />
                        ) : renderImagePreview(rcBack, () => setRcBack(null))}
                    </View>
                </View>

                {/* Vehicle Front and Side Upload with Preview */}
                <View style={styles.row}>
                    <View style={styles.uploadBox}>
                        {!vehicleFront ? (
                            <UploadDoc uploadDoc={true} text={'Upload Vehicle Front'} backgroundType={"Vehicle-Front"} setUploadFile={setVehicleFront} />
                        ) : renderImagePreview(vehicleFront, () => setVehicleFront(null))}
                    </View>
                    <View style={styles.uploadBox}>
                        {!vehicleSide ? (
                            <UploadDoc uploadDoc={true} text={'Upload Vehicle Side'} backgroundType={"Vehicle-Side"} setUploadFile={setVehicleSide} />
                        ) : renderImagePreview(vehicleSide, () => setVehicleSide(null))}
                    </View>
                </View>

                {/* FASTag Upload with Preview */}
                <View style={styles.uploadContainer}>
                    {!tagImage ? (
                        <UploadDoc uploadDoc={true} text={'Upload Tag Image'} backgroundType={"FASTAG"} setUploadFile={setTagImage} />
                    ) : renderImagePreview(tagImage, () => setTagImage(null))}
                </View>
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} disabled={!allImagesAreFilled} onPress={() => handleUploadDoc()} />
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
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
    },
    headerText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    uploadBox: {
        height: isSmallScreen ? 150 : 160,
        width: isSmallScreen ? 150 : 160,
    },
    previewImage: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    uploadContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 0,
        marginVertical: 15,
        borderRadius: 20,
        height: 170,
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
});

export default SbiImageCollection;
