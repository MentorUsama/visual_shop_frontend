import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function ImageButton(props) {
    const {
        image,
        greyImage=props.image,
        isSelected = false,
        onPress = null,
        isDisabled = false,
        style={}
    } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={isDisabled ? 1 : 0.8}>
            <View style={style}>
                <Image
                    source={isSelected?image:greyImage}
                    style={styles.imageStyle}
                />
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        resizeMode: "contain",
        width:'100%',
        height:'100%'
    }
})