import React,{useState} from 'react';
import { Text, View,Button,TextInput } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';
// Axios
import {customerLoginHandler} from '../../Utility/Customer/customerHandler';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import Loader from '../../components/components/Global/Loader';


const Login=(props)=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const UserLogin=async ()=>{
        setLoading(true);
        const response=await customerLoginHandler(email,password);
        setLoading(false);
    }
    // Function
    return (
        <PageContainer navigation={props.navigation}>
            <Loader 
                loading={loading}
            />
            <Text>This is Login Page</Text>
            <View style={{marginTop:10}}></View>
            <TextInput onChangeText={(val)=>setEmail(val)} placeholder="Enter Your Email" value={email}/>
            <TextInput onChangeText={(val)=>setPassword(val)} placeholder="Enter Your Password" secureTextEntry={true} value={password}/>
            <Button disabled={props.isLoggedIn} onPress={UserLogin} title="Login"/>
        </PageContainer>
    )
}
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        email:state.userReducer.email,
        isLoggedIn:state.userReducer.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {
      login: (access,email,isLoggedIn) => dispatch(actions.login(access,email,isLoggedIn))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Login);
