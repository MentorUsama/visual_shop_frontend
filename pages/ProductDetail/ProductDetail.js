import React, { useState, useRef } from 'react';
import { Text, View, Button, ScrollView, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import Swiper from 'react-native-web-swiper';
import CarouselItem from '../../components/components/ProductDetail/CarouselItem/CarouselItem';
import ContentPadding from '../../components/container/ContentPadding'
import Star from '../../assets/icons/star'
import { getSize, doesProductHasColors, findAverageRating } from '../../Utility/HelperFunctions/index'
import TagRadio from '../../components/components/TagRadio/TagRadio'
import ColorSelector from '../../components/components/ProductDetail/ColorSelector/ColorSelector';
import TextLoader from '../../components/components/TextWithLoader/TextWithLoader'


const ProductDetail = (props) => {
    // Getting Some Data
    const { navigation } = props;
    const { product } = props.route.params
    const rating = findAverageRating(product.feedbacks);
    const sizes = getSize(product.sizes)
    const firstIndexColor = doesProductHasColors(product.images)
    // My Data
    const swiperRef = useRef(null)
    const [selectedSize, changeSelectedSize] = useState(sizes && sizes[0])
    const [selectedImage, setSelectedImage] = useState(firstIndexColor ? product.images[firstIndexColor] : null)
    const [showDetail, setShowDetail] = useState(false)
    // Handlers
    const onIndexChange = (index) => {
        // console.log("No we are at: ", index)
    }
    const changeSelectedSizeHandler = (size) => {
        changeSelectedSize(size)
    }
    const colorHandler = (selectedItem, index) => {
        setSelectedImage(selectedItem)
        if (swiperRef) {
            swiperRef.current.goTo(index);
        }
    }
    return (
        <PageContainer hasPadding={false} navigation={navigation} >
            <View style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Slider */}
                <View style={[styles.sliderContainer]}>
                    {
                        product.images ?
                            <Swiper ref={swiperRef} controlsEnabled={false} onIndexChanged={onIndexChange}>
                                {product.images.map(item => <CarouselItem key={item.id} item={item} />)}
                            </Swiper> :
                            <Text>No Image Found</Text>
                    }
                </View>
                {/* Content */}
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <ContentPadding style={{ paddingTop: 10 }} hasPadding={true}>
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
    }
})
export default ProductDetail;