import React, { Component,Fragment } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import ProductsList from '../components/products-list'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'
import FavouritesDatabase from '../server/favourites-db'


export default class FavouritesScreen extends Component {

  state = {
    favouritesList: null,

  }

  componentDidMount() {
    this.getDataFromServer()
  }

  //парсим json данные (images, palette) которые пришли с сервера
  getDataFromServer = () => {
    FavouritesDatabase.list(async list => {
      let favourites = await list.map(list_element => {
        // console.log('list_element-------------------------------',list_element,'\n\n\n')
        return {
          id: list_element.id,
          name: list_element.name,
          price: list_element.price,
          gender: list_element.gender,
          description:list_element.description,
          palette: JSON.parse(list_element.palette),
          images: JSON.parse(list_element.images)
        }
      })
      this.setState({ favouritesList: favourites })
    })
  }

  render() {

    const { favouritesList } = this.state;

    if (favouritesList === null) {
      return (
        <View style={styles.contentSpinner}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }

    const content = favouritesList.length > 0 ?
      (
        <ProductsList productLists={favouritesList} nav={this.props.navigation} />
      ) :
      (
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>У вас нет избранного</Text>
        </View>
      )


    return (
      <View style={styles.content}>
        <StickyParallaxHeader
          headerType="AvatarHeader"
          image={0}
          backgroundColor="#30BA8F"
          parallaxHeight={150}
          title='Избранное'
          subtitle=''
          leftTopIcon='no'
          rightTopIcon='no'
          leftTopIconOnPress={() => this.props.navigation.goBack()}
          renderBody={() => <Fragment>{content}</Fragment>} />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  contentSpinner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  titleBox:{
    height:'50%',
    justifyContent:'center',
    alignItems:'center'
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'silver'
  }
})