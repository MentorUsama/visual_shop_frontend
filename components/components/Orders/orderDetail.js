import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Button } from 'react-native';
import Collapsible from 'react-native-collapsible';
import OrderedProductDetail from '../Orders/OrderedProductDetail';
import DropArrow from '../../../assets/icons/downArrow'
import MyButton from '../Button/MyButton'
const OrderDetail = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <View style={styles.boxStyle}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => setIsOpen(!isOpen)} activeOpacity={0.5}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <DropArrow fill={isOpen ? '#FF7465' : '#828181'} direction={isOpen ? "above" : "down"} />
                    </View>
                    <View style={styles.boxContentContainer}>
                        <Text style={styles.boxTitle}>Order ID</Text>
                        <Text style={styles.boxText}>{props.order.id}</Text>
                    </View >
                    <View style={styles.boxContentContainer}>
                        <Text style={styles.boxTitle}>Order Date</Text>
                        <Text style={styles.boxText}>{props.order.orderDate}</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                        <Text style={styles.boxTitle}>Payment Method</Text>
                        <Text style={styles.boxText}>{props.order.paymentMethod}</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                        <Text style={styles.boxTitle}>Status</Text>
                        <Text style={styles.boxText}>{props.order.orderStatus}</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                        <Text style={styles.boxTitle}>Total Price</Text>
                        <Text style={styles.boxText}>{props.order.totalPrice}</Text>
                    </View>
                    <Collapsible collapsed={!isOpen}>
                        <View>
                            <Text style={styles.boxTitle}>Order Details</Text>
                            <View style={styles.productDetailContainer}>
                                {
                                    props.order.orderedProducts.map(orderedProduct => {
                                        return (
                                            <OrderedProductDetail
                                                key={orderedProduct.id}
                                                orderedProduct={orderedProduct}
                                                getSelectedImage={props.getSelectedImage}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View>
                            {
                                props.order.paymentMethod=='CARD' && props.order.orderStatus=='Payment_pending'?<MyButton onPress={()=>props.cancelOrder(props.order.id)} title="Cancel Order" />:null
                            }
                            {
                                props.order.paymentMethod=='CASH' && props.order.orderStatus=='packaging'?<MyButton onPress={()=>props.cancelOrder(props.order.id)} title="Cancel Order" />:null
                            }
                            {
                                props.order.complaints?<MyButton onPress={()=>props.navigation.navigate("ComplaintsDetail",{complaintId:props.order.complaints.id,order:props.order})} title="Show Complaint Messages"/>:<MyButton onPress={()=>props.registerComplaint(props.order)} title="Register Complaint"/>
                            }
                        </View>
                    </Collapsible>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingBottom: 15,
        borderRadius: 22,
        marginBottom: 15,
        marginTop: 10
    },
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    boxContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    boxTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        width: 110
    },
    boxText: {
        color: '#000000',
        fontSize: 13,
    },
    productDetailContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 10
    }
})
export default OrderDetail