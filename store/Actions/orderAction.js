import * as actionTypes from './actionTypes';


export const addOrders=(orders)=>{
    return {
        type: actionTypes.ADD_ORDERS,
        orders:orders
    };
}
export const addCheckoutData=(checkoutData)=>{
    return {
        type: actionTypes.ADD_CECKOUT_DATA,
        checkoutData:checkoutData
    };
}