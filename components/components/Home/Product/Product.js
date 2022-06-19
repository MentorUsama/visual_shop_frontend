import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FeaturesDetected from '../FeaturesDetected/FeaturesDetected'

const get_feature = (features, product_id) => {
    const feature = features.find(feature => feature[1] == product_id)
    return (
        <View>
            {
                feature ?
                    <FeaturesDetected percentage={feature[3]} />
                    :
                    null
            }
        </View>
    )
}
export default function Product(props) {
    const { containerStyle = {} } = props
    return (
        <TouchableOpacity style={styles.touchable_opacity_container} activeOpacity={0.8} onPress={props.onPress} key={props.item.id}>
            {
                props.features_extracted ?
                    <View>
                        {get_feature(props.features_extracted, props.item.id)}
                    </View>
                    : null
            }
            <View style={[styles.productContainer, containerStyle]}>
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
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    touchable_opacity_container: {
        width: '45%',
        marginBottom: '10%',
        backgroundColor: 'transparent',
    },
    productContainer: {
        backgroundColor: '#FFFFFF',
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