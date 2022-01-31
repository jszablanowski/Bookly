import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Text } from "react-native-elements"
import { BookingService, IBookingsService } from "../app/services/BookingsService";
import { useAuth } from "../hooks/Auth";
import { ParkingItemDetails } from "./ParkingItem";

export const ParkingDetails = (props: {
    details: ParkingItemDetails,
    bookingId?: string,
    onChange: () => void,
    service: IBookingsService,
    cancelMode?: boolean;
    active?: boolean
}) => {

    const { token } = useAuth();

    const bookItem = () => {
        props.service.bookItem(token, Number(props.details.id) || 0, "PARKING").then(() => { props.onChange() });
    }

    const cancelBooking = () => {
        props.service.cancelBooking(token, Number(props.bookingId) ?? 0).then(() => { props.onChange() })
            .catch(error => console.log(JSON.stringify(error)));
    }

    let button: ReactNode;
    if (props.active === true || props.active == undefined) {
        if (props.cancelMode === true) {
            button = <Button title="Cancel booking" onPress={() => { cancelBooking() }}></Button>
        }
        else {
            button = <View></View>
        }
    }
    else {
        button = <Button title="Book" onPress={() => { bookItem() }}></Button>
    }

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View>
                    <Image source={{ uri: props.details.imageLink }} style={{ width: 160, height: 120 }}></Image>
                </View>
                <View style={{ margin: 10, alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 35, textAlign: "center" }}>{props.details.parkingName}</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} size={30} />
                <Text style={{ fontSize: 20, textAlign: "center" }}>{props.details.street} {props.details.streetTag}, {props.details.city}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 15 }}>
                <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "700" }}>Available spots: </Text>
                <Text style={{ fontSize: 45, textAlign: "center", fontWeight: "300", alignSelf: "flex-end" }}>{props.details.spotNumber} </Text>
            </View>

            <View style={{ marginTop: "auto" }}>
                {button}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignSelf: "stretch",
        height: "100%",

    }
});