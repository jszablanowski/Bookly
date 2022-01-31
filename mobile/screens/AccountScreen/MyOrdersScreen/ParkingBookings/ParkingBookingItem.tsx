import React from "react"
import { View } from "react-native"
import { Icon, Image, Text } from "react-native-elements"
import { ParkingItem, ParklyBooking } from "../../../../app/api"

export const ParkingBookingItem = (props: { booking: ParklyBooking }) => {

    return (
        <View style={{
            margin: 8,
            padding: 10,
            alignSelf: "stretch",
            borderColor: "#000",
            borderWidth: 1
        }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.booking.item?.parkingName}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.booking.item?.street} {props.booking.item?.streetTag}, {props.booking.item?.city}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View>
                    <Image source={{ uri: props.booking.item?.imageLink }} style={{ width: 64, height: 48 }}></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>{props.booking.item?.spotNumber} spots available</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text>Price: {props.booking.item?.pricePerHour} PLN/hour</Text>
                    <Text style={{ marginTop: 10 }}>Start date: {props.booking.startDate && (new Date(props.booking.startDate)).toISOString().substring(0, 10)}</Text>
                </View>
            </View>
        </View>
    )
}