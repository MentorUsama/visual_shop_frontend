import * as actionTypes from './actionTypes';

export const updateStoreProducts = (storeProducts) => {
    return {
        type: actionTypes.UPDATE_STORE_PRODUCTS,
        storeProducts:storeProducts
    };
};