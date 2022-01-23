import {
    ORDER_GET_ORDERS,
    ORDER_SUBMIT_FEEDBACK
} from '../Constants/apiConstants';
import axios from 'axios';






export const getOrders = async (token) => {
    try {
        const response = await axios({
            method: "GET",
            url: ORDER_GET_ORDERS,
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return { status: response.status, data: response.data }
    }
    catch(e)
    {
        if (e.response.status == 401) 
        {
            return { status: e.response.status, data: e.response.data.detail }
        }
        else 
        {
            return { status: null, data: "An Unknown Error Occured While Fetching Orders" }
        }
    }
}


export const submitFeedback=async (feedback,access)=>{
    try {
        const response = await axios({
            method: "POST",
            url: ORDER_SUBMIT_FEEDBACK,
            data:feedback,
            headers: {
                Authorization: "Bearer " + access
            }
        });
        return { status: response.status, data: response.data }
    }
    catch(e)
    {
        if (e.response.status == 401) 
        {
            return { status: e.response.status, data: e.response.data.detail }
        }
        else 
        {
            return { status: null, data: "An Unknown Error Occured While Fetching Orders" }
        }
    }
}   
