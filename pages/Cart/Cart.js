import React from 'react';
import { Text, View,Button } from 'react-native';
// Redux
import { connect } from 'react-redux';
// Cotainer
import PageContainer from '../../components/container/PageContainer'


const Cart=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Cart Page</Text>
            <View style={{marginTop:10}}></View>
            <Button disabled={!props.isLoggedIn} onPress={() => props.navigation.navigate('Checkout')} title="Checkout"/>
            <Button  onPress={() => props.navigation.navigate('HomePage')} title="Add More Product"/>
        </PageContainer>
    )
}
const mapStateToProps = state => {
    return {
        session_id: state.userReducer.session_id,
        email:state.userReducer.email,
        isLoggedIn:state.userReducer.isLoggedIn
    };
};
export default connect(
    mapStateToProps
)(Cart);