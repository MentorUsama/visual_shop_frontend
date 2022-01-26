import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Swiper from 'react-native-web-swiper';
import CarouselItem from '../../../../components/components/ProductDetail/CarouselItem/CarouselItem';

export default function Carousel(props) {
    const {
        images,
        swiperRef
    } = props
    return (
        <View style={styles.sliderContainer}>
            {
                images ?
                    <Swiper ref={swiperRef} controlsEnabled={false}>
                        {images.map(item => <CarouselItem key={item.id} item={item} />)}
                    </Swiper> :
                    <View style={styles.noImageContainner}>
                        <Text style={{ color: '#FF7465' }}>No Image Found</Text>
                    </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    sliderContainer: {
        height: 300,
        width: '100%'
    },
    noImageContainner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})