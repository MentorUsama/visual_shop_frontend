import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function OrderDetail(props) {
    var url = props.getSelectedImage(props.orderedProduct.productId.images, { colourSelected: props.orderedProduct.colourSelected })
    return (
        <View style={[styles.containerStyle]}>
            <Image
                source={{
                    uri: url ? url.image : props.orderedProduct.productId.images[0].image,
                }}
                style={styles.imageStyle}
            />
            <View style={{ padding: 5 }}>
                <Text style={styles.title} numberOfLines={1}>{props.orderedProduct.productId.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.subtitle}>Quantity</Text>
                    <Text style={styles.subtitle}>{props.orderedProduct.totalQuantity}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.subtitle}>Total Price</Text>
                    <Text style={styles.subtitle}>{props.orderedProduct.totalPrice}</Text>
                </View>
                {props.orderedProduct.sizeSelected ? <View style={styles.priceContainer}>
                    <Text style={styles.subtitle}>Selected Size</Text>
                    <Text style={styles.subtitle}>{props.orderedProduct.sizeSelected}</Text>
                </View> : null}
                {props.orderedProduct.colourSelected ? <View style={styles.priceContainer}>
                    <Text style={styles.subtitle}>Selected Colour</Text>
                    <Text style={styles.subtitle}>{props.orderedProduct.colourSelected}</Text>
                </View> : null}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: 100,
    },
    containerStyle: {
        backgroundColor: '#FFFFFF',
        width: 120,
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
    title: {
        color: '#000000',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 10
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    }
})