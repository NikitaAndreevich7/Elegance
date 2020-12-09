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
import * as ImagePicker from 'react-native-image-picker';


import { dataDropdownWeather, dataDropdownGender, dataDropdownStatus } from '../utils/dropdownData'

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
    filePath: null
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
              this.setState({ filePath: response })
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
              this.setState({ filePath: response })
            },
          )
        )

      default:
        return
    }
  }



  onSubmit = async() => {
    const payload = {
      relevant: this.state.dropdownValueStatus,
      category: this.state.dropdownValueWeather,
      gender: this.state.dropdownValueGender,
      name: this.state.title,
      description: this.state.description,
      price: this.state.price,
      image: this.state.filePath
    }

    try{
      const response = await axios.post('https://sleepy-cliffs-68954.herokuapp.com/api/product/create',payload)
      console.log('RESPONSE : ',response)
    }catch(e){
      console.log('error',e)
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
      filePath
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





// export default function App() {
//   const [response, setResponse] = React.useState(null);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <Button
//           title="Take image"
//           onPress={() =>
//             ImagePicker.launchCamera(
//               {
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 maxHeight: 200,
//                 maxWidth: 200,
//               },
//               (response) => {
//                 setResponse(response);
//               },
//             )
//           }
//         />

//         <Button
//           title="Select image"
//           onPress={() =>
//             ImagePicker.launchImageLibrary(
//               {
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 maxHeight: 200,
//                 maxWidth: 200,
//               },
//               (response) => {
//                 setResponse(response);
//               },
//             )
//           }
//         />

//         <Button
//           title="Take video"
//           onPress={() =>
//             ImagePicker.launchCamera({mediaType: 'video'}, (response) => {
//               setResponse(response);
//             })
//           }
//         />

//         <Button
//           title="Select video"
//           onPress={() =>
//             ImagePicker.launchImageLibrary({mediaType: 'video'}, (response) => {
//               setResponse(response);
//             })
//           }
//         />

//         <View style={styles.response}>
//           <Text>Res: {JSON.stringify(response)}</Text>
//         </View>

//         {response && (
//           <View style={styles.image}>
//             <Image
//               style={{width: 200, height: 200}}
//               source={{uri: response.uri}}
//             />
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   button: {
//     marginVertical: 24,
//     marginHorizontal: 24,
//   },
//   image: {
//     marginVertical: 24,
//     alignItems: 'center',
//   },
//   response: {
//     marginVertical: 16,
//     marginHorizontal: 8,
//   },
// });