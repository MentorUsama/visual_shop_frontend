export {
    customerLoginHandler,
    customerGoogleAuthHandler,
    continueWithGoogle,
    customerRegister,
    forgetPasswordHandler,
    resetPasswordHandler,
    getProvincesAndCities,
    getProfileHandler,
    updateProfile
}
from './Customer/customerHandler'

export {
    getAllProducts,
    getAllTags,
    getAllCategories,
    getFilteredProducts,
    searchByImage,
    getListOfProducts
} from './Shop/shopHandler'

export  {
    getOrders,
    submitFeedback,
    validateCoupen,
    createOrder,
    confirmOrderPayment,
    cancelOrder,
    createComplaint,
    getAllComplaint,
    sendMessage
} from './Order/order'