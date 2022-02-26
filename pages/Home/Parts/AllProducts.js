import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import TextWithLoader from '../../../components/components/TextWithLoader/TextWithLoader'
import Product from '../../../components/components/Home/Product/Product'
import SearchedImage from '../../../components/components/Home/SearchedImage/SearchedImage'
import MyButton from '../../../components/components/Button/MyButton'

function NoProductFound(props) {
    return (
        <View>
            {
                props.storeProducts
                    ?
                    <Text>No Product Found</Text>
                    :
                    <View>
                        <Text style={{marginBottom:10}}>Unable to fetch product from server</Text>
                        <MyButton  onPress={props.fetchProduct} title="Try Again"/>
                    </View>
            }

        </View>
    )
}
export default function AllProducts(props) {
    const { width, height } = Dimensions.get('window');
    return (
        <View style={{ flex: 1 }}>
            {
                props.pickedImage != null
                    ?
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 15 }}><Text style={styles.title}>Similar Products</Text></View>
                    :
                    props.filters != null && props.filters.searchText != null ?
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.title, { flex: 1, paddingBottom: 15 }]}>{`${props.filters.searchText}`}</Text>
                            <TextWithLoader
                                shouldLoad={false}
                                shouldShow={true}
                                onPress={props.clearTextSearch}
                                title="Clear Search"
                                textStyle={{ fontWeight: 'bold' }}
                                containerStyle={{ paddingBottom: 0 }}
                            />
                        </View>
                        :
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 15 }}><Text style={styles.title}>Products</Text></View>
            }
            {/* Showing The Image */}
            {
                props.pickedImage ?
                    <SearchedImage
                        pickedImage={props.pickedImage}
                        clearImageSearch={props.clearImageSearch}
                    />
                    : null
            }
            {/* Products Container */}
            <View style={styles.productContainer}>
                <FlatList
                    data=
                    {
                        props.filteredProducts == null ?
                            props.storeProducts == null ?
                                null
                                :
                                props.storeProducts.products
                            :
                            props.filteredProducts
                    }
                    renderItem={({ item }) => <Product onPress={() => props.navigation.navigate("ProductDetail", { product: item })} item={item} containerStyle={width < 300 ? { width: '100%' } : {}} />}
                    keyExtractor={(item) => item.id}
                    numColumns={width < 300 ? 1 : 2}
                    ListEmptyComponent={<NoProductFound fetchProduct={props.fetchProduct} storeProducts={props.storeProducts} />}
                    columnWrapperStyle={styles.columnContainer}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={width < 300 ? null : styles.columnWrapperStyle}
                    ListFooterComponent={<TextWithLoader
                        shouldLoad={props.miniLoading}
                        shouldShow={props.filteredProducts != null ? false : props.storeProducts != null && props.storeProducts.nextPageNumber != -1}
                        onPress={props.loadProducts}
                    />}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    columnWrapperStyle: {
        justifyContent: 'space-between'
    },
    productContainer: {
        flex: 1
    }
})