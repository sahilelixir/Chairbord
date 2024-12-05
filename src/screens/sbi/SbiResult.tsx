import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';

const { width } = Dimensions.get('window');
const SbiResult = (props: any) => {
    const data = props.route.params.data;
    const [isTagRegistered, setIsTagRegistered] = useState(data.success);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer1}>
                {isTagRegistered === null ? (
                    <></>
                ) : isTagRegistered ? (
                    <View style={styles.resultContainer}>
                        <Text style={styles.Textprocess}>Result is here!!!</Text>
                    </View>
                ) : (<View style={styles.resultContainer}>
                    <Text style={styles.Textprocess}>Result is here!!!</Text>
                </View>)}

                {isTagRegistered === null ? (
                    <></>
                ) : isTagRegistered ? (
                    <View style={styles.container1}>
                        <View style={styles.waitmsgTextContainer}>
                            <Text style={styles.Textwait}>Congratulations</Text>
                        </View>
                        <View style={styles.processmsgTextContainer}>
                            <Text style={styles.Textprocess}>Tag Registered Successfully!!!</Text>
                        </View>
                    </View>)
                    : (<View style={styles.container1}>
                        <View style={styles.waitmsgTextContainer}>
                            <Text style={styles.Textwait}>Oops !!</Text>
                        </View>
                        <View style={styles.processmsgTextContainer}>
                            <Text style={styles.Textprocess}>Your request has been cancelled</Text>
                        </View>
                    </View>)}


                <View>
                    {isTagRegistered === null ? (
                        <></>
                    ) : isTagRegistered ? (
                        <View style={styles.detailsContainer2}>

                            <Text style={styles.headerText}>Customer details</Text>

                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/sbi/user.png')} style={{ width: 40, height: 40 }} />
                                <InputTextSbi placeholder={"Pan Holder name"} value={data?.panName} isEditable={false} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/sbi/vehicle.png')} style={{ width: 40, height: 40 }} />
                                <InputTextSbi placeholder={"Pan number"} value={data?.panNumber} isEditable={false} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/sbi/rightorange.png')} style={{ width: 40, height: 40 }} />
                                <InputTextSbi placeholder={"Tag SR No."} value={data?.tagSerialNumber} isEditable={false} />
                            </View>


                        </View>
                    ) : (
                        <>
                            <Text style={styles.reasonheader}>Reason</Text>
                            <View style={styles.reasonTextContainer}>
                                <Text style={styles.Textprocess}>{data?.desc || "Invalid document"}</Text>
                            </View>
                        </>
                    )}

                </View>
                <View style={styles.responseContainer}>
                    {isTagRegistered === null ? (
                        <Text style={styles.responsemsg}>Checking status...</Text>
                    ) : isTagRegistered ? (
                        <>
                            <Image source={require('../../assets/sbi/success.png')} style={{ width: 80, height: 80 }} />
                            <Text style={styles.responsemsg}>Tag Assigned Successfully</Text>
                        </>
                    ) : (
                        <>
                            <Image source={require('../../assets/sbi/fail.png')} style={{ width: 80, height: 80 }} />
                            <Text style={styles.responsemsg}>We are Sorry!!!.Tag could not be assigned to this vehicle.</Text>
                        </>
                    )}
                </View>
            </View>

            {isTagRegistered !== null && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('home')}
                        style={[
                            styles.appButtonContainer,
                            { backgroundColor: isTagRegistered === false ? 'red' : '#5ECD4C' }
                        ]}
                    >
                        <View style={styles.innerContainer}>
                            <Text style={styles.appButtonText}>Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    appButtonContainer: {
        backgroundColor: '#5ECD4C', // Enabled state color
        elevation: 4,
        borderRadius: 15,
        height: 50,
        width: '30%', // Adjust width for more space
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',

    },
    innerContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '60%', // Make inner container full width
        paddingHorizontal: 5
    },
    appButtonText: {
        fontSize: 20,
        color: 'black', // Ensure visible text color
        fontWeight: '500',
        fontFamily: 'inter',

    },
    detailsContainer1: {
        backgroundColor: '#5F259E',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        elevation: 8,
        borderRadius: 20,
    },
    detailsContainer2: {
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 15,
        elevation: 8,
        borderRadius: 20,
    },
    inputContainer: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    headerText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    resultContainer: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 80,
        marginBottom: 10
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
        marginVertical: 10
    },
    processmsgTextContainer: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 10
    },
    reasonTextContainer: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 10
    },
    responseContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        margin: 10,
    },
    Textcontainer2: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },
    Textwait: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',

    },
    reasonheader: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 40,
        marginTop: 10,
    },
    responsemsg: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'justify',
        justifyContent: 'center',
        alignItems: 'center',

    },
    Textprocess: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
});

export default SbiResult;
