import React, { useState } from 'react';
import {  View, Image, StyleSheet,Text } from 'react-native';
import PageContainer from '../../components/container/PageContainer'

// Strip
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// APIS
import {createOrder} from '../../Utility/APIS/index'
// Component
import Credit from '../../assets/images/creditCard.png'
import MyButton from '../../components/components/Button/MyButton'
import ConfirmOrder from '../../components/components/CreditCard/ConfirmOrder';
import PaymentSucced from '../../components/components/CreditCard/PaymentSuccedd'



const CreditCard = (props) => {
    const [pageLoading, setPageLoading] = useState(false)
    const [globalError,setGlobalError]= useState("")

    const [cardDetail, setCardDetail] = useState(null)
    const { confirmPayment, loading } = useConfirmPayment()

    const [paymentSucceddModel,setPaymentSucceddModel]=useState(false)
    const [corfirmOrderPrice,setCorfirmOrderPrice]=useState(null)
    const [paymentFail,setpaymentFail]=useState(null)
    const [clientSecret,setClientSecret]=useState(null)
    const [orderDetail,setOrderDetail]=useState(null)

console.log(props.shouldUpdate)
 

    const cancelOrder = () =>{
        console.log("cancel")
        setCorfirmOrderPrice(null)
    }
    const confirmMyOrder = async () =>{
        console.log(orderDetail)
        setCorfirmOrderPrice(null)
        setPageLoading(true)
        // Making the payment
        const { paymentIntent, error } = await confirmPayment(clientSecret,{
            type: "Card",
            billingDetails: orderDetail,
        });
        if(error.code == 'Failed')
        {
            console.log("fail")
            setpaymentFail(error.localizedMessage)
            setPageLoading(false)
            return
        }
        setPageLoading(false)
    }
    const payNow = async () => {
        if (orderDetail)
        {
            confirmMyOrder()
            return
        }
        setPageLoading(true)
        // Validating the data
        const billingDetail = { 
            shippingAddress: props.checkoutData.profile.address,
            receiverName:props.checkoutData.profile.name,
            receiverContact:props.checkoutData.profile.contact,
            cuopenId:props.checkoutData.coupen,
            cityId:props.checkoutData.profile.cityId,
            orderedProducts:props.cartData,
        }
        // Getting the secret key of the client
        const createOrderResponse = await createOrder(billingDetail,props.access)
        if(createOrderResponse.status!= 200) // If error occured
        {
            setGlobalError(createOrderResponse.data)
            setPageLoading(false)
            return
        }
        setClientSecret(createOrderResponse.data.strip_client_id)
        setCorfirmOrderPrice(createOrderResponse.data.totalPrice)
        setOrderDetail(createOrderResponse.data)
        props.shouldUpdateUserOrder(true)
        setPageLoading(false)
    }


    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            {/* Modals */}
            <ConfirmOrder cancelOrder={cancelOrder} confirmMyOrder={confirmMyOrder} show={corfirmOrderPrice?true:false} price={corfirmOrderPrice} />
            <PaymentSucced show={paymentSucceddModel} />
            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Image
                    source={Credit}
                    style={styles.imageStyle}
                />
                <View style={{marginTop:50}}>
                    <View>
                        <StripeProvider publishableKey="pk_test_51KOiH2LleyqQ1R14MpFcPPk7xyzaMby5Olnc8KSNI1QK4OOoMxrsVmC6UfBuoxxZ3PiVEfQRby97kCtRPsjMJxDe00eK1YA1Gz">
                            <Text style={{color: '#FF7465', fontSize: 15, marginBottom: 10,textAlign:'center',fontWeight:'bold' }}>{globalError}</Text>
                            {paymentFail?<View style={{marginBottom:20}}>
                                <Text style={{ color: '#000000', fontSize: 12, marginBottom: 0,textAlign:'center' }}>Transaction Failed because of following error!!</Text>
                                <Text style={{ color: '#FF7465', fontSize: 12, marginBottom: 0,textAlign:'center',fontWeight:'bold' }}>{paymentFail}</Text>
                                <Text style={{ color: '#000000', fontSize: 10,textAlign:'center' }}>Your <Text style={{color:'#FF7465',fontWeight:'bold'}}>order is placed</Text> you can purchase it latter or try again</Text>
                            </View>:null}
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
        checkoutData:state.orderReducer.checkoutData,
        cartData:state.shopReducer.cartData,
        access:state.userReducer.access,
        shouldUpdate:state.updateDataReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        shouldUpdateUserOrder: (shouldUpdate) => dispatch(actions.shouldUpdateUserOrder(shouldUpdate)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCard);