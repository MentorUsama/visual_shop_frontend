import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../StoreUtility/utility';
const d = new Date();

// States
const initialState = {
    access:"Fake Sesison",
    email:"",
    isLoggedIn:false,
    timeAdded:null,
    cities:null
};


// Functions for Updating the state
const Login = (state, action) => {
    return updateObject( state, { 
        access: action.access,
        email:action.email,
        isLoggedIn:action.isLoggedIn,
        timeAdded:action.timeAdded
     } );
};
const Logout = (state, action) => {
    return updateObject( state, { 
        access: null,
        email:null,
        isLoggedIn:false,
        timeAdded:null
     } );
};
const setCities=(state,action)=>{
    return updateObject(state,{
        cities:action.cities
    })
}

// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN: return Login(state, action);
        case actionTypes.LOGOUT: return Logout(state, action);
        case actionTypes.SET_CITIES: return setCities(state,action)
        default:
            return state;
    }
};
export default reducer;