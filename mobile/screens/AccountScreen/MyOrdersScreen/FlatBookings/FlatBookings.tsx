import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { FlatlyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { FlatItemDetails } from "../../../../components/FlatItem";
import { useAuth } from "../../../../hooks/Auth";
import { FlatlyDetailsScreen } from "../../../FlatlyDetailsScreen";
import { FlatBookingItem } from "./FlatBookingItem";

interface CarBookingsProps {
    bookingService: BookingService;
    active: boolean;
}


type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: FlatlyBooking;
    SuccessfullScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export const FlatBookings = (props: CarBookingsProps) => {
    const [flatItems, setFlatItems] = useState<Array<FlatlyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserFlatBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setFlatItems(response.items);
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
        <FlatlyDetailsScreen data={{ ...route.params.item, id: route.params.item?.id ?? "" }} onChange={() => { navigation.navigate("SuccessfullScreen"); }}
            bookingId={route.params.bookingId?.toString() ?? ""} cancelMode={true} active={props.active}></FlatlyDetailsScreen>
    )


    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => {

        const renderItem = ({ item }: { item: FlatlyBooking }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <FlatBookingItem booking={item}></FlatBookingItem>
            </TouchableOpacity >
        );

        return (
            <View>
                <FlatList
                    data={flatItems}
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