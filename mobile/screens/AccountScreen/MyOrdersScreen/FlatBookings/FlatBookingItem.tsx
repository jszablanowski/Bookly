import React from "react"
import { View } from "react-native"
import { Icon, Text } from "react-native-elements"
import { FlatItem, FlatlyBooking } from "../../../../app/api"

export const FlatBookingItem = (props: { booking: FlatlyBooking }) => {


    return (
        <View style={{
            margin: 8,
            padding: 10,
            alignSelf: "stretch",
            borderColor: "#000",
            borderWidth: 1
        }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>{props.booking.item?.name}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon type="antdesign" name="right" color="black" tvParallaxProperties={undefined} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} />
                <Text>{props.booking.item?.address?.streetName} {props.booking.item?.address?.city}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                {/* <Image source={{ uri: props.details.images[0].path }}></Image> */}
                <View >
                    <Text>{props.booking.item?.rooms} rooms</Text>
                    <Text>{props.booking.item?.numberOfGuests} guests</Text>
                </View>
                <View style={{ marginLeft: 18 }}>
                    <Text>{props.booking.item?.area} ㎡</Text>
                </View>
                <View style={{ marginLeft: 40, flex: 1 }}>
                    <View>
                        {props.booking.item?.facilities?.map(f => <Text key={f.id}>- {f.name}</Text>)}
                    </View>
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text>Start date: {props.booking.startDate && (new Date(props.booking.startDate)).toISOString().substring(0, 10)}</Text>
                </View>
            </View>
        </View>
    )
}