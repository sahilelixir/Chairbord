import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const VerticalDivider = () => {
  return <View style={styles.verticalDividerStyles} />
}

const styles = StyleSheet.create({
  verticalDividerStyles: {
    height: 16,
    width: 0.5,
    backgroundColor: '#848484',
    marginHorizontal: 6,
    marginBottom:-4
  }
})

export default VerticalDivider
