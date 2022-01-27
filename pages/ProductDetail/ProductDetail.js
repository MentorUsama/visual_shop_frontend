import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
// Importing Components
import PageContainer from '../../components/container/PageContainer'
import ContentPadding from '../../components/container/ContentPadding'
import QuantitySelector from '../../components/components/ProductDetail/QuantitySelector/QuantitySelector';
import ProductDescription from './Parts/ProductDescription/ProductDescription';
import AddToCartButtons from './Parts/AddToCartButtons/AddToCartButtons';
import ColorSelectors from './Parts/ColorSelectors/ColorSelectors'
import SelectSizeContainer from './Parts/SelectSizeContainer/SelectSizeContainer';
import ReviewForm from './Parts/ReviewForm/ReviewForm';
import TitleContainer from './Parts/TitleContainer/TitleContainer';
import Carousel from './Parts/Carousel/Carousel';
// Importing Utilities and API's
import {
    submitFeedback,
    getOrders
} from '../../Utility/APIS/index'
import {
    getSize,
    doesProductHasColors,
    findAverageRating,
    isUserEligibleForFeedback
} from '../../Utility/HelperFunctions/index'
import {
    storeData,
    clearData,
    CART_DATA,
    AddProductToCart,
    RemoveProductFromCart,
    updateProductFromCart
} from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'


