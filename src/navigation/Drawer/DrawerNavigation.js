import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Main from '../../screens/Main';
import {
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import LogoutModal from '../../screens/logout/LogoutModal';
import ContactUs from '../../screens/contactUs/ContactUs';
import DrawerHeader from '../../components/DrawerHeader';
import OverlayHeader from '../../components/OverlayHeader';
import Dashboard from '../../screens/dashboard/Dashboard';
import Wallet from '../../screens/walllet/Wallet';
import Inventory from '../../screens/inventory/Inventory';
import Request from '../../screens/requests/Request';
import IssuanceTracker from '../../screens/IssuanceTracker/IssuanceTracker';
import Order from '../../screens/order/Order';
import OrderSummary from '../../screens/order/OrderSummary';
import StackNavigation from '../Stack/StackNavigation';

const DrawerNavigation = ({ }) => {
    console.log("Rendering DrawerNavigation"); 
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            initialRouteName='dashboard'
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="HomeStack" component={StackNavigation} options={{ headerShown: false }} />
            {/* <Drawer.Screen
                name="Main"
                component={Main}
                options={{ header: () => <DrawerHeader /> }}
            /> */}
            <Drawer.Screen
                name="logoutModal"
                component={LogoutModal}
                options={{ headerShown: false }}
            />
            
            <Drawer.Screen
                name="drawer"
                component={Dashboard}
                options={{ header: () => <DrawerHeader title={"home"} /> }}
            />
            <Drawer.Screen
                name="requests"
                component={Request}
                options={{ header: () => <OverlayHeader title={"Requests"} /> }}
            />
            {/* <Drawer.Screen
                name="orders"
                component={Order}
                options={{ header: () => <OverlayHeader title={"Order"}  /> }}
            /> */}
            <Drawer.Screen
                name="orderSummary"
                component={OrderSummary}
                options={{ header: () => <OverlayHeader title={"Order Summary"}  /> }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation