import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BookingService } from "../app/services/BookingsService";
import { FlatDetails } from "../components/FlatDetails";
import { FlatItemDetails } from "../components/FlatItem";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";

export const FlatlyDetailsScreen = (params : {data :FlatItemDetails, onChange: () => void}) => {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatDetails details={params.data} onChange={params.onChange} service={new BookingService()}/>
    </View>
  );
};
