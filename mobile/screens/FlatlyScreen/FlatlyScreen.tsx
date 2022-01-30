import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ListRenderItem, TouchableOpacity, View } from "react-native"
import { Button, Input, Text } from "react-native-elements";
import { FlatItem, FlatItemDetails } from "../../components/FlatItem";
import { FlatlyFilters, FlatlyFilterScreen } from "./FlatlyFilterScreen";
import { HeaderBookly } from "../../components/HeaderBookly";
import { FlatlySortScreen } from "./FlatlySortScreen";
import { useAuth } from "../../hooks/Auth";
import { IItemsService } from "../../app/services/ItemsService";



type RootStackParamList = {
    FilterScreen: undefined;
    SortScreen: undefined;
    MainScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface FlatlyScreenProps {
    itemsService: IItemsService;
}

export const FlatlyScreen = (props: FlatlyScreenProps) => {

    const data: Array<FlatItemDetails> = [{
        address: {
            city: "city",
            houseNumber: "12",
            id: 1,
            localNumber: "11",
            postalCode: "33",
            street: "street"
        },
        area: 120,
        description: "description",
        facilities: [{
            id: 1,
            name: "Gym"
        },
        {
            id: 2,
            name: "Shop mall"
        }],
        id: "11",
        images: [{
            id: 20,
            path: "https://backend.flatly.online/api/v1/flatsStock/inside2.jpg"
        }],
        name: "flat",
        numberOfGuests: 12,
        rooms: 3
    },
    {
        address: {
            city: "city",
            houseNumber: "12",
            id: 1,
            localNumber: "11",
            postalCode: "33",
            street: "street"
        },
        area: 120,
        description: "description",
        facilities: [{
            id: 1,
            name: "Cinema"
        }],
        id: "13",
        images: [{
            id: 20,
            path: "https://backend.flatly.online/api/v1/flatsStock/inside2.jpg"
        }],
        name: "flat2",
        numberOfGuests: 12,
        rooms: 3
    }];


    const { token } = useAuth();

    useEffect(() => {
        props.itemsService.getFlatItems(token, 1)
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
            });

    }, []);


    const [flatItems, setFlatItems] = useState<Array<FlatItemDetails> | undefined>(undefined);

    const renderItem = ({ item }: { item: FlatItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <FlatItem details={item}></FlatItem>
        </TouchableOpacity>
    );



    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => (
        flatItems === undefined ? <ActivityIndicator size="large" color="#0090f0" style={{ marginTop: 100 }} /> :
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
                    onRefresh={() => { }}
                    refreshing={false}
                    style={{ alignSelf: "stretch", marginBottom: 60 }}
                />
            </View>
    )

    const [flatlyFilters, setFlatlyFilters] = useState<FlatlyFilters>({ city: "", street: "", text: "" });
    const FilterScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterScreen'>) => (
        <FlatlyFilterScreen onChange={val => {
            setFlatlyFilters(val);
            navigation.navigate("MainScreen");
        }} filters={flatlyFilters}></FlatlyFilterScreen>
    )


    const [flatlySort, setFlatlySort] = useState<boolean>(false);
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
        </Stack.Navigator>
    )
}