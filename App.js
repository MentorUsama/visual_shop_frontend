import React, { useState,useEffect} from 'react';
// Expo Imports
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
import * as actions from './store/Actions/index';
// Importing Navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
// Importing Helper Function
import {getData,USER_LOGIN_INFO_CONST,diff_minutes} from './Utility/HelperFunctions/index'
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
const rootReducer = combineReducers({ userReducer: userReducer });
const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Storing Local Data into Redux
  useEffect(async ()=>{
    const result=await getData(USER_LOGIN_INFO_CONST)
    if(result.isSuccess && result.data!=null)
    { 
      if(diff_minutes(d.getTime(),result.data.timeAdded)<50)
      {
        store.dispatch(actions.login(result.data.access,result.data.email,result.data.isLoggedIn,result.data.timeAdded))
      }
    }
  },[])
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
    </Provider>
  );
}