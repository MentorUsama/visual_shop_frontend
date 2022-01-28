import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Helpers
import { getTotalPrice, findProductInCart } from '../../Utility/HelperFunctions/index'
// Cotainer
import PageContainer from '../../components/container/PageContainer'
import MyButton from '../../components/components/Button/MyButton'
import CartProduct from '../../components/components/Cart/CartProduct/CartProduct';
import {
    RemoveProductFromCart,
    storeData,
    clearData,
    CART_DATA,
    getSelectedImage
} from '../../Utility/HelperFunctions/index'


const Cart = (props) => {
    // Extra Data
    const [pageLoading, setPageLoading] = useState(false)
    const totalPrice = getTotalPrice(props.cartData, props.cartProductsDetail)

    const removeHandler = async (productId) => {
        const updatedCartData = RemoveProductFromCart(productId, props.cartData, props.cartProductsDetail)
        props.addToCart(updatedCartData.cartData, updatedCartData.cartProductsDetail)
        if (updatedCartData.cartData) {
            const result = await storeData(CART_DATA, updatedCartData.cartData)
        }
        else {
            const result = await clearData(CART_DATA)
        }
    }
    const editHandler = (productDetail) => {
        props.navigation.navigate("ProductDetail", { product: productDetail })
    }
    return (
        <PageContainer pageLoading={pageLoading} hasPadding={true} navigation={props.navigation} >
            <View style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title}>Selected Product</Text>
                </View>
                {/* Selected Product Container */}
                <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.cartContainer}>
                            {
                                props.cartData ? props.cartData.map((cart) => (
                                    <CartProduct
                                        key={cart.productId}
                                        getSelectedImage={getSelectedImage}
                                        cart={cart}
                                        removeHandler={removeHandler}
                                        editHandler={editHandler}
                                        productDetail={findProductInCart(props.cartProductsDetail, cart.productId)}
                                    />
                                )) :
                                    <Text>No Product Found!!</Text>
                            }
                        </View>
                    </ScrollView>
                </View>
                {/* Price Container */}
                <View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.title}>Total Price</Text>
                        <Text style={styles.subtitle}>{`${totalPrice} RS`}</Text>
                    </View>
                    <View>
                        {
                            props.access ?
                                <MyButton isDisabled={props.cartData ? false : true} onPress={() => props.navigation.navigate("Checkout")} title="Checkout" />
                                :
                                <MyButton onPress={() => props.navigation.navigate("Login")} title="Login To Proceed Futher" />
                        }
                        <MyButton title="Add More Product" onPress={() => props.navigation.navigate("HomePage")} isSecondary={true} />
                    </View>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'justify',
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    cartContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        orders: state.orderReducer.orders,
        cartData: state.shopReducer.cartData,
        cartProductsDetail: state.shopReducer.cartProductsDetail
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (cartData, product) => dispatch(actions.addToCart(cartData, product))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);