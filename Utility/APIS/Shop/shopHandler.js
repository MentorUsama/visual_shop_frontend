import {
    GET_FILTERED_PRODUCT,
    GET_LIST_OF_PRODUCT,
    SHOP_GET_ALL_CATEGORIES,
    SHOP_GET_ALL_TAGS,
    SHOP_GET_PRODUCTS,
    GET_PRODUCT_BY_IMAGE
} from '../Constants/apiConstants';
import axios from 'axios';



const getAllProducts = async (page) => {
    try {
        const response = await axios.get(`${SHOP_GET_PRODUCTS}${page}`);
        var products = response.data
        products['products'] = products.results;
        delete products["results"];
        // Getting The Next Page Number
        if (products.next == null)
            products['nextPageNumber'] = -1
        else
            products['nextPageNumber'] = parseInt(products.next.substring(products.next.indexOf('?page=') + 6))
        return { status: response.status, data: products }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        return { status: null, data: 'Unable To Get Products!!' }
    }
}
const getAllTags = async () => {
    try {
        const response = await axios.get(`${SHOP_GET_ALL_TAGS}`);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        return { status: null, data: 'Unable To Get Tags!!' }
    }
}
const getAllCategories = async () => {
    try {
        const response = await axios.get(`${SHOP_GET_ALL_CATEGORIES}`);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        return { status: null, data: 'Unable To Get Categories!!' }
    }
}
const getFilteredProducts = async (data) => {
    try {
        const response = await axios.post(`${GET_FILTERED_PRODUCT}`, data);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        return { status: null, data: 'Unable To Get Categories!!' }
    }
}
const searchByImage = async (image) => {
    var bodyFormData = new FormData();
    bodyFormData.append('image', image); 
    try {
        const response = await axios({
            method: "post",
            url: GET_PRODUCT_BY_IMAGE,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return { status: response.status, data: response.data}
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        if (e.response.status == 400) {
            const keys = Object.keys(e.response.data)
            if (keys.includes("image")) {
                return { status: null, data: e.response.data.image}
            }
            else
            {
                return { status: null, data: "Parrameter missing"}
            }
        }
        else if(e.response.status == 404)
        {
            return {status: null, data: e.response.data.message[0]}
        }
        else {
            return { status: null, data: "Unable to get result because of unknown error"}
        }
    }
}
const getListOfProducts=async (data)=>{
    try {
        const response = await axios.post(`${GET_LIST_OF_PRODUCT}`, {"productIdList":data});
        return { status: response.status, data: response.data }
    }
    catch (e) {
        if (e.message == 'Network Error')
        {
            return { data: "Unable to get data because of network error", status: null }
        } 
        return { status: null, data: 'Unable To Get Products!!' }
    }
}
export { getAllProducts, getAllTags, getAllCategories, getFilteredProducts,searchByImage,getListOfProducts }