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
    searchByImage
} from './Shop/shopHandler'

export  {
    addOrders
} from './Order/order'