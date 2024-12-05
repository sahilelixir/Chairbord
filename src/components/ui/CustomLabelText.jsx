import { Text } from 'react-native'

const CustomLabelText = ({ label = 'label' }) => {
  return (
    <Text
      style={{
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: '3%'
      }}
    >
      {label}
    </Text>
  )
}

export default CustomLabelText
