import {
    ORDER_GET_ORDERS,
    ORDER_SUBMIT_FEEDBACK,
    ORDER_VALIDATE_COUPEN,
    CREATE_ORDER,
    CONFRIM_ORDER_PAYMENT
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
    catch (e) {
        if (e.response.status == 401) {
            return { status: e.response.status, data: e.response.data.detail }
        }
        else {
            return { status: null, data: "An Unknown Error Occured While Fetching Orders" }
        }
    }
}


export const submitFeedback = async (feedback, access) => {
    try {
        const response = await axios({
            method: "POST",
            url: ORDER_SUBMIT_FEEDBACK,
            data: feedback,
            headers: {
                Authorization: "Bearer " + access
            }
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.response.status == 401) {
            return { status: e.response.status, data: e.response.data.detail }
        }
        else {
            return { status: null, data: "An Unknown Error Occured While Submitting Feedback" }
        }
    }
}
export const validateCoupen = async (code,cartData) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${ORDER_VALIDATE_COUPEN}${code}`,
            data: {"orderedProducts":cartData},
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("cuopenCode")) {
                return { status: null, data: e.response.data.cuopenCode[0] }
            }
            else if(keys.includes("cuopenId")){
                return {status:null,data:e.response.data.cuopenId[0]}
            }
            else
            {
                return { status: null, data: "An Unknown Error Occured While validating coupen!!" }
            }
        }
        else {
            return { status: null, data: "An Unknown Error Occured While validating coupen!!" }
        }
    }
}
export const createOrder = async (data,access) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${CREATE_ORDER}`,
            headers: {
                Authorization: "Bearer " + access
            },
            data: data,
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("shippingAddress")) {
                return { status: null, data: e.response.data.shippingAddress[0] }
            }
            else if(keys.includes("receiverName")){
                return {status:null,data:e.response.data.receiverName[0]}
            }
            else if(keys.includes("receiverContact"))
            {
                return {status:null,data:e.response.data.receiverContact[0]}
            }
            else if(keys.includes("cuopenId"))
            {
                return {status:null,data:e.response.data.cuopenId[0]}
            }
            else if(keys.includes("cityId"))
            {
                return {status:null,data:e.response.data.cityId[0]}
            }
            else if(keys.includes('orderedProducts'))
            {
                if(typeof e.response.data.orderedProducts[0] === 'string' || e.response.data.orderedProducts[0] instanceof String)
                {
                    return {status:null,data:e.response.data.orderedProducts[0]}
                }
                else
                {
                    return { status: null, data: "An Unknown Error Occured please try again" }
                }
            }
            else
            {
                return { status: null, data: "An Unknown Error Occured please try again" }
            }
        }
        else {
            return { status: null, data: "An Unknown Error Occured please try again"}
        }
    }
}






export const confirmOrderPayment = async (access,data) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${CONFRIM_ORDER_PAYMENT}`,
            headers: {
                Authorization: "Bearer " + access
            },
            data: data,
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("order_id")) {
                return { status: null, data: e.response.data.order_id[0] }
            }
        }
        else {
            return { status: null, data: "Failed because of server error please try again !!"}
        }
    }
}