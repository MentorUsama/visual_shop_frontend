import {CUSTOMER_LOGIN} from '../Constants/apiConstants';
import axios from 'axios';


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
            return {data:error.response.data,status:error.response.status}
        }
        else // Ahh Someunknown error occured
        {
            return {data:"Something Went Wrong Please Try Again!!",status:error.response.status}
        }
    }
}
export {customerLoginHandler};