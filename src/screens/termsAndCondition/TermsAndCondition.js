import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import Accordions from '../../components/common/Accrodians'
import { useNavigation } from '@react-navigation/native'

const termsAndConditionData = [
    {
        title: "Introduction",
        content: `Please read these terms of use (“Terms”) carefully before using the "Website", mobile applications ("App") and APIs. This App, Platform or APIs are owned, registered and operated by “Platform Owner” ("we", "us" "our"). This Platform or API is a medium through which Services of Platform Owner shall be streamed directly to its Platform Users via App or Website. This App, APIs and the Website shall be together referred to as the “Platform”. By using this Platform, the Platform Users of the Website or App or any other application linked via Platform APIs, hereinafter referred to as "User" or "you" or "your" or "yourself" “registered user” or “guest user” signify in your agreement to be bound by these Terms ("Agreement").By visiting our Platform, you engage in our "Service" and agree to the following terms and conditions ("Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the Platform, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.`
    },
    {
        title: "Amendment",
        content: `Note read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Disclaimer",
        content: `Legal basis for processing of... read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Eligiblity / Authorized Use",
        content: `Disclosure to third parties read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Audit",
        content: `Data protection read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Services",
        content: `Governing law and Dispute... read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Electronic Communication",
        content: `Amendment read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Account and Registration",
        content: `Data access read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Information Sharing",
        content: `Contact us read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Intellectual Property",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Copyrights",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "No Unlawful or Prohibited Use",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "User Comments",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Modifications of These Terms...",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Language and Display",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Grievance Redressal",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
    {
        title: "Refund Policy",
        content: `Grievance Redressal read this Privacy Policy carefully before using the "Website" and mobile applications ("App"). This Website and App are owned, registered and operated by “Platform Owner” ("we", "us" "our"). `
    },
]

const TermsAndCondition = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <OverlayHeader title={"Terms & Conditions"}  />
            <ScrollView style={{ padding: "5%", marginBottom: "10%" }}>
                {termsAndConditionData.map((data, index) => (
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

export default TermsAndCondition