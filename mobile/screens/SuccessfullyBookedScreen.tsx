import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FlatDetails } from "../components/FlatDetails";
import { FlatItemDetails } from "../components/FlatItem";
import { ParkingItem, ParkingItemDetails } from "../components/ParkingItem";

export const SuccessfullyBookedScreen = (params:{onClick: () =>void}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ACFFAB"}}>
      <TouchableOpacity onPress={() => { params.onClick()}} >
        <Icon name="check-circle" color="#FFFFFF" size={300} ></Icon>
        <Text style={{fontSize:50, color:"#FFFFFF", textAlign:"center"}}>Booked Successfully!</Text>
      </TouchableOpacity>
    </View>
  );
};
