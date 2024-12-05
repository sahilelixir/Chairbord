import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Image
} from 'react-native'
import React from 'react'
import TagOfInput from '../../components/common/TagOfInput'
import CustomInputText from '../../components/common/CustomInputText'
import UploadDoc from '../../components/common/UploadDoc'
import SelectField from '../../components/common/SelectFieldBig'
import LinearButton from '../../components/common/LinearButton'
import {launchImageLibrary} from 'react-native-image-picker';
import InputText from '../../components/common/InputText'

const Step2 = ({
  registerCompleteData,
  formData,
  formDataHandler,
  handleFileUpload,
  files,
  setFiles
}) => {
  const pickImage = (key) => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };
        handleFileUpload(key, source);
      }
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <TagOfInput text="Address Detail" />
      <InputText
        placeholder="Enter address"
        value={formData.address}
        onChangeText={(value) => formDataHandler('address', value)}
      />
      <View style={{  }}>
        <InputText
          placeholder="Enter address line 2"
          value={formData.address2}
          onChangeText={(value) => formDataHandler('address2', value)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: '48%' }}>
          <InputText
            placeholder="Pincode"
            value={formData.pincode}
            onChangeText={(value) => formDataHandler('pincode', value)}
          />
        </View>
        <View style={{ width: '48%' }}>
          <InputText
            placeholder="City"
            value={formData.city}
            onChangeText={(value) => formDataHandler('city', value)}
          />
        </View>
      </View>
      <View style={{ }}>
        <InputText
          placeholder="Enter state"
          value={formData.state}
          onChangeText={(value) => formDataHandler('state', value)}
        />
      </View>
      <TagOfInput text="Document type" />

      <SelectField
        dataToRender={[
          { title: 'Aadhar Card', id: 1 },
          { title: 'Voter ID', id: 2 },
          { title: 'Passport', id: 3 }
        ]}
        title="Select document type"
        selectedValue={(value) => {
          formDataHandler('id_proof_document_type', value?.id)
        }}
      />
      <View style={{ }}>
        <InputText
          placeholder="Enter document number"
          value={formData.id_proof_document_number}
          onChangeText={(value) =>
            formDataHandler('id_proof_document_number', value)
          }
        />
      </View>

      <View style={{ marginTop: '5%' }}>
        <TagOfInput text="ID Proof" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: '20%',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ height: 150, width: '45%' }}>
          {files.id_proof_front_photo ? (
            <Pressable
              onPress={() => setFiles({ ...files, id_proof_front_photo: null })}
            >
              <Image
                source={{ uri: files.id_proof_front_photo.uri }}
                style={{ height: 150, width: '100%' }}
              />
            </Pressable>
          ) : (
            <UploadDoc
              text="Upload ID proof photo (front)"
              setUploadFile={() => pickImage('id_proof_front_photo')}
            />
          )}
        </View>
        <View style={{ height: 150, width: '45%' }}>
          {files.id_proof_back_photo ? (
            <Pressable
              onPress={() => setFiles({ ...files, id_proof_back_photo: null })}
            >
              <Image
                source={{ uri: files.id_proof_back_photo.uri }}
                style={{ height: 150, width: '100%' }}
              />
            </Pressable>
          ) : (
            <UploadDoc
              text="Upload ID proof photo (back)"
              setUploadFile={() => pickImage('id_proof_back_photo')}
            />
          )}
        </View>
      </View>

      <View>
        <Text
          style={{
            color: '#000000',
            fontWeight: '500',
            fontSize: 16,
            alignSelf: 'center',
            
          }}
        >
          I hereby accept all the{' '}
          <Text
            style={{
              color: '#0083FD',
              fontWeight: '500',
              fontSize: 16,
              alignSelf: 'center',
              
            }}
          >
            terms & conditions.
          </Text>
        </Text>
      </View>

      <View style={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}>
        <LinearButton title={'Submit'} onPress={() => registerCompleteData()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 200
  }
})

export default Step2
