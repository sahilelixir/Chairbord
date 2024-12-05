import { View, Text, Pressable, Image, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<400;
const CreateButton = ({ title, onpressOperation }) => {
  return (
    <>
      <Pressable
        // style={styles.excelButton}
        onPress={onpressOperation}
      >
        <LinearGradient
          colors={['#02546D', '#142D40']}
          style={styles.excelButton}
        >
          <Text style={styles.excelButtonText}>{title}</Text>
          <Image
            source={require('../../assets/addIcon.png')}
            style={{ height:12 ,width:12}}
          />
        </LinearGradient>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  width:isSmallScreen?100:120,
  height:isSmallScreen?35:40,
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: '5%'
  },
  excelButtonText: {
    fontWeight: isSmallScreen?'400':'500',
    fontSize: isSmallScreen?12:14,
    lineHeight: 16,
    color: '#FFFFFF',
    // marginHorizontal:50,
    paddingVertical: '5%',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default CreateButton