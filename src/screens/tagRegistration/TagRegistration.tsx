import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorData, npciVehicleClassIDData, commercialOptions, fuelData, stateData, isNationalPermitOptions, telanganaStateCode, vehicleTypeDropdown } from './staticData'
import OverlayHeader from '../../components/OverlayHeader'
import SecondaryButton from '../../components/common/SecondaryButton'
import SuccessModal from '../../components/SuccessModal'
import { horizontalScale, verticalScale } from '../../helper/Metrics'
import CustomInputText from '../../components/common/CustomInputText'
import SelectField from '../../components/common/SelectFieldBig'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import { getVehicleMakerList, getVehicleModelList } from '../../utils/vechileModalAndMaker'
import InputText from '../../components/common/InputText'
import showAlert from '../../utils/showAlert'


const TagRegistration = (props: any) => {
    const { custDetails, vrnDetails, sessionId } = props.route.params.response;
    const { CustomerRegData, otpData, userOtpData } = props.route.params;
    const [chassisNo, setChasisNo] = React.useState<any>("")
    const [engineNumber, setEngineNumber] = React.useState<any>(vrnDetails?.engineNo || "")
    const [userData, setUserData] = useState<any>()
    const [modalVisible, setModalVisible] = useState<null | boolean>(false)
    const [isModalSuccess, setIsModalSuccess] = useState<null | boolean>(null)
    const [vehicleManufacturer, setVehicleManufacturer] = useState("")
    const [vehicleModel, setVehicleModel] = useState([])
    const [vehicleColor, setVehicleColor] = useState(vrnDetails?.vehicleColour || "")
    const [tagSerialNumber1, setTagSerialNumber1] = useState("608268")
    const [tagSerialNumber2, setTagSerialNumber2] = useState("001")
    const [tagSerialNumber3, setTagSerialNumber3] = useState("")
    const [vehicleIscommercial, setVehicleIscommercial] = useState("")
    const [nationalpermit, setNationalPermit] = useState("")
    const [vehicleFuelType, setVehicleFuelType] = useState("")
    const [listOfMakers, setListOfMakers] = useState(["Toyota", "Honda", "Ford"])
    const [vehicleModelValue, setVehicleModelValue] = useState("")
    const [npciIdData, setNpciIdData] = useState(vrnDetails?.npciVehicleClassID || "")
    const [permitExpiryDate, setPermitExpiryDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [stateOfRegistration, setStateOfRegistration] = useState(vrnDetails?.stateOfRegistration)
    const [typeOfVehicle, setTypeOfVehicle] = useState(vrnDetails?.type)
    const [vehicleType, setVehicleType] = useState(vrnDetails?.vehicleType)
    const [errors, setErrors] = useState<any>({})
    const [stateCode, setStateCode] = useState("")

    const updatevehicleType = (value: string) => {
        if (value === 'LMV' && vrnDetails?.tagVehicleClassID === '4' && vehicleIscommercial === 'false') {
            setVehicleType('Motor Car')

        } else if (value === 'LMV' && vrnDetails?.tagVehicleClassID === '4' && vehicleIscommercial === 'true') {
            setVehicleType('Maxi Cab')
        }
    }

    const onVechileTypeSelect = (type: string) => {

        setTypeOfVehicle(type)
        if (vehicleIscommercial === "false" && type === "LPV") {
            setVehicleType("Maxi Cab")
        } if (vehicleIscommercial === "false" && type === "LGV") {
            setVehicleType("Goods Carrier")
        }
        if (vehicleIscommercial === "true" && type === "LPV") {
            setVehicleType("Maxi Cab")
        }
        if (vehicleIscommercial === "true" && type === "LGV") {
            setVehicleType("Goods Carrier")
        }
    }

    const dropdownOptions = listOfMakers?.map((manufacturer, index) => ({
        id: index + 1,
        title: manufacturer
    }));

    const vehicleModalDropdown = vehicleModel?.map((model, index) => ({
        id: index + 1,
        title: model
    }));

    const setValueOfVehcileModal = async (model: any) => {
        setVehicleModelValue(model?.title)
    }

    const setNpciIdDataDropdown = async (npciId: any) => {
        setNpciIdData(npciId?.value)
    }

    const setColorData = async (color: any) => {
        setVehicleColor(color?.title)
    }

    const successResponse = () => {
        setIsModalSuccess(true);
        setModalVisible(true);
    }

    const failureResponse = () => {
        setIsModalSuccess(false);
        setModalVisible(true);
    }

    const customerData = [
        {
            title: "Tag cost",
            value: `: ₹${vrnDetails?.tagCost}`
        },
        {
            title: "Security deposit",
            value: `: ₹${vrnDetails?.securityDeposit}`
        },
        {
            title: "Wallet balance",
            value: `: ₹${vrnDetails?.rechargeAmount}`
        },
        // {
        //     title: "First time load balance",
        //     value: `: ₹${vrnDetails?.rechargeAmount}`
        // },
        // {
        //     title: "Total cost",
        //     value: `: ₹${vrnDetails?.rechargeAmount}`
        // }
    ]

    const customerDetailsData = [
        {
            title: "Name",
            value: `: ${custDetails?.name || CustomerRegData?.name}`
        },
        {
            title: "Mobile Number",
            value: `: ${custDetails?.mobileNo || CustomerRegData?.mobileNo}`
        },
    ]

    // error validation
    const validateFields = () => {
        let newErrors: any = {};

        if (!vrnDetails?.chassisNo && !chassisNo) {
            newErrors.chassisNo = 'Chassis number is required';
        }

        if (!vrnDetails?.vehicleManuf && !vehicleManufacturer) {
            newErrors.vehicleManufacturer = 'Vehicle Manufacturer is required';
        }

        if (!vrnDetails?.model && !vehicleModelValue) {
            newErrors.vehicleModel = 'Vehicle Model is required';
        }

        if (!vrnDetails?.vehicleColour && !vehicleColor) {
            newErrors.vehicleColor = 'Vehicle Color is required';
        }

        if (!vrnDetails?.npciVehicleClassID && !npciIdData) {
            newErrors.npciIdData = 'NPCI Class is required';
        }

        if (!vrnDetails?.vehicleDescriptor && !vehicleFuelType) {
            newErrors.vehicleFuelType = 'Fuel Type is required';
        }

        if (!vrnDetails?.commercial && vehicleIscommercial === "") {
            newErrors.vehicleIscommercial = 'Is Commercial is required';
        }

        setErrors(newErrors);

        // Show alert if there are errors
        if (Object.keys(newErrors)?.length > 0) {
            showAlert('Please fill in all required fields');
            return false;
        }
        return true;
    }

    const registerFastagApi = async () => {
        if (!validateFields()) {
            return;
        }
        setLoading(true)
        if (vrnDetails?.type && vrnDetails?.tagVehicleClassID === '4') {
            updatevehicleType(vrnDetails?.type)
        }

        if (vrnDetails?.type && vrnDetails?.npciVehicleClassID === '20' && !vehicleType) {
            onVechileTypeSelect(vrnDetails?.type)
        }
        const dynamicDebitAmount = Number(vrnDetails?.rechargeAmount || 0) + Number(vrnDetails?.repTagCost) + Number(vrnDetails?.securityDeposit) + Number(vrnDetails?.tagCost)
        try {
            const bodyData = JSON.stringify({
                "regDetails": {
                    "sessionId": props.route.params?.sessionId
                },
                "agentId": Number(userData?.user?.id),
                "masterId": Number(userData?.user?.master_id) || "",
                "agentName": userData?.user?.name || CustomerRegData?.name || "",
                "vrnDetails": {
                    "vrn": vrnDetails?.vehicleNo || userOtpData?.vehicleNo?.toUpperCase(),
                    "chassis": vrnDetails?.chassisNo || chassisNo,
                    "engine": engineNumber || vrnDetails?.engineNo || "",
                    "vehicleManuf": vrnDetails?.vehicleManuf || vehicleManufacturer,
                    "model": vrnDetails?.model || vehicleModelValue,
                    "vehicleColour": vrnDetails?.vehicleColour || vehicleColor,
                    "type": typeOfVehicle,
                    "status": "Active",
                    "npciStatus": "Active",
                    "isCommercial": vehicleIscommercial,
                    "tagVehicleClassID": "4",
                    "npciVehicleClassID": npciIdData || "4",
                    "vehicleType": vehicleType,
                    "rechargeAmount": vrnDetails?.rechargeAmount,
                    "securityDeposit": vrnDetails?.securityDeposit,
                    "tagCost": vrnDetails?.tagCost,
                    "debitAmt": dynamicDebitAmount.toString(),
                    "vehicleDescriptor": vrnDetails?.vehicleDescriptor || vehicleFuelType,
                    "isNationalPermit": nationalpermit || vrnDetails?.isNationalPermit || "2",
                    "permitExpiryDate": permitExpiryDate || vrnDetails?.permitExpiryDate || "",
                    "stateOfRegistration": stateCode || vrnDetails?.stateOfRegistration || stateOfRegistration,
                },
                "custDetails": {
                    "name": custDetails?.name || CustomerRegData?.name,
                    "mobileNo": custDetails?.mobileNo,
                    "walletId": custDetails?.walletId,
                },
                "fasTagDetails": {
                    "serialNo": `${tagSerialNumber1}-${tagSerialNumber2}-${tagSerialNumber3}`,
                    "tid": "",
                    "udf1": Number(userData?.user?.id),
                    "udf2": "",
                    "udf3": "",
                    "udf4": "",
                    "udf5": ""
                }
            })
            const res = await client.post("/bajaj/registerFastag",
                bodyData
            )
            successResponse()
            console.log(res, "response")
        } catch (error: any) {
            console.log(error || 'Tag registration failed')
            // failureResponse()
            showAlert(error.response.data.error.msg || error.response.data.error.errorDesc || 'Tag registration failed',
                () => setLoading(false));
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        const userData = await getCache('userData')
        setUserData(userData)
    }
    const getMakerIfVahanFails = async () => {
        const response: any = await getVehicleMakerList(props.route.params?.sessionId)
        setListOfMakers(response?.vehicleMakerList)
    }

    const getTheVehicleModel = async (manufacturer: any) => {
        setVehicleManufacturer(manufacturer?.title)
        const response: any = await getVehicleModelList(props?.route?.params?.sessionId, manufacturer?.title)
        setVehicleModel(response?.vehicleModelList)
    }

    useEffect(() => {
        console.log("vahan failed", props.route.params?.sessionId)
        getMakerIfVahanFails();
    }, [sessionId, vrnDetails?.vehicleManuf, vrnDetails?.model])

    useEffect(() => {
        getUserData()
    }, [])

    const handleDateChange = (text: string) => {
        let cleaned = text.replace(/[^0-9]/g, '');
        if (cleaned?.length > 2) {
            cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        if (cleaned?.length > 5) {
            cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
        }
        if (cleaned?.length > 10) {
            cleaned = cleaned.slice(0, 10);
        }

        setPermitExpiryDate(cleaned);
    };


    return (
        <ScrollView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Registration"} />
            <View style={styles.container}>
                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
                <Text style={styles.label}>Customer details</Text>

                <View style={styles.dataDetailContainer}>
                    {customerDetailsData && customerDetailsData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.label}>Vehicle Details</Text>

                <CustomLabelText label={"Vehicle Number"} />
                <InputText placeholder={"Enter vehicle number"} value={vrnDetails?.vehicleNo || userOtpData?.vehicleNo?.toUpperCase()}
                    onChangeText={{}} isEditable={false}
                />

                <View style={{ marginTop: "5%" }}>
                    <CustomLabelText label={"Chasis Number"} />
                    {vrnDetails && vrnDetails?.chassisNo?.length > 2 ?
                        <InputText placeholder={"Enter Chasis number"} value={vrnDetails?.chassisNo}
                            isEditable={false}
                        /> : <CustomInputText placeholder={"Enter Chasis number"} value={chassisNo}
                            onChangeText={(text: string) => setChasisNo(text?.toUpperCase())} borderColor={chassisNo?.length < 2 ? "red" : "#263238"}
                        />}
                </View>
                <View style={{ marginTop: "5%" }}>
                    <CustomLabelText label={"Enter Engine number"} />
                    {vrnDetails && vrnDetails?.engineNo?.length > 2 ?
                        <InputText placeholder={"Engine number"} value={vrnDetails?.engineNo}
                            isEditable={false}
                        /> : <CustomInputText placeholder={"Enter Engine number"} value={engineNumber}
                            onChangeText={(text: string) => setEngineNumber(text?.toUpperCase())} borderColor={engineNumber?.length < 2 ? "red" : "#263238"}
                        />}
                </View>
                <>
                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Manufacturer"} />
                        {vrnDetails && vrnDetails?.vehicleManuf?.length > 2 && vrnDetails?.model?.length > 2 ?
                            <CustomInputText
                                placeholder={"Vehicle Manufacturer"}
                                value={vrnDetails?.vehicleManuf}
                                onChangeText={(text: string) => setVehicleManufacturer(text)}
                                isEditable={false}
                            />
                            : <SelectField dataToRender={dropdownOptions} title={'Select Vehicle Manufacturer'} selectedValue={getTheVehicleModel} borderColor={!vehicleManufacturer ? "red" : "black"} />}
                    </View>

                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Model"} />
                        {vrnDetails && vrnDetails?.model?.length > 2 ? <CustomInputText
                            placeholder={"Vehicle Model"}
                            value={vrnDetails?.model}
                            onChangeText={(text: string) => setVehicleModelValue(text)}
                            isEditable={false}
                        /> : <SelectField dataToRender={vehicleModalDropdown} title={'Select Vehicle Model'} selectedValue={setValueOfVehcileModal} borderColor={!vehicleModelValue ? "red" : "black"} />}
                    </View>

                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Color"} />
                        {vrnDetails && vrnDetails?.vehicleColour?.length > 2 ? <CustomInputText
                            placeholder={"Vehicle Color"}
                            value={vrnDetails?.vehicleColour}
                            onChangeText={(text: string) => setVehicleColor(text)}
                            isEditable={false}
                        /> : <SelectField dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={setColorData} borderColor={!vrnDetails?.vehicleColour && !vehicleColor ? "red" : "black"} />}
                    </View>

                    {vrnDetails && vrnDetails?.npciVehicleClassID ? <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"NPCI Vehicle Class ID"} />
                        <CustomInputText placeholder={"NPCI Vehicle Class ID"} value={vrnDetails?.npciVehicleClassID} isEditable={false} />
                    </View> :
                        <View style={{ marginTop: "5%" }}>
                            <CustomLabelText label={"NPCI Class"} />
                            <SelectField dataToRender={npciVehicleClassIDData} title={'NPCI vehicle class'} selectedValue={setNpciIdDataDropdown} borderColor={!npciIdData ? "red" : "black"} />
                        </View>
                    }

                </>

                <Text style={styles.label}>Tag serial number</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <View style={{ flex: 1, marginVertical: "5%" }}>
                        <CustomInputText placeholder={''} value='608268' onChangeText={(text: string) => setTagSerialNumber1(text)} isEditable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={''} value='001' onChangeText={(text: string) => setTagSerialNumber2(text)} isEditable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={''} value={tagSerialNumber3} onChangeText={(text: string) => setTagSerialNumber3(text)} borderColor={tagSerialNumber3?.length < 2 ? "red" : "#263238"} keyboardType={"numeric"} />
                    </View>
                </View>

                <View style={{ marginBottom: "5%" }}>
                    {vrnDetails && vrnDetails?.type && vrnDetails?.tagVehicleClassID === '4' ? <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Type"} />
                        <CustomInputText placeholder={"Vehicle Type"} value={vrnDetails?.type} isEditable={false} />
                    </View> :
                        <View style={{ marginTop: "5%" }}>
                            <CustomLabelText label={"Vehicle Type"} />
                            <SelectField dataToRender={vehicleTypeDropdown} title={'Select Vehicle Type'} selectedValue={(value) => onVechileTypeSelect(value.value)} borderColor={!vehicleFuelType ? "red" : "black"} />
                        </View>
                    }
                </View>

                <View style={{ marginBottom: "5%" }}>
                    <CustomLabelText label={"Is Commercial"} />
                    <SelectField
                        dataToRender={commercialOptions} title={'Select isCommercial'} selectedValue={(value) => setVehicleIscommercial(value.value)} borderColor={!vehicleIscommercial ? "red" : "black"} />
                </View>
                {vehicleIscommercial === "true" && <View style={{ marginBottom: "5%" }}>
                    <CustomLabelText label={"Is National Permit"} />
                    <SelectField
                        dataToRender={isNationalPermitOptions} title={'Select National Permit'} selectedValue={(value) => setNationalPermit(value.value)} borderColor={!nationalpermit ? "red" : "black"} />
                </View>}

                {vehicleIscommercial === "true" && nationalpermit === "1" && <View>
                    <CustomLabelText label={"Enter Permit Expiry of Vehicle"} />
                    <CustomInputText
                        placeholder='DD-MM-YYYY'
                        placeholderTextColor='#263238'
                        style={styles.dateInput}
                        value={permitExpiryDate}
                        onChangeText={(text: string) => handleDateChange(text)}
                        keyboardType='numeric'
                        maxLength={10}
                        borderColor={permitExpiryDate?.length < 2 ? "red" : "#263238"}
                    />
                </View>}

                <View style={{ marginVertical: "5%" }}>
                    <CustomLabelText label={"Fuel Type"} />
                    {
                        vrnDetails && vrnDetails?.vehicleDescriptor ? <CustomInputText placeholder={'Enter fuel type'} value={vrnDetails?.vehicleDescriptor} isEditable={false} /> : <SelectField
                            dataToRender={fuelData} title={'Select fuel type'} selectedValue={(value) => setVehicleFuelType(value.title)}
                            borderColor={!vehicleFuelType ? "red" : "black"}
                        />
                    }
                </View>

                {
                    vrnDetails && !vrnDetails?.stateOfRegistration && <View style={{ marginVertical: "5%" }}>
                        <CustomLabelText label={"State of Registration"} />
                        <SelectField
                            dataToRender={stateData} title={'Select Vehicle State'} selectedValue={(value: any) => setStateOfRegistration(value.code)} borderColor={!stateOfRegistration ? "red" : "black"} />
                    </View>

                }
                {
                    stateOfRegistration === 'TELANGANA' && <View style={{ marginVertical: "5%" }}>
                        <CustomLabelText label={"Select State Code"} />
                        <SelectField
                            dataToRender={telanganaStateCode} title={'Select Vehicle State'} selectedValue={(value: any) => setStateCode(value.code)} borderColor={!stateCode ? "red" : "black"} />
                    </View>
                }

                <View style={styles.dataDetailContainer}>
                    {customerData && customerData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>



                <View style={{ marginTop: 20, justifyContent: "center" }}>
                    <SecondaryButton
                        title={"Submit"}
                        onPress={() => {
                            registerFastagApi()
                        }}
                    />

                </View>


            </View>
            <SuccessModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false)
                    setIsModalSuccess(null)
                }}
                isSuccess={isModalSuccess}
            />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
    },
    label: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 19,
        color: "#000000",
        marginVertical: "4%"
    },
    dataDetailContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        borderRadius: 20,
        padding: "5%"
    },
    customerDetailsValueText: {
        color: "#000000",
        width: "55%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerValueText: {
        color: "#000000",
        width: "45%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },

    dateInput: {
        borderColor: '#263238',
        borderWidth: 1,
        color: '#000000',
        width: '100%',
        fontSize: 16,
        borderRadius: 20,
        height: 60,
        paddingHorizontal: '5%',
        backgroundColor: '#F3F3F3',
        textAlign: 'center'
    },
    customerDetailsTitleText: {
        color: "grey",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1%"
    },
    uploadDocContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(163),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadVehicle: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(333),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadText: {
        textAlign: "center",
        color: "#263238",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    imagePlaceholderText: {
        color: '#7f7f7f',
    },
})
export default TagRegistration;


const CustomLabelText = ({ label = "label" }) => {
    return (
        <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>{label}</Text>
    )
}
