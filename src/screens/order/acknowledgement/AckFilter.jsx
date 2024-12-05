import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'

const AckFilter = ({ visible, onClose, onApply }) => {
  const [SelectedTag, setSelectedTag] = useState(false)

  const bankTagData = [
    'Kotak',
    'State bank of india',
    'ICICI',
    'Bank of Baroda',
    'Axis',
    'Bajaj',
    'Select all'
  ]
  const vcTagData = [
    'VC-4',
    'VC-5',
    'VC-6',
    'VC-7',
    'VC-12',
    'VC-15',
    'VC-16',
    'Select all'
  ]
  const statusTagData = [
    'New',
    'Missing',
    'Damaged',
    'Received',
    'Select all'
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
          <Text style={styles.headingText}>Filter</Text>

          <View>
            <Text style={styles.filterType}>Bank </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {bankTagData.map((data, index) => (
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
            <Text style={styles.filterType}>Vehicle class</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {vcTagData.map((data, index) => (
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
            <Text style={styles.filterType}>Status</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
    borderWidth:1,
    borderColor: 'black'
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
    marginTop: '1%'
  },
  capsule: {
    borderWidth: 1,
    borderColor: '#263238',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '3%',
    marginEnd: '3%'
  },
  tagText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#000000'
  },
  activeCapsule: {
    borderWidth: 1,
    borderColor: '#02546D',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '3%',
    marginEnd: '3%',
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
    color: '#263238',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
})
export default AckFilter
