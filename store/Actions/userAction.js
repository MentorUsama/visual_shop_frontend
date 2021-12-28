import * as actionTypes from './actionTypes';

export const login = (access,email,isLoggedIn) => {
    return {
        type: actionTypes.LOGIN,
        access: access,
        email:email,
        isLoggedIn:isLoggedIn
    };
};
export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};