const isProductAddedIntoCart = (carts, productId) => {
    if (!carts)
        return false
    var result = carts.find(cart => {
        if (cart.productId == productId)
            return cart
    })
    if (result)
        return result
    else
        return null
}
const getSelectedImage = (images, cartData) => {
    if(images==null)
        return null

    var filteredData;
    if (cartData && cartData.colourSelected) {
        filteredData = images.find((image, index) => {
            if (image.imageColor && image.imageColor==cartData.colourSelected) {
                return image
            }

        })
        if(filteredData)
        {
            return filteredData   
        }
        else
            return null
    }
    else {
        filteredData = images.find((image, index) => {
            if (image.imageColor != null) {
                return image
            }
        })
        if (filteredData)
            return filteredData
        else
            return null
    }
}
const isCartDataChanged=(orignalCartData,newCartData)=>{
    if(!orignalCartData || !newCartData)
        return false
    if(
        orignalCartData.totalQuantity==newCartData.totalQuantity &&
        orignalCartData.sizeSelected==newCartData.sizeSelected &&
        orignalCartData.colourSelected==newCartData.colourSelected
    )
        return false
    return true
}
const ProductDetail = (props) => {
    // Representaion Related Data
    const swiperRef = useRef(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [feedback, setFeedback] = useState(5)
    const [feedbackDescription, setFeedbackDescription] = useState("")
    const [feedbackError, setFeedbackError] = useState("")
    // Product Related Data
    const [product, setProduct] = useState(props.route.params.product)
    const sizes = getSize(product.sizes)
    const canFeedback = isUserEligibleForFeedback(props.orders, product.id)

    // Cart Related Data
    const productAddedToCart = isProductAddedIntoCart(props.cartData, props.route.params.product.id)
    const isProductHasColor = doesProductHasColors(product.images)
    const [isAddedToCart, setIsAddedToCart] = useState(productAddedToCart ? true : false)
    const [selectedSize, changeSelectedSize] = useState(productAddedToCart ? productAddedToCart.sizeSelected : sizes?sizes[0]:null)
    const [selectedImage, setSelectedImage] = useState(isProductHasColor ? getSelectedImage(product.images, productAddedToCart) : null)
    const [quantity, setQuantity] = useState(productAddedToCart ? productAddedToCart.totalQuantity : 1)
    // Getting Some Data if not present
    useEffect(async () => {
        // Getting The All Orders (To Check if he need to give any feedback)
        if (props.orders == null && props.access != "") {
            setPageLoading(true)
            const response = await getOrders(props.access)
            if (response.status == 200) {
                props.addOrders(response.data)
            }
            setPageLoading(false)
        }
    }, [])
    // Handlers
    const changeSelectedSizeHandler = (size) => {
        changeSelectedSize(size)
    }
    const colorHandler = (selectedItem, index) => {
        setSelectedImage(selectedItem)
        if (swiperRef) {
            swiperRef.current.goTo(index);
        }
    }
    // Feedback Handler
    const submitFeedbackHandler = async () => {
        setPageLoading(true)
        const response = await submitFeedback({
            rating: feedback,
            description: feedbackDescription,
            orderedProductId: canFeedback,
            productId: product.id
        }, props.access)
        if (response.status == 200) {
            setFeedbackError("")
            setFeedbackDescription("")
            // Updating The Single Product
            props.updateSingleProduct(response.data)
            setProduct(response.data)
            // Updating The Orders to update the feedback
            const orderResponse = await getOrders(props.access)
            if (orderResponse.status == 200) {
                props.addOrders(orderResponse.data)
            }
            setPageLoading(false)
        }
        else {
            setFeedbackError(response.data)
            setFeedbackDescription("")
            setPageLoading(false)
        }
    }
    const getCartData = () => {
        return {
            productId: product.id,
            totalQuantity: quantity,
            sizeSelected: selectedSize,
            colourSelected: selectedImage ? selectedImage.imageColor : null
        }
    }
    const addToCart = async () => {
        var cartData = getCartData()
        var updatedCartData = AddProductToCart(cartData, product, { cartData: props.cartData, cartProductsDetail: props.cartProductsDetail })
        props.addToCart(updatedCartData.cartData, updatedCartData.cartProductsDetail)
        const result = await storeData(CART_DATA, updatedCartData.cartData)
        setIsAddedToCart(true)
    }
    const removeFromCart = async () => {
        var updatedCartData = RemoveProductFromCart(product.id, props.cartData, props.cartProductsDetail)
        props.addToCart(updatedCartData.cartData, updatedCartData.cartProductsDetail)
        if (updatedCartData.cartData) {
            const result = await storeData(CART_DATA, updatedCartData.cartData)
        }
        else {
            const result = await clearData(CART_DATA)
        }
        setIsAddedToCart(false)
    }
    const updateCart = async () => {
        var cartData = getCartData()
        var updatedCartData = updateProductFromCart(cartData, props.cartData)
        props.addToCart(updatedCartData, props.cartProductsDetail)
        const result = await storeData(CART_DATA, updatedCartData)
        setIsAddedToCart(true)
    }
    const buyNowHandler = async () => {
        if (isAddedToCart) {
            props.navigation.navigate("Cart")
        }
        else {
            await addToCart()
            setIsAddedToCart(true)
            props.navigation.navigate("Cart")
        }
    }
    return (
        <PageContainer pageLoading={pageLoading} hasPadding={false} navigation={props.navigation} >
            <View style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Carousel
                    images={product.images}
                    swiperRef={swiperRef}
                />
                <View style={styles.contentContainer}>
                    <ScrollView>
                        <ContentPadding style={{ paddingTop: 10, paddingBottom: 20 }} hasPadding={true}>
                            <TitleContainer
                                price={product.price}
                                name={product.name}
                                subCategoryId={product.subCategoryId}
                                rating={findAverageRating(product.feedbacks)}
                            />
                            <ProductDescription
                                description={product.description}
                            />
                            <SelectSizeContainer
                                sizes={sizes}
                                changeSelectedSizeHandler={changeSelectedSizeHandler}
                                selectedSize={selectedSize}
                            />
                            <ColorSelectors
                                doesProductHasColors={isProductHasColor}
                                selectedImage={selectedImage}
                                images={product.images}
                                colorHandler={colorHandler}
                            />
                            <QuantitySelector
                                cotnainerStyle={{ marginTop: 20 }}
                                onPress={setQuantity}
                                quantity={product.quantity}
                                value={quantity}
                            />
                            <AddToCartButtons
                                addToCart={addToCart}
                                buyNowHandler={buyNowHandler}
                                removeFromCart={removeFromCart}
                                updateCart={updateCart}
                                isProductAddedToCart={isAddedToCart}
                                access={props.access}
                                isUpdated={isAddedToCart?isCartDataChanged(productAddedToCart,getCartData()):false}
                            />
                            <ReviewForm
                                feedbackError={feedbackError}
                                canFeedback={canFeedback}
                                feedback={feedback}
                                setFeedbackDescription={setFeedbackDescription}
                                feedbackDescription={feedbackDescription}
                                setFeedback={setFeedback}
                                submitFeedbackHandler={submitFeedbackHandler}
                                access={props.access}
                                navigation={props.navigation}
                                feedbacks={product.feedbacks}
                            />
                        </ContentPadding>
                    </ScrollView>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        orders: state.orderReducer.orders,
        cartData: state.shopReducer.cartData,
        cartProductsDetail: state.shopReducer.cartProductsDetail
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addOrders: (orders) => dispatch(actions.addOrders(orders)),
        updateSingleProduct: (product) => dispatch(actions.updateSingleProduct(product)),
        addToCart: (cartData, product) => dispatch(actions.addToCart(cartData, product))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);