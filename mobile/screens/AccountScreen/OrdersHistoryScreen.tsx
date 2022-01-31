import React, { ReactNode, useState } from "react"
import { View } from "react-native"
import { ButtonGroup, Text } from "react-native-elements"
import { BookingService } from "../../app/services/BookingsService";
import { CarBookings } from "./MyOrdersScreen/CarBookings/CarBookings";
import { FlatBookings } from "./MyOrdersScreen/FlatBookings/FlatBookings";
import { ParkingBookings } from "./MyOrdersScreen/ParkingBookings/ParkingBookings";

export const OrdersHistoryScreen = () => {


    const [index, setIndex] = useState(0);
    const buttons = ['Flats', 'Cars', 'Parkings']


    let list: ReactNode;

    if (index == 0) {
        list = <FlatBookings bookingService={new BookingService()} active={false} ></FlatBookings>
    }
    else if (index == 1) {
        list = <CarBookings bookingService={new BookingService()} active={false}></CarBookings>
    }
    else if (index == 2) {
        list = <ParkingBookings bookingService={new BookingService()} active={false}></ParkingBookings>
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 24, textAlign: "center", marginVertical: 10 }}>Orders history</Text>
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