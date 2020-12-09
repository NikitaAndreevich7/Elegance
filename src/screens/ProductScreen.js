import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, TextInput } from 'react-native'
import ProductList from '../components/products-list'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

import {winter,summer,demi_season,dolls,school} from '../server/index'

export default class ProductScreen extends Component {

  state = {
    productData: null,
    title:null
  }

  componentDidMount(){
    this.getServerData()
  }

  getServerData = () =>{
    const typeСlothes = this.props.navigation.getParam('clothes');
    
    if(typeСlothes === 'winter'){
    this.setState({productData: winter,title:'Зимняя одежда' })
    }
    else if(typeСlothes === 'summer'){
      this.setState({productData: summer, title:'Летняя одежда' })
    }
    else if(typeСlothes === 'demi_season') {
      this.setState({productData: demi_season, title:'Весна / Осень'})
    }
    else if(typeСlothes === 'dolls') {
      this.setState({productData: dolls,title:'Куклы ручной работы' })
    }
    else if(typeСlothes === 'school'){
      this.setState({productData: school,title:'Школьная одежда / классика' })
    }
  }

  render() {

    const { productData,title } = this.state;


    if (productData === null || title === null) {
      return (
        <View style={styles.contentSpinner}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }



    return (
      <View style={styles.productContainer}>
        <StickyParallaxHeader
          headerType="AvatarHeader"
          image={342}
          backgroundColor="#30BA8F"
          parallaxHeight={150}
          title={title}
          subtitle=''
          leftTopIcon={43}
          rightTopIcon={43}
          leftTopIconOnPress={() => this.props.navigation.goBack()}
          renderBody={() => <ProductList productLists={productData} nav={this.props.navigation} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
    height: '100%',
  },
  contentSpinner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    height: 150,
    justifyContent: 'center'
  }
})