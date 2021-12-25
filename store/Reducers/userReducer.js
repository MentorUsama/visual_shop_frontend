import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../Utility/utility';

// States
const initialState = {
    session_id:"Fake Sesison",
    email:"",
    isLoggedIn:false
};


// Functions for Updating the state
const Login = (state, action) => {
    return updateObject( state, { 
        session_id: action.session_id,
        email:action.email,
        isLoggedIn:action.isLoggedIn
     } );
};
const Logout = (state, action) => {
    return updateObject( state, { 
        session_id: null,
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