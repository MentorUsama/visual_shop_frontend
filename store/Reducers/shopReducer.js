import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../StoreUtility/utility';


// States
const initialState = {
    storeProducts: null
};


const updateStoreProducts = (state, action) => {
    var products = action.storeProducts
    if (state.storeProducts != null) // Merging Product with already in store
    {
        var newProducts = state.storeProducts.products.concat(products.products)
        products.products = newProducts
        console.log(newProducts)
        return updateObject(state, {
            storeProducts: products
        })
    }
    else {
        return updateObject(state, {
            storeProducts: products
        })
    }
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STORE_PRODUCTS: return updateStoreProducts(state, action);
        default:
            return state;
    }
};
export default reducer;