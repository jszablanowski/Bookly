import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Text } from "react-native-elements"
import { BookingService, IBookingsService } from "../app/services/BookingsService";
import { useAuth } from "../hooks/Auth";
import { ParkingItemDetails } from "./ParkingItem";

export const ParkingDetails = (props: { details: ParkingItemDetails, onChange: () =>void,  service: IBookingsService }) => {
    
    const { token } = useAuth();

    const bookItem = () =>{
        console.log(token + " " + +props.details.parkingName );
        props.service.bookItem(token, +props.details.parkingName, "PARKING").then(() => {props.onChange()});
    }

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                <View>
                    <Image source={{ uri: props.details.imageLink }} style={{ width: 160, height: 120 }}></Image>
                </View>
                <View style={{ margin: 10,  alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 35, textAlign: "center" }}>{props.details.parkingName}</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center",marginVertical: 5}}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} size={30} />
                <Text style={{ fontSize: 20,  textAlign: "center"}}>{props.details.street} {props.details.streetTag}, {props.details.city}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 15}}>
                <Text style={{ fontSize: 25,  textAlign: "center", fontWeight: "700"}}>Available spots: </Text>
                <Text style={{ fontSize: 45,  textAlign: "center", fontWeight: "300", alignSelf:"flex-end"}}>{props.details.spotNumber} </Text>
            </View>

            <View style={{ marginTop: "auto"}}>
                    <Button title="Book" onPress={() => {bookItem()}}></Button>
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