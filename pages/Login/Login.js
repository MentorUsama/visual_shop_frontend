import React from 'react';
import { Text, View,Button } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const Login=(props)=>{
    return (
        <View>
            <Text>This is Login Page</Text>
            <View style={{marginTop:10}}></View>
            <Button disabled={props.isLoggedIn} onPress={() => props.login("FakeId","Fake@gmail.com",true)} title="Login"/>
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
const mapDispatchToProps = dispatch => {
    return {
      login: (session_id,email,isLoggedIn) => dispatch(actions.login(session_id,email,isLoggedIn))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Login);
