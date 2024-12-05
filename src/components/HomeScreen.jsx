import React, { useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { getCache } from '../helper/Storage'

const HomeScreen = () => {
  const navigation = useNavigation()
  const checkLogin = async () => {
    const token = await getCache('token')
    console.log('token', token)
    if (token) {
      navigation.navigate('drawer')
    } else {
      setTimeout(() => {
        navigation.navigate('FastTagAndGPS')
      }, 1000)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <LinearGradient
      colors={['#02546D', '#142D40']}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('FastTagAndGPS')}>
          <View>
            <Image
              source={require('../assets/chairbordlogo.png')}
              style={styles.image}
            />
            <Image
              source={require('../assets/chairbordTagLine.png')}
              style={{ marginTop: '10%' }}
            />
            <Text style={styles.taglineText}>
              WORKING WITH 1K+ WORKERS PAST 4 YEARS
            </Text>
            <Image
              source={require('../assets/groupAvatar.png')}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: '20%'
  },
  image: {
    alignSelf: 'center'
  },
  taglineText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: '10%'
  }
})

export default HomeScreen
