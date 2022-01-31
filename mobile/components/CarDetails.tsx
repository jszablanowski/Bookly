import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Text } from "react-native-elements"
import { BookingService, IBookingsService } from "../app/services/BookingsService";
import { IItemsService } from "../app/services/ItemsService";
import { useAuth } from "../hooks/Auth";
import { CarItemDetails } from "./CarItem";

export const CarDetails = (props: {
    details: CarItemDetails, onChange: () => void, service: IBookingsService, bookingId?: string,
    cancelMode?: boolean, active?: boolean
}) => {

    const { token } = useAuth();


    const bookItem = () => {
        console.log(token + " " + +props.details.id);
        props.service.bookItem(token, +props.details.id, "CAR").then(() => { props.onChange() });
    }

    const cancelBooking = () => {
        props.service.cancelBooking(token, Number(props.bookingId) ?? 0).then(() => { props.onChange() });
    }

    let button: ReactNode;
    console.log(props.active)
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
                <View style={{ margin: 10, alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 35, textAlign: "center" }}>{props.details.brand} {props.details.model}</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} size={30} />
                <Text style={{ fontSize: 20, textAlign: "center" }}>{props.details.location}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 5 }}>
                <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "700" }}>Engine: </Text>
                <Text style={{ fontSize: 20, textAlign: "center", marginLeft: 10 }}>{props.details.engine} </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 5 }}>
                <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "700" }}>Production date: </Text>
                <Text style={{ fontSize: 20, textAlign: "center", marginLeft: 10 }}>{props.details.year} </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginTop: "auto", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "400", fontSize: 50, textAlign: "center", marginLeft: "auto", marginRight: 5 }}>{props.details.price}zł/day</Text>
            </View>
            <View style={{ marginHorizontal: 4 }}>
                {/* <Button title="Book" onPress={() => { bookItem() }}></Button> */}
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