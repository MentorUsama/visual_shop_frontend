import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import { getOrders } from '../../Utility/APIS/Order/order'
import OrderDetail from '../../components/components/Orders/orderDetail';
import { getSelectedImage } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'

const Orders = (props) => {
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(async () => {
        if (props.orders == null) {
            setPageLoading(true)
            const response = await getOrders(props.access)
            if (response.status == 200) {
                props.addOrders(response.data)
            }
            setPageLoading(false)
        }
    }, [])
    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        props.orders && props.orders.map(order => {
                            return (
                                <OrderDetail getSelectedImage={getSelectedImage} key={order.id} order={order} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </PageContainer>
    )
}
const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        access: state.userReducer.access,
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