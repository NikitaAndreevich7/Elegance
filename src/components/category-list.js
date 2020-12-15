import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import CategoryItem from './category-item'

export default class CategoryList extends Component {

    render() {
        const category = [
            {
                label: 'Зима',
                value: 'winter',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa5qZLpY8y3gq9yYhoITD24UTfJtNSI6KkLg&usqp=CAU'
            },
            {
                label: 'Лето',
                value: 'summer',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKuBezynQv8feE57p9-9KXyE04Qo-Ajhxnmw&usqp=CAU'
            }, {
                label: 'Демисезонное',
                value: 'demi-season',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2ZP6VAXgHZu0wNKpqdZy6xEiwWMporsYrg&usqp=CAU'
            },
            {
                label: 'Школьная форма',
                value: 'school',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_fM3zVHIFAlZI5vuWEqzrU8bUrj34EneuA&usqp=CAU'
            },
            {
                label: 'Куклы',
                value: 'dolls',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIztrIX89xkiHe9dSqMiNYdzzvGGiO4y8MA&usqp=CAU'
            },
        ]



        return (
            <View style={styles.categoryList_box}>
                <FlatList
                    data={category}
                    keyExtractor={item => item.value}
                    renderItem={({ item }) => {
                        return <CategoryItem {...item} nav={this.props.nav} />
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categoryList_box: {
        width: '90%',
        marginLeft:'auto',
        marginRight:'auto',
        height: '100%',
        // justifyContent:'center',
        // alignItems:'center'
    },

})