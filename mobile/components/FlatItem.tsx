import React from "react"
import { StyleSheet, View } from "react-native"
import { Icon, Image, Text } from "react-native-elements"
import Ionicons from 'react-native-vector-icons/Ionicons';



interface Address {
    id?: number;
    street?: string;
    houseNumber?: string;
    localNumber?: string;
    postalCode?: string;
    city?: string;
}

export interface Facility {
    id?: number;
    name?: string;
}

interface Image {
    id?: number;
    path?: string;
}

export interface FlatItemDetails {
    id: string;
    name?: string;
    rooms?: number;
    numberOfGuests?: number;
    area?: number;
    description?: string;
    address?: Address;
    facilities?: Array<Facility>;
    images?: Array<Image>
}

export const FlatItem = (props: { details: FlatItemDetails }) => {



    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.details.name}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.details.address?.street} {props.details.address?.city}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                {/* <Image source={{ uri: props.details.images[0].path }}></Image> */}
                <View >
                    <Text>{props.details.rooms} rooms</Text>
                    <Text>{props.details.numberOfGuests} guests</Text>
                </View>
                <View style={{ marginLeft: 18 }}>
                    <Text>{props.details.area} ㎡</Text>
                </View>
                <View style={{ marginLeft: 40, flex: 1 }}>
                    <View>
                        {props.details.facilities?.map(f => <Text key={f.id}>- {f.name}</Text>)}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        padding: 10,
        alignSelf: "stretch",
        borderColor: "#000",
        borderWidth: 1
    }
});