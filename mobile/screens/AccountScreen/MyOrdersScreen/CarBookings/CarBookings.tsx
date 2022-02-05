import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements";
import { CarlyBooking } from "../../../../app/api";
import { BookingService } from "../../../../app/services/BookingsService";
import { CarItemDetails } from "../../../../components/CarItem";
import { useAuth } from "../../../../hooks/Auth";
import { CarlyDetailsScreen } from "../../../CarlyDetailsScreen";
import { SuccessfullyCancelledScreen } from "../../../SuccessfullyCanceledScreen";
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
        fetchData();
    };


    const DetailsScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>) => (
        <CarlyDetailsScreen data={{ ...route.params.item, id: route.params.item?.id ?? "" }} onChange={() => { navigation.navigate("SuccessfullScreen"); }}
            bookingId={route.params.bookingId?.toString() ?? ""} cancelMode={true} active={props.active}></CarlyDetailsScreen>
    )

    const SuccessfullScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'SuccessfullScreen'>) => (
        <SuccessfullyCancelledScreen onClick={() => { navigation.navigate("MainScreen"); fetchData(); }}></SuccessfullyCancelledScreen>
    )


    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => {

        const renderItem = ({ item }: { item: CarlyBooking }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <CarBookingItem booking={item}></CarBookingItem>
            </TouchableOpacity >
        );



        return (
            <View>
                {(carItems === undefined || carItems.length === 0) && loading == false ?
                    <Text style={{ marginLeft: 10 }}>No results</Text> :
                    <FlatList
                        data={carItems}
                        renderItem={renderItem}
                        keyExtractor={(b) => b.bookingId?.toString() ?? ""}
                        refreshing={loading}
                        onRefresh={() => onRefresh()}

                        style={{ alignSelf: "stretch", marginBottom: 60 }}
                    // ListHeaderComponent={itemsCountHeader}
                    />
                }
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