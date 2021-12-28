import React, { useState } from 'react';
// Expo Imports
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
// Importing Navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
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