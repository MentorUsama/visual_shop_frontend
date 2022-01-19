import {
    GET_FILTERED_PRODUCT,
    SHOP_GET_ALL_CATEGORIES,
    SHOP_GET_ALL_TAGS,
    SHOP_GET_PRODUCTS
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
        return { status: null, data: 'Unable To Get Products!!' }
    }
}
const getAllTags = async () => {
    try {
        const response = await axios.get(`${SHOP_GET_ALL_TAGS}`);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        return { status: null, data: 'Unable To Get Tags!!' }
    }
}
const getAllCategories = async () => {
    try {
        const response = await axios.get(`${SHOP_GET_ALL_CATEGORIES}`);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        return { status: null, data: 'Unable To Get Categories!!' }
    }
}
const getFilteredProducts = async (data) => {
    try {
        const response = await axios.post(`${GET_FILTERED_PRODUCT}`, data);
        return { status: response.status, data: response.data }
    }
    catch (e) {
        return { status: null, data: 'Unable To Get Categories!!' }
    }
}
const searchByImage = async (image) => {
    var fakeProduct = [{
        "id": 12,
        "images": [
            {
                "id": 41,
                "imageColor": null,
                "image": "https://visualshopp.herokuapp.com/images/image1_default_eqnVFmu.png"
            }
        ],
        "feedbacks": [],
        "name": "Fake Product",
        "quantity": 10,
        "price": "10.000",
        "description": "Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "sizes": "None",
        "subCategoryId": {
            "id": 6,
            "name": "shirts",
            "categoryId": {
                "id": 3,
                "name": "women clothing"
            }
        },
        "tags": [
            {
                "id": 28,
                "name": "long sleeve"
            }
        ]
    }]
    return {status:200,data:fakeProduct}
}
export { getAllProducts, getAllTags, getAllCategories, getFilteredProducts,searchByImage }