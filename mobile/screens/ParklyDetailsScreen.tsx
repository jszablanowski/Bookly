import React from "react"
import { TouchableOpacity, View } from "react-native"
import { ParkingDetails } from "../components/ParkingDetails";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";



export const ParklyDetailsScreen = (params : {data :ParkingItemDetails}) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ParkingDetails
                details={params.data}
            />
        </View>
    )
}