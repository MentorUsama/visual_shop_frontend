import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ColorSelector(props) {
    const { isSelected = false} = props
    return (
        <View key={props.item.id} style={[styles.container, isSelected ? styles.containerActive : null]}>
            <TouchableOpacity onPress={()=>props.onPress(props.item,props.index)} activeOpacity={0.6}>
                <Image
                    source={{
                        uri: props.item.image,
                    }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 70,
        height: 70
    },
    container: {
        marginBottom:10,
        marginRight:10,
        borderWidth: 2,
        borderColor:'transparent'
    },
    containerActive: {
        borderWidth: 2,
        borderColor: '#FF7465'
    }
})