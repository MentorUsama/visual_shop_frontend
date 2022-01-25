import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, ScrollView, useWindowDimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import Swiper from 'react-native-web-swiper';
import CarouselItem from '../../components/components/ProductDetail/CarouselItem/CarouselItem';
import ContentPadding from '../../components/container/ContentPadding'
import Star from '../../assets/icons/star'
import { getSize, doesProductHasColors, findAverageRating, isUserEligibleForFeedback } from '../../Utility/HelperFunctions/index'
import TagRadio from '../../components/components/TagRadio/TagRadio'
import ColorSelector from '../../components/components/ProductDetail/ColorSelector/ColorSelector';
import TextLoader from '../../components/components/TextWithLoader/TextWithLoader'
import QuantitySelector from '../../components/components/ProductDetail/QuantitySelector/QuantitySelector';
import Cart from '../../assets/icons/cart'
import MyButton from '../../components/components/Button/MyButton';
// APIS
import { getOrders } from '../../Utility/APIS/Order/order'
import { submitFeedback } from '../../Utility/APIS/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Importing Icon
import Smiley1 from '../../assets/icons/smiley1'
import Smiley2 from '../../assets/icons/smiley2'
import Smiley3 from '../../assets/icons/smiley3'
import Smiley4 from '../../assets/icons/smiley4'
import Smiley5 from '../../assets/icons/smiley5'
import Feedback from '../../components/components/ProductDetail/Feedback/Feedback';


