import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';


const CategoryItem = ({ value, label, img,nav }) => {



  return (

    <TouchableOpacity style={styles.content} onPress={() =>nav.navigate('Products',{clothes:value})}>

      <Text style={styles.textContent}>{label}</Text>

    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
    borderRadius: 10,
    backgroundColor:'rgba(0,0,0, .3)'
  },

  textContent: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default CategoryItem