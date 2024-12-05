import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import OverlayHeader from '../../component/OverlayHeader'
import { useNavigation } from '@react-navigation/native'
import SelectField from '../../component/common/SelectField'
import InputText from '../../component/common/InputText'
import SecondaryButton from '../../component/common/SecondaryButton'
import Divider from '../../component/common/Divider'
import CustomerDetailsCard from '../../component/CustomerDetailsCard'
import SuccessModal from '../../component/SuccessModal'
const customerDetailsData = [
    {
        title: "Customer ID",
        value: ":  607469-004-0089589"
    },
    {
        title: "Customer name",
        value: ":  Radhey Shyam Kumawat"
    },
    {
        title: "Mobile no.",
        value: ":  9269666646"
    },
    {
        title: "Wallet balance",
        value: ":  ₹23.00"
    },
    {
        title: "Max Top up limit",
        value: ":  ₹97884.00"
    },
]

const FASTagRecharge = () => {
    const [showCustomerDetailSection, setShowCustomerDetailSection] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation()
    const requestTypeDropdownData = [
        { title: 'Aadhar card' },
        { title: 'Pan Card' },
        { title: 'Passport' },
        { title: 'Votar Id' }
    ]
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <OverlayHeader title={"FASTag Recharge"} navigateTo={() => navigation.()} />
                <View style={styles.container}>
                    <Text style={styles.label}>Input type</Text>
                    <SelectField dataToRender={requestTypeDropdownData} title={"Mobile number"} />
                    <InputText placeholder={"Enter mobile number"} />

                    {/* error message */}
                    <Text style={styles.errorText}>*Details not found</Text>

                    <View style={{ alignItems: "center", marginVertical: "5%" }} >
                        <View style={{ width: "40%" }}>
                            <SecondaryButton title={"Submit"} onPress={() => setShowCustomerDetailSection(true)} />
                        </View>
                    </View>

                    {/* divider */}
                    <Divider />

                    {/* Customer Detail section */}
                    {showCustomerDetailSection && (
                        <View style={styles.customerSectionContainer}>

                            <CustomerDetailsCard customerDetailsData={customerDetailsData} />
                            <Text style={styles.label}>Amount</Text>
                            <InputText placeholder={"Enter recharge amount"} />

                            {/* error message */}
                            <Text style={styles.errorText}>*Insufficient fund in agent wallet
                                please recharge your wallet first</Text>
                            <View style={{ marginTop: "6%" }}>
                                <SecondaryButton title={"Submit"} onPress={() => setShowModal(true)} />
                            </View>
                        </View>
                    )}

                    <SuccessModal visible={showModal} title={"Tag recharged successfully"} />
                </View>
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },
    label: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: "#000000",
        marginTop: "5%",
        marginBottom: "3%"
    },
    errorText: {
        padding: "2%",
        paddingHorizontal: "4%",
        color: "#FF0000",
        width: "70%"
    },
    customerSectionContainer: {
        paddingVertical: "5%"
    },

})

export default FASTagRecharge