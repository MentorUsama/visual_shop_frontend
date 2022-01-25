import * as actionTypes from './actionTypes';

export const updateStoreProducts = (storeProducts) => {
    return {
        type: actionTypes.UPDATE_STORE_PRODUCTS,
        storeProducts:storeProducts
    };
};
export const addTags=(tags)=>{
    return{
        type:actionTypes.ADD_ALL_TAGS,
        tags:tags
    }
}
export const addCategories=(categories)=>{
    return{
        type:actionTypes.ADD_CATEGORIES_SUBCATEGORIES,
        categories:categories
    }
}
export const addFilteredProduct=(filteredProducts,filters)=>{
    return{
        type:actionTypes.ADD_FILTERED_PRODUCT,
        filteredProducts:filteredProducts,
        filters:filters
    }
}
export const updateSingleProduct=(product)=>{
    return {
        type:actionTypes.UPDATE_SINGLE_PRODUCT,
        product:product
    }
}