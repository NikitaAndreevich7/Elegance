import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CategoryList from '../components/category-list'
import {Header} from '../components/header'
export default class CategoryScreen extends Component{

  render(){
    return(
      <View style={styles.content}>
        <Header title='Категории'/>
        <View style={styles.carouselBox}>
          <CategoryList nav={this.props.navigation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#fff'
  },
  carouselBox: {
    width: '100%',
    marginTop: '0%'
  },
})