const ProductDetail = (props) => {
    // Getting Some Data
    const { navigation } = props;
    // My Data
    const swiperRef = useRef(null)
    const [product,setProduct]=useState(props.route.params.product)
    const rating = findAverageRating(product.feedbacks);
    const sizes = getSize(product.sizes)
    const firstIndexColor = doesProductHasColors(product.images)
    const canFeedback = isUserEligibleForFeedback(props.orders, product.id)

    const [selectedSize, changeSelectedSize] = useState(sizes && sizes[0])
    const [selectedImage, setSelectedImage] = useState(firstIndexColor ? product.images[firstIndexColor] : null)
    const [showDetail, setShowDetail] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [pageLoading, setPageLoading] = useState(false)
    const [feedback, setFeedback] = useState(5)
    const [feedbackDescription, setFeedbackDescription] = useState("")
    const [feedbackError, setFeedbackError] = useState("")
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
            "productId":product.id
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
    return (
        <PageContainer pageLoading={pageLoading} hasPadding={false} navigation={navigation} >
            <View style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Slider */}
                <View style={[styles.sliderContainer]}>
                    {
                        product.images ?
                            <Swiper ref={swiperRef} controlsEnabled={false}>
                                {product.images.map(item => <CarouselItem key={item.id} item={item} />)}
                            </Swiper> :
                            <Text>No Image Found</Text>
                    }
                </View>
                {/* Content */}
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <ContentPadding style={{ paddingTop: 10, paddingBottom: 20 }} hasPadding={true}>
                            {/* Product Title Container */}
                            <View style={styles.titleContainer}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.title} numberOfLines={3}>{product.name}</Text>
                                    <Text style={styles.subTitle}>{product.subCategoryId.categoryId.name} - {product.subCategoryId.name}</Text>
                                    <View style={styles.starContainer}>
                                        {
                                            [...Array(5)].map((a, index) => <View key={index}><Star fill={index < rating ? "#FFD019" : "#909090"} /></View>)
                                        }
                                    </View>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceStyle}>{parseFloat(product.price)} RS</Text>
                                </View>
                            </View>
                            {/* Product Description */}
                            <View style={styles.containersSpace}>
                                <Text style={styles.title}>Description</Text>
                                <View>
                                    <Text numberOfLines={showDetail ? 0 : 2} style={[styles.subTitle, { textAlign: 'justify' }]}>
                                        {product.description}
                                    </Text>
                                    <TextLoader
                                        shouldShow={true}
                                        title={showDetail ? "See Less" : "See More"}
                                        textStyle={{ textAlign: "left" }}
                                        containerStyle={{ paddingBottom: 0 }}
                                        onPress={() => setShowDetail(!showDetail)}
                                    />
                                </View>
                            </View>
                            {/* Selecting The Size */}
                            {
                                sizes != null ?
                                    <View style={styles.containersSpace}>
                                        <Text style={styles.title}>Size</Text>
                                        <View style={styles.sizeContainer}>
                                            {
                                                sizes.map(size => {
                                                    return (
                                                        <View key={size} style={{ width: 100 }}>
                                                            <TagRadio
                                                                title={size}
                                                                onChange={changeSelectedSizeHandler}
                                                                selected={selectedSize == size}
                                                                id={size}
                                                                containerStyle={{ alignItems: 'center', paddingTop: 12, paddingBottom: 12 }}
                                                                textStyle={{ fontSize: 17 }}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    : null
                            }
                            {/* Selecting Color */}
                            {
                                firstIndexColor ?
                                    <View style={styles.containersSpace}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.title}>Color</Text>
                                            <Text style={{ paddingLeft: 20, fontWeight: 'bold', color: '#828181', fontSize: 18 }}>{selectedImage.imageColor.toUpperCase()}</Text>
                                        </View>
                                        <View style={styles.colorContainer}>
                                            {
                                                product.images.map((image, index) => {
                                                    return (
                                                        image.imageColor != null ?
                                                            <ColorSelector
                                                                isSelected={selectedImage && selectedImage.id == image.id}
                                                                onPress={colorHandler}
                                                                index={index}
                                                                item={image}
                                                                key={image.id}
                                                            />
                                                            : null
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    : null
                            }
                            {/* Selecting Quantity */}
                            <View style={{ marginTop: 20 }}>
                                <QuantitySelector onPress={setQuantity} quantity={product.quantity} value={quantity} />
                            </View>
                            {/* Icon Container */}
                            <View style={styles.iconContainer}>
                                <View style={styles.cartButton}>
                                    <Cart />
                                </View>
                                <View style={{ flex: 1 }} >
                                    <MyButton style={{ paddingTop: 15, paddingBottom: 15, borderRadius: 10 }} title="Buy Now" />
                                </View>
                            </View>
                            {/* Give Review */}
                            <View style={styles.containersSpace}>
                                <Text style={styles.title}>Reviews</Text>
                                <Text style={styles.errorColor}>{feedbackError}</Text>
                                {
                                    props.access ?
                                        <View>
                                            {
                                                canFeedback ?
                                                    <View>
                                                        <View style={styles.iconContainer}>
                                                            <Smiley1 onPress={() => setFeedback(1)} fill={feedback == 1 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                                            <Smiley2 onPress={() => setFeedback(2)} fill={feedback == 2 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                                            <Smiley3 onPress={() => setFeedback(3)} fill={feedback == 3 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                                            <Smiley4 onPress={() => setFeedback(4)} fill={feedback == 4 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                                            <Smiley5 onPress={() => setFeedback(5)} fill={feedback == 5 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                                        </View>
                                                        <View style={styles.textAreaContainer}>
                                                            <TextInput
                                                                multiline={true}
                                                                numberOfLines={3}
                                                                style={{ textAlignVertical: 'top', }}
                                                                placeholder='Please Provide Your Previous Feedback'
                                                                onChangeText={(val) => setFeedbackDescription(val)}
                                                                value={feedbackDescription}
                                                            />
                                                        </View>
                                                        <MyButton
                                                            isDisabled={feedbackDescription == "" ? true : false}
                                                            title="Submit"
                                                            style={{ marginTop: 10, borderRadius: 10 }}
                                                            onPress={() => submitFeedbackHandler()}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                        :
                                        <View>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={[{ marginRight: 5 }, styles.subTitle]}>Please</Text>
                                                <TextLoader shouldShow={true} onPress={() => props.navigation.navigate("Login")} containerStyle={{ paddingBottom: 0, marginRight: 5 }} textStyle={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14, marginTop: 2 }} title="Login" />
                                                <Text style={styles.subTitle}>To Give Review</Text>
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* Previous Feedbacks */}
                            <View>
                                {
                                    product.feedbacks ?
                                        product.feedbacks.map((feedback) => {
                                            if (!feedback.feedback)
                                                return null
                                            return (
                                                <Feedback
                                                    key={feedback.feedback.id}
                                                    description={feedback.feedback.description}
                                                    activeStars={feedback.feedback.rating}
                                                    name={feedback.customer.name} />)
                                        })
                                        :
                                        null
                                }
                            </View>
                        </ContentPadding>
                    </ScrollView>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    sliderContainer: {
        height: 300,
        width: '100%'
    },
    containersSpace: {
        marginTop: 20
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    subTitle: {
        color: '#828181',
        fontSize: 14,
        marginTop: 2
    },
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    priceContainer: {
        alignItems: 'center'
    },
    priceStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF7465',
        paddingLeft: 20,
        alignItems: 'center'
    },
    sizeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10
    },
    colorContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    iconContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    cartButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        width: 50,
        height: 50,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textAreaContainer: {
        backgroundColor: '#D0CFCF',
        marginTop: 10,
        padding: 10
    },
    errorColor: {
        color: '#FF7465',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 2
    },
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
        updateSingleProduct:(product)=>dispatch(actions.updateSingleProduct(product))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);