import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  Pressable,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import SearchBar from '../../components/common/SearchBar'
import InventoryCards from './InventoryCards'
import InventoryCardData from './InventoryCardData'
import LinearGradient from 'react-native-linear-gradient'
import InventoryFilterModal from './InventoryFilterModal'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import ExcelButton from '../../components/ui/ExcelButton'
import OverlayHeader from '../../components/OverlayHeader'
import useUserData from '../../helper/useUserData'
import Loader from '../../components/ui/Loader'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width < 400
const Inventory = (props) => {
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [inventoryCardData, setInventoryCardData] = useState([])
  // const [userData, setUserData] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation() // Get navigation object
  const route = useRoute() // Get route object

  const [loading, setLoading] = useState(false)
  const [tag_cost, setTag_Cost] = useState(null);

  const userData = useUserData()
  // console.log(userData?.user?.id, "user data")
  const agentId = userData?.user?.id

  const isPartOfBottomNavigator = route.name === 'Inventory'
  // console.log(inventoryCardData, 'inventoryCardData')
  const onRefresh = async () => {
    setRefreshing(true)
    // try {
    //   await getWalletDetails();
    // } catch (error) {
    //   console.log(error, 'error');
    // } finally {
    //   setRefreshing(false);
    // }
  }
  // const getUserData = async () => {
  //   let userData = await getCache('userData')
  //   setUserData(userData, 'userData')
  // }

  // const getInventory = async (userId) => {
  //   try {
  //     const response = await client.get(`/inventory/fastag/agent/${userId}`);
  //     console.log(response?.data?.data, 'Fetched Inventory Data'); // Check if data is being fetched
  //     setInventoryCardData(response?.data?.data || []); // Ensure fallback to an empty array
  //   } catch (error) {
  //     console.error(error, 'Error fetching inventory data');
  //   }
  // };

  const fetchInventory = async (id) => {
    console.log(id, "called")
    setLoading(true)
    try {
      console.log(agentId)
      const response = await client.get(
        `/inventory/fastag/agent/acknowledged-tags/${id}`
      )
      setInventoryCardData(response.data.tags)
      setTag_Cost(response.data.tagCost);
      // console.log(response.data, 'inventory here')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (agentId) {
      fetchInventory(agentId)
    }
  }, [agentId])

  return (
    <>
      {loading ? (
        <Loader loading={true} />
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!isPartOfBottomNavigator && (
            <OverlayHeader title={'Inventory'} showBackButton={true} />
          )}
          <View style={{ padding: '5%' }}>
            <SearchBar setShowInventoryModal={setShowInventoryModal} />

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View>
                  <Text style={styles.titleText}>Inventory</Text>
                </View>
                <ExcelButton
                  title={'Excel'}
                  style={{ justifyContent: 'center', padding: 10 }}
                />
              </View>
            </View>
            <View style={{ marginTop: '5%' }}>
              {inventoryCardData.map((data, index) => (
                <InventoryCards key={index} data={data} tagCost={tag_cost} />
              ))}
            </View>
          </View>

          {/* Filter modal */}
          <InventoryFilterModal
            visible={showInventoryModal}
            onClose={() => setShowInventoryModal(false)}
          />
        </ScrollView>
      )}
    </>
  )
}

const styles = {
  container: {
    flex: 1
  },
  titleText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: isSmallScreen ? 18 : 20
  },
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    paddingVertical: '10%',
    paddingHorizontal: '7%',
    borderRadius: 12
  }
}

export default Inventory
