import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import ComplaintsDetailBox from '../../components/components/Complaints/ComplaintsDetailBox';
import { getSelectedImage } from '../../Utility/HelperFunctions/index'
import Paddings from '../../components/container/ContentPadding';
import Message from '../../components/components/Complaints/Message';
import InputSearch from '../../components/components/Home/InputSearch/InputSearch';
import {getAllComplaint,sendMessage} from '../../Utility/APIS/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'

const ComplaintsDetail = (props) => {
    const [orders, setOrder] = useState(props.route.params.order)
    const [userInput,setUserInput]=useState("")
    const [pageLoading, setPageLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const [complaints,setComplaints]= useState(null)
    const getComplaints=async ()=>{
        const response= await getAllComplaint(props.access,orders.complaints.id)
        if(response.status==200)
        {
            setComplaints(response.data)
        }
    }
    useEffect(async () => {
        setPageLoading(true)
        await getComplaints()
        setPageLoading(false)
    }, [])
    const sendComplaint=async ()=>{
       setPageLoading(true)
       const resposne= await sendMessage(props.access,orders.id,userInput)
       if(resposne.status!=200)
       {
           setPageLoading(false)
           setGlobalError(resposne.data)
           return
       }
       await getComplaints()
       setUserInput("")
       setPageLoading(false)
    }
    return (
        <PageContainer hasPadding={false} pageLoading={pageLoading} navigation={props.navigation}>
            <View style={{ height: '100%' }}>
                {/* Data */}
                <Paddings hasPadding={true} >
                    {orders?<ComplaintsDetailBox
                        order={orders}
                        getSelectedImage={getSelectedImage}
                    />:null}
                    <Text style={{ color: '#FF7465', fontSize: 15, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>{globalError}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {
                                complaints && complaints.messages.map(message => <Message key={message.id} isAdmin={message.isAdmin}>{message.message}</Message>)
                            }
                        </View>
                    </ScrollView>
                </Paddings>
                {/* Input Bar */}
                <View>
                    <InputSearch searchByTextHandler={sendComplaint} value={userInput} onChangeText={(val)=>setUserInput(val)} hasIcons={false} containerStyle={{marginBottom:1}}/>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
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
)(ComplaintsDetail);