import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native'
import DatePicker from 'react-native-date-picker'

const OrderFilter = ({ visible, onClose, onApply }) => {
  const [SelectedTag, setSelectedTag] = useState(false)
  const [isChooseDateActive, setIsChooseDateActive] = useState(false)
  const [date, setDate] = useState(new Date())
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [open, setOpen] = useState(false)

  const statusTagData = ['Dispatched', 'Approved', 'Return','Rejected','Acknowledge','Select all']
  const statusDurationData = [
    'Last 1 Month',
    'Last 3 Months',
    'Last 6 Months',
    'Last 1 Year'
  ]
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.headingText}>Filter Orders</Text>

          <View>
            <Text style={styles.filterType}>Status</Text>
            <View style={{ flexDirection: 'row',  flexWrap: 'wrap',gap: 10 }}>
              {statusTagData.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTag(data)}
                  style={
                    SelectedTag === data ? styles.activeCapsule : styles.capsule
                  }
                >
                  <Text
                    style={
                      SelectedTag === data
                        ? styles.activeTagText
                        : styles.tagText
                    }
                  >
                    {data}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.filterType}>Date range</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {statusDurationData.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTag(data)}
                  style={
                    SelectedTag === data ? styles.activeCapsule : styles.capsule
                  }
                >
                  <Text
                    style={
                      SelectedTag === data
                        ? styles.activeTagText
                        : styles.tagText
                    }
                  >
                    {data}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 ,marginTop: '2%' }}>
              <TouchableOpacity
                onPress={() => setIsChooseDateActive(!isChooseDateActive)}
                style={
                  isChooseDateActive === true
                    ? styles.activeCapsule
                    : styles.capsule
                }
              >
                <Text
                  style={
                    isChooseDateActive === true
                      ? styles.activeTagText
                      : styles.tagText
                  }
                >
                  {'Choose Date'}
                </Text>
              </TouchableOpacity>
            </View>

            {isChooseDateActive && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '2%',
                }}
              >
                <Pressable
                  style={styles.selectDate}
                  onPress={() => {
                    setOpen(true)
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#848484',
                        lineHeight: 16
                      }}
                    >
                      From
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/screens/wallet/calender.png')}
                    />
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.selectDate}
                  onPress={() => {
                    setOpen(true)
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#848484',
                        lineHeight: 16
                      }}
                    >
                      To
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/screens/wallet/calender.png')}
                    />
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </View>
                </Pressable>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onApply}
              style={[styles.button, styles.applyButton]}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: '40%',
    height: '80%',
    borderRadius: 10,
    padding: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#263238'
  },
  applyButton: {
    backgroundColor: '#02546D',
    marginLeft: 10
  },
  applyButtonText: {
    color: 'white'
  },
  headingText: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    marginBottom:5,
    color: '#000000'
  },
  filterType: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '3%'
  },
  capsule: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '1%'
  },
  tagText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#000000'
  },
  activeCapsule: {
    borderWidth: 0.5,
    borderColor: '#263238',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '1%',
    backgroundColor: '#02546D'
  },
  activeTagText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: 'white'
  },
  selectDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A5A5A5',
    paddingVertical: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: '5%',
    width: '45%'
  },
  buttonText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
})

export default OrderFilter
