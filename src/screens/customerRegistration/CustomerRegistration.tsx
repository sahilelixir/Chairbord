import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getCache } from '../../helper/Storage';
import OverlayHeader from '../../components/OverlayHeader';
import SelectField from '../../components/common/SelectFieldBig';
import PrimaryBtn from '../../components/common/PrimaryBtn';
import CustomInputText from '../../components/common/CustomInputText';
import { client } from '../../client/Axios';
import showAlert from '../../utils/showAlert';

const CustomerRegistration = (props: any) => {
  const { otpData, response, customerId } = props.route.params;
  console.log(otpData, 'response');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [documentType, setDocumentType] = useState({
    docType: 1,
    docNo: '',
    expiryDate: ''
  });

  const handleDateChange = (text: string, field: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned?.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    }
    if (cleaned?.length >= 5) {
      cleaned = cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    }
    if (field === "dateOfBirth") {
      setDateOfBirth(cleaned);
    } else if (field === "expiryDate") {
      setExpiryDate(cleaned);
    }
  };

  const requestTypeDropdownData = [
    { title: 'Pancard', docType: 1 },
    { title: 'Driving License', docType: 2 },
    { title: 'Voter Id Card', docType: 3 },
    { title: 'Passport', docType: 4 },
  ];

  const setDocumentDetails = (newDocType: number) => {
    setDocumentType(prevState => ({
      ...prevState,
      docType: newDocType
    }));
  };

  const getSessionId = async () => {
    const session = await getCache('session');
    setSessionId(session);
  };

  useEffect(() => {
    getSessionId();
  }, [sessionId]);

  const cusRegApi = async () => {
    const mobile = response?.custDetails.mobileNo;
    setLoading(true);
    const requestBodyData = {
      sessionId: sessionId,
      custDetails: {
        name: customerFirstName,
        lastName: customerLastName || '',
        mobileNo: mobile,
        dob: dateOfBirth,
        doc: [
          {
            ...documentType
          }
        ],
        udf1: "Sample UDF1",
        udf2: "Sample UDF2",
        udf3: "Sample UDF3",
        udf4: "Sample UDF4",
        udf5: "Sample UDF5"
      }
    }
    console.log(`[request body] [${JSON.stringify(requestBodyData)}]`)

    try {
      const res = await client.post('/bajaj/createWallet', requestBodyData);
      console.log(`[request res] [${JSON.stringify(res)}]`)

      // Navigate to the next screen if everything is fine
      props.navigation.navigate('imageGallary', {
        sessionId: await getCache('session'),
        response: response,
        customerId: customerId,
        CusRegData: res,
        otpData: otpData
      });
    }

    catch (error: any) {
      showAlert(error?.response?.data?.error?.errorDesc || error?.response?.data?.error?.msg || 'Customer registration failed',
        () => setLoading(false));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Customer Registration'}
        navigateTo={() => props.navigation.goBack()}
      />
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.mobileInputField}>
          <View>
            <CustomInputText
              style={styles.countryCodeInput}
              placeholder={'+91'}
              placeholderTextColor={'#000'}
              maxLength={3}
              isEditable={false}
            />
          </View>
          <View style={{ flex: 8 }}>
            <CustomInputText
              placeholder={'Enter mobile number'}
              value={otpData?.validateOtpResp?.custDetails?.mobileNo}
              onChangeText={(txt: string) => setMobile(txt)}
              secure={false}
              isEditable={false}
            />
          </View>
        </View>
        <View style={{ padding: "5%" }}>
          <View style={{ marginBottom: "5%" }}>
            <CustomInputText
              placeholder={'First Name'}
              value={customerFirstName}
              onChangeText={(txt: string) => setCustomerFirstName(txt?.toUpperCase())}
              secure={false}
            />
          </View>
          <CustomInputText
            placeholder={'Surname'}
            value={customerLastName}
            onChangeText={(txt: string) => setCustomerLastName(txt?.toUpperCase())}
            secure={false}
          />

        </View>
        <>
          <Text style={styles.label}>Enter date of birth</Text>
          <View style={{ paddingHorizontal: "5%", paddingBottom: "5%" }}>
            <CustomInputText
              placeholder='DD-MM-YYYY'
              placeholderTextColor='#263238'
              style={styles.dateInput}
              value={dateOfBirth}
              onChangeText={(text) => handleDateChange(text, 'dateOfBirth')}
              keyboardType='numeric'
              maxLength={10}
            />
          </View>
        </>

        <Text style={styles.label}>Pan Number</Text>
        <View style={{ paddingHorizontal: "5%", paddingBottom: "5%" }}>
          <CustomInputText
            placeholder={'Enter Pan Card number'}
            value={documentType.docNo}
            onChangeText={(text: string) => setDocumentType(prevState => ({
              ...prevState,
              docNo: text?.toUpperCase()
            }))}
            secure={false}
          />
        </View>
        {documentType.docType === 2 || documentType.docType === 4 ? (
          <>
            <Text style={styles.label}>Enter Expiry Date</Text>
            <View style={{ paddingHorizontal: "5%" }}>
              <CustomInputText
                placeholder='DD-MM-YYYY'
                placeholderTextColor='#263238'
                style={styles.dateInput}
                value={expiryDate}
                onChangeText={(text) => handleDateChange(text, 'expiryDate')}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
          </>
        ) : null}

        <View style={{ alignItems: "center", paddingBottom: "5%" }}>
          <PrimaryBtn
            title={'Next'}
            onPress={() => cusRegApi()}
            disabled={undefined}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: '5%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
  mobileInputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1,
    padding: "5%"
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '3%',
    paddingHorizontal: '5%',
  },
  dateInput: {
    borderColor: '#263238',
    borderWidth: 1,
    color: '#000000',
    width: '70%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: '5%',
    backgroundColor: '#F3F3F3',
    textAlign: 'center'
  },
  countryCodeInput: {
    borderWidth: 1,
    borderColor: '#263238',
    padding: '4%',
    marginTop: '30%',
    textAlign: 'center',
    borderRadius: 15,
    color: '#263238'
  },
});

export default CustomerRegistration;
