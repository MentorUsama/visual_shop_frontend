import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import { CommonActions } from '@react-navigation/native';

// Strip
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { clearData,storeData } from '../../Utility/HelperFunctions/asyncStorage'
import { CART_DATA } from '../../Utility/HelperFunctions/storageKeys'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// APIS
import { createOrder, confirmOrderPayment,cancelOrder } from '../../Utility/APIS/index'
// Component
import Credit from '../../assets/images/creditCard.png'
import MyButton from '../../components/components/Button/MyButton'
import ConfirmOrder from '../../components/components/CreditCard/ConfirmOrder';
import PaymentSucced from '../../components/components/CreditCard/PaymentSuccedd'
import CancelationFailed from '../../components/components/CreditCard/CancelationFailed'



const CreditCard = (props) => {
    const [pageLoading, setPageLoading] = useState(false)
    const [globalError, setGlobalError] = useState("")

    const [cardDetail, setCardDetail] = useState(null)
    const { confirmPayment, loading } = useConfirmPayment()

    const [paymentSucceddModel, setPaymentSucceddModel] = useState(false)
    const [corfirmOrderPrice, setCorfirmOrderPrice] = useState(null)
    const [paymentFail, setpaymentFail] = useState(null)
    const [paymentConfirmationFailed, setPaymentConfirmationFailed] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const [orderDetail, setOrderDetail] = useState(null)
    const [orderCacel,setOrderCancel] = useState(null)

    // Previous Data
    const [prevCartData,setPrevCartData]= useState(null)

    const cancelMyOrder = async () => {
        setPageLoading(true)
        setCorfirmOrderPrice(null)
        const response =  await cancelOrder(props.access,{ 'order_id': orderDetail.id })
        console.log(response)
        if(response.status!=200)
        {
            setPaymentConfirmationFailed({header:'Order Cancellation Failed',secondMessage:'We are unable to cancel the order because of following error',errorMessage:response.data})
            setPageLoading(false)
            return
        }
        props.addDataToCart(prevCartData.cartData,prevCartData.cartProductsDetail)
        await storeData(CART_DATA,prevCartData.cartData)
        setPageLoading(false)
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomePage'},{name:'Cart'}],
        });
        
    }
    const confirmMyOrder = async () => {
        setCorfirmOrderPrice(null)
        setpaymentFail(null)
        setPageLoading(true)
        // Making the payment
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: "Card",
            billingDetails: orderDetail,
        });
        if (error && error.code == 'Failed') {
            setpaymentFail(error.localizedMessage)
            setPageLoading(false)
            return
        }
        // Updating the payment status to the server
        const payment_status = await confirmOrderPayment(props.access, { 'order_id': orderDetail.id })
        if (payment_status.status == 200) {
            if (payment_status.data.status == 'shipping') {
                setPaymentSucceddModel({
                    message: 'Thank you for purchasing. Your product is on the way and will reach to you soon',
                    header: 'Transaction Successfull'
                })
                setPageLoading(false)
                return
            }
            else {
                setPaymentSucceddModel({
                    message: 'Currently we are processing your payment. We will ship product to you as soon as the payment is received.',
                    header: 'Thank you for purchasing'
                })
                setPageLoading(false)
                return
            }
        }
        else {
            setPaymentSucceddModel({
                message: 'Currently we are processing your payment. We will ship product to you as soon as the payment is received.',
                header: 'Thank you for purchasing'
            })
            setPageLoading(false)
            return
        }
    }
    const payNow = async () => {
        if (orderDetail) {
            confirmMyOrder()
            return
        }
        setPageLoading(true)
        // Validating the data
        const billingDetail = {
            shippingAddress: props.checkoutData.profile.address,
            receiverName: props.checkoutData.profile.name,
            receiverContact: props.checkoutData.profile.contact,
            cuopenId: props.checkoutData.coupen,
            cityId: props.checkoutData.profile.cityId,
            orderedProducts: props.cartData,
        }
        // Getting the secret key of the client
        const createOrderResponse = await createOrder(billingDetail, props.access)
        if (createOrderResponse.status != 200) // If error occured
        {
            setGlobalError(createOrderResponse.data)
            setPageLoading(false)
            return
        }
        setClientSecret(createOrderResponse.data.stripe_client_secret)
        setCorfirmOrderPrice(createOrderResponse.data.totalPrice)
        setOrderDetail(createOrderResponse.data)
        // Updating the store
        setPrevCartData({cartData:props.cartData,cartProductsDetail:props.cartProductsDetail})
        props.shouldUpdateUserOrder(true)
        props.removeDataFromCart()
        props.removeCheckoutData()
        await clearData(CART_DATA)
        props.navigation.dispatch(state => {
            // Remove the home route from the stack
            const routes = state.routes.filter(r => r.name === 'HomePage' || r.name === 'CreditCard');

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        });
        setPageLoading(false)
    }


    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            {/* Modals */}
            <ConfirmOrder cancelOrder={cancelMyOrder} confirmMyOrder={confirmMyOrder} show={corfirmOrderPrice ? true : false} price={corfirmOrderPrice} />
            <PaymentSucced onPress={() => props.navigation.replace('Orders')} message={paymentSucceddModel} show={paymentSucceddModel ? true : false} />
            <CancelationFailed viewOrder={() => props.navigation.replace('Orders')} cancelMyOrder={cancelMyOrder} message={paymentConfirmationFailed} show={paymentConfirmationFailed ? true : false} />
            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Image
                    source={Credit}
                    style={styles.imageStyle}
                />
                <View style={{ marginTop: 50 }}>
                    <View>
                        <StripeProvider publishableKey="pk_test_51KOiH2LleyqQ1R14MpFcPPk7xyzaMby5Olnc8KSNI1QK4OOoMxrsVmC6UfBuoxxZ3PiVEfQRby97kCtRPsjMJxDe00eK1YA1Gz">
                            <Text style={{ color: '#FF7465', fontSize: 15, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>{globalError}</Text>
                            {paymentFail ? <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: '#000000', fontSize: 12, marginBottom: 0, textAlign: 'center' }}>Transaction Failed because of following error!!</Text>
                                <Text style={{ color: '#FF7465', fontSize: 12, marginBottom: 0, textAlign: 'center', fontWeight: 'bold' }}>{paymentFail}</Text>
                                <Text style={{ color: '#000000', fontSize: 10, textAlign: 'center' }}>Your <Text style={{ color: '#FF7465', fontWeight: 'bold' }}>order is placed</Text> you can purchase it latter or try again</Text>
                            </View> : null}
                            <CardField
                                postalCodeEnabled={false}
                                placeholder={
                                    { number: '4242 4242 4242 4242' }
                                }
                                onCardChange={(data) => setCardDetail(data)}
                                style={styles.cardContainer}
                                cardStyle={{
                                    fontSize: 17,
                                    textColor: 'black',
                                    backgroundColor: '#CACACA',
                                }}
                            />
                            <MyButton style={{ marginTop: 10 }} isDisabled={!(cardDetail && cardDetail.complete)} title="pay" onPress={payNow} />
                        </StripeProvider>
                    </View>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        resizeMode: "contain",
        width: '100%',
        height: 100
    },
    cardContainer: {
        backgroundColor: '#CACACA',
        height: 50,
        padding: 10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10
    }
})
const mapStateToProps = state => {
    return {
        checkoutData: state.orderReducer.checkoutData,
        cartData: state.shopReducer.cartData,
        cartProductsDetail:state.shopReducer.cartProductsDetail,
        access: state.userReducer.access,
        shouldUpdate: state.updateDataReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        shouldUpdateUserOrder: (shouldUpdate) => dispatch(actions.shouldUpdateUserOrder(shouldUpdate)),
        removeDataFromCart: () => dispatch(actions.addToCart(null, null)),
        removeCheckoutData: () => dispatch(actions.addCheckoutData(null)),
        addDataToCart: (cartData,product) => dispatch(actions.addToCart(cartData,product)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCard);