import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const AddBtn = ({ onPress, title = 'Default Title', disabled = false }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC']
    : ['#02546D', '#142D40']

  return (
    <TouchableOpacity onPress={onPress} style={buttonContainerStyle}>
      <LinearGradient colors={gradientColors} style={styles.linearGradient}>
        <View style={styles.contentContainer}>
          <Text style={styles.appButtonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    // elevation: 15,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'flex-end'
  },
  disableAppButtonContainer: {
 
    // elevation: 8,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure the gradient follows the button's shape
    alignSelf: 'flex-end' // Align the button to the start of the parent container
  },
  linearGradient: {
    flex: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20 // Adjust to control the padding around the text
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'inter' // Ensure this font is loaded correctly
  }
})

export default AddBtn
