import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
// Importing API's
import { getOrders } from '../../Utility/APIS/Order/order'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Importing Components
import Loader from '../../components/components/Loader/Loader';
import Box from '../../components/components/Complaints/Box';


const Complaints = (props) => {
    // Getting All The Orders
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(async () => {
        if (props.orders == null) {
            setPageLoading(true)
            const response = await getOrders(props.access)
            props.addOrders(response.data)
            setPageLoading(false)
        }
    }, [])
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            <Loader loading={pageLoading} />
            <Text style={styles.title}>Complaints</Text>
            <ScrollView>
                <View>
                    {
                        props.orders && props.orders.map(order => {
                            if (order.complaints != null) {
                                return <Box key={order.id} id={order.id} status={order.orderStatus} />
                            }
                        })
                    }
                </View>
            </ScrollView>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        orders: state.orderReducer.orders
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addOrders: (orders) => dispatch(actions.addOrders(orders)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Complaints);