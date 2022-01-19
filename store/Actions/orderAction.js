import * as actionTypes from './actionTypes';


export const addOrders=(orders)=>{
    return {
        type: actionTypes.ADD_ORDERS,
        orders:orders
    };
}