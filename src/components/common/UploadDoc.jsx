import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from 'react-native'
import React, { FC } from 'react';
import pickImage from '../../helper/pickImage'
import pickdoc from '../../helper/pickdoc'

interface interfaceUploadDocProps {
  text: string,
  setUploadFile: (file: any) => void,
  backgroundType?: string,
  uploadDoc?: boolean
}

const UploadDoc: FC<interfaceUploadDocProps> = ({
  text,
  setUploadFile,
  backgroundType,
  uploadDoc = false
}) => {
  const pickData = async (uploadDocType) => {
    if (uploadDocType) {
      const file = await pickdoc()
      if (file) {
        console.log('Document selected:', file)
        setUploadFile(file)
      }
    } else {
      const file = await pickImage()
      if (file) {
        console.log('Image selected:', file)
        setUploadFile(file)
      }
    }
  }

  // Define the background image based on the component type
  const getBackgroundImage = () => {
    switch (backgroundType) {
      case 'RC':
        return require('../../assets/Background/rc.webp') // Path to RC background image
      case 'FASTAG':
        return require('../../assets/Background/fastag-1.png') // Path to FASTag background image
      case 'Vehicle-Front':
        return require('../../assets/Background/bgremove-front.png')
      case 'Vehicle-Side':
        return require('../../assets/Background/bgremove-side.png')
      case 'Pan-Card':
        return require('../../assets/Background/pan.jpg')
      case 'Aadhar-Card':
        return require('../../assets/Background/aadhar.png')
      case 'POS':
        return require('../../assets/Background/pos.jpg')
      case 'E-Sign':
        return require('../../assets/Background/e-sign.jpg')
      default:
        return require('../../assets/uploadLogo.png') // Default background image
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => pickData(uploadDoc)}
      >
        <ImageBackground
          source={getBackgroundImage()}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 20 }} // Add border radius to the background image
        >
          {/* Overlay to enhance logo visibility */}
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Image
                source={require('../../assets/uploadLogo.png')}
                style={styles.uploadLogo}
              />
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    height: 100,
    width: 'auto',
    borderWidth: 1
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    width: '99%',
    height: '97%',
    margin: 1,
    borderRadius: 20
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, .8)', // Semi-transparent white overlay
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  content: {
    alignItems: 'center'
  },
  uploadLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center'
  }
})

export default UploadDoc