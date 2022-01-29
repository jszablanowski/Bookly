import React from "react"
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native"
import { FlatItem, FlatItemDetails } from "../components/FlatItem";



export const FlatlySearchScreen = () => {

    const data: Array<FlatItemDetails> = [{
        address: {
            city: "city",
            houseNumber: "12",
            id: 1,
            localNumber: "11",
            postalCode: "33",
            street: "street"
        },
        area: 120,
        description: "description",
        facilities: [{
            id: 1,
            name: "Gym"
        },
        {
            id: 2,
            name: "Shop mall"
        }],
        id: 11,
        images: [{
            id: 20,
            path: "https://backend.flatly.online/api/v1/flatsStock/inside2.jpg"
        }],
        name: "flat",
        numberOfGuests: 12,
        rooms: "3"
    },
    {
        address: {
            city: "city",
            houseNumber: "12",
            id: 1,
            localNumber: "11",
            postalCode: "33",
            street: "street"
        },
        area: 120,
        description: "description",
        facilities: [{
            id: 1,
            name: "Cinema"
        }],
        id: 13,
        images: [{
            id: 20,
            path: "https://backend.flatly.online/api/v1/flatsStock/inside2.jpg"
        }],
        name: "flat2",
        numberOfGuests: 12,
        rooms: "3"
    }];


    const renderItem = ({ item }: { item: FlatItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <FlatItem details={item}></FlatItem>
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