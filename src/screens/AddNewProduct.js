import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image, ScrollView,
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
import { overflowMenuPressHandlerActionSheet } from 'react-navigation-header-buttons';

const regarding_width = Dimensions.get('window').width

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


  // takePics = () => {
  //   ImagePicker.openPicker({
  //     width: 200,
  //     height: 200, compressImageMaxHeight: 400,
  //     compressImageMaxWidth: 400, cropping: true, multiple: true
  //   })
  //     .then(response => {
  //       let tempArray = []
  //       console.log("responseimage-------" + response)
  //       this.setState({ ImageSource: response })
  //       console.log("responseimagearray" + this.state.ImageSource)
  //       response.forEach((item) => {
  //         let image = {
  //           uri: item.path,
  //           // width: item.width,
  //           // height: item.height,
  //         }
  //         console.log("imagpath==========" + image)
  //         tempArray.push(image)
  //         this.setState({ ImageSourceviewarray: tempArray })
  //         // console.log('savedimageuri====='+item.path);

  //         console.log("imagpath==========" + image)
  //       })

  //     })

  // }




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

    const paletteList = (
      palette.length ?
      (
        palette.map(color => {
          return (
            <Text style={{ width: 50, height: 50, backgroundColor: `${color}` }}></Text>
          )
        })
      ) : null
    )

    const selectColor = colorPickerStatus ? (
      <View style={{ position: 'absolute', zIndex: 100000, backgroundColor: 'rgba(0,0,0, .9)', width: '100%', height: '70%', bottom: 0 }}>
        <ColorPicker
          onColorSelected={color => this.setState({ palette: color })}
          style={{ flex: 1 }}
          hideSliders={true}
          hideControls={false}
        />
        <View>
          {paletteList}
        </View>
        <TouchableOpacity style={{ padding: 10, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'silver' }} onPress={() => this.setState({ colorPickerStatus: false })}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    ) : null



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
          {
            !filePath ?
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
          }

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
  }
})


//application - android manifest.xml
// android:requestLegacyExternalStorage="true"









  // takePics = () => {
  //   ImagePicker.openPicker({
  //     width: 200,
  //     height: 200, compressImageMaxHeight: 400,
  //     compressImageMaxWidth: 400, cropping: true, multiple: true
  //   })
  //     .then(response => {
  //       let tempArray = []
  //       console.log("responseimage-------" + response)
  //       this.setState({ ImageSource: response })
  //       console.log("responseimagearray" + this.state.ImageSource)
  //       response.forEach((item) => {
  //         let image = {
  //           uri: item.path,
  //           // width: item.width,
  //           // height: item.height,
  //         }
  //         console.log("imagpath==========" + image)
  //         tempArray.push(image)
  //         this.setState({ ImageSourceviewarray: tempArray })
  //         // console.log('savedimageuri====='+item.path);

  //         console.log("imagpath==========" + image)
  //       })

  //     })

  // }