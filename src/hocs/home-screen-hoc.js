import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'

import axios from 'axios'

const HomeScreenHoc = (ViewComponent) => {
  return class extends Component {

    state = {
      popular: null
    }

    componentDidMount() {
      this.getFavoritesList()
    }

    getFavoritesList = async () => {
      const { data } = await axios.get('https://sleepy-cliffs-68954.herokuapp.com/api/product/relevant')
      console.log('FAVOR : ', data.data)
      this.setState({ popular: data.data })
    }

    render() {

      const { popular } = this.state;

      if (popular == null) {
        return (
          <View style={styles.contentSpinner}>
            <ActivityIndicator size="small" color="#0000ff" />
            <StatusBar barStyle="default" />
          </View>
        )
      }

      return <ViewComponent {...this.state} />
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent:'center',
    alignItems:'center'
    // backgroundColor: '#fff'
  },
})

export default HomeScreenHoc