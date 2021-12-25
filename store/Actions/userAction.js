import * as actionTypes from './actionTypes';

export const login = (session_id,email,isLoggedIn) => {
    return {
        type: actionTypes.LOGIN,
        session_id: session_id,
        email:email,
        isLoggedIn:isLoggedIn
    };
};
export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};