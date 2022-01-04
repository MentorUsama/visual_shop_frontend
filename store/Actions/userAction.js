import * as actionTypes from './actionTypes';

export const login = (access,email,isLoggedIn,timeAdded) => {
    return {
        type: actionTypes.LOGIN,
        access: access,
        email:email,
        isLoggedIn:isLoggedIn,
        timeAdded:timeAdded
    };
};
export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};
export const setProvincesAndCities=(provincesAndCities)=>{
    return {
        type:actionTypes.SET_PROVINCES_AND_CITIES,
        provincesAndCities:provincesAndCities
    }
}
export const setProfile=(profile)=>{
    return {
        type:actionTypes.SET_PROFILE,
        profile:profile
    }
}