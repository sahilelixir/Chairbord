import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const SelectFieldBig = ({
  dataToRender,
  title,
  selectedValue,
  borderColor,
  defaultValue = null
}) => {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      const matchedItem = dataToRender.find(item => item.id === defaultValue.id);
      if (matchedItem) {
        setSelectedItem(matchedItem);
      }
    }
  }, [defaultValue, dataToRender]);

  const toggleDropdown = () => {
    if (dropdownOpen) {
      dropdownRef.current.closeDropdown();
    } else {
      dropdownRef.current.openDropdown();
    }
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <View style={[styles.dropdownStyle, { borderColor: borderColor }]}>
      <SelectDropdown
        ref={dropdownRef}
        data={dataToRender}
        defaultValue={selectedItem} // Set default value here
        onSelect={(item, index) => {
          setSelectedItem(item);
          selectedValue(item, index);
        }}
        renderButton={(item, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(item && item.title) || title}
              </Text>
            </View>
          );
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
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Pressable onPress={toggleDropdown} style={{ marginRight: 10 }}>
        <Image source={require('../../assets/arrowBottom.png')} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '90%',
    height: isTablet ? 80 : 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 10 : 20
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: isTablet ? 20 : 16,
    fontWeight: '400',
    color: '#263238'
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 15
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
    borderWidth: isTablet ? 2 : 1,
    borderRadius: isTablet ? 25 : 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SelectFieldBig;
