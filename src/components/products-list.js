import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import ProductItem from './product-item'
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { filter } from '../ui/svg/svg_const'

export default class ProductsList extends Component {

  state = {
    modalStatus: false
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer = () => {
    setTimeout(() => this.setState({ modalStatus: true }), 500)
  }

  render() {

    const { productLists } = this.props
    const { modalStatus } = this.state;

    const modalBox = (
      <Modal
        isVisible={modalStatus}
        style={styles.modal}
      >
        <View style={{ flex: 1 }} style={styles.modalBox}>
          <View style={styles.modalContent}>
            <View style={styles.notificationFilterBox}>
              <View style={styles.boxSvg}>
                <SvgXml xml={filter} width={20} height={20} />
              </View>
              <Text style={styles.notificationText}>Нажмите что бы отфильтровать товар по вашим критериям поиска.</Text>
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

    const content = (
      <View style={styles.productListsBox}>
        <FlatList
          data={productLists}
          numColumns={2}
          renderItem={({ item }) => {
            return <ProductItem product={item} nav={this.props.nav} />
          }}
          keyExtractor={item => item.id}
        />
      </View>
    )

    return (
      <View style={styles.productListContainer}>
        {/* {modalBox} */}
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  productListContainer: {
    width: '100%',
    height: '100%',
    // padding:10
  },
  productListsBox: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  //modal
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '96%',
    height: '30%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalContent: {
    width: '100%'
  },
  modal__BtnBox: {
    alignItems: 'center',
  },
  modal__BtnText: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'silver',
    borderRadius: 5,
    color: '#fff'
  },

  notificationFilterBox: {
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
})