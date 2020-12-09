import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg';

import { submitMessageButton } from '../ui/svg/svg_const'

export default class ChatScreen extends Component {

  state = {
    inputChatValue: '',
    messageHistory: [
      {
        id: '7',
        type: 'user1',
        message: 'Здравствуйте,хочу заказать у вас куклу для дочери. Подскажите пожалуйста сколько будет стоить ?'
      },
      {
        id: '9',
        type: 'user2',
        message: 'Добрый вечер.Все куклы ручной работы, стиль самой куклы и одежды делается по вашему желанию. Цена куклы 3000р'
      },
      {
        id: '8',
        type: 'user1',
        message: 'Отлично. Подскажите еще пожалуйста, сколько по времени будет делаться кукла. У дочери через 2 дня день рождения, получится за такой короткий срок сделать ?'
      },
      {
        id: '7',
        type: 'user2',
        message: 'Думаю, что успеем. Главное поскорее начать.Для этого мне нужна фотография желаемой кулкы или ипишите словами какой типаж и какую ожеду будем шить.'
      },
      {
        id: '6',
        type: 'user1',
        message: 'Хорошо.У меня примерная фотография, той куклы которую хочет дочь,но одежду надо будет пошить другую под нее. Подскажите как лучше с вами связаться что бы обсудить эти делати ?'
      },
      {
        id: '5',
        type: 'user2',
        message: 'Можете написать прямо сдесь и прикрепить изображения кулкы и одежды, или прийти ко мне в оффис по адресу "Липовенко 6". Более точное описание местоположения офисса можете посмотреь в этом приложении в разделе "Контакты"'
      },
      {
        id: '4',
        type: 'user1',
        message: 'Хорошо, завтра в первой половине дня приеду к вам в офис.Хорошего вечера.'
      },
      {
        id: '3',
        type: 'user2',
        message: 'Спасибо и вам хорошего вечера.'
      }
    ]
  }

  createHistoryList = (array) => {
    return <FlatList
      data={array}
      renderItem={({ item }) => {

        const styleMessageBox = {
          alignItems: item.type === 'user1' ? 'flex-end' : 'flex-start',
        }

        const styleMessageText = {
          backgroundColor: item.type === 'user1' ? '#009A63' : 'silver',
          borderTopLeftRadius: item.type === 'user1' ? 15 : 1,
          borderTopRightRadius: item.type === 'user2' ? 15 : 1

        }

        return (
          <View style={[styles.messageHistory_content__itemBox,styleMessageBox]}>
            <Text style={[styles.messageHistory_content__itemBoxText,styleMessageText]}>{item.message}</Text>
          </View>
        )
      }}
      keyExtractor={item => item.id}
    />
  }

  render() {
    const { inputChatValue, messageHistory } = this.state;


    const footer_content = (
      <View style={styles.footer_content}>
        <View style={styles.footer_content__box}>
          <TextInput
            style={styles.footer_content__input}
            value={inputChatValue}
            onChangeText={(value) => this.setState({ inputChatValue: value })} />
          <TouchableOpacity style={styles.footer_content___btn}>
            <SvgXml xml={submitMessageButton} width="100%" height="100%" />
          </TouchableOpacity>
        </View>
      </View>
    )

    const messageHistoryContent = (
      <View style={styles.messageHistory_content}>
        {
          messageHistory.length !== 0 ?
            (this.createHistoryList(messageHistory)) :
            (<Text style={styles.messageHistory_content__noMessage}>Нет истории переписки</Text>)
        }
      </View>


    )

    return (
      <View style={styles.content}>
        {messageHistoryContent}
        {footer_content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  messageHistory_content: {
    flex:1,
    width: '100%',
    height: '100%',
    marginTop:65,
    marginBottom:65
  },
  messageHistory_content__noMessage: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(0,0,0, .1)'
  },
  messageHistory_content__itemBox: {
    width:'100%',
    marginTop:20
  },
  messageHistory_content__itemBoxText: {
    width:'50%',
    padding:10,
    fontSize:18,
    color:'#fff',
    margin:10,
    borderRadius:15
  },
  footer_content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(0,0,0, .1)'
  },
  footer_content__box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  footer_content__input: {
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  footer_content___btn: {
    width: 35,

  }

})