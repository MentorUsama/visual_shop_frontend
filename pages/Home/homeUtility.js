export const isFilteredApplied=(filters)=>{
    if(filters==null)
        return false
    if(filters.tags!=null || filters.categoryId!=null || filters.subcategoryId!=null || filters.price!=null)
        return true
    
    return false
}