import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Containers
import PageContainer from '../../components/container/PageContainer'
// Importing Component
import Toast from 'react-native-toast-message';
import InputSearch from '../../components/components/InputSearch/InputSearch';
import FilterProduct from '../../components/components/FilterProduct/FilterProduct';
// Importing API's
import { getAllProducts } from '../../Utility/APIS/index'


const Home = (props) => {
    const { navigation, route } = props
    const [searchText, searchTextChange] = useState("");
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
        const response = await getAllProducts(1) // Page is one as all
        if (response.status == 200) {
            props.updateStoreProducts(response.data)
        }
        else {

            console.log(response.data)
        }
    }, [])
    // Loading More Products
    const loadProducts = async () => {
        if (props.storeProducts.nextPageNumber != -1) {
            const response = await getAllProducts(props.storeProducts.nextPageNumber)
            if (response.status == 200) {
                props.updateStoreProducts(response.data)
            }
        }
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            {/* Hero Container */}
            <View style={styles.heroContainer}>
                <Text style={styles.heroText}>Search Your Favorite Dresses</Text>
                <View style={styles.heroDetailContainer}>
                    <Text style={styles.heroTextDetail}>Ready to wear dresses tailored for you online. Hurry up while stock lasts.</Text>
                </View>
            </View>
            {/* Search Bar */}
            <ScrollView>
                <View style={styles.searchContainer}>
                    <InputSearch
                        value={searchText}
                        onChangeText={searchTextChange}
                    />
                    <View style={{ marginTop: 5 }}>
                        <FilterProduct

                        />
                    </View>
                </View>
                {/* Products */}
                <View>
                    <Text style={styles.title}>Products</Text>
                    {/* Products Container */}
                    <View>

                    </View>
                    {/* Next Product */}
                    {
                        props.storeProducts == null ?
                            null :
                            props.storeProducts.nextPageNumber == -1 ?
                                null :
                                <TouchableOpacity onPress={loadProducts}><Text>See More</Text></TouchableOpacity>
                    }
                </View>
            </ScrollView>
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