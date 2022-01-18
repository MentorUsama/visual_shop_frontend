import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../StoreUtility/utility';


// States
const initialState = {
    storeProducts: null,
    tags:null,
    categories:null,
    filteredProducts:null,
    filters:null
};


const updateStoreProducts = (state, action) => {
    var products = action.storeProducts
    if (state.storeProducts != null) // Merging Product with already in store
    {
        var newProducts = state.storeProducts.products.concat(products.products)
        products.products = newProducts
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
const addTags=(state,action)=>{
    var tags=action.tags
    return updateObject(state, {
        tags: tags
    })
}
const addCategories=(state,action)=>{
    var categories=action.categories
    return updateObject(state, {
        categories: categories
    })
}
const addFilteredProduct=(state,action)=>{
    return updateObject(state, {
        filteredProducts: action.filteredProducts,
        filters:action.filters
    })
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STORE_PRODUCTS: return updateStoreProducts(state, action);
        case actionTypes.ADD_ALL_TAGS: return addTags(state, action);
        case actionTypes.ADD_CATEGORIES_SUBCATEGORIES: return addCategories(state, action);
        case actionTypes.ADD_FILTERED_PRODUCT: return addFilteredProduct(state, action);
        default:
            return state;
    }
};
export default reducer;