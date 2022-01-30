import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CarDetails } from "../components/CarDetails";
import { CarItemDetails } from "../components/CarItem";
import { FlatDetails } from "../components/FlatDetails";
import { FlatItemDetails } from "../components/FlatItem";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";

export const CarlyDetailsScreen = (params : {data :CarItemDetails}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CarDetails details={params.data} />
    </View>
  );
};
