import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../StoreUtility/utility';
import {CART_DATA} from '../../Utility/HelperFunctions/storageKeys'
import {storeData,clearData} from '../../Utility/HelperFunctions/asyncStorage'


// States
const initialState = {
    storeProducts: null,
    tags:null,
    categories:null,
    filteredProducts:null,
    filters:null,
    cartData:null,
    cartProductsDetail:null // There might be possibility that product detail not available on store product because of next and previous page therefore we store cart data info seperately.
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
export const addProductToCart=(state,action)=>{
    var newCartData;
    var newCartProducts;
    if(state.cartData)
    {
        newCartData=[...state.cartData]
        newCartData.push(action.cartData)
        newCartProducts=[...state.cartProductsDetail]
        newCartProducts.push(action.product)
    }
    else
    {
        newCartData=[action.cartData]
        newCartProducts=[action.product]
    }
    // const result=await storeData(CART_DATA,newCartData)
    return updateObject(state,{
        cartData:newCartData,
        cartProductsDetail:newCartProducts
    })
}   
export const updateProductFromCart=async (state,action)=>{
    var newCartData;
    newCartData=state.cartData.map(cart=>{
        if(cart.productId==action.cartData.productId)
        {
            return action.cartData
        }
        else
        {
            return cart
        }
    })
    const result=await storeData(CART_DATA,newCartData)
    return updateObject(state,{
        cartData:newCartData
    })
}
export const removeProductFromCart=async (state,action)=>{
    if(state.cartData.length==1)
    {
        await clearData(CART_DATA)
        return updateObject(state,{
            cartData:null,
            cartProductsDetail:null
        })
    }
    else
    {
        var newCartData;
        newCartData=state.cartData.filter(cart=>{
            if(cart.productId!=action.productId)
            {
                return cart
            }
        })
        var newCartProducts;
        newCartProducts=state.cartProductsDetail.filter(product=>{
            if(product.id!=action.productId)
            {
                return product
            }
        })

        const result=await storeData(CART_DATA,newCartData)
        return updateObject(state,{
            cartData:newCartData,
            cartProductsDetail:newCartProducts
        })
    }
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STORE_PRODUCTS: return updateStoreProducts(state, action);
        case actionTypes.ADD_ALL_TAGS: return addTags(state, action);
        case actionTypes.ADD_CATEGORIES_SUBCATEGORIES: return addCategories(state, action);
        case actionTypes.ADD_FILTERED_PRODUCT: return addFilteredProduct(state, action);
        case actionTypes.UPDATE_SINGLE_PRODUCT: return updateSingleProduct(state, action);
        case actionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action);
        case actionTypes.UPDATE_PRODUCT_FROM_CART: return updateProductFromCart(state, action);
        case actionTypes.REMOVE_PRODUCT_FROM_CART: return removeProductFromCart(state, action);
        default:
            return state;
    }
};
export default reducer;