import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, TouchableOpacity, Image } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { BtnLike } from '../components/btn-like'

import { favourites } from '../server/'

const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight } = Dimensions.get('window')


export const CarouselPopular = ({favoritesList,nav}) => {



  const _renderItem = ({ item, index }, parallaxProps) => {
    const img = item.images.slice(0,item.images.length -1)
    console.log(img[0])
    return (
      <View style={stylesPopular.slider}>
        <TouchableOpacity style={{ width: '100%', height: '80%' }} onPress={() => nav.navigate('ProductDetails', { product: item })}>
          <ParallaxImage
            source={{ uri: img[0]}}
            containerStyle={stylesPopular.slider__container}
            style={stylesPopular.slider__image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </TouchableOpacity>
        <View style={stylesPopular.slider__descriptionBox}>
          <View>
            <Text style={stylesPopular.slider__title}>{item.name}</Text>
            <Text style={stylesPopular.slider__description}>{item.description}</Text>
          </View>
          <Text style={stylesPopular.slider__price}>{item.price}</Text>
        </View>
      </View>
    );
  }

  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={favoritesList}

      renderItem={_renderItem}
      hasParallaxImages={true}
    />
  );

}

export const CaruselCategory = (props) => {


  _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity style={stylesCategory.box} onPress={() => props.nav.navigate('Products', { clothes: item.id })}>
        <ParallaxImage
          source={{ uri: item.img }}
          containerStyle={stylesCategory.slider__container}
          style={stylesCategory.slider__image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={stylesCategory.box__title}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  const category = [
    {
      title: 'Зима',
      id: 'winter',
      img: 'https://sun9-62.userapi.com/147yZp48Z_S4c-4EjzXD34TMvMAd27_ihBoF-w/jy9-eiF7WtQ.jpg'
    },
    {
      title: 'Лето',
      id: 'summer',
      img: 'https://sun9-33.userapi.com/_Jlhb437DfQ-mmq7f44R65HzkNahsniIi8mnxw/eIOZmC1Qw8Y.jpg'
    },
    {
      title: 'Димисезонные',
      id: 'demi_season',
      img: 'https://sun9-73.userapi.com/RXAeLIO9Wc4BauQJ1naBRxH5XQi6dGvJW65Xvw/CyLblVpKJo4.jpg'
    },
    {
      title: 'Школьная форма',
      id: 'school',
      img: 'https://sun9-9.userapi.com/8a6_BXp4f_GL3L799MHUQGi-G8H8V1CoHsvVEg/1K_229Q8kL0.jpg'
    },
    {
      title: 'Kуклы',
      id: 'dolls',
      img: 'https://sun9-19.userapi.com/FwO7F61qkHBvNcEPkTN2J7JozMXF0w8__3-dFQ/XFI9lYCDluM.jpg'
    }
  ]

  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={category}
      renderItem={_renderItem}
      hasParallaxImages={true}
    />
  )
}



const stylesPopular = StyleSheet.create({
  slider: {
    width: screenWidth - 60,
    height: screenHeight - 300,

  },
  slider__container: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'grey',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8

  },
  slider__image: {
    resizeMode: 'cover',
    borderRadius: 5
  },
  slider__descriptionBox: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    padding: 10
  },
  slider__title: {
    fontSize: 25
  },
  slider__price: {
    fontSize: 20
  }
})

const stylesCategory = StyleSheet.create({
  box: {
    width: screenWidth - 60,
    height: screenHeight - 300,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box__title: {
    position: 'absolute',

    color: '#fff',
    fontSize: 45
  },
  slider__container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'black',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: .4
  },
  slider__image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
})











