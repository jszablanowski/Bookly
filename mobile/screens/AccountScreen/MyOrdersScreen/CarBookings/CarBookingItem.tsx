import React from "react"
import { View } from "react-native"
import { Icon, Text } from "react-native-elements"
import { CarItem, CarlyBooking } from "../../../../app/api";


export const CarBookingItem = (props: { booking: CarlyBooking }) => {


    return (
        <View style={{
            margin: 8,
            padding: 10,
            alignSelf: "stretch",
            borderColor: "#000",
            borderWidth: 1
        }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.booking.item?.brand}</Text>
                <Text style={{ fontWeight: "600", fontSize: 18, marginLeft: 10 }}>{props.booking.item?.model}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.booking.item?.location}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View >
                    <Text>Year: {props.booking.item?.year}</Text>
                    <Text>Engine: {props.booking.item?.engine}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text>Price: {props.booking.item?.price} PLN/day</Text>
                    <Text style={{ marginTop: 10 }}>Start date: {props.booking.startDate && (new Date(props.booking.startDate)).toISOString().substring(0, 10)}</Text>
                </View>
            </View>
        </View>
    )
}