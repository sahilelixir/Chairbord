import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import useUserData from '../../helper/useUserData';
import { getCache } from '../../helper/Storage'
import { client } from '../../client/Axios'
import profileIcon from '../../assets/DrawerNavigation/profile.png';

const { width, height } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width <= 400

const ProfileDraweritem = ({ title, icons, navigateTo }) => {
  const userData = useUserData();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleVerificationClick = async () => {
    const userData = await getCache('userData');
    const agentId = userData.user.id;
    console.log(userData, "user data");
    console.log(agentId, "agent id");
    setLoading(true)
    try {
      const body = { agentId: agentId };
      console.log(body, "body data")
      const res = await client.post('/user/agent/mydata', body);
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
    <TouchableOpacity onPress={handleVerificationClick}>
      <View style={{ backgroundColor: "#4C6470", paddingHorizontal: "5%" }}>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
        <View style={styles.drawerItemStyle}>
          <Image source={profileIcon} alt='profileLogo' style={{ width: 35, height: 35, marginRight: -7 }} />
          <View style={{ width: "80%", }}>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", lineHeight: 24, }}>
              {userData?.user?.name || 'User'}
            </Text>
          </View>
        </View>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
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
      </View>
    </TouchableOpacity>

  )
}

const data = [
  // {
  //     title: 'Dashboard',
  //     icon: require('../../assets/DrawerNavigation/dashboard.png'),
  //     screen: 'dashboard'
  // },
  // {
  //     title: 'permissions',
  //     icon: require('../../assets/DrawerNavigation/requests.png'),
  //     screen: 'permissions'
  // },
  {
    title: 'SBI',
    icon: require('../../assets/DrawerNavigation/wallet.png'),
    screen: 'sbi'
  },
  {
    title: 'SBI Pending Req',
    icon: require('../../assets/DrawerNavigation/wallet.png'),
    screen: 'sbi5'
  },
  {
    title: 'SBI 4',
    icon: require('../../assets/DrawerNavigation/wallet.png'),
    screen: 'sbi4'
  },
  {
    title: 'Wallet',
    icon: require('../../assets/DrawerNavigation/wallet.png'),
    screen: 'wallet'
  },
  {
    title: 'Inventory',
    icon: require('../../assets/DrawerNavigation/inventory.png'),
    screen: 'inventory'
  },
  {
    title: 'Orders',
    icon: require('../../assets/DrawerNavigation/orders.png'),
    screen: 'orders'
  },
  {
    title: 'Issuance Tracker',
    icon: require('../../assets/DrawerNavigation/issuance.png'),
    screen: 'issuanceTracker'
  },
  // {
  //     title: 'Vehicle Tracking',
  //     icon: require('../../assets/DrawerNavigation/vehicleTracking.png'),
  //     screen: 'vehicleTracking'
  // },
  // {
  //     title: 'Requests',
  //     icon: require('../../assets/DrawerNavigation/requests.png'),
  //     screen: 'requests'
  // },
  // {
  //     title: 'Contact Us',
  //     icon: require('../../assets/DrawerNavigation/contactUs.png'),
  //     screen: 'contactUs'
  // },
  // {
  //     title: 'Terms & Conditions',
  //     icon: require('../../assets/DrawerNavigation/termsAndCondition.png'),
  //     screen: 'termsAndCondition'
  // },
  // {
  //     title: 'Privacy Policy',
  //     icon: require('../../assets/DrawerNavigation/privacyPolicy.png'),
  //     screen: 'privacyPolicy'
  // },
  {
    title: 'Logout',
    icon: require('../../assets/DrawerNavigation/logout.png'),
    screen: 'logoutModal'
  },
]


const getServerStatus = async (agentId) => {
  console.log(agentId, "agent id")
  try {
    const res = await client.post(`/sbi/server-status`, { agentId });
    console.log(res.data, 'res');
    return res.data.isServerOn;
  } catch (error) {
    throw error
  }
}

const handleNavigation = async (navigation, screen, agentId) => {
  if (screen === 'sbi') {
    try {
      const isServerOn = await getServerStatus(agentId);
      if (isServerOn) {
        navigation.navigate(screen);
      } else {
        Alert.alert('Server is down', 'Please try again later');
      }
    } catch (error) {
      Alert.alert(error.response?.data?.message || "Something went wrong")
    }
  } else {
    navigation.navigate(screen);
  }
}


const CustomDrawerItems = ({ title, icons, navigateTo }) => {

  const { userId } = useUserData();
  const agentId = userId;
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (agentId) {
      handleNavigation(navigation, navigateTo, agentId);
    } else {
      console.warn('Agent ID is not available. Navigation is blocked.');
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      disabled={!agentId}
    >
      <View>
        <View style={styles.drawerItemStyle}>
          <Image source={icons} alt={`${title}`} style={{ width: 25, height: 25, marginRight: -2, marginLeft: -2 }} />
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 18, fontWeight: 500, color: "#FFFFFF", lineHeight: 24, }}>
              {title}
            </Text>
          </View>
        </View>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
      </View>
    </TouchableOpacity>
  )
}

const CustomDrawer = () => {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <LinearGradient colors={['#02546D', '#142D40']} style={styles.DrawerStyles}>
      <DrawerContentScrollView>
        <View>
          <ProfileDraweritem
            icons={require('../../assets/DrawerNavigation/avatar.png')}
            navigateTo="profileAndMasterInfo"
          />
        </View>

        {data.map((element, index) => (
          <CustomDrawerItems
            key={index}
            title={element.title}
            icons={element.icon}
            navigateTo={element.screen}
          />
        ))}

      </DrawerContentScrollView>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
  DrawerStyles: {
    backgroundColor: "black",
    flex: 1,
  },
  drawerItemStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "7%",
    gap: 20,
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
    fontSize: isSmallScreen ? 16 : 18,
    lineHeight: isSmallScreen ? 20 : 24,
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
  },
})

export default CustomDrawer