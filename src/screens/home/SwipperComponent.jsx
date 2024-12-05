import React from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const SwipperComponent = () => {
  const swipperImages = [
    require('../../assets/swipperImage/bajajImage.jpg'),
    require('../../assets/swipperImage/FastagLogo.webp')
  ]

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={1}
        showPagination
        paginationStyle={{
          bottom: isTablet?-70:-20
        }}
        paginationActiveDotColor={'blue'}
        paginationDefaultColor={'gray'}
        paginationDotStyle={styles.paginationDot}
        data={swipperImages}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} key={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: width * 0.9,
    height: isTablet?"100%":'90%',
    resizeMode: 'stretch'
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  }
})

export default SwipperComponent
