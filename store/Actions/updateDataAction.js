import * as actionTypes from './actionTypes';


export const shouldUpdateUserOrder = (shouldUpdate) => {
    return {
        type: actionTypes.ADD_SHOULD_UPDATED_USER_ORDER,
        shouldUpdate: shouldUpdate,
    };
};