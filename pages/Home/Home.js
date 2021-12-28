import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
// Redux
import { connect } from 'react-redux';
// Containers
import PageContainer from '../../components/container/PageContainer'


const Home=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is homepage {props.token}</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('ProductDetail')} title="Product Detail"/>
        </PageContainer>
    )
}



const mapStateToProps = state => {
    return {
        token: state.userReducer.token,
        email:state.userReducer.email,
        isLoggedIn:state.userReducer.isLoggedIn
    };
};
export default connect(
    mapStateToProps
)(Home);