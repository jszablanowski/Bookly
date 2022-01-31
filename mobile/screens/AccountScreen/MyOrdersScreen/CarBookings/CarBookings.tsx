import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { CarlyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { CarItemDetails } from "../../../../components/CarItem";
import { useAuth } from "../../../../hooks/Auth";
import { CarlyDetailsScreen } from "../../../CarlyDetailsScreen";
import { CarBookingItem } from "./CarBookingItem";


interface CarBookingsProps {
    bookingService: BookingService;
    active: boolean;
}

type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: CarlyBooking;
    SuccessfullScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export const CarBookings = (props: CarBookingsProps) => {

    const [carItems, setCarItems] = useState<Array<CarlyBooking>>();
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    const fetchData = () => {
        props.bookingService.getUserCarBookings(token, 1, 10, "asc", props.active ? "active" : "inactive")
            .then(response => {
                setCarItems(response.items);
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
        <CarlyDetailsScreen data={{ ...route.params.item, id: route.params.item?.id ?? "" }} onChange={() => { navigation.navigate("SuccessfullScreen"); }}
            bookingId={route.params.bookingId?.toString() ?? ""} cancelMode={true} active={props.active}></CarlyDetailsScreen>
    )


    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => {

        const renderItem = ({ item }: { item: CarlyBooking }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <CarBookingItem booking={item}></CarBookingItem>
            </TouchableOpacity >
        );



        return (
            <View>
                <FlatList
                    data={carItems}
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