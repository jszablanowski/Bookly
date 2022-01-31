import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { Divider, Icon, Text } from "react-native-elements"
import { IItemsService } from "../../app/services/ItemsService";
import { ParkingItem, ParkingItemDetails } from "../../components/ParkingItem";
import { useAuth } from "../../hooks/Auth";
import { ParklyDetailsScreen } from "../ParklyDetailsScreen";
import { SuccessfullyBookedScreen } from "../SuccessfullyBookedScreen";

interface ParklyScreenProps {
    itemsService: IItemsService;
}

type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: ParkingItemDetails;
    SuccessfullScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ParklyScreen = (props: ParklyScreenProps) => {

    const renderItem = ({ item }: { item: ParkingItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <ParkingItem details={item}></ParkingItem>
        </TouchableOpacity>
    );

    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState<number | undefined>(undefined);


    const fetchData = () => {
        setLoading(true);
        props.itemsService.getParkingItems(token, 1, 100, true)
            .then(response => {
                let parkingItemsDetails = response.items?.map(i => ({
                    city: i.city,
                    street: i.street,
                    streetTag: i.streetTag,
                    parkingName: i.parkingName,
                    pricePerHour: i.pricePerHour,
                    spotNumber: i.spotNumber,
                    imageLink: i.imageLink,
                    id: i.id ?? ""
                }));
                setParkingItems(parkingItemsDetails);
                if (response.totalItems) {
                    setItemsCount(response.totalItems);
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


    const DetailsScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>) => (
        <ParklyDetailsScreen data={route.params ?? { id: "-1" }} onChange={() => { navigation.navigate("SuccessfullScreen"); }}></ParklyDetailsScreen>
    )

    const SuccessfullScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'SuccessfullScreen'>) => (
        <SuccessfullyBookedScreen onClick={() => { navigation.navigate("MainScreen"); }}></SuccessfullyBookedScreen>
    )

    const onRefresh = () => {
        setLoading(true);
    };

    const itemsCountHeader = () => {
        return (
            <View>
                {itemsCount != undefined && <Text style={{ marginLeft: 10 }}>
                    Found {itemsCount} {itemsCount > 1 ? "results" : "result"}
                </Text>}
                <Divider orientation="vertical"></Divider>
            </View>
        );
    };
    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => {

        const renderItem = ({ item }: { item: ParkingItemDetails }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <ParkingItem details={item}></ParkingItem>
            </TouchableOpacity>
        );

        return (
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <FlatList
                    data={parkingItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => onRefresh()}
                    refreshing={loading}
                    style={{ alignSelf: "stretch" }}
                // ListHeaderComponent={itemsCountHeader}
                />
            </View>
        )
    }

    return (
        <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ contentStyle: { backgroundColor: "#fff" } }} >
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: "" }} />
            <Stack.Screen name="SuccessfullScreen" component={SuccessfullScreen} options={{ headerTitle: "" }} />

        </Stack.Navigator>
    )
}