import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function CarouselItem(props) {
    return (
        <View key={props.item.id} style={{ flex: 1 }} >
            <Image
                style={styles.imageStyle}
                source={{
                    uri: props.item.image,
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: '100%',
        // borderBottomLeftRadius:60,
        // borderBottomRightRadius:60
    }
})