import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import { getOrders } from '../../Utility/APIS/Order/order'
import OrderDetail from '../../components/components/Orders/orderDetail';
import { getSelectedImage } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
import { cancelOrder,createComplaint } from '../../Utility/APIS/index'

const Orders = (props) => {
    const [pageLoading, setPageLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    useEffect(async () => {
        if (props.orders == null || props.shouldUpdateUserOrder) {
            setPageLoading(true)
            const response = await getOrders(props.access)
            if (response.status == 200) {
                props.addOrders(response.data)
            }
            setPageLoading(false)
        }
    }, [])
    const getAllOrders = async ()=>{
        setPageLoading(true)
            const response = await getOrders(props.access)
            if (response.status == 200) {
                props.addOrders(response.data)
            }
        setPageLoading(false)
    }
    const registerComplaint = async (orderId)=>{
        setPageLoading(true)
        const response_complaint =await createComplaint(props.access,orderId)
        if(response_complaint.status!=200)
        {
            setGlobalError(response_complaint.data)
            setPageLoading(false)
            return
        }
        const response = await getOrders(props.access)
            if (response.status == 200) {
                props.addOrders(response.data)
        }
        console.log("a")
        setPageLoading(false)
    }
    const cancelMyOrder = async (orderId)=>{
        setPageLoading(true)
        const response =  await cancelOrder(props.access,{ 'order_id': orderId })
        if(response.status!=200)
        {
            setGlobalError(response.data)
            setPageLoading(false)
            return
        }
        await getAllOrders()
        setPageLoading(false)
    }
    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            <View>
                <Text style={{ color: '#FF7465', fontSize: 15, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>{globalError}</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        props.orders && props.orders.map(order => {
                            return (
                                <OrderDetail navigation={props.navigation} cancelOrder={cancelMyOrder} registerComplaint={registerComplaint} getSelectedImage={getSelectedImage} key={order.id} order={order} />
                            )
                        })
                    }
                    <View style={{marginBottom:50}}></View>
                </ScrollView>
            </View>
        </PageContainer>
    )
}
const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        access: state.userReducer.access,
        shouldUpdateUserOrder: state.updateDataReducer.shouldUpdateUserOrder
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addOrders: (orders) => dispatch(actions.addOrders(orders))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);