import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-elements"
import { AccountScreenStackParamList } from "./AccountScreen"


export const InitialScreen = ({ navigation }: NativeStackScreenProps<AccountScreenStackParamList, 'InitialScreen'>) => {

    return (
        <View style={{ padding: 20, paddingTop: 40 }}>
            <View style={{ marginBottom: 24 }}>
                <Button title="My orders" onPress={() => { navigation.navigate("MyOrders") }}></Button>
            </View>
            <View style={{ marginBottom: 24 }}>
                <Button title="History of orders" onPress={() => { navigation.navigate("OrdersHistory") }}></Button>
            </View>
        </View>
    )
}