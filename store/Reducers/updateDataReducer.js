import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../StoreUtility/utility';
const d = new Date();

// States
const initialState = {
    shouldUpdateUserOrder:false
};

// Functions for Updating the state
const shouldUpdateUserOrder = (state, action) => {
    return updateObject( state, { 
        shouldUpdateUserOrder: action.shouldUpdate,
     } );
};
// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_SHOULD_UPDATED_USER_ORDER: return shouldUpdateUserOrder(state, action);
        default:
            return state;
    }
};
export default reducer;