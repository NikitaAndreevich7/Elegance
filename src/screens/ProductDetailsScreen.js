import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Modal, Image, TouchableOpacity,Share } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { SvgXml } from 'react-native-svg';
import { help, shared,like, likeActive } from '../ui/svg/svg_const'
import FavouritesDatabase from '../server/favourites-db'


export default class ProductDetailsScreen extends Component {

  state = {
    product: null,
    imageSlider: null,
    viewImageStatus: false,
    likeBtnStatus:false
  }

  componentDidMount() {
    const product = this.props.navigation.getParam('product')
    this.setState({ product }, () => {
      this.checkElementFromDatabase(product.id)
      this.createArrayForSlider()
    })
  }

  onShare = async () => {
    const {product,imageSlider} = this.state;
    try {
      const result = await Share.share({
        
        message:imageSlider[0].url.toString(),
        title:`Ателье Elegance. \n${product.name}  ${product.price}`,

      },
      {
        dialogTitle: 'Ателье Elegance.Пошив одежды.'
      }
      );

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }

  };

  // создаем блоки палитры
  createPaletteList = (arr) => {
    return arr.map(color => {
      return (
        <View key={color} style={{ backgroundColor: `${color}`, width: 40, height: 40, borderRadius: 100, marginRight: 5 }}></View>
      )
    })
  }

  //проверяем есть данный продукт в избранном и в зависимости от ответа, красим иконку
  checkElementFromDatabase = (id) =>{
    FavouritesDatabase.read(id,res => this.setState({likeBtnStatus: res.length > 0 ? true : false}))
  }

  // создаем структуру данных для слайдера.
  createArrayForSlider = () => {
    const { product } = this.state;

    const imageArray = product.images.map(img => {
      return {
        url: img,
        props: {}
      }
    })
    this.setState({ imageSlider: imageArray })
  }

  // удаляем/добавляем продукт в избранное
  changeStatusFavorites = (product) =>{
    this.setState({likeBtnStatus: !this.state.likeBtnStatus})

    FavouritesDatabase.update(product)
  }

  render() {

    const { imageSlider, viewImageStatus, product,likeBtnStatus } = this.state;


    if (imageSlider == null) {
      return (
        <View style={styles.contentSpinner}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }

    const paletteList = this.createPaletteList(product.palette)

    const likeIcon = likeBtnStatus ? likeActive : like

    const imageView = (
      <Modal visible={viewImageStatus} style={{ width: '100%', height: '50%' }}>
        <ImageViewer
          imageUrls={imageSlider}
          enableSwipeDown={true}
          onSwipeDown={() => this.setState({ viewImageStatus: false })} />
      </Modal>
    )
    const header = (
      <TouchableOpacity
        style={styles.header}
        onPress={() => this.setState({ viewImageStatus: true })}>
        <Image
          style={styles.defaultImageSlider}
          source={{ uri: imageSlider[0].url }} />
      </TouchableOpacity>
    )

    const content = (
      <View style={styles.content}>
        <View style={styles.contentDescription}>
          <Text style={styles.nameText}>{product.name}</Text>
          <Text>{product.desctiption}</Text>
          <View style={styles.priceBox}>
            <Text style={styles.descriptionPrice}>Стоимость работы</Text>

            <Text style={styles.priceText}>{product.price}</Text>
            <Image source={require('../ui/ruble.png')} />

          </View>

        </View>
      </View>
    )


    const palitra = (
      <View style={styles.palette}>
        <Text style={styles.paletteText}>Цвета в наличи</Text>
        <View style={styles.paletteBox}>
          {paletteList}
        </View>
      </View>
    )

    const bottomBtnGroup = (
      <View style={styles.btnGroupBox}>
        <TouchableOpacity style={styles.btnBox} onPress={() => this.props.navigation.navigate('ChatScreen')}>
          <SvgXml xml={help} width="20%" height="100%" />
          <Text style={styles.btnText}>Задать вопрос</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBox} onPress={this.onShare}>
          <SvgXml xml={shared} width="20%" height="100%" />
          <Text style={styles.btnText}>Поделиться</Text>
        </TouchableOpacity>
      </View>
    )
    
    const btnLike = (
      <TouchableOpacity style={styles.btnLikeBox} onPress={() => this.changeStatusFavorites(product)}>
      <SvgXml xml={likeBtnStatus ? likeActive : like} width="60%" height="100%" />
      </TouchableOpacity>
    )

    return (
      <View style={styles.containerProductDetials}>
        {btnLike}
        {imageView}
        {header}
        {palitra}
        {content}
        {bottomBtnGroup}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerProductDetials:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff'
  },
  contentSpinner: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
      },
  header:{
    width:'100%',
    height:'60%',
    backgroundColor:'#fff',

  },
  defaultImageSlider:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50

  },
  content:{
    backgroundColor:'#fff',
    width:'100%',
    // height:'100%'
  },

  contentDescription:{
    marginTop:20,
    padding:15
  },
  nameText:{
    fontSize:30
  },

  priceBox:{
    width:'100%',
    marginTop:15,
    flexDirection:'row',
    alignItems:'flex-end'
  },
  descriptionPrice:{
    color:'grey',
    marginRight:20,
    fontSize:20
  },
  priceText:{
    fontSize:30,
    color:'black',
  },
  boxPriceAndImg:{
    flexDirection:'row'
  },
  palette:{
    paddingTop:15,
    paddingLeft:20
  },
  paletteBox:{
    flexDirection:'row',
  },
  paletteText:{
    fontSize:17,
    color:'silver'
  },
  btnGroupBox:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:30,
    paddingLeft:15,
    paddingRight:15
  },
  btnBox:{
    width:'40%',
    backgroundColor:'#30BA8F',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:15
  },
  btnText:{
    marginLeft:10,
    color:'#fff',
    fontSize:18
  },
  btnLikeBox:{
    width:50,
    height:50,
    top:'56%',
    backgroundColor: '#30BA8F',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:100,
    right:20,
    borderRadius:100,
  },
})