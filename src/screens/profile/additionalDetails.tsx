import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,

  Platform,
  Pressable,
  Image,
  Button
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import OverlayHeader from '../../components/OverlayHeader'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import InputText from '../../components/common/InputText'
import UploadDoc from '../../components/common/UploadDoc'
import { client } from '../../client/Axios'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768
import { captureScreen } from 'react-native-view-shot';


const AdditionalDetails = (props: any) => {
  const { adharResData } = props.route.params;
  console.log('adharResData', adharResData)
  const [refreshing, setRefreshing] = useState(false)

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [contactPersonData, setContactPersonData] = useState<any>({
    contactPersonName: '',
    contactPersonNumber: ''
  })

  // State for storing images
  const [posLocationImage, setPosLocationImage] = useState<any>(null)
  const [eSign, setESign] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('POS Location Image:', posLocationImage)
  }, [posLocationImage])

  useEffect(() => {
    console.log('E-Sign Image:', eSign)
  }, [eSign])

  const formDataHandler = (key: string, value: string) => {
    setContactPersonData({
      ...contactPersonData,
      [key]: value
    })
  }

  const requestLocationPermission = async () => {
    try {
      let permissionResult
      if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      } else {
        permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      }

      if (permissionResult === RESULTS.GRANTED) {
        getCurrentLocation()
      } else {
        Alert.alert('Permission Denied', 'Location permission is needed to access your location.')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        setLocationError(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }
  const onRefresh = async () => {
    setRefreshing(true)
    // try {
    //   await getUserdata()
    // } catch (error) {
    //   console.log(error, 'error')
    // } finally {
    //   setRefreshing(false)
    // }
  }
  const fileUploadHandler = (key, source) => {
    if (key === 'POS Location') {
      setPosLocationImage(source)
    } else if (key === 'E-Sign') {
      setESign(source)
    }
  }

  const handleSendData = async () => {
    setLoading(true);
    try {
      const form = new FormData()

      form.append('contact_person_name', contactPersonData?.contactPersonName)
      form.append('contact_person_mobile_number', contactPersonData?.contactPersonNumber)
      form.append('latitude', location?.latitude)
      form.append('longitude', location?.longitude)
      form.append('e_sign_photo', eSign);
      form.append('pos_proof_photo', posLocationImage)

      const response = await client.post('/cashfree/e-sign', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('E-Sign Verification success', response)
      Alert.alert('Success', 'E-sign Verified Successfully', [
        {
          text: 'Ok',
          onPress: () => props.navigation.navigate('dashboard')
        }
      ])

    } catch (error) {
      console.error('Something went wrong:', error)
      Alert.alert('Error', 'Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  const fieldvalidator = !contactPersonData.contactPersonName || !contactPersonData.contactPersonNumber || !posLocationImage || !eSign
  console.log('fieldvalidator', fieldvalidator)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Additional Details'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={{ marginBottom: 2 }}>
            <InputText
              value={contactPersonData.contactPersonName}
              placeholder={'Enter contact person name'}
              onChangeText={(text: string) => formDataHandler('contactPersonName', text)}
            />
          </View>
          <View style={{ marginBottom: 2 }}>
            <InputText
            
            value={contactPersonData.contactPersonNumber}
              placeholder={'Enter contact person number'}
              onChangeText={(text: string) => formDataHandler('contactPersonNumber', text)}
              keyboardType="numeric"
            />
          </View>

          {/* <View style={{ margin: 5 }}>
          <LocationBtn title={'Get POS Location'} onPress={requestLocationPermission} />
          {location && (
            <Text style={{ color: 'black', margin: 10 }}>
              Your Current location: Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          )}
          {locationError && <Text style={styles.errorText}>{locationError}</Text>}
        </View> */}

          {/* POS Location Image Upload */}
          <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
            {posLocationImage ? (
              <Pressable onPress={() => setPosLocationImage(null)}>
                <Image source={{ uri: posLocationImage.uri }} style={{ height: 200, width: '100%',borderRadius:20,borderColor: 'black',borderWidth: 1 }} />
              </Pressable>
            ) : (
              <UploadDoc
                text={'Upload POS Location Image'}
                setUploadFile={(source: any) => fileUploadHandler('POS Location', source)}
                backgroundType={'POS'}
                uploadDoc={true}
              />
            )}
          </View>

          {/* E-sign Image Upload */}
          <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
            {eSign ? (
              <Pressable onPress={() => setESign(null)}>
                <Image source={{ uri: eSign.uri }} style={{ height: 200, width: '100%',borderRadius:20,borderColor: 'black',borderWidth: 1 }} />
              </Pressable>
            ) : (
              <UploadDoc
                text={'Upload E-sign'}
                setUploadFile={(source: any) => fileUploadHandler('E-Sign', source)}
                backgroundType={'E-Sign'}
                uploadDoc={true}
              />
            )}
          </View>
          <View style={styles.bottomContainer}>
            <PrimaryBtn
              title={'Next'}
              disabled={fieldvalidator}
              onPress={() => props.navigation.navigate('consentForm', {
                adharResData: adharResData,
                contactPersonData: contactPersonData,
                location: location,
                posLocationImage: posLocationImage,
                eSign: eSign
              })}
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%'
  },
  label: {
    fontWeight: '400',
    fontSize: isTablet ? 20 : 16,
    lineHeight: 19,
    color: '#000000',
    marginBottom: 10
  },
  errorText: {
    padding: '0%',
    paddingHorizontal: '2%',
    color: '#FF0000'
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 20
  }
})

export default AdditionalDetails