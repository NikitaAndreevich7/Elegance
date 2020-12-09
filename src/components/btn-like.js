import React from 'react'
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Props } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { SvgXml } from 'react-native-svg';
import { like } from '../ui/svg/svg_const'

export const BtnLike = (props) => {


    return (
        <TouchableOpacity style={[props.style,styles.btnLikeBox]} onPress={() => alert('Добавлено в избранное')}>
            <SvgXml xml={like} width="60%" height="100%" />
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    btnLikeBox:{
        backgroundColor: '#30BA8F',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        zIndex:100,
        right:20,
        borderRadius:100,
      },
})