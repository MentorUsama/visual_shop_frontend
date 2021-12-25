// Redux
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
// Navigation
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Importing Stacks
import {
    VisitorHomeStack,
    CustomerHomeStack,
}
    from './Stacks';



const Drawer = createDrawerNavigator();



const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem label="Home" onPress={() => props.navigation.navigate("HomePage")} />
            <DrawerItem label="About Us" onPress={() => props.navigation.navigate("About")} />
            <DrawerItem label="Cart" onPress={() => props.navigation.navigate("Cart")} />
            {
                props.isLoggedIn ?
                    (
                        <>
                            <DrawerItem label="Information Page" onPress={() => props.navigation.navigate("UserInfo")} />
                            <DrawerItem label="Orders Page" onPress={() => props.navigation.navigate("Orders")} />
                            <DrawerItem label="Complaint Page" onPress={() => props.navigation.navigate("Complaints")} />
                            <DrawerItem label="logout" onPress={() => props.logout()} />
                        </>
                    )
                    :
                    (
                        <>
                            <DrawerItem label="Login" onPress={() => props.navigation.navigate("Login")} />
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
                props.isLoggedIn ?<Drawer.Screen name='Home' component={CustomerHomeStack} />:<Drawer.Screen name="Home" component={VisitorHomeStack}/>

            }
        </Drawer.Navigator>
    )
}
export default MyDrawer