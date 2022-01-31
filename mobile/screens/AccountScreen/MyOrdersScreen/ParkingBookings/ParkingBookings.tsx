import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { FlatlyBooking, ParklyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { useAuth } from "../../../../hooks/Auth";
import { ParkingBookingItem } from "./ParkingBookingItem";

interface ParkingBookingsProps {
    bookingService: BookingService;
    active: boolean;
}
export const ParkingBookings = (props: ParkingBookingsProps) => {


    const [parkingItems, setParkingItems] = useState<Array<ParklyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserParkingBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setParkingItems(response.items);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: ParklyBooking }) => (
        <TouchableOpacity onPress={() => { }} >
            <ParkingBookingItem booking={item}></ParkingBookingItem>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        setLoading(true);
    };

    return (
        <View>
            <FlatList
                data={parkingItems}
                renderItem={renderItem}
                keyExtractor={(b) => b.bookingId?.toString() ?? ""}
                refreshing={loading}
                onRefresh={() => onRefresh()}
                style={{ alignSelf: "stretch", marginBottom: 60 }}
            // ListHeaderComponent={itemsCountHeader}
            />
        </View>
    )
}