import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BookingService } from "../app/services/BookingsService";
import { IItemsService } from "../app/services/ItemsService";
import { CarDetails } from "../components/CarDetails";
import { CarItemDetails } from "../components/CarItem";
import { FlatDetails } from "../components/FlatDetails";
import { FlatItemDetails } from "../components/FlatItem";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";

export const CarlyDetailsScreen = (params: {
  data: CarItemDetails, onChange: () => void, bookingId?: string,
  cancelMode?: boolean, active?: boolean
}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CarDetails details={params.data} onChange={params.onChange} service={new BookingService()} bookingId={params.bookingId}
        cancelMode={params.cancelMode} active={params.active} />
    </View>
  );
};
