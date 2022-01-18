import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import TextWithLoader from '../../../components/components/TextWithLoader/TextWithLoader'
import Product from '../../../components/components/Home/Product/Product'

export default function AllProducts(props) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8 }}>
                <Text style={styles.title}>Products</Text>
            </View>
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
                    renderItem={({ item }) => <Product onPress={() => props.navigation.navigate("ProductDetail")} item={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ListEmptyComponent={<Text>No Product Found</Text>}
                    columnWrapperStyle={styles.columnContainer}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.columnWrapperStyle}
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