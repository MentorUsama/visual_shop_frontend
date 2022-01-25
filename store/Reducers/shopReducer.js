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
const updateSingleProduct=(state,action)=>{
    var filteredProducts=null;
    if(state.filteredProducts)
    {
        filteredProducts=state.filteredProducts.map(product=>{
            if(product.id==action.product.id)
                return action.product
            else
                return product
        })
    }
    var storeProducts=null;
    if(state.storeProducts)
    {
        // Copying All Data
        storeProducts={
            count:state.storeProducts.count,
            next:state.storeProducts.next,
            previous:state.storeProducts.previous,
            products:[...state.storeProducts.products],
            nextPageNumber:state.storeProducts.nextPageNumber
        }
        // Updating That Single Product
        var storeProductsProducts=storeProducts.products.map(product=>{
            if(product.id==action.product.id)
                return action.product
            else
                return product
        })
        storeProducts.products=storeProductsProducts
    }
    return updateObject(state, {
        filteredProducts: filteredProducts,
        storeProducts:storeProducts
    })
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STORE_PRODUCTS: return updateStoreProducts(state, action);
        case actionTypes.ADD_ALL_TAGS: return addTags(state, action);
        case actionTypes.ADD_CATEGORIES_SUBCATEGORIES: return addCategories(state, action);
        case actionTypes.ADD_FILTERED_PRODUCT: return addFilteredProduct(state, action);
        case actionTypes.UPDATE_SINGLE_PRODUCT: return updateSingleProduct(state, action);
        default:
            return state;
    }
};
export default reducer;