import React, { useState } from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native'
import DocumentPicker from 'react-native-document-picker'

const DocumentUploadField = () => {
  const [selectedFile, setSelectedFile] = useState([1, 2, 3, 4])

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      })
      setSelectedFile(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <View
        style={{
          width: '105%',
          marginTop: '5%'
        }}
      >
        <View style={styles.uploadField}>
          <TouchableOpacity onPress={selectFile}>
            <View>
              <Text style={styles.inputText}>File Upload</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.limitText}>Maximum file upload limit 5 file</Text>

        {selectedFile &&
          selectedFile.map((files, index) => (
            <View key={index} style={styles.selectedFileStyle}>
              <View style={styles.previewFileStyle}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15
                  }}
                >
                  <Image
                    source={require('../../assets/screens/contactus/fileAttach.png')}
                  />
                  <Text style={styles.selectedFile}>
                    {selectedFile[0]?.name || 'img=2023-WA-20221.jpg'}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/screens/contactus/cross.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  selectedFile: {
    color: '#747474',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19
  },
  previewFileStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3D3',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10
  },
  uploadField: {
    borderWidth: 1,
    borderColor: '#263238',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: '2%',
    width: '95%'
  },
  inputText: {
    color: '#263238',
    alignItems: 'center'
  },
  uploadButton: {
    height: 40,
    backgroundColor: '#02546D',
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: 'white'
  },
  selectedFileStyle: {
    marginBottom: '3%'
  },
  limitText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'right',
    width: '90%',
    marginVertical: '2%'
  }
})

export default DocumentUploadField
