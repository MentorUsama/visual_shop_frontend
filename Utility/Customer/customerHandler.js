import {CUSTOMER_LOGIN} from '../apis';
import axios from 'axios';


const customerLoginHandler=async (email,password)=>{
    try
    {
        const response=await axios.post(CUSTOMER_LOGIN,{username:email,password:password});
        return response;
    }
    catch(error)
    {
        return error.response;
    }
}

export {customerLoginHandler};