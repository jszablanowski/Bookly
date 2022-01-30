import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatDetails } from "../components/FlatDetails";
import { FlatItemDetails } from "../components/FlatItem";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";

export const FlatlyDetailsScreen = (params : {data :FlatItemDetails}) => {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatDetails details={params.data} />
    </View>
  );
};
