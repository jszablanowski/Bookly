import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { FlatlyBooking, ParklyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { ParkingItemDetails } from "../../../../components/ParkingItem";
import { useAuth } from "../../../../hooks/Auth";
import { ParklyDetailsScreen } from "../../../ParklyDetailsScreen";
import { ParkingBookingItem } from "./ParkingBookingItem";

interface ParkingBookingsProps {
    bookingService: BookingService;
    active: boolean;
}


type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: ParklyBooking;
    SuccessfullScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ParkingBookings = (props: ParkingBookingsProps) => {


    const [parkingItems, setParkingItems] = useState<Array<ParklyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserParkingBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setParkingItems(response.items);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setLoading(true);
    };

    const DetailsScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>) => (
        <ParklyDetailsScreen data={{ ...route.params.item, id: route.params.item?.id ?? "" }} onChange={() => { navigation.navigate("SuccessfullScreen"); }}
            bookingId={route.params.bookingId?.toString() ?? ""} cancelMode={true} active={props.active}></ParklyDetailsScreen>
    )


    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => {

        const renderItem = ({ item }: { item: FlatlyBooking }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <ParkingBookingItem booking={item}></ParkingBookingItem>
            </TouchableOpacity >
        );


        return (
            <View>
                <FlatList
                    data={parkingItems}
                    renderItem={renderItem}
                    keyExtractor={(b) => b.bookingId?.toString() ?? ""}
                    refreshing={loading}
                    onRefresh={() => onRefresh()}
                    style={{ alignSelf: "stretch", marginBottom: 60 }}
                // ListHeaderComponent={itemsCountHeader}
                />
            </View>
        )
    }


    return (

        <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ contentStyle: { backgroundColor: "#fff" } }} >
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: "" }} />
            {/* <Stack.Screen name="SuccessfullScreen" component={SuccessfullScreen} options={{ headerTitle: "" }} /> */}
        </Stack.Navigator>
    )
}