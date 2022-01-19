export const isFilteredApplied = (filters) => {
    if (filters == null)
        return false
    if (filters.tags != null || filters.categoryId != null || filters.subcategoryId != null || filters.price != null)
        return true

    return false
}
export const isFilterChanged = (oldFilters, newFilters) => {
    // If filter is null then it means it never has been applied so unchange
    if (newFilters == null)
        return false
    if (oldFilters == null) {
        if (newFilters.tags != null && newFilters.tags.length != 0)
            return true
        if (newFilters.categoryId != null)
            return true
        if (newFilters.subcategoryId != null)
            return true
        if (newFilters.price != null)
            return true
        if (newFilters.price != null)
            return true
        else
            return false
    }

    // If any of tag change then the change has occure
    if (newFilters.tags.length != oldFilters.tags.length)
        return true
    else {
        var uniqueValue = newFilters.tags.filter(val => !oldFilters.tags.includes(val))
        if (uniqueValue.length != 0)
            return true
    }
    // If any of object is different in both then change has occured
    if (
        newFilters.categoryId != oldFilters.categoryId ||
        newFilters.subcategoryId != oldFilters.subcategoryId ||
        newFilters.price != null
    )
        return true
    // If none of the value is same then nothing change so return
    return false

}
export const findCategoryName = (categories, categoryId) => {
    return categories.find(category => category.id == categoryId).name
}
export const findSubcategoryName = (categories, categoryId, subcategoryId) => {
    var name = null;
    const data = categories.find(category => {
        if (category.id == categoryId) {
            return category.Subcategories.find(subcategory => {
                if (subcategory.id == subcategoryId) {
                    name = subcategory.name
                    return true
                }
                else {
                    return false
                }
            })
        }
        else {
            return false
        }
    })
    return name
}
export const findTagName = (tags, tagId) => {
    const result = tags.find(tag => tag.id == tagId)
    return result.name
}