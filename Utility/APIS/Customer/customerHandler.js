import {CUSTOMER_GOOGLE_AUTH, CUSTOMER_LOGIN} from '../Constants/apiConstants';
import axios from 'axios';
import * as Google from 'expo-google-app-auth';


const customerLoginHandler=async (email,password)=>{
    try
    {
        const response=await axios.post(CUSTOMER_LOGIN,{username:email,password:password});
        return {data:response,status:response.status}
    }
    catch(error)
    {
        if(error.response.status==400) // Data is Incorect
        {
            return {data:error.response.data,status:error.response.status}
        }
        else if(error.response.status==401) // Unauthorize
        {
            return {data:error.response.data.detail,status:error.response.status}
        }
        else // Ahh Someunknown error occured
        {
            return {data:"Something Went Wrong Please Try Again!!",status:error.response.status}
        }
    }
}
const customerGoogleAuthHandler=async (token)=>{
    try{
        const response=await axios.post(CUSTOMER_GOOGLE_AUTH,{token:token});
        return {data:response,status:response.status}
    }
    catch(error){
        return {data:"Something Went Wrong Please Try Again!!",status:error.response.status}
    }
}
const continueWithGoogle = async () => {
    try 
    {
        const result = await Google.logInAsync({
            androidClientId: "691282853878-k6e955ti68hce0re23bpve4n6m6fuk9s.apps.googleusercontent.com",
            iosClientId: "691282853878-45d5a1nra6vfaiehd8gjlnsk69okmbch.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        })
        if (result.type == "success") 
        {
            const response = await customerGoogleAuthHandler(result.accessToken)
            if (response.status == 200) 
            {
                return {status:response.status,data:response.data}
            }
            else 
            {
                return {status:null,data:"Something Went Wrong Please Try Again"}
            }
        }
        else 
        {
            return {status:null,data:"Something Went Wrong Please Try Again"}
        }

    }
    catch (e) {
        return {status:null,data:"Something Went Wrong Please Try Again"}
    }
}
export {customerLoginHandler,customerGoogleAuthHandler,continueWithGoogle};