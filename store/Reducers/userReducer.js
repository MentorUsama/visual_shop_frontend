import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../StoreUtility/utility';
const d = new Date();

// States
const initialState = {
    access:"",
    email:"",
    isLoggedIn:false,
    timeAdded:null,
    provincesAndCities:null
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
const setProvincesAndCities=(state,action)=>{
    return updateObject(state,{
        provincesAndCities:action.provincesAndCities
    })
}

// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN: return Login(state, action);
        case actionTypes.LOGOUT: return Logout(state, action);
        case actionTypes.SET_PROVINCES_AND_CITIES: return setProvincesAndCities(state,action)
        default:
            return state;
    }
};
export default reducer;