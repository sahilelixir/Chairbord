import { Alert } from 'react-native';

// Reusable alert function
const showAlert = (message: string, onPress = () => { }) => {
    Alert.alert(
        'Alert',
        message || 'Something went wrong',
        [
            {
                text: 'OK',
                onPress: onPress,
            },
        ],
        { cancelable: false }
    );
};

export default showAlert;
