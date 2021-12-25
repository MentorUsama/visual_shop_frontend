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
    VisitorCartStack,
    CustomerCartStack,
    LoginStack,
    ComplaintStack,
    OrdersStack,
    UserStack
}
    from './Stacks';
// Importing Screens without Login
import About from '../pages/About/About';



const Drawer = createDrawerNavigator();



const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {props.isLoggedIn?<DrawerItem label="logout" onPress={() => props.logout()}/>:null}
            <Drawer.Screen name="Complaint Pageasd" component={ComplaintStack} />
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
                isLoggedIn ?
                    (
                        <>
                            <Drawer.Screen name="Home" component={CustomerHomeStack} />
                            <Drawer.Screen name="About Us" component={About} />
                            <Drawer.Screen name="Cart" component={CustomerCartStack} />
                            <Drawer.Screen name="Information Page" component={UserStack} />
                            <Drawer.Screen name="Order Page" component={OrdersStack} />
                            <Drawer.Screen name="Complaint Page" component={ComplaintStack} />
                        </>
                    ) :
                    (
                        <>
                            <Drawer.Screen name="Home" component={VisitorHomeStack} />
                            <Drawer.Screen name="About Us" component={About} />
                            <Drawer.Screen name="Cart" component={VisitorCartStack} />
                            <Drawer.Screen name="Login" component={LoginStack} />
                        </>
                    )
            }
        </Drawer.Navigator>
    )
}
export default MyDrawer