import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../StoreUtility/utility';
const d = new Date();

// States
const initialState = {
    access:"",
    email:"",
    isLoggedIn:false,
    timeAdded:null,
    provincesAndCities:null,
    profile:null
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
const setProfile=(state,action)=>{
    return updateObject(state,{
        profile:action.profile
    })
}
const updateProfile=(state,action)=>{
    return updateObject(state,{
        profile:{
            ...state.profile,
            ...action.profile
        }
    })
}

// Reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN: return Login(state, action);
        case actionTypes.LOGOUT: return Logout(state, action);
        case actionTypes.SET_PROVINCES_AND_CITIES: return setProvincesAndCities(state,action)
        case actionTypes.SET_PROFILE: return setProfile(state,action)
        case actionTypes.UPDATE_PROFILE: return updateProfile(state,action)
        default:
            return state;
    }
};
export default reducer;