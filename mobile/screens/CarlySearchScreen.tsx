import React from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import { CarItem, CarItemDetails } from "../components/CarItem";
import { FlatItemDetails } from "../components/FlatItem";



export const CarlySearchScreen = () => {

    const data: Array<CarItemDetails> = [{
        brand: "Audi",
        model: "A6",
        engine: "140 HP",
        id: 11,
        location: "Warsaw",
        price: 120,
        year: 2016
    },
    {
        brand: "Audi",
        model: "A8",
        engine: "140 HP",
        id: 12,
        location: "Warsaw",
        price: 120,
        year: 2016
    }];


    const renderItem = ({ item }: { item: CarItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <CarItem details={item}></CarItem>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={() => { }}
                refreshing={false}
                style={{ alignSelf: "stretch" }}
            />
        </View>
    )
}