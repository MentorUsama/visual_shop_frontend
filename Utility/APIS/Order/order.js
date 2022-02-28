import {
    ORDER_GET_ORDERS,
    ORDER_SUBMIT_FEEDBACK,
    ORDER_VALIDATE_COUPEN,
    CREATE_ORDER,
    CONFRIM_ORDER_PAYMENT,
    CANCEL_ORDER,
    CREATE_COMPLAINT,
    GET_ALL_COMPLAINT,
    SEND_MESSAGES
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
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
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
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 401) {
            return { status: e.response.status, data: e.response.data.detail }
        }
        else {
            return { status: null, data: "An Unknown Error Occured While Submitting Feedback" }
        }
    }
}
export const validateCoupen = async (code,cartData,access) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${ORDER_VALIDATE_COUPEN}${code}`,
            data: {"orderedProducts":cartData},
            headers: {
                Authorization: "Bearer " + access
            }
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
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
        else if (e.response.status == 401) 
        {
            return { status: e.response.status, data: e.response.data.detail }
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
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
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
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
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

export const cancelOrder = async (access,data) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${CANCEL_ORDER}`,
            headers: {
                Authorization: "Bearer " + access
            },
            data: data,
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("order_id")) {
                return { status: null, data: e.response.data.order_id[0] }
            }
            else
            {
                return { status: null, data: "Failed because of server error please try again !!"}
            }
        }
        else {
            return { status: null, data: "Failed because of server error please try again !!"}
        }
    }
}
export const createComplaint =async (access,orderId) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${CREATE_COMPLAINT}${orderId}`,
            headers: {
                Authorization: "Bearer " + access
            },
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("orderId")) {
                return { status: null, data: 'Complaint is already created for this order. Please go to complaint page to see the complaint.'}
            }
            else
            {
                return { status: null, data: "Failed because of server error please try again !!"}
            }
        }
        else {
            return { status: null, data: "Failed because of server error please try again !!"}
        }
    }
}
export const getAllComplaint=async (access,complaint_id)=>{
    try {
        const response = await axios({
            method: "GET",
            url: `${GET_ALL_COMPLAINT}${complaint_id}`,
            headers: {
                Authorization: "Bearer " + access
            },
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("complaint_id")) {
                return { status: null, data: e.response.data.complaint_id[0]}
            }
            else
            {
                return { status: null, data: "Failed to detch complaint because of server error!!"}
            }
        }
        else {
            return { status: null, data: "Failed to detch complaint because of server error!!"}
        }
    }
}
export const sendMessage=async (access,order_id,message)=>{
    try {
        const response = await axios({
            method: "POST",
            url: `${SEND_MESSAGES}${order_id}`,
            headers: {
                Authorization: "Bearer " + access
            },
            data:{message:message}
        });
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("message")) {
                return { status: null, data: e.response.data.message[0]}
            }
            else
            {
                return { status: null, data: "Failed to send message please try again"}
            }
        }
        else {
            return { status: null, data: "Failed to send message please try again"}
        }
    }
}