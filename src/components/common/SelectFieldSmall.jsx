import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

const SelectFieldSmall = ({ dataToRender, title, selectedValue }) => {
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
    <View style={styles.dropdownStyle}>
      <SelectDropdown
        ref={dropdownRef}
        data={dataToRender}
        onSelect={(selectedItem, index) => {
          selectedValue(selectedItem, index)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || title}
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
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Pressable onPress={toggleDropdown} style={{ marginRight: '5%' }}>
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
    marginBottom: '3%'
  },
  dropdownButtonStyle: {
    width: '90%',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SelectFieldSmall
