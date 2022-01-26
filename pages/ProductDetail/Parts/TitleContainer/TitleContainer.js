import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Star from '../../../../assets/icons/star'

export default function TitleContainer(props) {
    const {
        price,
        name,
        subCategoryId,
        rating
    } = props
    return (
        <View style={styles.titleContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={3}>{name}</Text>
                <Text style={styles.subTitle}>{subCategoryId.categoryId.name} - {subCategoryId.name}</Text>
                <View style={styles.starContainer}>
                    {
                        [...Array(5)].map((a, index) => <View key={index}><Star fill={index < rating ? "#FFD019" : "#909090"} /></View>)
                    }
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceStyle}>{parseFloat(price)} RS</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    subTitle: {
        color: '#828181',
        fontSize: 14,
        marginTop: 2
    },
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    priceContainer: {
        alignItems: 'center'
    },
    priceStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF7465',
        paddingLeft: 20,
        alignItems: 'center'
    },
})