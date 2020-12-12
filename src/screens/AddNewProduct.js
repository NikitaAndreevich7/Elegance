import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import axios from 'axios'
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown-v2'
import { ColorPicker } from 'react-native-color-picker'
// import * as ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';

import { dataDropdownWeather, dataDropdownGender, dataDropdownStatus } from '../utils/dropdownData'


const regarding_width = Dimensions.get('window').width
const regarding_height = Dimensions.get('screen').height


export default class AddNewProduct extends React.Component {

  state = {
    defaultDropdownWeather: 'Выберите сезон',
    defaultDropdownGender: 'Выберите для кого',
    defaultDropdownStatus: 'Выберите статус продукта',
    dropdownValueStatus: null,
    dropdownValueWeather: null,
    dropdownValueGender: null,
    title: '',
    description: '',
    img: null,
    price: '',
    modalWarningStatus: false,
    modalOpenImagePicker: false,
    filePath: null,
    ImageSource: [],
    ImageSourceviewarray: [],
    colorPickerStatus: false,
    palette: []
  }

  dropdownConstructor = (defaultLabel, changeData, data) => {
    return (
      <Dropdown
        label={defaultLabel}
        data={data}
        animationDuration={0}
        containerStyle={styles.dropdownStyle}
        onChangeText={(value) => this.setState({ [changeData]: value })}
        baseColor="white"
        dropdownPosition={-3}
      />
    )
  }

  inputConstructor = (placeholder, change, v) => {
    return (
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={v}
        onChangeText={(value) => this.setState({ [change]: value })} />
    )
  }

  addPhoto = (flag) => {
    console.log("FLAG : ", flag)
    switch (flag) {
      case 'gelery':
        console.log('GELERY')
        return (
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 400,
              maxWidth: regarding_width,
            },
            (response) => {
              this.setState({ filePath: response.base64 })
            },
          )
        )
      case 'camera':
        console.log('CAMERA')

