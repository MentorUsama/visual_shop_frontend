import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
// Expo Imports
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
import shopReducer from './store/Reducers/shopReducer'
import orderReducer from './store/Reducers/orderReducer'
import updateDataReducer from './store/Reducers/updateDataReducer'
import * as actions from './store/Actions/index';
import thunk from 'redux-thunk';
// Importing Navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/components/CustomToast/CustomToast'
// Importing Helper Function
import { getData, USER_LOGIN_INFO_CONST, diff_minutes,CART_DATA } from './Utility/HelperFunctions/index'
import {getListOfProducts} from './Utility/APIS/index'
const d = new Date();
// Importing Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
};




// Setting up Stores
var store = null;
var rootReducer = null;

if (Platform.OS != 'web') {
  // Setting Store For Mobile
  rootReducer = combineReducers({ userReducer: userReducer,shopReducer:shopReducer,orderReducer:orderReducer,updateDataReducer:updateDataReducer });
  store = createStore(rootReducer);
}
else {
  const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
  rootReducer = combineReducers({ userReducer: userReducer,shopReducer:shopReducer,orderReducer:orderReducer,updateDataReducer:updateDataReducer });
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));
}




export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Storing Local Data into Redux
  useEffect(async () => {
    // Getting loging info
    const login_result = await getData(USER_LOGIN_INFO_CONST)
    if (login_result.isSuccess && login_result.data != null) {
      if (diff_minutes(d.getTime(), login_result.data.timeAdded) < 50) {
        store.dispatch(actions.login(login_result.data.access, login_result.data.email, login_result.data.isLoggedIn, login_result.data.timeAdded))
      }
    }
    // Getting cart info
    const cart_result = await getData(CART_DATA)
    if(cart_result.isSuccess && cart_result.data != null)
    {
      var cartData=cart_result.data
      var productList=[];
      cartData.map(cart=>{
        productList.push(cart.productId)
      })
      var productDetail=await getListOfProducts(productList)
      var newCart=[];
      var newProductDetail=[];
      if(productDetail.status==200)
      {
          // Pushing the data that is in both cart and product list (To remove any product that is no longer exist)
          productDetail.data.map(product=>{
              var cartDetail=cartData.find(cart=>{
                if(cart.productId==product.id)
                  return cart
              })
              if(cartDetail)
              {
                newCart.push(cartDetail)
                newProductDetail.push(product)
              }
              return product
          })
        // Loading Cart data
        store.dispatch(actions.addToCart(newCart,newProductDetail))
      }
    }
  }, [])
  // Making Sure To Load All Fonts Before Loading The App
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // Returning The Screen If loaded
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <Toast config={toastConfig}/>
    </Provider>
  );
}