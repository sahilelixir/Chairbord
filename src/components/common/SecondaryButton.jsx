import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View,  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<400;

const SecondaryButton = ({ onPress, title, disabled = false }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC']
    : ['#02546D', '#142D40']

  return (
    <TouchableOpacity onPress={disabled ? null : onPress} style={buttonContainerStyle}>
      <LinearGradient colors={gradientColors} style={styles.linearGradient}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={styles.appButtonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: isSmallScreen?20:25,
    height: isSmallScreen?65:75,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    elevation: 8,
    borderRadius: 25,
    height: 75,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius:isSmallScreen?20:25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: isSmallScreen?24:28,
    color: '#fff',
    fontWeight: '700',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default SecondaryButton
