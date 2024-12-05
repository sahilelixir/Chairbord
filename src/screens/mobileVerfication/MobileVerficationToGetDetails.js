import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import OverlayHeader from '../../component/OverlayHeader'
import { useNavigation } from '@react-navigation/native'
import InputText from '../../component/common/InputText'
import PrimaryBtn from '../../component/common/PrimaryBtn'

const MobileVerficationToGetDetails = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <OverlayHeader title={"Mobile Verification"} showBackButton={true} navigateTo={() => navigation.goBack()} />
            <View style={styles.container}>

                <InputText placeholder={'Enter mobile number'} secure={false} />
                <Text style={styles.errorText}>*Details not found
                    Invalid mobile number, tag serial number or bank name</Text>

                <View style={{ alignItems: "flex-end", paddingVertical: "4%" }}>
                    <View style={{ width: "60%" }}>
                        <PrimaryBtn title={"Get Details"} onPress={() => navigation.navigate("TagRegistration")} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },
    errorText: {
        padding: "2%",
        paddingHorizontal: "4%",
        color: "#FF0000"
    }
})

export default MobileVerficationToGetDetails