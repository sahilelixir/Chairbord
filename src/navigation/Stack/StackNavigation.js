import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../Drawer/CustomDrawer';
import DrawerHeader from '../../components/DrawerHeader';
import OverlayHeader from '../../components/OverlayHeader';
import HomeScreen from '../../components/HomeScreen';
import FastTagAndGps from '../../components/FastTagAndGps';
import HistoricalData from '../../components/HistoricalData';
import SmsAlert from '../../components/SmsAlert';
import SaveFuelAndTime from '../../components/SaveFuelAndTime';
import Permissions from '../../components/permissions';
import SignIn from '../../screens/SignIn';
import OTP from '../../screens/opt/OTP';
import Register from '../../screens/register/Register';
import ForgetYourPassword from '../../screens/ForgetYouPassword/ForgetYourPassword';
import PrivacyPolicy from '../../screens/privacyPolicy/PrivacyPolicy';
import TermsAndCondition from '../../screens/termsAndCondition/TermsAndCondition';
import WalletDetails from '../../screens/walllet/WalletDetails';
import TopupWallet from '../../screens/walllet/TopupWallet';
import OrderSummary from '../../screens/order/OrderSummary';
import Order from '../../screens/order/Order';
import Acknowledgement from '../../screens/order/acknowledgement/Acknowledgement';
import OrderDetails from '../../screens/order/OrderDetails';
import OrderSavedAddresses from '../../screens/order/OrderSavedAddresses';
import Mobileverification from '../../screens/mobileVerfication/Mobileverification';
import CustomerRegistration from '../../screens/customerRegistration/CustomerRegistration';
import ImageCollection from '../../screens/tagRegistration/ImageCollection';
import TagRegistration from '../../screens/tagRegistration/TagRegistration';
import TagReplacement from '../../screens/tagReplacement/TagReplacement';
import TagReplacementForm from '../../screens/tagReplacement/TagReplacementForm';
import RegisterVerifyOtp from '../../screens/opt/RegisterVerifyOtp';
import AdditionalDetails from '../../screens/profile/additionalDetails';
import ConsentForm from '../../screens/profile/consentForm';
import Wallet from '../../screens/walllet/Wallet';
import IssuanceTracker from '../../screens/IssuanceTracker/IssuanceTracker';
import Inventory from '../../screens/inventory/Inventory';
import Request from '../../screens/requests/Request';
import ContactUs from '../../screens/contactUs/ContactUs';
import AadharAndPanVerification from '../../screens/profile/aadharAndPanVerification';
import ProfileAndMasterInfo from '../../screens/profile/ProfileAndMasterInfo';
import SbiFastagRegistration from '../../screens/sbi/SbiFastagRegistration';
import SbiFastagRegistration2 from '../../screens/sbi/SbiFastagRegistration2';
import SbiImageCollection from '../../screens/sbi/SbiImageCollection';
import SbiProcessing from '../../screens/sbi/SbiProcessing';
import SbiResult from '../../screens/sbi/SbiResult';
import Dashboard from '../../screens/dashboard/Dashboard';
import LogoutModal from '../../screens/logout/LogoutModal';
import OrderCards from '../../screens/order/OrderCards';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="sbi" component={SbiFastagRegistration} options={{ headerShown: false }} />
      <Stack.Screen name="sbi2" component={SbiFastagRegistration2} options={{ headerShown: false }} />
      <Stack.Screen name="sbi3" component={SbiImageCollection} options={{ headerShown: false }} />
      <Stack.Screen name="sbi4" component={SbiProcessing} options={{ headerShown: false }} />
      <Stack.Screen name="sbi5" component={SbiResult} options={{ headerShown: false }} />
      <Stack.Screen name="FastTagAndGPS" component={FastTagAndGps} options={{ headerShown: false }} />
      <Stack.Screen name="permissions" component={Permissions} options={{ headerShown: false }} />
      <Stack.Screen name="HistoricalData" component={HistoricalData} options={{ headerShown: false }} />
      <Stack.Screen name="SmsAlert" component={SmsAlert} options={{ headerShown: false }} />
      <Stack.Screen name="SaveFuelAndTime" component={SaveFuelAndTime} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="walletDetails" component={WalletDetails} options={{ headerShown: false }} />
      <Stack.Screen name="wallet" component={Wallet} options={{ headerShown: false }} />
      <Stack.Screen name="topupWallet" component={TopupWallet} options={{ headerShown: false }} />
      <Stack.Screen name="tagRegistration" component={TagRegistration} options={{ headerShown: false }} />
      <Stack.Screen name="tagReplacement" component={TagReplacement} options={{ headerShown: false }} />
      <Stack.Screen name="tagReplacementForm" component={TagReplacementForm} options={{ headerShown: false }} />
      <Stack.Screen name="issuanceTracker" component={IssuanceTracker} options={{ headerShown: false }} />
      <Stack.Screen name="orderDescription" component={OrderSummary} options={{ headerShown: false }} />
      <Stack.Screen name="forgetYourPassword" component={ForgetYourPassword} options={{ headerShown: false }} />
      <Stack.Screen name="drawer" component={Dashboard} options={{ header: () => <DrawerHeader /> }} />
      <Stack.Screen name="customerRegistration" component={CustomerRegistration} options={{ headerShown: false }} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="termsAndCondition" component={TermsAndCondition} options={{ headerShown: false }} />
      <Stack.Screen name="additionalDetails" component={AdditionalDetails} options={{ headerShown: false }} />
      <Stack.Screen name="consentForm" component={ConsentForm} options={{ headerShown: false }} />
      <Stack.Screen name="orders" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="inventory" component={Inventory} options={{ headerShown: false }} />
      <Stack.Screen name="requests" component={Request} options={{ headerShown: false }} />
      <Stack.Screen name="contactUs" component={ContactUs} options={{ headerShown: false }} />
      <Stack.Screen name="acknowledgement" component={Acknowledgement} options={{ headerShown: false }} />
      <Stack.Screen name="aadharAndPanVerification" component={AadharAndPanVerification} options={{ headerShown: false }} />
      <Stack.Screen name="profileAndMasterInfo" component={ProfileAndMasterInfo} options={{ headerShown: false }} />
      <Stack.Screen name="orderDetails" component={OrderDetails} options={{ headerShown: false }} />
      <Stack.Screen name="mobileVerification" component={Mobileverification} options={{ headerShown: false }} />
      <Stack.Screen name="imageGallary" component={ImageCollection} options={{ headerShown: false }} />
      <Stack.Screen name="registerVerifyOtp" component={RegisterVerifyOtp} options={{ headerShown: false }} />
      <Stack.Screen name="logoutModal" component={LogoutModal} options={{ headerShown: false }} />
      <Stack.Screen name="OrderSavedAddresses" component={OrderSavedAddresses} options={{ headerShown: false }} />
      <Stack.Screen name="OrderCards" component={OrderCards} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

// Drawer Navigator
const AppNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeStack" component={StackNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="logoutModal" component={LogoutModal} options={{ headerShown: false }} />
      <Drawer.Screen name="requests" component={Request} options={{ header: () => <OverlayHeader title={"Requests"} />}} />
      <Drawer.Screen name="orderSummary" component={OrderSummary} options={{ header: () => <OverlayHeader title={'Order Summary'} /> }} />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
