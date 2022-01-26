import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MyButton from '../../../../components/components/Button/MyButton';
import Cart from '../../../../assets/icons/cart'

export default function AddToCartButtons() {
    return (
        <View style={styles.iconContainer}>
            <View style={styles.cartButton}>
                <Cart />
            </View>
            <View style={{ flex: 1 }} >
                <MyButton style={{ paddingTop: 15, paddingBottom: 15, borderRadius: 10 }} title="Buy Now" />
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    iconContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    cartButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        width: 50,
        height: 50,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
