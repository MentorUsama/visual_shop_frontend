import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// Importing Screens without Login
import Home from '../pages/Home/Home';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import LoginForget from '../pages/LoginForget/LoginForget'
import LoginReset from '../pages/LoginReset/LoginReset';
import Signup from '../pages/Signup/Signup';
import About from '../pages/About/About';
// With Login Screen
import Checkout from '../pages/Checkout/Checkout';
import JazzCash from '../pages/JazzCash/JazzCash';
import CreditCard from '../pages/CreditCard/CreditCard';
import UserInfo from '../pages/UserInfo/UserInfo';
import Orders from '../pages/Orders/Orders';
import Complaints from '../pages/Complaints/Complaints';
import ComplaintsDetail from '../pages/ComplaintsDetail/ComplaintsDetail';



const Stack = createNativeStackNavigator();


const VisitorHomeStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getFocusedRouteNameFromRoute(route) ?? 'HomePage'});
      }, [navigation, route]);
    return (
        <Stack.Navigator    
            screenOptions={{ headerShown:false}}
        >
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginForget" component={LoginForget} />
            <Stack.Screen name="LoginReset" component={LoginReset} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}
const CustomerHomeStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getFocusedRouteNameFromRoute(route) ?? 'HomePage'});
      }, [navigation, route]);
    return (
        <Stack.Navigator
            screenOptions={{ headerShown:false}}
        >
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="JazzCash" component={JazzCash} />
            <Stack.Screen name="CreditCard" component={CreditCard} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Complaints" component={Complaints} />
            <Stack.Screen name="ComplaintsDetail" component={ComplaintsDetail} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
    )
}
export {
    VisitorHomeStack,CustomerHomeStack
}