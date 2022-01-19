export const isFilteredApplied = (filters) => {
    if (filters == null)
        return false
    if (filters.tags != null || filters.categoryId != null || filters.subcategoryId != null || filters.price != null)
        return true

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
export const findTagName=(tags,tagId)=>{
    const result=tags.find(tag=>tag.id==tagId)
    return result.name
}