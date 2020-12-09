import React,{Component} from 'react'
import {View,Text,StyleSheet,ActivityIndicator,StatusBar,TextInput,TouchableOpacity} from 'react-native'

import FavouritesDatabase from '../server/favourites-db'

export default class TestDB extends Component{


    state = {
        favouritesList:null,
        input:''
    }

  render(){

    return(
      <View style={styles.content}>
          <Text>Favourites</Text>
          <TextInput style={{borderWidth:1,margin:10,marginTop:50}}value={this.state.input} onChangeText={value => this.setState({input: value})}/>
          <TouchableOpacity
          style={{padding:30,backgroundColor:'tomato',alignItems:'center',}}
           onPress={() => {FavouritesDatabase.delet(this.state.input),this.setState({input:''})}}>
            <Text>Delete favourites</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{padding:30,marginTop:20,backgroundColor:'blue',alignItems:'center',}}
           onPress={() => { FavouritesDatabase.list(res=>console.log('----------------------------------------------------------r', res))}}>
            <Text>List favourites</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    content:{
        width:'100%',
        height:'100%',
      },
      contentSpinner: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
      },
})