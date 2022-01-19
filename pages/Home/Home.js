import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Components And Containers
import PageContainer from '../../components/container/PageContainer'
import Toast from 'react-native-toast-message';
import Loader from '../../components/components/Loader/Loader';
import HeroContainer from './Parts/HeroContainer';
import SearchBarFilter from './Parts/SearchBarFilter';
// Importing Helpers
import { 
    isFilteredApplied, 
    isFilterChanged
} from './homeUtility'
import {
    findCategoryName, 
    findSubcategoryName, 
    findTagName 
} from '../../Utility/HelperFunctions/index'
// Importing API's
import { getAllProducts, getAllTags, getAllCategories, getFilteredProducts, searchByImage } from '../../Utility/APIS/index'
import * as ImagePicker from 'expo-image-picker';
import AllProducts from './Parts/AllProducts';

const Home = (props) => {
    const { navigation, route } = props
    const [searchText, searchTextChange] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [miniLoading, setMiniLoading] = useState(false)
    const [filterModel, setFilterModel] = useState(false)
    const [pickedImage, setPickedImage] = useState(null)
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
    const getFilteredProduct = async (data) => {
        setPageLoading(true)
        const response = await getFilteredProducts(data)
        if (response.status == 200) {
            props.addFilteredProducts(response.data, data)
        }
        setPickedImage(null)
        setPageLoading(false)
    }
    const filterHandler = async (data) => {
        setFilterModel(false)
        const filteredData = {
            ...data,
            searchText: props.filters != null ? props.filters.searchText : null
        }
        await getFilteredProduct(filteredData)
    }
    const searchByTextHandler = async () => {
        var filteredData;
        if (props.filters != null) {
            filteredData =
            {
                ...props.filters,
                searchText: searchText
            }
        }
        else {
            filteredData = {
                price: null,
                tags: null,
                categoryId: null,
                subcategoryId: null,
                searchText: searchText
            }
        }
        searchTextChange("")
        await getFilteredProduct(filteredData)
    }
    // Clear Filter
    const clearFilter = async () => {
        var filteredData = {
            price: null,
            tags: null,
            categoryId: null,
            subcategoryId: null,
            searchText: props.filters.searchText
        }
        if (filteredData.searchText != null) {
            await getFilteredProduct(filteredData)
        }
        else {
            props.addFilteredProducts(null, null)
        }
    }
    const clearTextSearch = async () => {
        var filteredData;
        if (isFilteredApplied(props.filters)) {
            filteredData = { ...props.filters, searchText: null }
            await getFilteredProduct(filteredData)
        }
        else {
            props.addFilteredProducts(null, null)
        }
    }
    const pickImage = async () => {
        // ===== Getting The Permission =====
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync(true)
        if (permission.status != 'granted') {
            Alert.alert('Camer Permission Required', 'Please Grant Permission to Upload Picture', [{ text: 'Okay' }])
            return
        }
        // ===== Getting The Image ======
        let myImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // ===== Gettting The Data From Server ======
        if (!myImage.cancelled) {
            setPageLoading(true)

            const searchedResult = await searchByImage("usama")
            if (searchedResult.status == 200) {
                props.addFilteredProducts(searchedResult.data, null)
                setPickedImage(myImage.uri)
            }

            setPageLoading(false)
        }
    }
    const takePicture = async () => {
        // Getting Permission
        const permission = await ImagePicker.getCameraPermissionsAsync();
        if (permission.status != 'granted') {
            Alert.alert('Camer Permission Required', 'Please Grant Permission to take Picture', [{ text: 'Okay' }])
            return
        }
        // Getting The Image
        const imageResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        // Doing Search By Image
        if (!imageResult.cancelled) {
            setPageLoading(true)
            const searchedResult = await searchByImage("usama")
            if (searchedResult.status == 200) {
                props.addFilteredProducts(searchedResult.data, null)
                setPickedImage(imageResult.uri)
            }
            setPageLoading(false)
        }
    }
    const clearImageSearch = () => {
        setPickedImage(null)
        props.addFilteredProducts(null, null)
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            <Loader loading={pageLoading} />
            <HeroContainer />
            <SearchBarFilter
                searchText={searchText}
                searchTextChange={searchTextChange}
                searchByTextHandler={searchByTextHandler}
                setFilterModel={setFilterModel}
                filterModel={filterModel}
                tags={props.tags}
                categories={props.categories}
                filterHandler={filterHandler}
                isFilteredApplied={isFilteredApplied(props.filters)}
                clearFilter={clearFilter}
                filters={props.filters}
                findCategoryName={findCategoryName}
                findSubcategoryName={findSubcategoryName}
                findTagName={findTagName}
                isFilterChanged={isFilterChanged}
                pickImage={pickImage}
                takePicture={takePicture}
            />
            <AllProducts
                storeProducts={props.storeProducts}
                pickedImage={pickedImage}
                navigation={props.navigation}
                miniLoading={miniLoading}
                loadProducts={loadProducts}
                filteredProducts={props.filteredProducts}
                isFilteredApplied={isFilteredApplied(props.filters)}
                clearFilter={clearFilter}
                clearTextSearch={clearTextSearch}
                filters={props.filters}
                clearImageSearch={clearImageSearch}
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
        categories: state.shopReducer.categories,
        filteredProducts: state.shopReducer.filteredProducts,
        filters: state.shopReducer.filters
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateStoreProducts: (products) => dispatch(actions.updateStoreProducts(products)),
        addTags: (tags) => dispatch(actions.addTags(tags)),
        addCategories: (categories) => dispatch(actions.addCategories(categories)),
        addFilteredProducts: (filteredProducts, filterData) => dispatch(actions.addFilteredProduct(filteredProducts, filterData))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);