import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert,Image } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Components And Containers
import PageContainer from '../../components/container/PageContainer'
import Toast from 'react-native-toast-message';
import HeroContainer from './Parts/HeroContainer';
import SearchBarFilter from './Parts/SearchBarFilter';
import {PermissionsAndroid} from 'react-native';
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
import { useIsFocused } from "@react-navigation/native";
// Importing API's
import { getAllProducts, getAllTags, getAllCategories, getFilteredProducts, searchByImage } from '../../Utility/APIS/index'
import * as ImagePicker from 'expo-image-picker';
import AllProducts from './Parts/AllProducts';

const Home = (props) => {
    const { navigation, route } = props
    const isFocused = useIsFocused();
    const [searchText, searchTextChange] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [miniLoading, setMiniLoading] = useState(false)
    const [filterModel, setFilterModel] = useState(false)
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [camerStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();
    const [sampleImage, setSampleImage] = useState(null);
    // ====== Checking Any Global Error ======
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: route.params.error
                });
                props.navigation.reset({
                    index: 0,
                    routes: [{name: "HomePage"}]
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
                props.addStoreProducts(response.data)
            }
        }
        // Getting All The Tags
        if (props.tags == null) {
            const response = await getAllTags()
            if (response.status == 200) {
                props.addTags(response.data)
            }
        }
        // Getting All The Categories
        if (props.categories == null) {
            const response = await getAllCategories()
            if (response.status == 200) {
                props.addCategories(response.data)
            }
        }
        setPageLoading(false)
    }, [])

    const fetchProduct = async () => {
        // Getting All The Products If not Stored
        if (props.storeProducts == null) {
            const response = await getAllProducts(1) // Page is one as all
            if (response.status == 200) {
                props.addStoreProducts(response.data)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: response.data
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
    }
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
        setPageLoading(false)
    }
    const filterHandler = async (data) => {
        setFilterModel(false)
        const filteredData = {
            ...data,
            searchText: props.filters != null ? props.filters.searchText : null
        }
        await getFilteredProduct(filteredData)
        clearImageSearch()
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
            searchText: props.filters?props.filters.searchText:null
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
    const handleSearchByImage=async (myImage)=>{
        setPageLoading(true)
            const searchedResult = await searchByImage(myImage)
            if (searchedResult.status == 200) {
                clearTextSearch()
                clearFilter()
                props.addImageSearchedResult({
                    features:searchedResult.data.features,
                    products:searchedResult.data.products,
                    imageURI:myImage.uri,
                    features_extracted:searchedResult.data.feature_extracted,
                })
            }
            else if(searchedResult.status== 404)
            {
                clearTextSearch()
                clearFilter()
                props.addImageSearchedResult({
                    features:null,
                    products:[],
                    imageURI:myImage.uri,
                    features_extracted:searchedResult.data.feature_extracted
                })
            }
            else
            {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: searchedResult.data
                });
            }
        setPageLoading(false)
    }
    const pickImage = async () => {
        // ===== Getting The Permission =====
        const data=await requestPermission(true)
        if (data && data.granted==false) {
            if(data.canAskAgain==false)
            {
                Alert.alert('Camer Permission Required', 'Please allow camera permission from your mobile setting to use this feature', [{ text: 'Okay' }])
            }
            else
            {
                Alert.alert('Camer Permission Required', 'Camera permission is required', [{ text: 'Okay' }])
            }
            return
        }
        // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{title: 'We need your permission'});
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log('You can use the camera');
        // }
        // else
        // {
            
        // }
        // ===== Getting The Image ======
        let myImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // ===== Gettting The Data From Server ======
        if (!myImage.cancelled) {
            await handleSearchByImage(myImage)
        }
    }
    const takePicture = async () => {
        const data=await requestCameraPermission()
        if (data.granted==false) {
            if(data.actions==false)
            {
                Alert.alert('Camer Permission Required', 'Please Grant Permission to take Picture from your system setting.', [{ text: 'Okay' }])
            }
            else
            {
                Alert.alert('Camer Permission Required', 'Please Grant Permission to take Picture.', [{ text: 'Okay' }])
            }
            return
        }
        // Getting The Image
        const imageResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        })
        // Doing Search By Image
        if (!imageResult.cancelled) {
            await handleSearchByImage(imageResult)
            setSampleImage(imageResult.uri)
        }
    }
    const clearImageSearch = () => {
        props.addImageSearchedResult({
            features:null,
            imageURI:null,
            products:null,
            features_extracted:null
        })
    }
    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            {
                sampleImage?<Image
                style={{ width: 100, height: 100 }}
                source={{ uri: sampleImage }}
            />:null
            }
            {/* <Loader loading={pageLoading} /> */}
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

                pickedImage={props.imageSearchedResult.imageURI}
                features={props.imageSearchedResult.features}
                features_extracted={props.imageSearchedResult.features_extracted}
                featuresProducts={props.imageSearchedResult.products}

                navigation={props.navigation}
                miniLoading={miniLoading}
                loadProducts={loadProducts}
                filteredProducts={props.filteredProducts?props.filteredProducts:props.imageSearchedResult.products} // Filter product can be null, or product got by applying filter or product got by searching by image
                isFilteredApplied={isFilteredApplied(props.filters)}
                clearFilter={clearFilter}
                clearTextSearch={clearTextSearch}
                filters={props.filters}
                clearImageSearch={clearImageSearch}
                fetchProduct={fetchProduct}
                pageLoading={pageLoading} // verify if page is loading to get products
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
        filters: state.shopReducer.filters,
        imageSearchedResult:state.shopReducer.imageSearchedResult
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateStoreProducts: (products) => dispatch(actions.updateStoreProducts(products)),
        addStoreProducts: (products) => dispatch(actions.addStoreProducts(products)),
        addTags: (tags) => dispatch(actions.addTags(tags)),
        addCategories: (categories) => dispatch(actions.addCategories(categories)),
        addFilteredProducts: (filteredProducts, filterData) => dispatch(actions.addFilteredProduct(filteredProducts, filterData)),
        addImageSearchedResult:(imageSearchedResult)=> dispatch(actions.addImageSearchedResult(imageSearchedResult))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);