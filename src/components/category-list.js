import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { CaruselCategory } from './carousel'

export default class CategoryList extends Component {

    render() {

        return (
            <View style={styles.categoryList_box}>
                <CaruselCategory nav={this.props.nav} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categoryList_box:{
        width:'100%',
        height:'100%',
        paddingTop:'20%',
        justifyContent:'space-between'
    },

})