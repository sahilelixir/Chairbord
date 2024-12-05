import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
const OverlayHeaderSbi = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30, }} />
        <Image source={require('../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40, }} />
      </View>
      <View style={styles.overlayTextContainer}>
        <Text style={styles.overlayText}>{title}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#5F259E',
    justifyContent: 'center',
    paddingVertical: 10
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },
  overlayTextContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10
  },
  overlayText: {
    color:'black',
    fontSize: 18,
    fontWeight: '700'
  }
})
export default OverlayHeaderSbi
