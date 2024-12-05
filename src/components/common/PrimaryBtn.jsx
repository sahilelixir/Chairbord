import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width <= 420
const PrimaryBtn = ({ onPress, title, disabled }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC']
    : ['#02546D', '#142D40']

  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      style={buttonContainerStyle}
    >
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
          <Image source={require('../../assets/rightArrow.png')} style={{ height:30 ,width:32}}/>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: isTablet ? 30 : 25,
    height: isTablet ? 90 : 75,
    width: 'auto',
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    elevation: 8,
    borderRadius: isTablet ? 30 : 25,
    height: isTablet ? 90 : 75,
    width: 'auto',
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: isTablet ? 30 : 25,
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  appButtonText: {
    fontSize: isTablet ? 36 : 28,
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default PrimaryBtn
