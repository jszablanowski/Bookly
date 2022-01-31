import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { CarlyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { useAuth } from "../../../../hooks/Auth";
import { CarBookingItem } from "./CarBookingItem";


interface CarBookingsProps {
    bookingService: BookingService;
    active: boolean;
}

export const CarBookings = (props: CarBookingsProps) => {

    const [carItems, setCarItems] = useState<Array<CarlyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserCarBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setCarItems(response.items);
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

    const renderItem = ({ item }: { item: CarlyBooking }) => (
        <TouchableOpacity onPress={() => { }} >
            <CarBookingItem booking={item}></CarBookingItem>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        setLoading(true);
    };

    return (
        <View>
            <FlatList
                data={carItems}
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