import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width <= 420;
const SelectFieldSbi = ({ dataToRender, title, selectedValue, borderColor }) => {
  const dropdownRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    if (dropdownOpen) {
      dropdownRef.current.closeDropdown()
    } else {
      dropdownRef.current.openDropdown()
    }
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <View style={[styles.dropdownStyle, { borderColor: borderColor }]}>
      <SelectDropdown
        ref={dropdownRef}
        data={dataToRender}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, "drop down selection <----")
          selectedValue(selectedItem, index)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.serialNumber) || title}
              </Text>
            </View>
          )
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              key={index}
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#D2D9DF' })
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.serialNumber}</Text>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Pressable onPress={toggleDropdown} style={{ marginRight: 10 }}>
        <Image source={require('../../assets/arrowBottom.png')} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownLabel: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginBottom: '3%',
  },
  dropdownButtonStyle: {
    width: '80%',
    height: isTablet ? 80 : 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 10 : 20,
    // backgroundColor:'red'
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: isTablet ? 20 : 16,
    fontWeight: '400',
    color: 'gray',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 5
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 15
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,


  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  dropdownStyle: {
    borderWidth: isTablet ? 2 : 1,
    borderRadius: isTablet ? 25 : 20,
    // marginRight:-10,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  }
})

export default SelectFieldSbi
