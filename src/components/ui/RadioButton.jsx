import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { RadioButton } from 'react-native-paper'

const RadioButtonComponent = () => {
  const [checked, setChecked] = useState('first')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an option:</Text>

      <Pressable
        style={styles.radioButtonContainer}
        onPress={() => setChecked('first')}
      >
        <RadioButton
          color={'#02546D'}
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
        />
        <Text style={styles.label}>First Option</Text>
      </Pressable>

      <Pressable
        style={styles.radioButtonContainer}
        onPress={() => setChecked('second')}
      >
        <RadioButton
          color={'#02546D'}
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
        />
        <Text style={styles.label}>Second Option</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16
  },
  title: {
    fontSize: 18,
    marginBottom: 16
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  label: {
    fontSize: 16,
    color: 'red'
  }
})

export default RadioButtonComponent
