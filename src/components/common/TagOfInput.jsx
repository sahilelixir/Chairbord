import React from 'react'
import { StyleSheet, Text } from 'react-native'

const TagOfInput = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: '#807C7C',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: '3%'
  }
})

export default TagOfInput
