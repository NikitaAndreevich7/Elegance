import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const Header = ({ title, description=''}) => {

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.header__title}>{title}</Text>
                <Text style={styles.header__description}>{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        backgroundColor: '#30BA8F',
        justifyContent: 'flex-end',
        borderBottomRightRadius: 50
      },
      headerContent: {
        flexDirection: 'column',
        marginLeft: '20%',
        paddingBottom: 30,
      },
      header__title: {
        fontSize: 35,
        color: '#fff'
      },
      header__description: {
        fontSize: 18,
        color: '#fff'
      },
})