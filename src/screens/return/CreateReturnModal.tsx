import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Pressable,
    Image
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CreateReturnModal = ({ visible, onClose, onApply }: any) => {
    const navigation = useNavigation()
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Image
                            source={require('../../assets/DrawerNavigation/closeLogout.png')}
                            alt="closeBtn"
                        />
                    </Pressable>
                    <View style={styles.contentContainer}>
                        <Image
                            source={require('../../assets/screens/success.png')}
                            style={styles.successImage}
                        />
                        <Text style={styles.titleText}>
                            Your order has been placed successfully
                        </Text>
                        <View style={styles.orderDetails}>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.detailLabel}>Order ID</Text>
                                <Text style={styles.detailValue}>: RET145665654</Text>
                            </View>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.detailLabel}>Amount Paid</Text>
                                <Text style={styles.detailValue}>: 1200.00</Text>
                            </View>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.detailLabel}>Payment Reff No.</Text>
                                <Text style={styles.detailValue}>: 5565467878</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}>Dashboard</Text>
                        </TouchableOpacity>
                      
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    contentContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    successImage: {
        width: 100,
        height: 100
        // marginBottom: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    orderDetails: {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    detailLabel: {
        fontSize: 16,
        color: '#000000'
    },
    detailValue: {
        fontSize: 16,
        color: '#000000'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20
    },
    button: {
        borderWidth: 1,
        borderColor: '#02546D',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    buttonText: {
        color: '#02546D',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    }
})

export default CreateReturnModal