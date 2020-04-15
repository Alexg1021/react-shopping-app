import React from 'react';
import{ createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import  { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen';


import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();
const OrdersStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const AdminStack = createStackNavigator();

const navOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
};


// Primary Shop Stack
const ShopNavigator = ( ) => {
    return (
        <Stack.Navigator
            screenOptions={navOptions}>
            <Stack.Screen 
                name="Products" 
                component={ProductsOverviewScreen}
                options={({navigation}) =>
                    ({
                        title: 'All Products',
                        headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton} >
                            <Item 
                                title="Cart" 
                                iconName={Platform.OS === 'android' ? 'md-cart': 'ios-cart'} 
                                onPress={()=> {
                                    navigation.navigate('CartScreen')
                                }}
                            />
                        </HeaderButtons>
                        ),
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                                <Item 
                                    title="Menu" 
                                    iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} 
                                    onPress={()=> {
                                        navigation.toggleDrawer();
                                    }}
                                />
                            </HeaderButtons>
                            )
                    })
                }
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={
                    ({route}) => ({title: route.params.productTitle})
                }
            />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
            />
        </Stack.Navigator>
    );
}

// Orders Stack
const OrdersNavigator = () => {
    return (
        <OrdersStack.Navigator
            screenOptions={navOptions}>
            <OrdersStack.Screen 
                name="Orders"
                component={OrdersScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton} >
                            <Item 
                                title="Menu" 
                                iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} 
                                onPress={()=> {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                        )
                    })
                }
                />
        </OrdersStack.Navigator>
    );
};

// User admin stack
const AdminNav = () => {
    return (
        <AdminStack.Navigator
            screenOptions={navOptions}>
            <AdminStack.Screen 
                name="Admin"
                component={UserProductsScreen}
                options={({ navigation }) => ({
                    title: "Your Products",
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton} >
                            <Item 
                                title="Menu" 
                                iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} 
                                onPress={()=> {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton} >
                            <Item 
                                title="Add" 
                                iconName={Platform.OS === 'android' ? 'md-create': 'ios-create'} 
                                onPress={()=> {
                                    navigation.navigate('Edit Product');
                                }}
                            />
                        </HeaderButtons>
                    )
                    })
                }
            />
            <AdminStack.Screen
                name="Edit Product"
                component={EditProductScreen} 
                options={
                    ({route}) => ({
                        title: route.params ? 'Edit Product': 'Add Product'
                    })
                }
            />
        </AdminStack.Navigator>
    );
}

// Drawer Navigation stack which has nested Products, Orders and Admin stack
const DrawerNavigator = () =>{
    return (
        <DrawerStack.Navigator screenOptions={navOptions}       >
            <DrawerStack.Screen 
                name="Products"
                component={ShopNavigator}
                options={{
                    drawerIcon:() =>(
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'} 
                            size={23} 
                            color={Colors.primary}
                            />
                    )
                }}
            />
            <DrawerStack.Screen 
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon:() =>(
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-list': 'ios-list'} 
                            size={23} 
                            color={Colors.primary}
                            />
                    )
                }}
            />
             <DrawerStack.Screen 
                name="Admin"
                component={AdminNav}
                options={{
                    drawerIcon:() =>(
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-create': 'ios-create'} 
                            size={23} 
                            color={Colors.primary}
                            />
                    )
                }}
            />
        </DrawerStack.Navigator>
    );
}

export default DrawerNavigator;