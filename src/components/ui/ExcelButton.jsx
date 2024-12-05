import { View, Text, Pressable, Image, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<400;
const ExcelButton = ({ title, onpressOperation }) => {
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
            source={require('../../assets/downloadIcon.png')}
            style={{ height:20 ,width:15}}
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
  width:100,
  height: isSmallScreen?35:40,
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: '5%'
  },
  excelButtonText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
    // marginHorizontal:50,
    paddingVertical: '5%',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default ExcelButton