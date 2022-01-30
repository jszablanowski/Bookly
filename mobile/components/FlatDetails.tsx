import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Icon, Image, Text } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Facility, FlatItemDetails } from "./FlatItem";

export const FlatDetails = (props: { details: FlatItemDetails }) => {

    const renderItem = ({ item }: { item: Facility }) => (
        <View>
             <FacilityItem name={item}></FacilityItem>
        </View>
);

    return (
        <KeyboardAwareScrollView>
        <View >
            <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 4, marginVertical: 4 }}>
                    <View>
                    {
                        (props.details.images) ?
                            <Image source={{ uri:(props.details.images!.pop()?.path) }} style={{ width: 160, height: 120 }}></Image>
                            : ""
                    }
                    </View>
                <View style={{ margin: 10,  alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "700", fontSize: 35, textAlign: "center" }}>{props.details.name}</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center",marginVertical: 5}}>
                <Icon type="Entypo" name="location-pin" color="black" tvParallaxProperties={undefined} size={30} />
                <Text style={{ fontSize: 20,  textAlign: "center"}}>
                    {(props.details.address) ? 
                        (props.details.address.street + " " +props.details.address.houseNumber+ " " + props.details.address.city) : "Unknown" } 
                 </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 15, marginBottom: 5}}>
                <Text style={{ fontSize: 20,  textAlign: "center", fontWeight: "700"}}>Facilities: </Text>
            </View>
                <FlatList horizontal = {true}
                data={props.details.facilities}
                renderItem={renderItem}
                onRefresh={() => { }}
                refreshing={false}
                style={{ alignSelf: "stretch" }}
                />
            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 5}}>
                <Text style={{ fontSize: 20,  textAlign: "center", fontWeight: "700"}}>Description: </Text>
                <Text style={{ fontSize: 20,  textAlign: "center", marginLeft: 10 }}>{props.details.description} </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginVertical: 15}}>
                <Text style={{ fontSize: 20,  textAlign: "center", fontWeight: "700"}}>Expected guests: </Text>
                <Text style={{ fontSize: 35,  textAlign: "center", fontWeight: "300", alignSelf:"flex-end"}}>{props.details.numberOfGuests} </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row",marginTop: "auto",  marginVertical: 15}}>
                    <Text style={{ fontWeight: "400", fontSize: 50,textAlign: "center", marginLeft:"auto", marginRight:5}}>234 zl</Text>
            </View>
            <View style={{ margin: 4}}>
                    <Button title="Book" onPress={() => {}}></Button>
                </View>
        </View>
        </KeyboardAwareScrollView>
    )
}

export const FacilityItem = (props: {name :Facility} ) => {
    return (
        <View>
            <Text style={{ fontWeight: "600", fontSize: 18, marginLeft: 10 }}>- {props.name.name}</Text>
        </View>
    )
}
