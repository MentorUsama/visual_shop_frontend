import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../Utility/utility';

// States
const initialState = {
    session_id:null,
    email:"",
    isLoggedIn:false
};


// Functions for Updating the state
const addSessionID = (state, action) => {
    return updateObject( state, { 
        session_id: action.session_id,
        email:action.email,
        isLoggedIn:action.isLoggedIn
     } );
};


// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_SESSION_ID: return addSessionID(state, action);
        default:
            return state;
    }
};
export default reducer;