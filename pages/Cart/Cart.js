import React, { useState } from 'react';
import { Text, View, Button, StyleSheet,ScrollView } from 'react-native';
// Redux
import { connect } from 'react-redux';
// Helpers
import {getTotalPrice,findProductInCart} from '../../Utility/HelperFunctions/index'
// Cotainer
import PageContainer from '../../components/container/PageContainer'
import MyButton from '../../components/components/Button/MyButton'
import CartProduct from '../../components/components/Cart/CartProduct/CartProduct';


const Cart = (props) => {
    // Extra Data
    const [pageLoading, setPageLoading] = useState(false)
    const totalPrice=getTotalPrice(props.cartData,props.cartProductsDetail)
    return (
        <PageContainer pageLoading={pageLoading} hasPadding={true} navigation={props.navigation} >
            <View style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title}>Selected Product</Text>
                </View>
                {/* Selected Product Container */}
                <View style={{flex:1,paddingTop:10,paddingBottom:10}}>
                    <ScrollView>
                        <View>
                            <CartProduct 
                                cart={props.cartData[0]}
                                productDetail={findProductInCart(props.cartProductsDetail,props.cartData[0].productId)}
                            />
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
                        <MyButton title="Checkout" />
                        <MyButton title="Add More Product" isSecondary={true} />
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
        marginBottom:20
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

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);