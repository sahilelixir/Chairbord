import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Image,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Text
} from 'react-native'
import Inventory from '../../screens/inventory/Inventory'
import Orders from '../../screens/order/Order'
import Home from '../../screens/home/Home'
import ContactUs from '../../screens/contactUs/ContactUs'

// Import of tab navigation icons
import inventoryIcon from '../../assets/tabNavigation/inventory.png';
import ordersIcon from '../../assets/tabNavigation/orders.png';
import homeIcon from '../../assets/tabNavigation/home.png';
import walletIcon from '../../assets/tabNavigation/wallet.png';
import contactusIcon from '../../assets/tabNavigation/contactUs.png';
import profileIcon from '../../assets/tabNavigation/profile.png';
import LinearGradient from 'react-native-linear-gradient';
import ProfileAndMasterInfo from '../../screens/profile/ProfileAndMasterInfo'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'
import { getCache } from '../../helper/Storage'
import Wallet from '../../screens/walllet/Wallet'

const { width, height } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width <= 400

const Bottom = createBottomTabNavigator()
const BottomNavigator = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleVerificationClick = async () => {
    const userData = await getCache('userData');
    const agentId=userData.user.id;
    console.log(userData, "user data");
    console.log(agentId, "agent id");
    setLoading(true)
    try {
      const body={agentId:agentId};
      console.log(body, "body data")
      const res = await client.post('/user/agent/mydata',body);
      console.log('res', JSON.stringify(res))
      let profileStatus = res?.data?.verificationStatus;
      if (profileStatus === 'under-review') {
        setModalVisible(true)
      } else if (profileStatus === 'verified') {
        navigation.navigate('ProfileAndMasterInfo')
      } else if (profileStatus === 'not-verified') {
        navigation.navigate('aadharAndPanVerification')
      } else {
        alert('Your profile status is unknown or not available.')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      <Bottom.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarStyle: {
            height: isTablet ? 100 : 60
          },
          tabBarShowLabel: false
        }}
      >
        {/* <Bottom.Screen
          name="Inventory"
          component={Inventory}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={inventoryIcon} focused={focused} />
            )
          }}
        /> */}
        {/* <Bottom.Screen
          name="Order"
          component={Orders}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={ordersIcon} focused={focused} />
            )
          }}
        /> */}
         <Bottom.Screen
          name="Wallet"
          component={Wallet}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={walletIcon} focused={focused} />
            )
          }}
        />
        <Bottom.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={homeIcon} focused={focused} />
            )
          }}
        />
        {/* <Bottom.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={contactusIcon} focused={focused} />
            )
          }}
        /> */}
        <Bottom.Screen
          name="ProfileAndMasterInfo"
          component={ProfileAndMasterInfo}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={handleVerificationClick}
              >
                <TabIcon icon={profileIcon} focused={focused} />
              </TouchableOpacity>
            ),
          }}
        />
      </Bottom.Navigator>

      {/* Modal for Under Review Profile */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Modal content */}
            <Pressable
              style={styles.closeButtonContainer}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require('../../assets/close.png')}
                style={styles.closeButton}
              />
            </Pressable>

            <Image
              source={require('../../assets/success.png')}
              style={styles.checkImage}
            />
            <Text style={styles.modalText}>
              Your profile has been updated and under review
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false) // Close modal
                // Navigate to the home screen if needed
              }}
              style={styles.okButton}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}

const TabIcon = ({ icon, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused ? (
        <LinearGradient
          colors={['#02546D', '#142D40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientOverlay}
        >
          <Image source={icon} style={[styles.tabIcon, styles.focusedIcon]} />
        </LinearGradient>
      ) : (
        <Image source={icon} style={styles.tabIcon} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  gradientOverlay: {
    padding: isTablet ? 20 : 10, // Add padding around the icon
    borderRadius: 50,
    width:80, // Adjust the border radius if needed
    alignItems: 'center', // Center the icon within the gradient
    justifyContent: 'center'
  },
  tabIcon: {
    width: isTablet ? 40 : 25,
    height: isTablet ? 40 : 25,
    tintColor: 'black' // Default color for unfocused icons
  },
  focusedIcon: {
  tintColor: 'white' // Make the tint color white for focused icons
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalContent: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  checkImage: {
    width: 100,
    height: 100
  },
  modalText: {
    fontWeight: '500',
    fontSize: isSmallScreen?16:18,
    lineHeight: isSmallScreen?20:24,
    textAlign: 'center',
    color: 'black',
    marginTop: 10
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  closeButton: {
    width: 20,
    height: 20
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  okButton: {
    backgroundColor: '#02546D',
    borderRadius: 15,
    marginTop: 60,
    paddingVertical: '4%',
    paddingHorizontal: '15%'
  }
})

export default BottomNavigator
