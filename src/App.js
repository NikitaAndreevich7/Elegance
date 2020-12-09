import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AppNavigation from './navigation'

export default class App extends Component {
  sum = (a,b) =>{
    return a + b
  }
  render() {
    return (
      <>
        <AppNavigation />
      </>

    )
  }
}