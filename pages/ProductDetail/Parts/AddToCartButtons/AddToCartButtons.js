import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MyButton from '../../../../components/components/Button/MyButton';
import Cart from '../../../../assets/icons/cart'
import TextLoader from '../../../../components/components/TextWithLoader/TextWithLoader';

export default function AddToCartButtons(props) {
    const {
        addToCart,
        buyNowHandler,
        removeFromCart,
        updateCart,
        isProductAddedToCart,
        access,
        isUpdated
    } = props
    return (
        <View>
            {
                isProductAddedToCart ?
                    <View>
                        <View style={[styles.singleIconContainer, { height: 52, marginBottom: 5 }]}>
                            <TextLoader
                                shouldShow={true}
                                title={"Remove"}
                                textStyle={{ textAlign: "left",textDecorationLine: 'underline',fontWeight:'bold' }}
                                containerStyle={{ paddingBottom: 0, marginRight: 10, height: '100%', justifyContent: 'center' }}
                                onPress={removeFromCart}
                            />
                            <MyButton isDisabled={isUpdated} style={{ flex: 1, paddingTop: 15, paddingBottom: 15, marginBottom: 0 }} onPress={updateCart} title="Update Cart" />
                        </View>
                        <View style={{ flex: 1 }} >
                            <MyButton onPress={buyNowHandler} isSecondary={true} style={{ paddingTop: 15, paddingBottom: 15 }} title={access ? "Buy Now" : "Login To Buy"} />
                        </View>
                    </View>
                    :
                    <View style={styles.singleIconContainer}>
                        <View style={styles.cartButton}>
                            <Cart onPress={addToCart} />
                        </View>
                        <View style={{ flex: 1 }} >
                            <MyButton onPress={buyNowHandler} style={{ flex: 1, paddingTop: 15, paddingBottom: 15, marginBottom: 0, height: 55 }} title={access ? "Buy Now" : "Login To Buy"} />
                        </View>
                    </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    singleIconContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        justifyContent: 'center'
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
