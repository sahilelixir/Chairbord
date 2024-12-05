import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native'

const { width } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width <= 420

const InputText = ({
  value,
  placeholder,
  onChangeText,
  secure = false,
  inputStyle,
  id,
  maxLength,
  isEditable = true,
  keyboardType = 'default',
  borderColor = 'black'
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  // Animated values for label
  const animatedTop = useRef(
    new Animated.Value(
      value || isFocused ? (isTablet ? 8 : -10) : isTablet ? 28 : 18
    )
  ).current
  const animatedFontSize = useRef(
    new Animated.Value(
      value || isFocused ? (isTablet ? 16 : 12) : isTablet ? 20 : 16
    )
  ).current

  useEffect(() => {
    // Animate label position and size when focus or value changes
    Animated.timing(animatedTop, {
      toValue: isFocused || value ? (isTablet ? 8 : -10) : isTablet ? 28 : 18,
      duration: 200,
      useNativeDriver: false // `top` and `fontSize` are non-transform properties, so we can't use native driver
    }).start()

    Animated.timing(animatedFontSize, {
      toValue: isFocused || value ? (isTablet ? 16 : 12) : isTablet ? 20 : 16,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [isFocused, value])

  const handleLabelPress = () => {
    // Focus on the input field when label is pressed
    inputRef.current.focus()
  }

  return (
    <View style={{ width: '100%', marginVertical: isSmallScreen ? 8 : 10 }}>
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? 'black' : 'gray' }
        ]}
      >
        {/* Touchable label that triggers focus on TextInput */}
        <TouchableWithoutFeedback onPress={handleLabelPress}>
          <Animated.Text
            style={[
              styles.label,
              {
                top: animatedTop,
                fontSize: animatedFontSize,
                color: isFocused ? borderColor : 'gray'
              }
            ]}
            pointerEvents="none"
          >
            {placeholder}
          </Animated.Text>
        </TouchableWithoutFeedback>

        <TextInput
          ref={inputRef}
          style={[styles.textInput, inputStyle]}
          value={value}
          placeholderTextColor={'transparent'}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          id={id}
          maxLength={maxLength}
          editable={isEditable}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            // Update label position when blur and value is empty
            if (!value) {
              Animated.timing(animatedTop, {
                toValue: isTablet ? 28 : 18,
                duration: 200,
                useNativeDriver: false
              }).start()
              Animated.timing(animatedFontSize, {
                toValue: isTablet ? 20 : 16,
                duration: 200,
                useNativeDriver: false
              }).start()
            }
          }}
        />
      </View>
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderWidth: isTablet ? 2 : 1,
    borderRadius: 20,
    height: isTablet ? 80 : 60,
    paddingHorizontal: isTablet ? 30 : 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    marginBottom: 5 // Ensure even spacing
  },
  textInput: {
    color: '#000000',
    fontSize: isTablet ? 20 : 16,
    width: '100%',
    paddingVertical: 5,
    height: '100%'
  },
  label: {
    position: 'absolute',
    left: isTablet ? 30 : 20,
    zIndex: 1,
    backgroundColor: '#F3F3F3', // Updated background to match input container for smooth transition
    paddingHorizontal: 4 // Optional padding for better visual
  }
})
