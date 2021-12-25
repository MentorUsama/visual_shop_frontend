import React from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
// Navigation
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// Importing Stacks
import {
    VisitorHomeStack,
    CustomerHomeStack,
}
    from './Stacks';



const Drawer = createDrawerNavigator();


const CustomDrawer = (props) => {
    const key = props.state.routes[0].key
    const currentPage = props.descriptors[key].options.headerTitle
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem focused={currentPage == "HomePage"} label="Home" onPress={() => props.navigation.navigate("HomePage")} />
            <DrawerItem focused={currentPage == "About"} label="About Us" onPress={() => props.navigation.navigate("About")} />
            <DrawerItem focused={currentPage == "Cart"} label="Cart" onPress={() => props.navigation.navigate("Cart")} />
            {
                props.isLoggedIn ?
                    (
                        <>
                            <DrawerItem focused={currentPage == "UserInfo"} label="Information Page" onPress={() => props.navigation.navigate("UserInfo")} />
                            <DrawerItem focused={currentPage == "Orders"} label="Orders Page" onPress={() => props.navigation.navigate("Orders")} />
                            <DrawerItem focused={currentPage == "Complaints"} label="Complaint Page" onPress={() => props.navigation.navigate("Complaints")} />
                            <DrawerItem label="logout" onPress={() => props.logout()} />
                        </>
                    )
                    :
                    (
                        <>
                            <DrawerItem focused={currentPage == "Login"} label="Login" onPress={() => props.navigation.navigate("Login")} />
                        </>
                    )
            }
        </DrawerContentScrollView>
    );
}
const MyDrawer = (props) => {
    const { isLoggedIn } = props;
    return (
        <Drawer.Navigator
            drawerContent={(drawerProps) => <CustomDrawer {...drawerProps} isLoggedIn={isLoggedIn} logout={props.logout} />}
        >
            {
                props.isLoggedIn ? <Drawer.Screen name='Home' component={CustomerHomeStack} /> : <Drawer.Screen name="Home" component={VisitorHomeStack} />

            }
        </Drawer.Navigator>
    )
}
export default MyDrawer