import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import OverlayHeader from '../../components/OverlayHeader'
import { client } from '../../client/Axios'
import SecondaryButton from '../../components/common/SecondaryButton'
import { captureScreen } from 'react-native-view-shot'
import Loader from '../../components/ui/Loader'

const ConsentForm = (props: any) => {
  const { adharResData, contactPersonData, location, posLocationImage, eSign } =
    props.route.params
  console.log(eSign, 'eSign')
  const [isExpanded, setIsExpanded] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [screenShotImage, setScreenShotImage] = useState<any>(null)

  const takeScreenShot = async () => {
    try {
      const uri = await captureScreen({
        format: 'png',
        quality: 0.8
      })

      const source = {
        uri: uri,
        type: 'image/png',
        name: 'consent.png'
      }

      setScreenShotImage(source)
      return source
    } catch (error) {
      console.error('Oops, snapshot failed', error)
    }
  }

  const handleSendData = async () => {
    console.log('handleSendData stated')
    if (!isChecked) {
      Alert.alert('Success', 'Please check the checkbox ', [
        {
          text: 'Ok',
          onPress: () => console.log('OK Pressed')
        }
      ])
      return
    }

    setLoading(true)
    const consentScreenShot = await takeScreenShot()
    console.log('consentScreenShot', consentScreenShot)
    try {
      const form = new FormData()
      console.log(form, 'form')

      form.append('contact_person_name', contactPersonData?.contactPersonName)
      form.append(
        'contact_person_mobile_number',
        contactPersonData?.contactPersonNumber
      )
      form.append('latitude', location?.latitude)
      form.append('longitude', location?.longitude)
      form.append('e_sign_photo', eSign)
      form.append('pos_proof_photo', posLocationImage)
      form.append('consent_form', consentScreenShot)

      const response = await client.post('/cashfree/e-sign', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setModalVisible(true)
    } catch (error) {
      console.error('Something went wrong:', error)
      Alert.alert('Error', 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleCheckBox = () => {
    setIsChecked(!isChecked)
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <OverlayHeader title={'Consent Form'} />
      {loading && <Loader loading={loading} />}
      <View style={styles.container}>
        {/* Form content */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.heading}>Name:</Text>
          <Text style={styles.name}>{adharResData?.name || 'XYZ name'}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.heading}>Aadhar Number:</Text>
          <Text style={styles.aadhar}>
            {adharResData?.adhar_number || 'XXXX-XXXX-XXXX'}
          </Text>
        </View>

        <View style={styles.consent}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.heading}>Consent:</Text>
            <Text style={styles.consentHeading}>
              Acknowledgement of Terms regarding employment with Chairbord Pvt.
              Ltd.
            </Text>
          </View>

          {isExpanded && (
            <View style={styles.consentList}>
              {/* Consent items */}
              <Text style={styles.consentItem}>
                1. I affirm that all the information and authorizations provided
                by me are accurate.
              </Text>
              <Text style={styles.consentItem}>
                2. I commit to performing my duties with integrity and accept
                full responsibility for any issues caused to customers due to my
                mistakes.
              </Text>
              <Text style={styles.consentItem}>
                3. I shall provide accurate and truthful information and will
                ensure that all required documents are submitted appropriately
                throughout the work process for all products.
              </Text>
              <Text style={styles.consentItem}>
                4. I accept full responsibility for any products distributed to
                me by the company and will compensate the company for any losses
                incurred due to damage or loss of products (with the
                office-issued voucher serving as proof).
              </Text>
              <Text style={styles.consentItem}>
                5. I acknowledge that I am responsible for any unauthorized
                transactions and will bear the penalties imposed by the company.
              </Text>
              <Text style={styles.consentItem}>
                6. I agree to follow the company’s commission plan and
                procedures. In the event of any discrepancies related to the
                commission plan, I understand that I may raise a formal
                complaint only within 15 days from the date of the commission
                issuance.
              </Text>
              <Text style={styles.consentItem}>
                7. I understand that the company reserves the right to impose
                valid penalties on me at any time.
              </Text>
              <Text style={styles.consentItem}>
                8. I will comply with all the company’s terms and conditions, as
                well as its privacy policy. Any breach on my part may result in
                strict legal actions being taken against me by the company.
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleExpand}>
          <Text style={styles.readMore}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={handleCheckBox}
            style={styles.checkbox}
            tintColors={{ true: '#0066cc', false: '#999999' }}
          />
          <Text style={styles.checkboxText}>
            By signing this document, I hereby declare my commitment to adhering
            to all rules and regulations while working with Chairbord Pvt. Ltd.
            and acknowledge that any violation of these terms may result in
            legal action by the company.
          </Text>
        </View>

        {/* Show screenshot if taken */}
        {screenShotImage && (
          <Image
            source={{ uri: screenShotImage.uri }}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 20,
              borderColor: 'black',
              borderWidth: 1
            }}
          />
        )}

        {/* E-sign image */}
        <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
          {eSign && (
            <Image
              source={{ uri: eSign.uri }}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 20,
                borderColor: 'black',
                borderWidth: 1
              }}
            />
          )}
        </View>
      </View>

      {/* Submit button */}
      <View style={styles.bottomContainer}>
        <SecondaryButton
          title={'Submit'}
          onPress={handleSendData}
          disabled={!isChecked || loading} // Disable if not checked or loading
          buttonStyle={{
            backgroundColor: isChecked ? '#0066cc' : '#d3d3d3' // Change color based on checkbox
          }}
        />
      </View>

      {/* Success Modal */}
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
              Your profile is updated and under review
            </Text>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('home')}
              style={styles.okButton}
            >
              <Text style={styles.okButtonText}>{'OK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  /* Styles */
  container: {
    padding: 20
  },
  name: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black'
  },
  aadhar: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black'
  },
  consentHeading: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black',
    width: '80%'
  },
  consent: {
    marginBottom: 10,
    color: 'black'
  },

  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  readMore: {
    color: 'blue',
    fontSize: 16
  },
  consentList: {
    marginTop: 10
  },
  consentItem: {
    fontSize: 14,
    lineHeight: 24,
    marginVertical: 5,
    color: 'black',
    textAlign: 'justify'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  checkbox: {
    marginRight: 10,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'justify'
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20
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
    fontSize: 18,
    lineHeight: 24,
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

export default ConsentForm
