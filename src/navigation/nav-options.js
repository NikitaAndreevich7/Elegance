import React from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

export const navigatorOptions = {
  defaultNavigationOptions: {
    // unmountOnBlur: true,
    // headerStyle: {
    //   height: 50,
    // },
    // headerTintColor: '',
    // headerTitleStyle: {
    //   // fontWeight: "bold",
    //   color: "black",
    //   fontSize: 16,
    // },
  },
};

export const optoins_category = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#30BA8F',
  // },
  // headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
});

export const options_contact = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // }, headerStyle: {
  //   backgroundColor: '#30BA8F',
  // },
  // headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
       <Icon name="arrow-back-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
});

export const options_home = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "#fff",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#30BA8F',
  // },
  headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
});

export const options_product = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#AAF0D1',

  // },
  headerRight: () => (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => alert('Open filter')}>
      <Icon name="filter-outline" size={30} color="#fff" />
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
});

export const options_favourites = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#AAF0D1',

  // },
  // headerRight: () => (
  //   <TouchableOpacity style={{ marginRight: 20 }} onPress={() => alert('Open filter')}>
  //     <Icon name="filter-outline" size={30} color="#fff" />
  //   </TouchableOpacity>
  // ),
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
           <Icon name="menu-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
});

export const options_productDetails = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#AAF0D1',
  //   zIndex: 1
  // },
  headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity
      style={{
        marginLeft: 20,
        position: 'absolute',
        backgroundColor: '#30BA8F',
        width: 60, height: 60, borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center', top: 20
      }}
      onPress={() => navigation.goBack()}>
       <Icon name="arrow-back-outline" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

export const options_chatScreen = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  // headerTitleStyle: {
  //   color: "black",
  //   fontSize: 25,
  //   letterSpacing: 3,
  // },
  // headerStyle: {
  //   backgroundColor: '#AAF0D1',
  //   zIndex: 1
  // },
  headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity
      style={{
        marginLeft: 20,
        position: 'absolute',
        backgroundColor: '#30BA8F',
        width: 60, height: 60, borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center', top: 20
      }}
      onPress={() => navigation.goBack()}>
       <Icon name="arrow-back-outline" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});





export const options_AddNewProduct = ({ navigation }) => ({
  headerTransparent: true,
  headerTitle: "",
  headerRight: () => { },
  headerLeft: () => (
    <TouchableOpacity
      style={{
        marginLeft: 20,
        // position: 'absolute',
        backgroundColor: '#30BA8F',
        width: 60, height: 60, borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center', top: 20,
        zIndex:-1
      }}
      onPress={() => navigation.navigate('Home')}>
       <Icon name="arrow-back-outline" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});