        return (
          ImagePicker.launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 400,
              maxWidth: regarding_width,
            },
            (response) => {
              console.log('response --- ', response)
              this.setState({ filePath: response.base64 })
            },
          )
        )

      default:
        return
    }
  }

  filterPaletteList = (color) => {
    const newListPalette = this.state.palette.filter((item) => item !== color)
    this.setState({ palette: newListPalette })
  }





  onSubmit = async () => {
    // const payload = {
    //   relevant: Number(this.state.dropdownValueStatus),
    //   category: this.state.dropdownValueWeather,
    //   gender: this.state.dropdownValueGender,
    //   name: this.state.title,
    //   description: this.state.description,
    //   price: this.state.price,
    //   image: this.state.filePath
    // }
    const payload = {
      relevant: 2,
      category: 'whinter',
      gender: 'women',
      name: 'Сапоги',
      description: 'Теплые сапоги',
      price: 1200,
      image: 'dsflsdkjlfkdsjlfk'
    }

    try {
      const response = await axios.post('https://sleepy-cliffs-68954.herokuapp.com/api/product/create', payload)
      console.log('RESPONSE : ', response)
    } catch (e) {
      console.log('error', e)
    }

  }

  render() {
    const {
      defaultDropdownWeather,
      defaultDropdownGender,
      defaultDropdownStatus,
      dropdownValueStatus,
      dropdownValueWeather,
      dropdownValueGender,
      title,
      description,
      img,
      price,
      modalWarningStatus,
      modalImagePrickerStatus,
      filePath,
      colorPickerStatus,
      palette
    } = this.state;

    const modlWarning = (
      <Modal
        isVisible={modalWarningStatus}
        style={styles.modal}
      >
        <View style={{ flex: 1 }} style={styles.modalBox}>
          <View style={styles.modalContent}>

            <Text>Пожалуйста, заполните все поля.</Text>

          </View>
          <TouchableOpacity
            style={styles.modal__BtnBox}
            onPress={() => this.setState({ modalStatus: false })}>
            <Text style={styles.modal__BtnText}>
              Закрыть
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )

    const modalOpenImagePicker = (
      <Modal
        isVisible={modalImagePrickerStatus}
        style={styles.modal}
      >
        <View style={{ flex: 1 }} style={styles.modalBox}>
          <View style={styles.modalContent}>

            <Text>Открыть :</Text>

            <View>
              <TouchableOpacity style={styles.buttomImagePickerModal} onPress={() => {
                this.setState({ modalImagePrickerStatus: false }, () => this.addPhoto('gelery'))

              }}>
                <Text>Галерею</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={styles.buttomImagePickerModal} onPress={() => {
                this.setState({ modalImagePrickerStatus: false }, () => this.addPhoto('camera'))
              }}>
                <Text>Камеру</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity
            style={styles.modal__BtnBox}
            onPress={() => this.setState({ modalImagePrickerStatus: false })}>
            <Text style={styles.modal__BtnText}>
              Закрыть
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )

    const selectColor = colorPickerStatus ? (
      <View style={styles.palette__general_container}>
        <ColorPicker
          onColorSelected={color => {
            if (this.state.palette.length === 5) {
              return alert('Вы можете обавить не больше 5 цветов.')
            }
            this.setState({ palette: [...this.state.palette, color] })
          }}
          style={styles.palette__colorPicker}
          hideSliders={true}
          hideControls={false}
        />
        <View style={styles.palette__selectedColors}>
          {
            palette.map(color => {
              return (
                <TouchableOpacity key={Math.random() * 23} style={styles.palette__collorWrapper} onLongPress={() => this.filterPaletteList(color)}>
                  <Text style={[styles.palette__colorElement, { backgroundColor: `${color}` }]}></Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.palette_btnWrapper}>
          <TouchableOpacity style={[styles.palette__btn, {}]} onPress={() => this.setState({ colorPickerStatus: false })}>
            <Text>Закрыть</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.palette__btn, {}]} onPress={() => this.setState({ colorPickerStatus: false })}>
            <Text>Добавить</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null


    //----image content
    const imageContent = !filePath ?
      <>
        <Text style={styles.textImg}>Изображение</Text>
        <TouchableOpacity style={styles.buttonAddImage} onPress={() => this.setState({ modalImagePrickerStatus: true })}>
          <Text style={styles.textBtnImage}>Добавить</Text>
        </TouchableOpacity>
      </> :
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: filePath.uri }}
      />





    //--dropdown constructor
    const dropdownConstructor__weather = this.dropdownConstructor(defaultDropdownWeather, "dropdownValueWeather", dataDropdownWeather)
    const dropdownConstructor__gender = this.dropdownConstructor(defaultDropdownGender, "dropdownValueGender", dataDropdownGender)
    const dropdownConstructor__status = this.dropdownConstructor(defaultDropdownStatus, "dropdownValueStatus", dataDropdownStatus)

    //--input constructor
    const inputConstructor__title = this.inputConstructor('Название', 'title', title)
    const inputConstructor__descriptoin = this.inputConstructor('Описание', 'description', description)
    const inputConstructor__price = this.inputConstructor('Цена', 'price', price)


    return (
      <ScrollView style={styles.content}>
        {modlWarning}
        {modalOpenImagePicker}
        {selectColor}
        <View style={styles.imageBox}>
          {imageContent}

        </View>
        {dropdownConstructor__weather}
        {dropdownConstructor__gender}
        {dropdownConstructor__status}

        {inputConstructor__title}
        {inputConstructor__descriptoin}
        {inputConstructor__price}

        <TouchableOpacity style={styles.btnSubmit} onPress={() => this.onSubmit()}>
          <Text style={styles.btnSubmitText}>Добавить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ colorPickerStatus: true })}>
          <Text>Color</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // all style
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    marginBottom: 30

  },
  // image style
  imageBox: {
    width: '100%',
    height: 400,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: "center"
  },
  textImg: {
    color: 'silver',
    fontSize: 35
  },
  buttonAddImage: {
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  textBtnImage: {
    color: 'grey',
    fontSize: 20
  },

  //--dropdown
  dropdownStyle: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  //--input
  input: {
    width: '96%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'silver',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  //--btn
  btnSubmit: {
    width: '30%',
    backgroundColor: "#30D5C8",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 20
  },
  btnSubmitText: {
    fontSize: 17,
    color: '#fff'
  },
  buttomImagePickerModal: {
    margin: 20
  },

  //--modal
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
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalContent: {
    width: '100%'
  },
  modal__BtnBox: {
    alignItems: 'center',
    zIndex: 10000
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

  //---color picker
  palette__general_container: {
    position: 'absolute',
    zIndex: 100000,
    backgroundColor: 'rgba(0,0,0, .9)',
    width: '100%',
    height: '70%',
    bottom: 0
  },
  palette__colorPicker: {
    height: '50%',
    width: '100%'
  },
  palette__selectedColors: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  palette__collorWrapper: {
    margin: 10
  },
  palette__colorElement: {
    width: 50,
    height: 50,
  },
  palette__btn: {
    width: '40%',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'silver',
    justifyContent:'center',
    alignItems:'center'
  },
  palette_btnWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})


//application - android manifest.xml
// android:requestLegacyExternalStorage="true"

