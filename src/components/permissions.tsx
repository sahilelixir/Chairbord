import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import SecondaryButton from './common/SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  requestNotifications
} from 'react-native-permissions';

const Permissions = () => {
  const navigation = useNavigation();

  // State to manage checkbox selections
  const [locationChecked, setLocationChecked] = useState(false);
  const [cameraChecked, setCameraChecked] = useState(false);
  const [notificationChecked, setNotificationChecked] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);
  const [contactChecked, setContactChecked] = useState(false);
  const [currentPermissionIndex, setCurrentPermissionIndex] = useState(0); // Track the current permission index



  // Function to request permission and set state based on result
  const permissions = [
    { name: 'Location access', permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, setChecked: setLocationChecked },
    { name: 'Camera access', permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA, setChecked: setCameraChecked },
    { name: 'Storage access', permission: Platform.OS === 'android' ? (Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE) : PERMISSIONS.IOS.PHOTO_LIBRARY, setChecked: setStorageChecked },
    { name: 'Contact access', permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS, setChecked: setContactChecked },
    { name: 'Notification access', permission: PERMISSIONS.ANDROID.POST_NOTIFICATIONS, setChecked: setNotificationChecked },
  ];

  // Function to request permission and set state based on result
  const askPermission = async (index) => {
    const { permission, setChecked } = permissions[index];
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log(`Permission granted for: ${permission}`);
      setChecked(true);
    } else {
      console.log(`Permission denied for: ${permission}`);
      setChecked(false);
    }
    // Move to the next permission if granted
    if (result === RESULTS.GRANTED && index + 1 < permissions.length) {
      setCurrentPermissionIndex(index + 1);
      askPermission(index + 1); // Request next permission
    }
  };

  
  // Function to handle manual permission requests
  const requestSpecificPermission = (index) => {
    const { permission, setChecked } = permissions[index];
    request(permission).then((result) => {
      if (result === RESULTS.GRANTED) {
        console.log(`Permission granted for: ${permission}`);
        setChecked(true);
      } else {
        console.log(`Permission denied for: ${permission}`);
        setChecked(false);
      }
    }).catch((error) => {
      console.error(`Error requesting permission: ${permission}`, error);
    });
  };

  useEffect(() => {
    const checkStoredPermissions = async () => {
      const storedPermissions = await AsyncStorage.getItem('permissions');
      if (storedPermissions) {
        const { location, camera, notification, storage, contact } = JSON.parse(storedPermissions);
        setLocationChecked(location);
        setCameraChecked(camera);
        setNotificationChecked(notification);
        setStorageChecked(storage);
        setContactChecked(contact);
      } else {
        askPermission(currentPermissionIndex);
      }
    };
    checkStoredPermissions();
  }, []);


  const handleGrantPermissions =async () => {
    if (
      locationChecked &&
      cameraChecked &&
      notificationChecked &&
      storageChecked &&
      contactChecked
    ) {
      await AsyncStorage.setItem('permissions', JSON.stringify({
        location: true,
        camera: true,
        notification: true,
        storage: true,
        contact: true,
      }));
      navigation.navigate('drawer');
      // Navigate if all permissions are granted
    } else {
      Alert.alert(
        "Permissions Required",
        "Please grant all permissions to continue.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/homeScreen/permissions.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>
          To get started, we need your permissions:
        </Text>
        <View style={{ justifyContent: 'flex-start', marginVertical: 10 }}>
          {permissions.map((perm, index) => (
            <TouchableOpacity
              key={index}
              style={styles.permissionItem}
              onPress={() => requestSpecificPermission(index)} // Request specific permission on click
            >
              <CheckBox
                value={index === 0 ? locationChecked : (index === 1 ? cameraChecked : (index === 2 ? storageChecked : (index === 3 ? contactChecked : notificationChecked)))}
                tintColors={{ true: '#02546D', false: 'grey' }}
                disabled={false} // Enable direct clicking
              />
              <Text style={styles.font}>{perm.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SecondaryButton
          onPress={handleGrantPermissions}
          title={'Start'}
          disabled={
            !(locationChecked && cameraChecked && notificationChecked && storageChecked && contactChecked)
          }
        />
      </View>
    </SafeAreaView>
  );
};

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
    width: 300, // Adjust as needed
    height: 300, // Adjust as needed
  },
  heading: {
    fontSize: 28,
    color: '#03536D',
    fontWeight: '800',
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
    textAlign: 'left',
    marginLeft: 10, // Add margin to create space between checkbox and text
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5, // Space between permission items
  },
  bottomContainer: {
    padding: 20, // Add padding around the button
    width: '100%',
    alignItems: 'center', // Center button horizontally
  }
})

export default Permissions

