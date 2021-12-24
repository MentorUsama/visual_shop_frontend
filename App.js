import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
// Importing Screens
import Home from './pages/Home/Home'




// Settingup Stores
const rootReducer = combineReducers({ userReducer: userReducer });
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home></Home>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
