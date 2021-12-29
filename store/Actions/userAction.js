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