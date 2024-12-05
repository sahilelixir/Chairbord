import {
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,Dimensions
} from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width < 400;
const SearchBar = ({ setShowInventoryModal }) => {
  return (
    <>
      <View style={styles.searchAndfilter}>
        <View style={styles.searchField}>
          <Image
            source={require('../../assets/screens/wallet/searchLogo.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={'#9A9A9A'}
            value={''}
            // onChangeText={}
          />
        </View>
        <Pressable
          onPress={() => setShowInventoryModal(true)}
          style={styles.filterLogo}
        >
          <Image source={require('../../assets/screens/wallet/filter.png')} style={{ height: 25, width: 25 }} />
        </Pressable>
      </View>
      <View style={styles.divider}></View>
    </>
  )
}

const styles = StyleSheet.create({
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '80%',
    gap: 10,
    marginTop: '5%',
    paddingVertical:1
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
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#263238',
    color: 'white',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 12
  }
})

export default SearchBar
