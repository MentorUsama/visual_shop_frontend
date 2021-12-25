import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
// Redux
import { connect } from 'react-redux';


const Home=(props)=>{
    return (
        <View>
            <Text>This is homepage {props.session_id}</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('ProductDetail')} title="Product Detail"/>
        </View>
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
)(Home);