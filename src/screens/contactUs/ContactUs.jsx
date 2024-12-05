import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView,StyleSheet,RefreshControl, Image, Pressable } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation, useRoute } from '@react-navigation/native';
import { client } from '../../client/Axios';
import { getCache } from '../../helper/Storage';
import DescriptionInputField from '../../components/common/DescriptionInputField'
import DocumentUploadField from '../../components/common/UploadField'
import SecondaryButton from '../../components/common/SecondaryButton'
import ContactUsModal from './ContactUsModal'
import OverlayHeader from '../../components/OverlayHeader'

const ContactUs = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // Get navigation object
  const route = useRoute(); // Get route object
  const isPartOfBottomNavigator = route.name === 'ContactUs';

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // await getWalletDetails();
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setRefreshing(false);
    }
  };
  const requestTypeDropdownData = [
    { title: 'card' },
    { title: 'upi' },
    { title: 'card' },
    { title: 'GPS' },
    { title: 'card' }
  ]

  const handleSubmit = () => {
    setModalVisible(true)
  }

  return (
    <ScrollView 
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
    {!isPartOfBottomNavigator && (
        <OverlayHeader
          title={'Contact Us'}
          showBackButton={true}
        />
      )}
    <View style={styles.container}>
      <Text style={styles.dropdownLabel}>Request Type</Text>

      <View style={styles.dropdownStyle}>
        <SelectDropdown
          data={requestTypeDropdownData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) ||
                    'Select request type'}
                </Text>
              </View>
            )
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' })
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            )
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <Image
          source={require('../../assets/screens/contactus/arrowBottom.png')}
        />
      </View>

      <DescriptionInputField />
      <DocumentUploadField />

      <Pressable>
        <SecondaryButton
          title={'Submit'}
          width={'100%'}
          onPress={handleSubmit}
        />
      </Pressable>

      {/* modal */}
      <ContactUsModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%'
  },
  dropdownLabel: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginBottom: '3%'
  },
  dropdownButtonStyle: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#263238'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26'
  },
  dropdownStyle: {
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ContactUs
