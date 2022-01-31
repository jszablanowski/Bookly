import React from "react"
import { TouchableOpacity, View } from "react-native"
import { BookingService } from "../app/services/BookingsService";
import { ParkingDetails } from "../components/ParkingDetails";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";



export const ParklyDetailsScreen = (params: {
    data: ParkingItemDetails, onChange: () => void, bookingId?: string,
    cancelMode?: boolean, active?: boolean
}) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ParkingDetails
                details={params.data} onChange={params.onChange} service={new BookingService()} bookingId={params.bookingId}
                cancelMode={params.cancelMode} active={params.active}
            />
        </View>
    )
}