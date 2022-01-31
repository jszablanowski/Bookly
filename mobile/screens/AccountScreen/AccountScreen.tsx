import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-elements"
import { InitialScreen } from "./InitialScreen";
import { MyOrdersScreen } from "./MyOrdersScreen/MyOrdersScreen";
import { OrdersHistoryScreen } from "./OrdersHistoryScreen";




export type AccountScreenStackParamList = {
    InitialScreen: undefined;
    MyOrders: undefined;
    OrdersHistory: undefined;
};

const Stack = createNativeStackNavigator<AccountScreenStackParamList>();


export const AccountScreen = () => {



    return (
        <Stack.Navigator
            screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrdersHistory" component={OrdersHistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}