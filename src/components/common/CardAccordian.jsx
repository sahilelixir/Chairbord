import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'
import arrowDown from '../../assets/arrowBottom.png'

const CardAccordian = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const spinValue = useState(new Animated.Value(0))[0]
  const heightValue = useState(new Animated.Value(0))[0]
  const contentHeight = 10

  const spinArrow = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      Animated.timing(heightValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(heightValue, {
        toValue: contentHeight.current,
        duration: 300,
        useNativeDriver: false
      }).start()
    }
    Animated.timing(spinValue, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  const containerHeight = isExpanded ? contentHeight.current : heightValue
  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
          <Animated.Image
            source={arrowDown}
            style={[styles.arrowImage, { transform: [{ rotate: spinArrow }] }]}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.expandedContent,
          { height: containerHeight, opacity: isExpanded ? 1 : 0,  marginBottom: isExpanded?30:10, }
        ]}
      >
        <View
          style={[
            styles.content,
            {
              color: '#000000',
              borderWidth:.5,
              borderRadius:20,
            }
          ]}
          onLayout={(event) => {
            contentHeight.current = event.nativeEvent.layout.height + 10
          }}
        >
          {content}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#263238'
  },
  text: {
    color: '#263238',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19
  },
  arrowImage: {
    width: 20,
    height: 20
  },
  expandedContent: {
    backgroundColor: 'white',
    marginVertical: '3%',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    overflow: 'hidden',

  },
  content: {
    padding: '5%',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19
  }
})

export default CardAccordian
