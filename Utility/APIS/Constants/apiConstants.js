// Domain
export const BASE_URL="https://application-mock-server.loca.lt/";
// Apps
export const CUSTOMER_BASE_URL=`${BASE_URL}api/customer/`;
export const SHOP_BASE_URL=`${BASE_URL}api/shop/`;
export const ORDER_BASE_URL=`${BASE_URL}api/order/`;



// =============== FULL API's  Customer ===============
export const CUSTOMER_LOGIN=`${CUSTOMER_BASE_URL}auth/login`
export const CUSTOMER_GOOGLE_AUTH=`${CUSTOMER_BASE_URL}auth/google`
export const CUSTOMER_REGISTER=`${CUSTOMER_BASE_URL}auth/register`
export const CUSTOMER_FORGET_PASSWORD=`${CUSTOMER_BASE_URL}auth/password_reset/`
export const CUSTOMER_RESET_PASSWORD=`${CUSTOMER_BASE_URL}auth/password_reset/confirm/`
export const CUSTOMER_GET_PROVINCES_AND_CITIES=`${CUSTOMER_BASE_URL}getProvinceAndCities`
export const CUSTOMER_GET_PROFILE=`${CUSTOMER_BASE_URL}profile/customerProfile`
export const CUSTOMER_UPDATE_PROFILE=`${CUSTOMER_BASE_URL}profile/customerProfile`


// =============== FULL API's  Shop ===============
export const SHOP_GET_PRODUCTS=`${SHOP_BASE_URL}products/?page=`
export const SHOP_GET_ALL_TAGS=`${SHOP_BASE_URL}getAllTags/`
export const SHOP_GET_ALL_CATEGORIES=`${SHOP_BASE_URL}getAllCategories/`
export const GET_FILTERED_PRODUCT=`${SHOP_BASE_URL}filterProducts`
export const GET_LIST_OF_PRODUCT=`${SHOP_BASE_URL}getListOfProducts/`
export const GET_PRODUCT_BY_IMAGE=`${SHOP_BASE_URL}products/search-by-image`

// =============== Full API's Orders===============
export const ORDER_GET_ORDERS=`${ORDER_BASE_URL}getAllOrders/`
export const ORDER_SUBMIT_FEEDBACK=`${ORDER_BASE_URL}giveFeedback/`
export const ORDER_VALIDATE_COUPEN=`${ORDER_BASE_URL}validateCuopen/`
export const CREATE_ORDER=`${ORDER_BASE_URL}createOrder/`
export const CONFRIM_ORDER_PAYMENT =`${ORDER_BASE_URL}confirmOrderPayment/`
export const CANCEL_ORDER =`${ORDER_BASE_URL}cancelOrder/`
export const CREATE_COMPLAINT=`${ORDER_BASE_URL}addComplaint/`
export const GET_ALL_COMPLAINT=`${ORDER_BASE_URL}getComplaintDetail/?complaint_id=`
export const SEND_MESSAGES=`${ORDER_BASE_URL}sendMessage/`