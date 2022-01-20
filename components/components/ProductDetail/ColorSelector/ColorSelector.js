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
        width: '100%',
        height: '100%',
    },
    container: {
        width: 70,
        height: 70,
        marginBottom:10,
        marginRight:10
    },
    containerActive: {
        borderWidth: 2,
        borderColor: '#FF7465'
    }
})