import React, { FC } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

interface NextButtonPropInterface {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

const NextButton: FC<NextButtonPropInterface> = ({ onPress, title, disabled }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer;

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Use undefined instead of null for TypeScript compatibility
      style={buttonContainerStyle}
      disabled={disabled} // Add this prop to disable touch feedback when disabled
    >
      <View style={styles.innerContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
        <Image source={require('../../assets/next.png')} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: '#5ECD4C', // Enabled state color
    elevation: 4,
    borderRadius: isTablet ? 30 : 15,
    height: isTablet ? 90 : 50,
    width: '50%', // Adjust width for more space
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  disableAppButtonContainer: {
    backgroundColor: '#CB9BF7', // Disabled state color
    elevation: 4,
    borderRadius: isTablet ? 30 : 15,
    height: isTablet ? 90 : 50,
    width: '50%', // Adjust width for more space
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%', // Make inner container full width
    paddingHorizontal: 15
  },
  appButtonText: {
    fontSize: isTablet ? 36 : 20,
    color: 'black', // Ensure visible text color
    fontWeight: '500',
    fontFamily: 'inter',
    flex: 1 // Allow text to take available space
  },
  image: {
    height: 40,
    width: 40,
    marginTop: 10 // Provide space between text and image
  }
});

export default NextButton;
