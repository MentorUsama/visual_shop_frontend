import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, FlatList, Touchable } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Containers
import PageContainer from '../../components/container/PageContainer'
// Importing Component
import Toast from 'react-native-toast-message';
import InputSearch from '../../components/components/Home/InputSearch/InputSearch';
import FilterProduct from '../../components/components/Home/FilterProduct/FilterProduct';
import Product from '../../components/components/Home/Product/Product';
import Loader from '../../components/components/Loader/Loader';
// Importing API's
import { getAllProducts } from '../../Utility/APIS/index'


const SeeMore = (props) => {
    return (
        <View style={{ paddingBottom: '10%' }}>
            {
                props.miniLoading ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    props.storeProducts == null ?
                        null :
                        props.storeProducts.nextPageNumber == -1 ?
                            null :
                            <TouchableOpacity onPress={props.loadProducts}><Text style={styles.seeMore}>See More</Text></TouchableOpacity>}
        </View>
    )
}

const Home = (props) => {
    const { navigation, route } = props
    const [searchText, searchTextChange] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [miniLoading, setMiniLoading] = useState(false)
    // ====== Checking Any Global Error ======
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: route.params.error
                });
            }
            return unsubscribe;
        });
    }, [route.params?.error])
    // Getting Products when first time screen load
    useEffect(async () => {
        if (props.storeProducts != null)
            return
        setPageLoading(true)
        const response = await getAllProducts(1) // Page is one as all
        if (response.status == 200) {
            props.updateStoreProducts(response.data)
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Oops',
                text2: "An Error Occured While Fetching Data"
            });
        }
        setPageLoading(false)
    }, [])
    // Loading More Products
    const loadProducts = async () => {
        if (props.storeProducts.nextPageNumber != -1) {
            setMiniLoading(true)
            const response = await getAllProducts(props.storeProducts.nextPageNumber)
            if (response.status == 200) {
                props.updateStoreProducts(response.data)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: "An Error Occured While Fetching Data"
                });
            }
            setMiniLoading(false)
        }
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            {/* Loading */}
            <Loader loading={pageLoading} />
            {/* Hero Container */}
            <View style={styles.heroContainer}>
                <Text style={styles.heroText}>Search Your Favorite Dresses</Text>
                <View style={styles.heroDetailContainer}>
                    <Text style={styles.heroTextDetail}>Ready to wear dresses tailored for you online. Hurry up while stock lasts.</Text>
                </View>
            </View>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <InputSearch
                    value={searchText}
                    onChangeText={searchTextChange}
                />
                <View style={{ marginTop: 5 }}>
                    <FilterProduct />
                </View>
            </View>
            {/* Products */}
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Products</Text>
                {/* Products Container */}
                <View style={styles.productContainer}>
                    <FlatList
                        data={props.storeProducts == null ? null : props.storeProducts.products}
                        renderItem={({ item }) => <Product onPress={() => props.navigation.navigate("ProductDetail")} item={item} />}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        ListEmptyComponent={<Text>No Product Found</Text>}
                        columnWrapperStyle={styles.columnContainer}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        ListFooterComponent={<SeeMore loadProducts={loadProducts} miniLoading={miniLoading} storeProducts={props.storeProducts} />}
                    />
                </View>
            </View>
        </PageContainer>
    )
}




const styles = StyleSheet.create({
    heroContainer: {
        marginTop: 10,

    },
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    heroText: {
        color: '#000000',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    },
    heroDetailContainer: {
        maxWidth: 250,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    heroTextDetail: {
        color: '#000000',
        fontSize: 12,
        textAlign: 'center',
    },
    searchContainer: {
        marginTop: 25,
        marginBottom: 25
    },
    columnWrapperStyle: {
        justifyContent: 'space-between'
    },
    productContainer: {
        flex: 1
    },
    seeMore: {
        color: '#FF7465',
        textAlign: 'center'
    }
})
const mapStateToProps = state => {
    return {
        token: state.userReducer.token,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn,
        storeProducts: state.shopReducer.storeProducts,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateStoreProducts: (products) => dispatch(actions.updateStoreProducts(products))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);