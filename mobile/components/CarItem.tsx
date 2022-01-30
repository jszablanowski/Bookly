import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Image, Text } from "react-native-elements"


export interface CarItemDetails {
    price?: number;
    brand?: string;
    model?: string;
    location?: string;
    engine?: string;
    year?: number;
    id: string;
}

export const CarItem = (props: { details: CarItemDetails }) => {



    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.details.brand}</Text>
                <Text style={{ fontWeight: "600", fontSize: 18, marginLeft: 10 }}>{props.details.model}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.details.location}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View >
                    <Text>Year: {props.details.year}</Text>
                    <Text>Engine: {props.details.engine}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text>Price: {props.details.price} PLN/day</Text>
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