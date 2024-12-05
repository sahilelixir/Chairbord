import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PrimaryBtn from './common/PrimaryBtn'

const SmsAlert = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Image
          source={require('../assets/homeScreen/smsAlert.png')}
          style={styles.image}
        />
  
    
        <Text style={styles.heading}>SMS alert</Text>
        <Text style={styles.font}>
          Stay updated with SMS alerts notifying all the events.
        </Text>
  
      </View>
      <View style={styles.bottomContainer}>
      <PrimaryBtn
        onPress={() => navigation.navigate('SaveFuelAndTime')}
        title={'Next'}
      />
       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'space-between', // Space between content and button
    alignItems: 'center', // Center content horizontally
  },
  content: {
    flex: 1, // Allow content to take available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 20, // Optional: Add horizontal padding for better spacing
  },
  image: {
    width: 250, // Adjust as needed
    height: 250, // Adjust as needed
  },
  heading: {
    fontSize: 28,
    color: '#03536D',
    fontWeight: '700', 
    fontFamily: 'inter',
    textAlign: 'center',
    marginVertical: 10, // Add vertical margin between image and text
  },
  font: {
    fontSize: 16,
    color: '#263238',
    fontWeight: '400',
    fontFamily: 'inter',
    maxWidth: 300,
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 20, // Add padding around the button
    width: '100%',
    alignItems: 'center', // Center button horizontally
  }
})

export default SmsAlert
