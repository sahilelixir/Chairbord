import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const animatedHeight = new Animated.Value(0)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 0 : contentHeight,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const setContentLayout = (event) => {
    setContentHeight(event.nativeEvent.layout.height)
  }

  return (
    <View style={{ marginVertical: 10, backgroundColor: 'red' }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'red'
          }}
        >
          <Text>{title}</Text>
          <Text>{isOpen ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
        <View onLayout={setContentLayout} style={{ backgroundColor: 'red' }}>
          <Text style={{ color: 'red' }}>{isOpen && content}</Text>
        </View>
      </Animated.View>
    </View>
  )
}

export default Accordion
