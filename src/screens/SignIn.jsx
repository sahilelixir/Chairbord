import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  Image // Import Image component
} from 'react-native';
import InputText from '../components/common/InputText';
import SecondaryButton from '../components/common/SecondaryButton';
import DividerWithText from '../components/common/DividerWithText';
import { useNavigation } from '@react-navigation/native';
import OverlayHeader from '../components/OverlayHeader';
import VerifyOTP from './opt/VerifyOTP';
import Loader from '../components/ui/Loader';
import { client } from '../client/Axios';
import { setCache } from '../helper/Storage';
// import { request, PERMISSIONS, check } from 'react-native-permissions';
// Import the custom icons from the access folder
import EyeIcon from '../assets/eye.png'; // Path to eye icon
import EyeOffIcon from '../assets/eye-off.png'; // Path to eye-off icon

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

const SignIn = () => {
  const [active, setActive] = useState('password');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Manage password visibility

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const navigation = useNavigation();
  // const checkAllPermissions = async () => {
  //   const permissionsToCheck = [
  //     PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //     PERMISSIONS.ANDROID.CAMERA,
  //     PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  //     PERMISSIONS.ANDROID.READ_CONTACTS,
  //     PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  //   ];

  //   for (const permission of permissionsToCheck) {
  //     const result = await check(permission);
  //     if (result !== 'granted') {
  //       return false; // If any permission is not granted, return false
  //     }
  //   }
  //   return true; // All permissions are granted
  // };
  const loginApi = async () => {
    setLoading(true);
    let bodyContent = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    try {
      let response = await client.post('/login/agent', bodyContent);
      await setCache('userData', response?.data);
      await setCache('token', response?.data?.token);
      console.log("____________________________________________")
console.log(response.data.token,'token here')
console.log("____________________________________________")

      // Check permissions before navigating
      // const allPermissionsGranted = await checkAllPermissions();
      // if (allPermissionsGranted) {
      //   navigation.navigate('drawer'); // Navigate directly to the drawer if permissions are granted
      // } else {
      //   navigation.navigate('permissions'); // Otherwise, navigate to permissions
      // }
      navigation.navigate('drawer');
    } catch (error) {
      Alert.alert('Either Id or password is Wrong !!', 'Please try again later', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getOtpByPhoneNumber = async () => {
    setLoading(true);
    setShowOtpField(true);
    let bodyContent = JSON.stringify({
      phoneNumber: formData.phoneNumber
    });
    try {
      let response = await client.post('/login/agent-mobile', bodyContent);
      console.log(response);
      
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('SignIn'),
          style: 'cancel'
        }
      ]);
      console.log(error, 'error');
      setShowOtpField(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Sign in'}
        showBackButton={true}
        navigateTo={'SignIn'}
      />
      {loading && <Loader loading={loading} />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.content}>
              Please enter your account details here
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabSection,
                  active === 'password' && styles.activeState
                ]}
                onPress={() => setActive('password')}
              >
                <Text
                  style={[
                    styles.tabContent,
                    active === 'password' && styles.activeContent
                  ]}
                >
                  Password
                </Text>
              </TouchableOpacity>
              <View style={styles.verticalDivider} />
              <TouchableOpacity
                onPress={() => setActive('otp')}
                style={[
                  styles.tabSection,
                  active === 'otp' && styles.activeState
                ]}
              >
                <Text
                  style={[
                    styles.tabContent,
                    active === 'otp' && styles.activeContent
                  ]}
                >
                  OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.container}>
            {active === 'password' ? (
              <>
                <InputText
                  value={formData.email}
                  placeholder={'Enter email or phone number'}
                  secure={false}
                  onChangeText={(email) =>
                    setFormData({ ...formData, email: email.toLowerCase() })
                  }
                />

                {/* Password Input with Eye Icon */}
                <View style={styles.passwordContainer}>
                  <InputText
                    value={formData.password}
                    placeholder={'Password'}
                    secure={!isPasswordVisible} // Hide/Show password based on isPasswordVisible
                    onChangeText={(pass) =>
                      setFormData({ ...formData, password: pass })
                    }
                    style={styles.passwordInput}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIconContainer}
                  >
                    <Image
                      source={isPasswordVisible ? EyeOffIcon : EyeIcon} // Toggle between eye and eye-off icon
                      style={[styles.eyeIcon, { tintColor: 'gray' }]} // Change icon color based on focus
                    />
                  </TouchableOpacity>
                </View>

                <Pressable>
                  <Text
                    style={styles.text}
                    onPress={() => navigation.navigate('forgetYourPassword')}
                  >
                    Forgot your Password?
                  </Text>
                </Pressable>

                <View>
                  <SecondaryButton
                    title={'Sign In'}
                    disable={false}
                    onPress={() => loginApi()}
                  />
                </View>
              </>
            ) : (
              <View>
                <InputText
                  value={formData.phoneNumber}
                  placeholder={'Phone Number'}
                  secure={false}
                  onChangeText={(value) =>
                    setFormData({ ...formData, phoneNumber: value })
                  }
                  keyboardType="numeric"
                  editable={!showOtpField}
                />
                {!showOtpField && (
                  <View
                    style={{
                      justifyContent: 'center',
                      marginTop: 25
                    }}
                  >
                    <SecondaryButton
                      title={'Get OTP'}
                      onPress={() => getOtpByPhoneNumber()}
                    />
                  </View>
                )}

                {showOtpField && (
                  <VerifyOTP
                    data={{ phoneNumber: formData.phoneNumber }} // Pass phoneNumber to VerifyOTP
                    setShowOtpField={setShowOtpField}
                  />
                )}
              </View>
            )}
            {!showOtpField && (
              <View>
                <DividerWithText />

                <SecondaryButton
                  title={'Sign Up'}
                  onPress={() => navigation.navigate('register')}
                />
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By signing up you accept the {'\n'}
                    <TouchableOpacity
                      onPress={() =>
                        handleLinkPress(
                          'https://chairbord.com/terms-conditions.html'
                        )
                      }
                    >
                      <Text style={styles.link}>Terms of Service</Text>
                    </TouchableOpacity>{' '}
                    <Text>&</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleLinkPress(
                          'https://chairbord.com/terms-conditions.html'
                        )
                      }
                    >
                      <Text style={styles.link}> Privacy policy</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    paddingVertical: 10
  },
  heading: {
    color: '#000000',
    fontWeight: '600',
    fontSize: isSmallScreen ? 26 : 32,
    lineHeight: isSmallScreen ? 32 : 38,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: isSmallScreen ? '70%' : '80%',
    marginTop: isSmallScreen ? 6 : 10
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#CCCCCC'
  },
  tabSection: {
    width: '50%'
  },
  activeState: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  activeContent: {
    color: '#000000'
  },
  tabContent: {
    fontWeight: '400',
    fontSize: isSmallScreen ? 16 : 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#A6A6A6'
  },
  content: {
    fontWeight: '400',
    fontSize: 12,
    color: '#263238',
  },
  text: {
    color: '#263238',
    marginBottom: isSmallScreen ? '3%' : '5%',
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    padding: 10,
    justifyContent: 'center',
  },
  eyeIcon: {
    width: 20,
    marginBottom: 4,
    height: 18, // Adjust size based on your icon's dimensions
  },
  termsContainer: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    color: '#263238',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  link: {
    color: '#0693D9',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SignIn;
