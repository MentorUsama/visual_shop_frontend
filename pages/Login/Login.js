import React,{useState} from 'react';
import { Text, View,Button,TextInput } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';
// Axios
import {customerLoginHandler,customerGoogleAuthHandler} from '../../Utility/APIS/index';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import Loader from '../../components/components/Global/Loader';
// Importin Google Auth
import * as Google from 'expo-google-app-auth';
// Importing Utilityfunction
import {storeData,USER_LOGIN_INFO_CONST} from '../../Utility/HelperFunctions/index'
const d = new Date();


const Login=(props)=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [globalError,setGlobalError]=useState("")
    const UserLogin=async ()=>{
        setLoading(true);
        const response=await customerLoginHandler(email,password);
        if(response.status==200)
        {
            props.login(response.data.access,email,true)
            await storeData(USER_LOGIN_INFO_CONST,{access:response.data.access,email:email,isLoggedIn:true,timeAdded:d.getTime()})
        }
        else
        {
            setGlobalError("Something Went Wrong Please Try Again!!")
            setLoading(false);
        }
    }
    const loginWithGoogle=async ()=>{
        setLoading(true);
        try
        {
            const result=await Google.logInAsync({
                androidClientId:"691282853878-k6e955ti68hce0re23bpve4n6m6fuk9s.apps.googleusercontent.com",
                iosClientId:"691282853878-45d5a1nra6vfaiehd8gjlnsk69okmbch.apps.googleusercontent.com",
                scopes:["profile","email"]
            })
            if(result.type=="success")
            {
                const response=await customerGoogleAuthHandler(result.accessToken)
                if(response.status==200)
                {
                    props.login(response.data.access,email,true)
                    await storeData(USER_LOGIN_INFO_CONST,{access:response.data.access,email:email,isLoggedIn:true,timeAdded:d.getTime()})
                }
                else
                {
                    setGlobalError(response.data)
                    setLoading(false);
                }
            }
            else
            {
                setGlobalError("Something Went Wrong!!")
                setLoading(false);
            }
                
        }
        catch(e)
        {
            setGlobalError("Something Went Wrong!! e")
            setLoading(false);
        }
    }
    // Function
    return (
        <PageContainer navigation={props.navigation}>
            <Loader 
                loading={loading}
            />
            <Text>This is Login Page</Text>
            <View style={{marginTop:10}}></View>
            <Text>{globalError}</Text>
            <TextInput onChangeText={(val)=>setEmail(val)} placeholder="Enter Your Email" value={email}/>
            <TextInput onChangeText={(val)=>setPassword(val)} placeholder="Enter Your Password" secureTextEntry={true} value={password}/>
            <Button disabled={props.isLoggedIn} onPress={UserLogin} title="Login"/>
            <Button  onPress={loginWithGoogle} title="Login With Google"/>
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
      login: (access,email,isLoggedIn,timeAdded) => dispatch(actions.login(access,email,isLoggedIn,timeAdded))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Login);
