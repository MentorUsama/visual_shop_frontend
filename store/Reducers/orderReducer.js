import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../StoreUtility/utility';


// States
const initialState = {
    orders: null
};

const addOrders = (state, action) => {
    return updateObject(state, {
        orders: action.orders
    })
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDERS: return addOrders(state, action);
        default:
            return state;
    }
};
export default reducer;