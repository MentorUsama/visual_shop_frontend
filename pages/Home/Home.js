import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Containers
import PageContainer from '../../components/container/PageContainer'
// Importing Component
import Toast from 'react-native-toast-message';
import InputSearch from '../../components/components/Home/InputSearch/InputSearch';
import MyButton from '../../components/components/Button/MyButton'
import FilterModel from '../../components/components/Home/FilterModel/FilterModel';
import Product from '../../components/components/Home/Product/Product';
import Loader from '../../components/components/Loader/Loader';
import TextWithLoader from '../../components/components/TextWithLoader/TextWithLoader';
// Importing API's
import { getAllProducts, getAllTags, getAllCategories } from '../../Utility/APIS/index'

const Home = (props) => {
    const { navigation, route } = props
    const [searchText, searchTextChange] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [miniLoading, setMiniLoading] = useState(false)
    const [filterModel, setFilterModel] = useState(true)
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
        setPageLoading(true)
        // Getting All The Products If not Stored
        if (props.storeProducts == null) {
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
                setPageLoading(false)
                return
            }
        }
        // Getting All The Tags
        if (props.tags == null) {
            const response = await getAllTags()
            if (response.status == 200) {
                props.addTags(response.data)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: "An Error Occured While Fetching Some Data"
                });
                setPageLoading(false)
                return
            }
        }
        // Getting All The Categories
        if (props.categories == null) {
            const response = await getAllCategories()
            if (response.status == 200) {
                props.addCategories(response.data)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: "An Error Occured While Fetching Some Data"
                });
                setPageLoading(false)
                return
            }
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
                    <MyButton
                        title="Filter Products"
                        onPress={() => setFilterModel(true)}
                    />
                    {filterModel ? <FilterModel
                        show={filterModel}
                        close={setFilterModel}
                        tags={props.tags}
                        categories={props.categories}
                    /> : null}
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
                        ListFooterComponent={<TextWithLoader
                            shouldLoad={miniLoading}
                            shouldShow={props.storeProducts != null && props.storeProducts.nextPageNumber != -1}
                            onPress={loadProducts}
                        />}
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
        tags: state.shopReducer.tags,
        categories: state.shopReducer.categories
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateStoreProducts: (products) => dispatch(actions.updateStoreProducts(products)),
        addTags: (tags) => dispatch(actions.addTags(tags)),
        addCategories: (categories) => dispatch(actions.addCategories(categories))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);