import {
    ORDER_GET_ORDERS
} from '../Constants/apiConstants';
import axios from 'axios';






export const addOrders = async (token) => {
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
        console.log(e.response)
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