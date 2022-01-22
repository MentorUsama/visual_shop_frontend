// Exporting asyncStorageFunctions
export {
    storeData,
    getData,
    clearData
} from './asyncStorage'

// Exporting Storage Keys Constants
export {
    USER_LOGIN_INFO_CONST
} from './storageKeys';

// Exporting Validate Data functions
export {
    diff_minutes,
    ValidateEmail,
    validateContact,
    getCities,
    getCityDetail,
    findCategoryName,
    findSubcategoryName,
    findTagName,
    getSize,
    doesProductHasColors,
    findAverageRating,
    isUserEligibleForFeedback
}
from './helpers'