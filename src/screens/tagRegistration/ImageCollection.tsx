import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import UploadDoc from '../../components/common/UploadDoc'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { client } from '../../client/Axios'
import showAlert from '../../utils/showAlert'
const { width, height } = Dimensions.get('window')
const isSmallScreen = width < 400;
const ImageCollection = (props: any) => {
  const { sessionId, customerId, CusRegData, otpData, userData } = props?.route?.params;
  const [loading, setLoading] = useState(false)
  const [imageGallaryData, setImageGallaryData] = useState<any>();
  console.log(imageGallaryData, "imageGallaryData");

  const renderImagePreview = (imageData: any, clearImage: any) => (
    imageData ? (
      <TouchableOpacity onPress={clearImage}>
        <Image
          source={{ uri: imageData.uri }}
          style={styles.previewImage}
        />
      </TouchableOpacity>
    ) : null
  );


  const handleImageSelected = async (key: string, file: File) => {
    console.log(file, "file");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('imageType', key);
      formData.append('file', file);
      formData.append('sessionId', sessionId);
      formData.append('customerId', customerId);
      formData.append('vehicleId', props?.route?.params?.response?.vrnDetails?.vehicleNo || userData?.vehicleNo?.toUpperCase());

      console.log(formData, "formData");
      const res = await client.post('/bajaj/uploadImages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data, "res");
      setImageGallaryData((prevState: any) => ({
        ...prevState,
        [key]: {
          imageType: key,
          image: file,
        },
      }));
    } catch (error: any) {
      showAlert(error.response?.data.message || error.response?.data.msg);
      console.log(error.response?.data || error.message, "error");
    } finally {
      setLoading(false);
    }
  };



  const allImagesSet = imageGallaryData?.RCFRONT && imageGallaryData?.RCBACK &&
    imageGallaryData?.VEHICLEFRONT && imageGallaryData?.VEHICLESIDE &&
    imageGallaryData?.TAGAFFIX;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Image Collection'}
        showBackButton={true}
      // navigateTo={() => props.navigation.goBack()}
      />
      {loading && (
        <Loader loading={loading} />
      )}

      <ScrollView>
        <View style={{ padding: "5%" }}>
          <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>RC copy photo</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ height: isSmallScreen ? 160 : 180, width: isSmallScreen ? 150 : 180, }}>
              {imageGallaryData && imageGallaryData?.RCFRONT ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, RCFRONT: null })}>
                <Image
                  source={{ uri: imageGallaryData?.RCFRONT?.image?.uri }}
                  style={{ height: isSmallScreen ? 160 : 180, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                />
              </Pressable> : <UploadDoc text={'Upload RC copy (Front)'} setUploadFile={(value) => handleImageSelected('RCFRONT', value)} backgroundType={"RC"} uploadDoc={true} />}
            </View>
            <View style={{ height: isSmallScreen ? 160 : 180, width: isSmallScreen ? 150 : 180, }}>
              {imageGallaryData && imageGallaryData?.RCBACK ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, RCBACK: null })}>
                <Image
                  source={{ uri: imageGallaryData?.RCBACK?.image?.uri }}
                  style={{ height: isSmallScreen ? 160 : 180, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                />
              </Pressable> : <UploadDoc text={'Upload RC copy (Back)'} setUploadFile={(value: any) => handleImageSelected('RCBACK', value)} backgroundType={"RC"} uploadDoc={true} />}
            </View>
          </View>

          <View style={{ marginTop: "5%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Vehicle image</Text>
            {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
            <View style={{ height: 200, width: "100%", marginBottom: "5%" }}>

              {imageGallaryData && imageGallaryData?.VEHICLEFRONT ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, VEHICLEFRONT: null })}>
                <Image
                  source={{ uri: imageGallaryData?.VEHICLEFRONT?.image?.uri }}
                  style={{ height: 200, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                />
              </Pressable> : <UploadDoc text={'Upload vehicle image (Front)'} uploadDoc={true} setUploadFile={(value: any) => handleImageSelected('VEHICLEFRONT', value)} backgroundType={"Vehicle-Front"} />}
            </View>

            <View style={{ height: 200, width: "100%", borderRadius: 20 }}>

              {imageGallaryData && imageGallaryData?.VEHICLESIDE ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, VEHICLESIDE: null })}>
                <Image
                  source={{ uri: imageGallaryData?.VEHICLESIDE?.image?.uri }}
                  style={{ height: 200, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                />
              </Pressable> : <UploadDoc text={'Upload vehicle image (Side)'} uploadDoc={true} setUploadFile={(value: any) => handleImageSelected('VEHICLESIDE', value)} backgroundType={"Vehicle-Side"} />}
            </View>
            {/* </View> */}
          </View>


          <View style={{ marginTop: "5%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Tag image</Text>

            <View style={{ height: 200, width: "100%", }}>
              {imageGallaryData && imageGallaryData?.TAGAFFIX ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, TAGAFFIX: null })}>
                <Image
                  source={{ uri: imageGallaryData?.TAGAFFIX?.image?.uri }}
                  style={{ height: 200, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                />
              </Pressable> : <UploadDoc text={'Upload Tag Image'} uploadDoc={true} setUploadFile={(value: any) => handleImageSelected('TAGAFFIX', value)} backgroundType={"FASTAG"} />}

            </View>

          </View>
        </View>

        <View style={{ alignItems: "center", paddingBottom: "5%" }}>
          <PrimaryBtn
            title={'Next'}
            onPress={() => props.navigation.navigate('tagRegistration', {
              sessionId: sessionId,
              imageGallaryData: imageGallaryData,
              response: props?.route?.params?.response,
              CustomerRegData: CusRegData?.data?.custDetails,
              otpData: otpData,
              userOtpData: userData
            })}
            disabled={!allImagesSet}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  previewImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default ImageCollection
