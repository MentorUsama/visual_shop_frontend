import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function Product(props) {
    const { containerStyle = {} } = props
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} key={props.item.id} style={[styles.productContainer, containerStyle]}>
            {
                props.item.images == null ?
                    null :
                    props.item.images.length == 0 ?
                        null :
                        <Image
                            source={{
                                uri: props.item.images[0].image,
                            }}
                            style={styles.imageStyle}
                        />
            }
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{props.item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text>Price</Text>
                    <Text>{props.item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: '#FFFFFF',
        width: '45%',
        marginBottom: '10%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingBottom: 10
    },
    imageStyle: {
        width: '100%',
        height: 150,
    },
    textContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    }
})