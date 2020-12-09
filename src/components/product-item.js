import React, { Component } from 'react'
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native'


export default class ProductItem extends Component {

  render() {

    const { name, gander, images } = this.props.product;

    return (
      <TouchableOpacity style={styles.productBox} onPress={() => this.props.nav.navigate('ProductDetails',{product: this.props.product})}>
        <Image
          style={{width:'100%',height:'100%'}}
          source={{
            uri: images[0],
          }}
        />
        <Text style={styles.productName}>{name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  productBox:{
      width:'49%',
      height:300,
      flex: 1,
      margin: 7,
      marginBottom:30,
      backgroundColor:'#fff',
      padding:5,
      paddingBottom:50,
      
  },
  productName:{
      color:'grey',
      fontSize:20,
      marginTop:20
  }
})