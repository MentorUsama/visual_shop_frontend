function diff_minutes(t2, t1) 
 {

  var diff =(t2 - t1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }
 function ValidateEmail(mail) 
 {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
   {
     return (true)
   }
    return (false)
 }
 function validateContact(contact)
 {
   if(/^\d{11}$/.test(contact))
   {
     return true
   }
   else
   {
     return false
   }
 }
 function getCities(provinces,provincesId)
 {
    if(provincesId==null || provinces==null)
      return null
    const province=provinces.find(province=>{
      if(province.id==provincesId)
      {
        return province
      }
    })
    return province.cities
}
function getCityDetail(provinces,provinceId,cityId)
{
  const province=provinces.find(province=>{
    if(province.id==provinceId)
      return province
  })
  const city=province.cities.find(city=>{
      if(city.id==cityId)
        return city
  })

  return {
    id:city.id,
    name:city.name,
    provinceId:{
      id:province.id,
      name:province.name
    }
  }
}
const findCategoryName = (categories, categoryId) => {
  return categories.find(category => category.id == categoryId).name
}
const findSubcategoryName = (categories, categoryId, subcategoryId) => {
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
const findTagName = (tags, tagId) => {
  const result = tags.find(tag => tag.id == tagId)
  return result.name
}
export {diff_minutes,ValidateEmail,getCities,getCityDetail,validateContact,findCategoryName,findSubcategoryName,findTagName}