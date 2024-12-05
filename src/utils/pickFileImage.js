import { launchImageLibrary } from "react-native-image-picker"

const pickImage = (key) => {
    const options = {
        mediaType: 'photo'
    }

    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker')
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error)
        } else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type
            }
            return { source, key }
        }
    })
}

export default pickImage