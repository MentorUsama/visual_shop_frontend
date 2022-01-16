import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function Product(props) {
    return (
        <View key={props.item.id} style={styles.productContainer}>
            {
                props.item.images == null ?
                    null :
                    props.item.images.length == 0 ?
                        null :
                        <Image
                            source={{
                                uri:props.item.images[0].image,
                            }}
                            style={styles.imageStyle}
                        />
            }
            <Text>{props.item.id}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: '#FFFFFF',
        maxWidth: 150,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    imageStyle: {
        width: 100,
        height: 200
    }
})