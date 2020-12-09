import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/FontAwesome';


import {
    CategoryScreen,
    ProductScreen,
    ContactScreen,
    HomeScreen,
    ProductDetailsScreen,
    FavouritesScreen,
    ChatScreen,
    AddNewProduct
} from '../screens'

import {
    navigatorOptions,
    optoins_category,
    options_contact,
    options_home,
    options_product,
    options_productDetails,
    options_favourites,
    options_chatScreen,
    options_AddNewProduct
} from './nav-options'

//Drawer не подразумевает наличия Header в компонентах.Поэтому оборачиваем в createStacknavigator
const HomeStack = createStackNavigator(
    {
        HomeScreen: { screen: HomeScreen, navigationOptions: options_home }
    },
    navigatorOptions,

)
const FavouritesStack = createStackNavigator(
    {
        Favourites: { screen: FavouritesScreen, navigationOptions: options_favourites }
    },
    navigatorOptions,

)
const ContactStack = createStackNavigator(
    {
        ContactScreen: { screen: ContactScreen, navigationOptions: options_contact, }
    }
)
const CategoryStack = createStackNavigator(
    {
        CategoryScreen: { screen: CategoryScreen, navigationOptions: optoins_category },
        Products: { screen: ProductScreen, navigationOptions: options_product },
        ProductDetails: { screen: ProductDetailsScreen, navigationOptions: options_productDetails },
        ChatScreen: { screen: ChatScreen, navigationOptions: options_chatScreen }
    }
)

const AddProduct = createStackNavigator(
    {
        AddNewProduct: { screen: AddNewProduct, navigationOptions: options_AddNewProduct }
    }
)

const DrawerLogo = (props) => (
    <View>
        <View style={{ height: 200, width: '100%' }}>
            <Image
                style={{ height: '100%', maxWidth: '100%' }}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG-_w2g4H7fAlMWK1I50Ncb099WeUKDLjd6w&usqp=CAU' }}
            />
        </View>
        <DrawerItems {...props} />
    </View>
)

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            // drawerIcon: (
            //     <Icon name="home" size={30} color="grey" />
            // ),
            title: 'Главная'
        }
    },
    Category: {
        screen: CategoryStack,
        navigationOptions: {
            // drawerIcon: (
            //     <Icon name="list" size={30} color="grey" />
            // ),
            title: 'Категории'
        }
    },
    Favourites: {
        screen: FavouritesStack,
        navigationOptions: {
            title: 'Избранное'
        }
    },
    Contact: {
        screen: ContactStack,
        navigationOptions: {
            // drawerIcon: (
            //     <Icon name="address-book" size={30} color="grey" />
            // ),
            title: 'Контакты',
        }
    },
    AddNew: {
        screen: AddProduct,
        navigationOptions: {
            // drawerIcon: (
            //     <Icon name="address-book" size={30} color="grey" />
            // ),
            title: 'Добавить',
        }
    },
}, {
    // drawerBackgroundColor: 'rgba(0,0,0, .4)',
    drawerType: 'back',
    drawerWidth: 250,
    edgeWidth: 200,
    minSwipeDistance: 50,
    unmountInactiveRoutes: true,
    contentOptions: {
        title: 'TITLE',
        activeTintColor: '#77DDE7',
        activeBackgroundColor: '#fff',
        itemsContainerStyle: {
            marginVertical: 0,
            marginTop: 50
        },
        iconContainerStyle: {
            opacity: 1
        },
        // labelStyle :{
        //     color:'grey',
        //     fontSize:20
        // }
    },


    contentComponent: DrawerLogo

});


const AppNavigation = createAppContainer(MyDrawerNavigator);
export default AppNavigation;


