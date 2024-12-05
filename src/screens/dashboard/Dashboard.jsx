import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomNavigator from '../../navigation/bottom/BottomNavigator'

const Dashboard = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomNavigator />
    </SafeAreaView>
  )
}

export default Dashboard
