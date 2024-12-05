import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import Accordions from '../../components/common/Accrodians';
import { useNavigation } from '@react-navigation/native'

const privacyPolicyData = [
    {
        title: "Introduction",
        content: `Please read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). This Platform is a medium through which Services of Platform Owner shall be streamed directly to its Platform Users via App or Website. This App and the Website shall be together referred to as the “Platform”. By using this Platform, the Platform Users of the Website or App, hereinafter referred to as "User" or "you" or "your" or "yourself" “registered user” or “guest user” signify in your agreement to be bound by these Terms & Conditions("Agreement"). The information if any collected through this Platform will be secured, safeguarded and shall be utilised for providing better and appropriate services to you and for lawful usage and purpose.We process information relating to an identified or identifiable natural person in accordance with this Privacy Policy and in compliance with the relevant data protection regulation and laws. This Policy provides the necessary information regarding right and obligations for concerned parties, and explains how, why and when we process such information.`
    },
    {
        title: "Note",
        content: `Note read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Legal basis for processing of...",
        content: `Legal basis for processing of... read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Disclosure to third parties",
        content: `Disclosure to third parties read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Data protection",
        content: `Data protection read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Governing law and Dispute...",
        content: `Governing law and Dispute... read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Amendment",
        content: `Amendment read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Data access",
        content: `Data access read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Contact us",
        content: `Contact us read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Grievance Redressal",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
]

const PrivacyPolicy = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <OverlayHeader title={"Privacy Policy"}  />
            <ScrollView style={{ padding: "5%", marginBottom: "10%" }}>
                {privacyPolicyData.map((data, index) => (
                    <Accordions title={data.title} content={data.content} key={index} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PrivacyPolicy