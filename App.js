import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Importing Fonts
import * as Font from 'expo-font';
// Importing App Loading
import AppLoading from 'expo-app-loading';
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
// Importing Screens
import Home from './pages/Home/Home';



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
  // Makin Sure Fonts Are Loaded
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
      <View style={styles.container}>
        <Home></Home>
      </View>
    </Provider>
  );
}
// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});