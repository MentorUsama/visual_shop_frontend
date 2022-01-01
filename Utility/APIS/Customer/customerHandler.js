import {CUSTOMER_GOOGLE_AUTH, CUSTOMER_LOGIN,CUSTOMER_REGISTER} from '../Constants/apiConstants';
import axios from 'axios';
import * as Google from 'expo-google-app-auth';
import {KEY_ANDROID_CLIENT_ID,KEY_IOS_CLIENT_ID} from '../../../config'


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
            androidClientId: KEY_ANDROID_CLIENT_ID,
            iosClientId: KEY_IOS_CLIENT_ID,
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
const customerRegister=async (email,password)=>{
    try
    {
        const response=await axios.post(CUSTOMER_REGISTER,{email:email,password:password});
        return {status:response.status,data:response.data}
    }   
    catch(e)
    {
        if(e.response.status==400) // Usernme or password is incorrect
        {
            const keys=Object.keys(e.response.data)
            if(keys.includes("username"))
            {
                return {status:e.response.status,data:e.response.data.username[0]}
            }
            else if(keys.includes("password"))
            {
                return {status:e.response.status,data:e.response.data.password[0]}
            }
        }
        return {status:null,data:"Something Went Wrong Please Try Again"} // Unknown error occured
    }
}
export {customerLoginHandler,customerGoogleAuthHandler,continueWithGoogle,customerRegister};












// "username": "ajb@gmail.com",
// "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxMDQ1ODM5LCJpYXQiOjE2NDEwNDIyMzksImp0aSI6IjJjNDQyYmQ5Y2YwMTRhYTFhZGZkM2RhNjc5NzM3NjAzIiwidXNlcl9pZCI6NDV9.xDPHMDJA_t0x8yUfm0Y-DWOh-U1ImKeeX_ZVR0DLg4w",
// "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0MTEyODYzOSwiaWF0IjoxNjQxMDQyMjM5LCJqdGkiOiI0OGIyZDUxZWIxNzI0MDBmODA3OTFmZTAwNjEwZmIwMiIsInVzZXJfaWQiOjQ1fQ.HMm-ck_8uF2Lzqd__bSIufIJfT-yC7W_w8-7L5NEkQw"