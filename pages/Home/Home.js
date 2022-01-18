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
import Loader from '../../components/components/Loader/Loader';
import TextWithLoader from '../../components/components/TextWithLoader/TextWithLoader';
import HeroContainer from './Parts/HeroContainer';
import SearchBarFilter from './Parts/SearchBarFilter';
import Product from '../../components/components/Home/Product/Product';
// Importing API's
import { getAllProducts, getAllTags, getAllCategories } from '../../Utility/APIS/index'
import AllProducts from './Parts/AllProducts';

const Home = (props) => {
    const { navigation, route } = props
    const [searchText, searchTextChange] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [miniLoading, setMiniLoading] = useState(false)
    const [filterModel, setFilterModel] = useState(true)
    const [filteredProduct, setFilterProducts] = useState(null)
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
    // Filter Handler
    const filterHandler = (data) => {
        const filteredData = {
            ...data,
            searchText: searchText == "" || filteredProduct == null ? null : searchText // Checking If Search By Text Is applied or not
        }
        console.log(data)
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            <Loader loading={pageLoading} />
            <HeroContainer />
            <SearchBarFilter
                searchText={searchText}
                searchTextChange={searchTextChange}
                setFilterModel={setFilterModel}
                filterModel={filterModel}
                tags={props.tags}
                categories={props.categories}
                filterHandler={filterHandler}
            />
            <AllProducts
                storeProducts={props.storeProducts}
                navigation={props.navigation}
                miniLoading={miniLoading}
                loadProducts={loadProducts}
            />
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