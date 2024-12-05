import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  RefreshControl,
  StyleSheet,
  Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import SelectFieldSmall from '../../components/common/SelectFieldSmall'
import { IssuanceTrackerData, bankName } from './IssuanceTrackerData'
import ExcelButton from '../../components/ui/ExcelButton'
import IssuanceCards from './IssuanceCards'
import OverlayHeader from '../../components/OverlayHeader'
import { getCache } from '../../helper/Storage'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width < 400;
const IssuanceTracker = () => {
  const [showIssuanceModal, setShowIssuanceModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [agentId, setAgentId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [issuanceData, setIssuanceData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      IssuanceTracker()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const fetchReports = async (id) => {
    setLoading(true);
    try {
      const res = await client.get(`/reports/reports/agent/${id}`);
      // console.log(res.data.reports[0].customerDetail.vehicles[0].fastTags[0].TAGaFixImage, 'Response data');
      console.log(res, "data res");
      setIssuanceData(res && res.data.reports);
    } catch (error) {
      // Check if the error response exists and has a message
      const errorMessage = error.response?.data?.error || 'Reports not found';
      console.error('Error fetching reports:', errorMessage);
      alert(errorMessage); // Display the error message from the backend
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const getUserDataFromCache = async () => {
      const userData = await getCache('userData')
      if (userData?.user?.id) {
        setAgentId(userData.user.id)
      } else {
        console.log('User data not found')
      }
    }

    getUserDataFromCache()
  }, [])

  useEffect(() => {
    if (agentId) {
      fetchReports(agentId)
    }
  }, [agentId])

  return (
    <>
      {loading && <Loader loading={loading} />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OverlayHeader title={'Issuance Tracker'} showBackButton={true} />
        <View style={{ paddingHorizontal: '5%', paddingVertical: '1%' }}>
          <View style={styles.searchAndfilter}>
            <View style={styles.searchField}>
              <Image
                source={require('../../assets/screens/wallet/search.png')}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={'#9A9A9A'}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <Pressable
              onPress={() => setShowIssuanceModal(true)}
              style={styles.filterLogo}
            >
              <Image source={require('../../assets/screens/wallet/filterLogo.png')} style={{ height: 25, width: 25 }} />
            </Pressable>
          </View>
          <View style={styles.divider}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ width: '70%', marginEnd: '2%' }}>
              <SelectFieldSmall title={'Select Bank'} dataToRender={bankName} />
            </View>
            <ExcelButton
              title={'Excel'}
              style={{ justifyContent: 'center', padding: 10 }}
            />
          </View>

          <View style={{ marginTop: '5%' }}>
            {issuanceData.map((data, index) => (
              <IssuanceCards key={index} data={data} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '80%',
    gap: 10,
    marginTop: '5%',
    paddingVertical: 1
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    width: isSmallScreen ? '78%' : '82%',
    borderColor: '#858585',
    paddingHorizontal: 20,
    paddingVertical: 0
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000'
  },
  filterLogo: {
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 50,
    padding: 12,
  },
  divider: {
    height: 0.7,
    backgroundColor: '#4C6470',
    marginVertical: '5%'
  },
})

export default IssuanceTracker
