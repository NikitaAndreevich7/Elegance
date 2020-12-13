import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import { CarouselPopular } from '../components/carousel'
import { Header } from '../components/header'
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { like, menu,attention } from '../ui/svg/svg_const'
import FavouritesDatabase from '../server/favourites-db'
import Hoc from '../hocs/home-screen-hoc'


class HomeScreen extends Component {

  state = {
    modalStatus: false,
    favoritesList: null
  }

  componentDidMount(){
    FavouritesDatabase.createDB()
    this.setState({favoritesList:this.props.favoritesList})
    this.startTimer()
  }

  startTimer = () =>{
    return
    // setTimeout(()=> this.setState({modalStatus:true}),500)
  }

  render() {

    const { modalStatus,favoritesList } = this.state;

    if (favoritesList == null) {
      return (
        <View style={styles.contentSpinner}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }

    const modalBox = (
      <Modal
          isVisible={modalStatus}
          style={styles.modal}
          >
        <View style={{ flex: 1 }} style={styles.modalBox}>
          <View style={styles.modalContent}>

            <View style={styles.notificationMenuBox}>
              <View style={styles.boxSvg}>
                <SvgXml xml={menu} width={20} height={20} />
              </View>
              <Text style={styles.notificationText}>Нажмите если хотите выбрать нужную категорию или посмотреть контакты.</Text>
            </View>

            <View style={styles.notificationLikeBox}>
              <View style={styles.boxSvg}>
                <SvgXml xml={like} width={20} height={20} />
              </View>
              <Text style={styles.notificationText}>Нажмите, что бы добавить товар в избранное и просмотреть его позже.</Text>
            </View>

            <View style={styles.worning}>
              <Text style={styles.worning__title}>Обратите внимание!</Text>

              <View style={styles.worning__descriptionBox}>
                <SvgXml xml={attention} width={20} height={20} />
                <Text style={styles.worning__description}>Цены указанные в приложении - это стоимость работы.
                К этой стоимости будет добавлена цена за материалы.
                Материал можете покупать самостоятельно, в таком случае мастер возьмет только за работу.</Text>
              </View>
              <View style={styles.worning__descriptionBox}>
                <SvgXml xml={attention} width={20} height={20} />
                <Text style={styles.worning__description}>
                Цены указанные в приложении могут изменяться в зависимости от размера(ребенок/взрослый)
                </Text>
              </View>


            </View>

          </View>
          <TouchableOpacity
            style={styles.modal__BtnBox}
            onPress={() => this.setState({ modalStatus: !this.state.modalStatus })}>
            <Text style={styles.modal__BtnText}>
              Закрыть
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )

    return (
      <View style={styles.content}>
        <Header title='Elegance' description='Пошив одежды любой сложности.' />
        {/* <TestDB /> */}
        {modalBox}
        <View style={styles.carouselBox}>
          <Text style={styles.carouselBox__title}>Популярное</Text>
          <CarouselPopular nav={this.props.navigation} favoritesList={favoritesList} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: '#fff'
  },
  carouselBox: {
    zIndex: 1000,
    width: '100%',
    marginTop: '10%'
  },
  carouselBox__title: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
    color: 'grey'
  },
  btnLikeBox: {
    width: 70,
    height: 70,
    backgroundColor: '#30BA8F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    right: 20,
    top: '55%',
    borderRadius: 100,
  },
  productContainer: {
    width: '100%',
    height: '100%',

  },
  title: {

    height: 150,
    justifyContent: 'center'
  },

  //modal
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '96%',
    height: '70%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  modalContent: {
    width: '100%'
  },
  notificationMenuBox: {
    width: '100%',
    flexDirection: 'row'
  },
  notificationLikeBox: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 30
  },
  boxSvg: {
    width: 50,
    height: 50,
    backgroundColor: '#30BA8F',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    width: '80%',
    marginLeft: 15,
    fontSize: 20,
    color: 'grey'
  },
  worning: {
    marginTop: '20%'
  },
  worning__title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'tomato'
  },
  worning__descriptionBox:{
    display: 'flex',
    flexDirection: 'row',
  },
  worning__description: {
    fontSize: 17,
    marginTop: 10,
    color: 'grey',
    paddingLeft:10,
    paddingRight:10,
    
  },
  textBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  modal__BtnBox:{
    alignItems:'center',
  },
  modal__BtnText:{
    paddingLeft:30,
    paddingRight:30,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'silver',
    borderRadius:5,
    color:'#fff'
  }
})

export default Hoc(HomeScreen)