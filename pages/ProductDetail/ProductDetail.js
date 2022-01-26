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
import { submitFeedback, getOrders } from '../../Utility/APIS/index'
import { getSize, doesProductHasColors, findAverageRating, isUserEligibleForFeedback } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'



const ProductDetail = (props) => {
    // Representaion Related Data
    const swiperRef = useRef(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [feedback, setFeedback] = useState(5)
    const [feedbackDescription, setFeedbackDescription] = useState("")
    const [feedbackError, setFeedbackError] = useState("")
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    // Main Data
    const [product, setProduct] = useState(props.route.params.product)
    const sizes = getSize(product.sizes)
    const firstIndexColor = doesProductHasColors(product.images)
    const canFeedback = isUserEligibleForFeedback(props.orders, product.id)
    const [selectedSize, changeSelectedSize] = useState(sizes && sizes[0])
    const [selectedImage, setSelectedImage] = useState(firstIndexColor ? product.images[firstIndexColor] : null)
    const [quantity, setQuantity] = useState(1)
    // Getting Some Data if not present
    useEffect(async () => {
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
            "rating": feedback,
            "description": feedbackDescription,
            "orderedProductId": canFeedback,
            "productId": product.id
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
    const getCartData=()=>{
        return {
            productId:product.id,
            quantity:quantity,
            selectedSize:selectedSize,
            selectedColor:selectedImage?selectedImage.imageColor:null
        }
    }
    const addToCart = () => {
        props.addToCart(getCartData(),product)
        setIsAddedToCart(true)
    }
    const removeFromCart = () => {
        setIsAddedToCart(false)
    }
    const updateCart = () => {
        setIsAddedToCart(true)
    }
    const buyNowHandler =() => {
        if (isAddedToCart) {
            if (props.access) {
                props.navigation.navigate("Checkout")
            }
            else {
                props.navigation.navigate("Login")
            }
        }
        else {
            if (props.access) {
                setIsAddedToCart(true)
                props.navigation.navigate("Checkout")
            }
            else {
                props.navigation.navigate("Login")
            }
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
                                firstIndexColor={firstIndexColor}
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
                                isUpdated={true}
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
        orders: state.orderReducer.orders
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addOrders: (orders) => dispatch(actions.addOrders(orders)),
        updateSingleProduct: (product) => dispatch(actions.updateSingleProduct(product)),
        addToCart:(cartData,product)=>dispatch(actions.addProductToCart(cartData,product))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);