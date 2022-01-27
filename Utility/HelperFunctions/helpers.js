function diff_minutes(t2, t1) {

  var diff = (t2 - t1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}
function validateContact(contact) {
  if (/^\d{11}$/.test(contact)) {
    return true
  }
  else {
    return false
  }
}
function getCities(provinces, provincesId) {
  if (provincesId == null || provinces == null)
    return null
  const province = provinces.find(province => {
    if (province.id == provincesId) {
      return province
    }
  })
  return province.cities
}
function getCityDetail(provinces, provinceId, cityId) {
  const province = provinces.find(province => {
    if (province.id == provinceId)
      return province
  })
  const city = province.cities.find(city => {
    if (city.id == cityId)
      return city
  })

  return {
    id: city.id,
    name: city.name,
    provinceId: {
      id: province.id,
      name: province.name
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
const getSize = (string) => {
  if (string == null)
    return null
  else
    return string.split(",")
}
const doesProductHasColors = (products) => {
  var firstIndex = -1;
  const data = products.find((product, index) => {
    if (product.imageColor != null) {
      firstIndex = index
      return product
    }

  })
  if (data == undefined)
    return false
  else
    return true
}
const findAverageRating = (feedbacks) => {
  if (feedbacks == null || feedbacks.length == 0)
    return 0

  if (!feedbacks.feedback)
    return 0

  var sum = 0;
  feedbacks.map(feedback => {
    sum = sum + feedback.feedback.rating
  })
  return parseInt(sum / feedbacks.length)
}
const isUserEligibleForFeedback = (orders, productId) => {
  var result = false
  if (orders == null || productId == null)
    return false
  const data = orders.find(order => {
    return order.orderedProducts.find(orderProduct => {
      if (orderProduct.productId == productId && orderProduct.feedback == null) {
        result = orderProduct.id
        return orderProduct
      }
    })
  })
  return result
}
const AddProductToCart = (cartData, product, props) => {
  var newCartData;
  var newCartProducts;
  if (props.cartData) {
    newCartData = [...props.cartData]
    newCartData.push(cartData)
    newCartProducts = [...props.cartProductsDetail]
    newCartProducts.push(product)
  }
  else {
    newCartData = [cartData]
    newCartProducts = [product]
  }
  return {
    cartData: newCartData,
    cartProductsDetail: newCartProducts
  }
}
const RemoveProductFromCart = (productId, oldCartData, oldCartProductDetail) => {
  if (oldCartData.length == 1) {
    return{
      cartData: null,
      cartProductsDetail: null
    }
  }
  else {
    var newCartData;
    newCartData = oldCartData.filter(cart => {
      if (cart.productId != productId) {
        return cart
      }
    })
    var newCartProducts;
    newCartProducts = oldCartProductDetail.filter(product => {
      if (product.id != productId) {
        return product
      }
    })
    return {
      cartData: newCartData,
      cartProductsDetail: newCartProducts
    }
  }
}
const updateProductFromCart=(cartData, oldCartData)=>{
    var newCartData;
    newCartData= oldCartData.map(cart=>{
        if(cart.productId== cartData.productId)
        {
            return cartData
        }
        else
        {
            return cart
        }
    })
    return newCartData
}
  export {
    diff_minutes,
    ValidateEmail,
    getCities,
    getCityDetail,
    validateContact,
    findCategoryName,
    findSubcategoryName,
    findTagName,
    getSize,
    doesProductHasColors,
    findAverageRating,
    isUserEligibleForFeedback, 
    AddProductToCart,
    RemoveProductFromCart,
    updateProductFromCart
  }