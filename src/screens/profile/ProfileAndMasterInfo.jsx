import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import OverlayHeader from '../../components/OverlayHeader';
import CardAccordian from '../../components/common/CardAccordian';
import CustomInputText from '../../components/common/CustomInputText';
import useUserData from '../../helper/useUserData';
import { client } from '../../client/Axios';
import { getCache } from '../../helper/Storage';

const ProfileAndMasterInfo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const isPartOfBottomNavigator = route.name === 'ProfileAndMasterInfo';
  const [userData, setUserData] = useState();
  
  const getUserDetails = async () => {
    try {
      const cachedData = await getCache('userData');
      const agentId = cachedData.user.id;
      const body = { agentId: agentId };
      const res = await client.post('/user/agent/mydata', body);
      console.log('User data response:', res.data);
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  
  useEffect(() => {
    console.log("UserData:", userData);
  }, [userData]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getUserDetails();
    } catch (error) {
      console.log('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const masterDetailData = [
    {
      title: 'Master name',
      value: userData?.master?.name || 'N/A'
    },
    {
      title: 'Mobile no.',
      value: userData?.master?.mobile_number || 'N/A'
    },
    {
      title: 'Email ID',
      value: userData?.master?.email_id || 'N/A'
    }
  ];

  const personalDetailsData = [
    {
      title: 'Agent Name',
      value: userData?.name || 'N/A'
    },
    {
      title: 'Mobile No.',
      value: userData?.mobile_number || 'N/A'
    },
    {
      title: 'Email ID',
      value: userData?.email_id || 'N/A'
    },
    {
      title: 'Date of Birth',
      value: userData?.date_of_birth || 'N/A'
    },
    {
      title: "Father's Name",
      value: userData?.father_name || 'N/A'
    },
    {
      title: 'Aadhar no.',
      value: userData?.id_proof_document_number || 'N/A'
    },
    {
      title: 'PAN no.',
      value: userData?.pan_card_number || 'N/A'
    },
    {
      title: 'Pos Location',
      value: userData?.pos_name || 'N/A'
    },
    {
      title: 'Assigned RM',
      value: userData?.regionalManager || 'N/A'
    },
    {
      title: 'Instant commission amount (VC4)',
      value: userData?.TagCommissions?.length > 0 
        ? JSON.stringify(userData.TagCommissions[0]?.VC4) || 'N/A' 
        : 'N/A'
    },
    {
      title: 'Tag cost amount (VC4)',
      value: userData?.TagCosts?.length > 0 
        ? JSON.stringify(userData.TagCosts[0]?.VC4) || 'N/A' 
        : 'N/A'
    }    
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isPartOfBottomNavigator && (
        <OverlayHeader title={'Profile'} showBackButton={true} />
      )}

      <ScrollView
        style={{ padding: '5%' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <CardAccordian
          title={'Master Details'}
          content={
            <View>
              {masterDetailData.map((data, index) => (
                <View key={index} style={{ marginBottom: 5, marginTop: -8 }}>
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false} />
                </View>
              ))}
            </View>
          }
        />
        <CardAccordian
          title={'Personal Details'}
          content={
            <View>
              {personalDetailsData.map((data, index) => (
                <View key={index} style={{ marginBottom: 5, marginTop: -8 }}>
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false} />
                </View>
              ))}
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const InputSubText = ({ text }) => {
  return (
    <View>
      <Text style={{ color: '#828282', fontSize: 14, fontWeight: '400', marginVertical: 10, marginLeft: '2%' }}>
        {text}
      </Text>
    </View>
  );
};

export default ProfileAndMasterInfo;
