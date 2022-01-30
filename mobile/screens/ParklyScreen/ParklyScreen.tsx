import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { Divider, Icon, Text } from "react-native-elements"
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
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState<number>(0);


    const fetchData = () => {
        setLoading(true);
        props.itemsService.getParkingItems(token, 1, 100, true)
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
                if (response.totalPages && response.items) {
                    setItemsCount(response.totalPages * response.items.length);
                } else {
                    setItemsCount(0);
                }
            }).catch(error => console.log(error)).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [parkingItems, setParkingItems] = useState<Array<ParkingItemDetails> | undefined>(undefined);

    const onRefresh = () => {
        setLoading(true);
    };

    const itemsCountHeader = () => {
        return (
            <View>
                <Text style={{ marginLeft: 10 }}>
                    Found {itemsCount} {itemsCount > 1 ? "results" : "result"}
                </Text>
                <Divider orientation="vertical"></Divider>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <FlatList
                data={parkingItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.parkingName + item.street + item.city + item.spotNumber}
                onRefresh={() => onRefresh()}
                refreshing={loading}
                style={{ alignSelf: "stretch" }}
                ListHeaderComponent={itemsCountHeader}
            />
        </View>
    )
}