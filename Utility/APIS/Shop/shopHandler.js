import {
    SHOP_GET_PRODUCTS
} from '../Constants/apiConstants';
import axios from 'axios';



const getAllProducts = async (page) => {
    try 
    {
        const response = await axios.get(`${SHOP_GET_PRODUCTS}${page}`);
        var products=response.data
        products['products']=products.results;
        delete products["results"];
        // Getting The Next Page Number
        if(products.next==null)
            products['nextPageNumber']=-1
        else
            products['nextPageNumber']=parseInt(products.next.substring(products.next.indexOf('?page=') + 6))
        return { status: response.status, data: products }
    }
    catch (e) {
        return { status: null, data: 'Unable To Get Products!!' }
    }
}
export {getAllProducts}