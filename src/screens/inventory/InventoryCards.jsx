import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import VerticalDivider from '../../components/common/VerticalDivider';

const InventoryCards = ({ data, tagCost }) => {
  const mapping = {
    'VC 4': 'VC4',
    'VC 5': 'VC5',
    'VC 6': 'VC6',
    'VC 7': 'VC7',
    'VC 12': 'VC12',
    'VC 15': 'VC15',
    'VC 16': 'VC16'
  };

  const bankMap = { 1: 'Bajaj', 2: 'SBI' };

  function extractDateTime(isoString) {
    if (!isoString) return { date: '', time: '' };
    const dateObj = new Date(isoString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return {
      date: `${day}-${month}-${year}`,
      time: `${hours}:${minutes}`
    };
  }

  const { date, time } = extractDateTime(data?.updatedAt);
  const vehicleCost = tagCost[mapping[data?.vehicleClass]] || '';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.bankIconContainer,
              { backgroundColor: data?.color || '#5D9CEC' }
            ]}
          >
            <Text style={styles.bankText}>{bankMap[data?.bankId]}</Text>
          </View>
          <View>
            <Text style={styles.idText}>{data?.serialNumber || 'N/A'}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateAndTimeText}>{time}</Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>{date}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.amount}>₹{vehicleCost}</Text>
      </View>

      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.orderIdText}>{data?.orderId || 'N/A'}</Text>
        </View>
        <Text style={styles.vcText}>{data?.vehicleClass || 'N/A'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: '4%',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bankIconContainer: {
    borderRadius: 50,
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35
  },
  bankText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20
  },
  idText: {
    color: '#343A40',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  dateAndTimeText: {
    color: '#6C757D',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  amount: {
    color: '#28A745',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%'
  },
  orderIdText: {
    color: '#FFC107',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    marginTop: '5%'
  },
  vcText: {
    color: '#343A40',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19
  }
});

export default InventoryCards;
