import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { Icon, Text } from "react-native-elements"
import { IItemsService } from "../../app/services/ItemsService";
import { ParkingItem, ParkingItemDetails } from "../../components/ParkingItem";
import { useAuth } from "../../hooks/Auth";

interface ParklyScreenProps {
    itemsService: IItemsService;
}

export const ParklyScreen = (props: ParklyScreenProps) => {

    const renderItem = ({ item }: { item: ParkingItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <ParkingItem details={item}></ParkingItem>
        </TouchableOpacity>
    );

    const { token } = useAuth();

    useEffect(() => {
        props.itemsService.getParkingItems(token, 1, 100)
            .then(response => {
                let parkingItemsDetails = response.items?.map(i => ({
                    city: i.city,
                    street: i.street,
                    streetTag: i.streetTag,
                    parkingName: i.parkingName ?? "",
                    pricePerHour: i.pricePerHour,
                    spotNumber: i.spotNumber,
                    imageLink: i.imageLink
                }));
                setParkingItems(parkingItemsDetails);
            });

    }, []);

    const [parkingItems, setParkingItems] = useState<Array<ParkingItemDetails> | undefined>(undefined);


    const data: Array<ParkingItemDetails> = [
        {
            city: "Warsaw",
            street: "Marszalkowska",
            streetTag: "18",
            parkingName: "Super parking",
            pricePerHour: 10,
            spotNumber: 200,
            imageLink: "https://st.depositphotos.com/2575095/3015/i/950/depositphotos_30156457-stock-photo-vegetation-parking-spot.jpg"
        },
        {
            city: "Warsaw",
            street: "Marszalkowska",
            streetTag: "18",
            parkingName: "Super parking2",
            pricePerHour: 10,
            spotNumber: 200,
            imageLink: "https://st.depositphotos.com/2575095/3015/i/950/depositphotos_30156457-stock-photo-vegetation-parking-spot.jpg"
        }
    ]

    return (
        parkingItems === undefined ? <ActivityIndicator size="large" color="#0090f0" style={{ marginTop: 100 }} /> :
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <FlatList
                    data={parkingItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.parkingName + item.street + item.city + item.spotNumber}
                    onRefresh={() => { }}
                    refreshing={false}
                    style={{ alignSelf: "stretch" }}
                />
            </View>
    )
}