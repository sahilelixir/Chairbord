import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native'
import VerticalDivider from '../../components/common/VerticalDivider'
import axios from 'axios'
import { Buffer } from 'buffer';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFS from 'react-native-fs';
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;
const IssuanceCards = ({ data }) => {
  // commision icons
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [singleReportData, setSingleReportData] = useState(data)

  const pendingCommisionIcon = require('../../assets/commision/commissionPending.png')
  const commisionDeniedIcon = require('../../assets/commision/commissionDenied.png')
  const commisionApprovedIcon = require('../../assets/commision/commsionApprove.png')
  const commisionPartaillyPaidIcon = require('../../assets/commision/partialCommission.png')

  // const handleReportdata=async()=>{
  //   setModalVisible(true);
  // }

  const reportDetailsData = [
    {
      title: 'Customer Name',
      value: singleReportData?.customerName || 'N/A'
    },
    {
      title: 'Customer ID',
      value: singleReportData?.BajajCustomerDetailId || 'N/A'
    },
    {
      title: 'Vehicle Number',
      value: singleReportData?.BajajVehicleDetailsId || 'N/A'
    },
    {
      title: 'Tag Serial Number',
      value: singleReportData?.tagSerialNumber || 'N/A'
    },
    {
      title: 'Vehicle Class',
      value: singleReportData?.vehicleClass || 'N/A'
    },
    {
      title: 'Engine Number',
      value: singleReportData?.engineNumber || 'N/A'
    },
    {
      title: 'Commercial Status',
      value: singleReportData?.commercialStatus || 'N/A'
    },
    {
      title: 'Chassis Number',
      value: singleReportData?.chassisNumber || 'N/A'
    }
  ]

  async function modifyImage(imageURL) {
    try {
      // Fetch the image as an array buffer
      const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
      console.log(response, "response here")
      const fileBuffer = Buffer.from(response && response?.data, 'binary');

      // Convert to base64
      let base64Data = fileBuffer?.toString('base64');
      base64Data = base64Data.replace("dataimage/jpegbase64", '');
      // Construct the full data URL
      const dataURL = `data:image/png;base64,${base64Data}`;
      return dataURL;
    } catch (error) {
      console.error('Error processing the image:', error);
      return null;
    }
  }

  const images = singleReportData?.customerDetail?.vehicles[0]?.fastTags[0];

  console.log(images, "images here")

  const processImages = async () => {
    if (images.TAGaFixImage) {
      images.TAGaFixImage = await modifyImage(images.TAGaFixImage);
    }

    if (images.rcImageBack) {
      images.rcImageBack = await modifyImage(images.rcImageBack);
    }

    if (images.rcImageFront) {
      images.rcImageFront = await modifyImage(images.rcImageFront);
    }

    if (images.vehicleImageFront) {
      images.vehicleImageFront = await modifyImage(images.vehicleImageFront);
    }

    if (images.vehicleImageSide) {
      images.vehicleImageSide = await modifyImage(images.vehicleImageSide);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("data here")
      processImages();
    }
  }, [data])


  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to download images',
          }
        );
        console.log(granted, "permission granted");
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log("error in permission")
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    console.log("permisssion called _________")
    requestStoragePermission();
  }, []);

  const downloadImage = async () => {

    if (!hasPermission) {
      Alert.alert('Error', 'Storage permission is required.');
      return;
    }

    if (images?.rcImageFront) {
      const imageURI = images.rcImageFront;
      const fileName = imageURI.split('/').pop(); // Get the image name from the URI
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`; // Path to save the image

      try {
        const result = await RNFS.downloadFile({
          fromUrl: imageURI,
          toFile: downloadDest,
        }).promise;

        if (result && result.statusCode === 200) {
          Alert.alert('Success', 'Image downloaded successfully!');
        } else {
          Alert.alert('Error', 'Failed to download the image.');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred while downloading the image.');
      }
    } else {
      Alert.alert('Error', 'No image URI found.');
    }
  };


  function formatDate(isoString) {
    const date = new Date(isoString)

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2) // Get last two digits of the year

    // Return formatted date
    return `${day}/${month}/${year}`
  }

  function formatTime(isoString) {
    const date = new Date(isoString)

    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0') // Get minutes and pad with zero

    // Determine AM/PM and convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12' // Convert 0 hour to 12

    // Return formatted time
    return `${hours}:${minutes} ${ampm}`
  }

  if (singleReportData?.commercialStatus === true) {
    console.log(singleReportData?.customerName)
  }


  const tagComm = singleReportData?.agent?.TagCommissions[0]
  const verificationStatus = singleReportData?.agent?.verificationStatus

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: `${data.ribbonBgColor}`,
          backgroundColor:
            singleReportData?.commercialStatus === true ? 'yellow' : 'white',
          padding: '4%',
          borderRadius: 10
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              // backgroundColor: `${'data.color'}`,
              backgroundColor: '#ff5733', // Example custom color (hex value)
              borderRadius: 50,
              marginRight: '5%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              width: 30
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19
              }}
            >
              {singleReportData?.vehicleClass}
            </Text>
          </View>


          <View>
            <Text style={styles.idText}>
              {singleReportData?.tagSerialNumber}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>
                {formatDate(singleReportData?.createdAt)}
              </Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>
                {formatTime(singleReportData?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        {/* 
        <View>
          <Text style={styles.amount}>
            {verificationStatus === 'verified' ? `₹ ${tagComm?.VC4}` : `₹0`}
          </Text>
        </View> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: '5%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ gap: 2 }}>
            <Text style={styles.nametext}>
              {singleReportData?.customerName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                borderWidth: 3,
                borderColor: '#000000',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
                marginTop: '3%',
                backgroundColor: `${data.isCommercial ? '#FAFF00' : '#FFFFFF'}`,
                alignSelf: 'flex-start' // Allows the container to wrap around the content
              }}
            >
              <Image
                source={require('../../assets/commision/indNamePlate.png')}
              />
              <Text style={styles.vehicletext}>
                {singleReportData?.BajajVehicleDetailsId}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 12, justifyContent: 'flex-end' }}>
          {/* <Text style={styles.mobiletext}>9158628546</Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '3%'
            }}
          >
            <Image source={require('../../assets/bankIcon.png')} style={{ width: 24, height: 22 }} />
            <Text style={styles.bankText}> Bajaj </Text>
          </View>
        </View>
      </View>
      <View
        style={{ height: '0.3%', width: '100%', backgroundColor: '#959595' }}
      ></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '4%'
        }}
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/eyeIcon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Image
          source={
            data.status === 'Declined'
              ? commisionDeniedIcon
              : data.status === 'Pending'
                ? pendingCommisionIcon
                : data.status === 'Approved'
                  ? commisionApprovedIcon
                  : commisionPartaillyPaidIcon
          }
        />
        <Image source={require('../../assets/dangerPalm.png')} style={{ width: 25, height: 25 }} />
      </View>
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
            <ScrollView
              contentContainerStyle={{
                padding: 5,
                alignItems: 'center',
                gap: 10
              }}
            >
              <View style={styles.detailsSection}>
                <Text style={styles.label}>Report Details</Text>

                <View style={styles.dataContainer}>
                  {reportDetailsData &&
                    reportDetailsData.map((data, index) => (
                      <View style={styles.reportDetailsContainer} key={index}>
                        <Text style={styles.reportDetailsTitleText}>
                          {data.title}
                        </Text>
                        <Text style={styles.reportDetailsValueText}>
                          : {data.value}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              <View style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7 }}>
                <Text style={{ color: 'grey', fontWeight: '400', fontSize: isSmallScreen ? 14 : 16 }}>RC Front</Text>
                {images && images.rcImageFront ? (
                  <Image source={{ uri: images.rcImageFront }} style={{ width: isSmallScreen ? 290 : 345, height: 200, borderRadius: 20, borderColor: 'black', borderWidth: 1 }} />
                ) : (
                  <Text>No Image</Text>
                )}
                {/* <Button title="Download Image" onPress={downloadImage} /> */}
              </View>
              <View style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7 }}>
                <Text
                  style={{ color: 'grey', fontWeight: '400', fontSize: isSmallScreen ? 14 : 16 }}
                >
                  RC Back
                </Text>
                {
                  images && images?.rcImageBack ? <Image source={{ uri: images.rcImageBack }} style={{ width: isSmallScreen ? 290 : 345, height: 200, borderRadius: 20, borderColor: 'black', borderWidth: 1 }} /> : <Text>No Image</Text>
                }
              </View>
              <View style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7 }}>
                <Text
                  style={{ color: 'grey', fontWeight: '400', fontSize: isSmallScreen ? 14 : 16 }}
                >
                  Vehicle Front
                </Text>
                {
                  images && images?.vehicleImageFront ? <Image source={{ uri: images.vehicleImageFront }} style={{ width: isSmallScreen ? 290 : 345, height: 200, borderRadius: 20, borderColor: 'black', borderWidth: 1 }} /> : <Text>No Image</Text>
                }
              </View>
              <View style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7 }}>
                <Text
                  style={{ color: 'grey', fontWeight: '400', fontSize: isSmallScreen ? 14 : 16 }}
                >
                  Vehicle Side
                </Text>
                {
                  images && images?.vehicleImageSide ? <Image source={{ uri: images.vehicleImageSide }} style={{ width: isSmallScreen ? 290 : 345, height: 200, borderRadius: 20, borderColor: 'black', borderWidth: 1 }} /> : <Text>No Image</Text>
                }
              </View>
              <View style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7, marginBottom: 2 }}>
                <Text
                  style={{ color: 'grey', fontWeight: '400', fontSize: isSmallScreen ? 14 : 16 }}
                >
                  Tag Image
                </Text>
                {
                  images && images?.TAGaFixImage ? <Image source={{ uri: images.TAGaFixImage }} style={{ width: isSmallScreen ? 290 : 345, height: 200, borderRadius: 20, borderColor: 'black', borderWidth: 1 }} /> : <Text>No Image</Text>
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: '5%'
  },
  dateAndTimeText: {
    color: '#848484',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: -4
  },
  idText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16
  },
  amount: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24
  },
  bankText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 19,
    marginLeft: '5%'
  },
  orderIdText: {
    color: '#F0AC5C',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    marginTop: '10%'
  },
  stockText: {
    color: '#00C142',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    marginLeft: '5%'
  },
  vcText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19
  },
  nametext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19
  },
  vehicletext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19
  },
  mobiletext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: 10
  },
  modalText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: 10
  },

  label: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 20,
    color: '#000000',
    marginVertical: '4%'
  },
  detailsSection: {
    alignItems: 'center',
    marginTop: 3,

  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#263238',
    borderRadius: 20,
    padding: '5%',
    gap: 10,
  },
  reportDetailsTitleText: {
    color: 'grey',
    fontWeight: '400',
    fontSize: isSmallScreen ? 12 : 14,
    lineHeight: 16
  },
  reportDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1%'
  },
  reportDetailsValueText: {
    color: '#000000',
    width: isSmallScreen ? '60%' : '60%',
    fontWeight: '400',
    fontSize: isSmallScreen ? 12 : 14,
    lineHeight: 16
  },
  // ValueText: {
  //     color: "#000000",
  //     width: "45%",
  //     fontWeight: '400',
  //     fontSize: 14,
  //     lineHeight: 16
  // },
  closeButtonContainer: {
    position: 'absolute',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 30,
    width: 30,
    top: 15,
    right: 15,
    zIndex: 10
  },
  closeButton: {
    width: 15,
    height: 15
  }
})
export default IssuanceCards