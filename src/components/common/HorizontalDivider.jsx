import { StyleSheet, View } from 'react-native'
import React from 'react'

const HorizontalDivider = () => {
  return <View style={styles.horizontalDivider}></View>
}

const styles = StyleSheet.create({
  horizontalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#BFBFBF',
    marginVertical: '7%'
  }
})

export default HorizontalDivider
