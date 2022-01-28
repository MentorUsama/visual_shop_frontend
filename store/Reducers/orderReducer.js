import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../StoreUtility/utility';


// States
const initialState = {
    orders: null,
    checkoutData:null
};

const addOrders = (state, action) => {
    return updateObject(state, {
        orders: action.orders
    })
}
export const addCheckoutData=(state, action)=>{
    return updateObject(state, {
        checkoutData: action.checkoutData
    })
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDERS: return addOrders(state, action);
        case actionTypes.ADD_CECKOUT_DATA: return addCheckoutData(state, action);
        default:
            return state;
    }
};
export default reducer;