import React from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";



export const ParklySearchScreen = () => {

    const renderItem = ({ item }: { item: ParkingItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <ParkingItem details={item}></ParkingItem>
        </TouchableOpacity>
    );



    const data: Array<ParkingItemDetails> = [
        {
            city: "Warsaw",
            street: "Marszalkowska",
            streetTag: "18",
            parkingName: "Super parking",
            pricePerHour: 10,
            spotNumber: 200,
            imageLink: "https://st.depositphotos.com/2575095/3015/i/950/depositphotos_30156457-stock-photo-vegetation-parking-spot.jpg"
        },
        {
            city: "Warsaw",
            street: "Marszalkowska",
            streetTag: "18",
            parkingName: "Super parking2",
            pricePerHour: 10,
            spotNumber: 200,
            imageLink: "https://st.depositphotos.com/2575095/3015/i/950/depositphotos_30156457-stock-photo-vegetation-parking-spot.jpg"
        }
    ]

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.parkingName}
                onRefresh={() => { }}
                refreshing={false}
                style={{ alignSelf: "stretch" }}
            />
        </View>
    )
}