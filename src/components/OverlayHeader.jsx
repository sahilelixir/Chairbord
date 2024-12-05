import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width < 400;
const OverlayHeader = ({ title, showBackButton = true, isorderSection = false, handleDeleteOrder }) => {

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#02546D', '#142D40']} style={styles.gradient}>
        <View style={styles.overlayContainer}>
          <View style={styles.overlay}></View>
          <View style={styles.overlayTextContainer}>
            {showBackButton && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (isorderSection) {
                      handleDeleteOrder();
                      navigation.goBack();
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={styles.backArrow}
                >
                  <Image source={require('../assets/back.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ marginLeft: '-15%', zIndex: 10 }}>
              <Text style={styles.overlayText}>{title}</Text>
            </View>
            <View></View>
          </View>
        </View>
        <View style={styles.chairBordLogo}>
          <Image source={require('../assets/chairBoardLogochairbordLogoWithoutName.png')} style={{ width: 120, height: 120, }} />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    // marginBottom: '10%'
  },
  gradient: {
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayContainer: {
    position: 'relative',
    height: 170,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayText: {
    fontWeight: '700',
    fontSize: isTablet ? 28 : 24,
    lineHeight: 29,
    color: 'white'
  },
  overlayTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1
  },
  backArrow: {
    marginRight: 20
  },
  chairBordLogo: {
    position: 'absolute',
    left: isTablet ? '38%' : isSmallScreen ? '35%' : '36%',
    top: '15%',
    zIndex: 0,
    opacity: 0.5
  }
})

export default OverlayHeader
