import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DividerWithText = ({ boldText = false, text = 'OR' }) => {
  const textStyles = boldText ? styles.boldText : styles.text
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={textStyles}>{text}</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#AFACAC'
  },
  text: {
    marginHorizontal: 10,
    color: '#AFACAC',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'inter'
  },
  boldText: {
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
    color: '#000000'
  }
})

export default DividerWithText
