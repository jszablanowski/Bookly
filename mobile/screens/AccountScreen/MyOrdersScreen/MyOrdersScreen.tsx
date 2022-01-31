import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { ReactElement, ReactNode, useState } from "react"
import { View } from "react-native"
import { CarBookings } from "./CarBookings/CarBookings";
import { FlatBookings } from "./FlatBookings/FlatBookings";
import { ParkingBookings } from "./ParkingBookings/ParkingBookings";
import { Tab, Text, TabView, ButtonGroup } from 'react-native-elements';
import { BookingService } from "../../../app/services/BookingsService";


export const MyOrdersScreen = () => {



    const [index, setIndex] = useState(0);
    const buttons = ['Flats', 'Cars', 'Parkings']


    let list: ReactNode;

    if (index == 0) {
        list = <FlatBookings bookingService={new BookingService()} active={true}></FlatBookings>
    }
    else if (index == 1) {
        list = <CarBookings bookingService={new BookingService()} active={true}></CarBookings>
    }
    else if (index == 2) {
        list = <ParkingBookings bookingService={new BookingService()} active={true}></ParkingBookings>
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 24, textAlign: "center", marginVertical: 10 }}>My Orders</Text>
            <ButtonGroup
                onPress={setIndex}
                selectedIndex={index}
                buttons={buttons}
                containerStyle={{ height: 50 }}
                textStyle={{ fontSize: 16 }}
            />
            {list}
        </View>
    )
}