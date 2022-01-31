import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { FlatlyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { useAuth } from "../../../../hooks/Auth";
import { FlatBookingItem } from "./FlatBookingItem";

interface CarBookingsProps {
    bookingService: BookingService;
    active: boolean;
}

export const FlatBookings = (props: CarBookingsProps) => {
    const [flatItems, setFlatItems] = useState<Array<FlatlyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserFlatBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setFlatItems(response.items);
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

    const renderItem = ({ item }: { item: FlatlyBooking }) => (
        <TouchableOpacity onPress={() => { }} >
            <FlatBookingItem booking={item}></FlatBookingItem>
        </TouchableOpacity >
    );

    const onRefresh = () => {
        setLoading(true);
    };


    return (
        <View>
            <FlatList
                data={flatItems}
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