import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ListRenderItem, TouchableOpacity, View } from "react-native"
import { Button, Divider, Input, Text } from "react-native-elements";
import { FlatItem, FlatItemDetails } from "../../components/FlatItem";
import { FlatlyFilters, FlatlyFilterScreen } from "./FlatlyFilterScreen";
import { HeaderBookly } from "../../components/HeaderBookly";
import { FlatlySortScreen } from "./FlatlySortScreen";
import { useAuth } from "../../hooks/Auth";
import { IItemsService } from "../../app/services/ItemsService";
import { FlatlyDetailsScreen } from "../FlatlyDetailsScreen";
import { SuccessfullyBookedScreen } from "../SuccessfullyBookedScreen";
import { BookingService } from "../../app/services/BookingsService";



type RootStackParamList = {
    FilterScreen: undefined;
    SortScreen: undefined;
    MainScreen: undefined;
    DetailsScreen: FlatItemDetails;
    SuccessfullScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface FlatlyScreenProps {
    itemsService: IItemsService;
}

export const FlatlyScreen = (props: FlatlyScreenProps) => {

    const { token } = useAuth();
    const [flatlyFilters, setFlatlyFilters] = useState<FlatlyFilters>({ city: "", street: "", text: "" });
    const [flatlySort, setFlatlySort] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetchData();
    }, [flatlyFilters, flatlySort]);


    const fetchData = () => {
        setLoading(true);
        props.itemsService.getFlatItems(token, 1, flatlyFilters.city, flatlySort, flatlyFilters.street, flatlyFilters.text)
            .then(response => {
                let flatItemsDetails = response.items?.map(i => ({
                    address: i.address,
                    area: i.area,
                    description: i.description,
                    facilities: i.facilities,
                    id: i.id ?? "",
                    images: i.images,
                    name: i.name,
                    numberOfGuests: i.numberOfGuests,
                    rooms: i.rooms
                }));
                setFlatItems(flatItemsDetails);
                if (response.totalItems) {
                    setItemsCount(response.totalItems);
                }
                else {
                    setItemsCount(0);
                }
            }).finally(() => {
                setLoading(false);
            });
    }


    const [flatItems, setFlatItems] = useState<Array<FlatItemDetails> | undefined>(undefined);

    const onRefresh = () => {
        setLoading(true);
        setFlatlyFilters({ city: "", street: "", text: "" });
        setFlatlySort(false);
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

        const renderItem = ({ item }: { item: FlatItemDetails }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", item) }} >
                <FlatItem details={item}></FlatItem>
            </TouchableOpacity>
        );

        return (
            <View>
                <View style={{ alignSelf: "stretch" }}>
                    <View style={{ display: "flex", flexDirection: "row", margin: 6 }}>
                        <View style={{ flex: 1, marginHorizontal: 4 }}>
                            <Button title="Filter" type="outline" onPress={() => { navigation.navigate("FilterScreen") }} ></Button>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 4 }}>
                            <Button title="Sort" type="outline" onPress={() => { navigation.navigate("SortScreen") }}></Button>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={flatItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ alignSelf: "stretch", marginBottom: 60 }}
                    onRefresh={() => onRefresh()}
                    refreshing={loading}
                // ListHeaderComponent={itemsCountHeader}
                />
            </View>
        )
    }


    const DetailsScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>) => (
        <FlatlyDetailsScreen data={route.params ?? { id: " " }} onChange={() => { navigation.navigate("SuccessfullScreen"); }} ></FlatlyDetailsScreen>
    )

    const SuccessfullScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'SuccessfullScreen'>) => (
        <SuccessfullyBookedScreen onClick={() => { navigation.navigate("MainScreen"); }}></SuccessfullyBookedScreen>
    )

    const FilterScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterScreen'>) => (
        <FlatlyFilterScreen onChange={val => {
            setFlatlyFilters(val);
            navigation.navigate("MainScreen");
        }} filters={flatlyFilters}></FlatlyFilterScreen>
    )


    const SortScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'SortScreen'>) => (
        <FlatlySortScreen sorted={flatlySort} onChange={(val) => {
            setFlatlySort(val);
            navigation.navigate("MainScreen");
        }}></FlatlySortScreen>
    )


    return (
        <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ contentStyle: { backgroundColor: "#fff" } }} >
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="SortScreen" component={SortScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: "" }} />
            <Stack.Screen name="SuccessfullScreen" component={SuccessfullScreen} options={{ headerTitle: "" }} />
        </Stack.Navigator>
    )
}