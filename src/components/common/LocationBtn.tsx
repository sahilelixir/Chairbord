import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<=420;
const LocationBtn = ({ onPress, title, disabled }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC']
    : ['#02546D', '#142D40']

  return (
    <TouchableOpacity onPress={onPress} style={buttonContainerStyle}>
      <LinearGradient colors={gradientColors} style={styles.linearGradient}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex:10
          }}
        >
          <Text style={styles.appButtonText}>{title}</Text>
          <Image source={require('../../assets/gps.png') } />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: isTablet?30:25,
    height: isTablet?90:50,
    width:'auto',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden'// Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    elevation: 8,
    borderRadius: isTablet?30:25,
    height: isTablet?90:60,
    width: 'auto',
    justifyContent: 'center',
    paddingHorizontal: '45%',
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  appButtonText: {
    fontSize: isTablet?36:18,
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default LocationBtn
