import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../StoreUtility/utility';

// States
const initialState = {
    access:"Fake Sesison",
    email:"",
    isLoggedIn:false
};


// Functions for Updating the state
const Login = (state, action) => {
    return updateObject( state, { 
        access: action.access,
        email:action.email,
        isLoggedIn:action.isLoggedIn
     } );
};
const Logout = (state, action) => {
    return updateObject( state, { 
        access: null,
        email:null,
        isLoggedIn:false
     } );
};


// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN: return Login(state, action);
        case actionTypes.LOGOUT: return Logout(state, action);
        default:
            return state;
    }
};
export default reducer;