import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Image, Text } from "react-native-elements"

export interface ParkingItemDetails {
    parkingName?: string;
    spotNumber?: number;
    city?: string;
    street?: string;
    streetTag?: string;
    pricePerHour?: number;
    imageLink?: string;
    id: string;
}

export const ParkingItem = (props: { details: ParkingItemDetails }) => {


    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.details.parkingName}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.details.street} {props.details.streetTag}, {props.details.city}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View>
                    <Image source={{ uri: props.details.imageLink }} style={{ width: 64, height: 48 }}></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>{props.details.spotNumber} spots available</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text>Price: {props.details.pricePerHour} PLN/hour</Text>
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