import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const LinearButton = ({ onPress, title, disabled }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC'] // Disable color gradient
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
    // elevation: 8,
    borderRadius: 25,
    height: 68,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    // elevation: 8,
    borderRadius: 25,
    height: 68, // Match the height of the enabled button
    width: '100%', // Set to 100% width
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#AFACAC', // Solid color for disabled state
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default LinearButton
