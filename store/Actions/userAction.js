import * as actionTypes from './actionTypes';

export const addSessionID = (session_id,email,isLoggedIn) => {
    return {
        type: actionTypes.ADD_SESSION_ID,
        session_id: session_id,
        email:email,
        isLoggedIn:isLoggedIn
    };
};