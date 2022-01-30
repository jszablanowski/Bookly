import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { Button, Text } from "react-native-elements"
import { IItemsService } from "../../app/services/ItemsService";
import { CarItem, CarItemDetails } from "../../components/CarItem";
import { FlatItemDetails } from "../../components/FlatItem";
import { useAuth } from "../../hooks/Auth";
import { CarlyFilters, CarlyFilterScreen } from "./CarlyFilterScreen";
import { CarlySortScreen, SortMode } from "./CarlySortScreen";



type RootStackParamList = {
    FilterScreen: undefined;
    SortScreen: undefined;
    MainScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface CarlyScreenProps {
    itemsService: IItemsService
}


export const CarlyScreen = (props: CarlyScreenProps) => {

    // const data: Array<CarItemDetails> = [{
    //     brand: "Audi",
    //     model: "A6",
    //     engine: "140 HP",
    //     id: "11",
    //     location: "Warsaw",
    //     price: 120,
    //     year: 2016
    // },
    // {
    //     brand: "Audi",
    //     model: "A8",
    //     engine: "140 HP",
    //     id: "12",
    //     location: "Warsaw",
    //     price: 120,
    //     year: 2016
    // }];

    const { token } = useAuth();

    useEffect(() => {
        props.itemsService.getCarItems(token, 1, 100)
            .then(response => {
                let carItemsDetails = response.items?.map(i => ({
                    brand: i.brand,
                    model: i.model,
                    engine: i.engine,
                    id: i.id ?? "",
                    location: i.location,
                    price: i.price,
                    year: i.year
                }));
                setCarItems(carItemsDetails);
            });

    }, []);

    const [carItems, setCarItems] = useState<Array<CarItemDetails> | undefined>(undefined);

    const renderItem = ({ item }: { item: CarItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <CarItem details={item}></CarItem>
        </TouchableOpacity>
    );

    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => (
        carItems === undefined ? <ActivityIndicator size="large" color="#0090f0" style={{ marginTop: 100 }} /> :
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
                    data={carItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => { }}
                    refreshing={false}
                    style={{ alignSelf: "stretch", marginBottom: 60 }}
                />
            </View>
    )

    const [carlyFilters, setCarlyFilters] = useState<CarlyFilters>({ model: "", location: "", text: "" });
    const FilterScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterScreen'>) => (
        <CarlyFilterScreen onChange={val => {
            setCarlyFilters(val);
            navigation.navigate("MainScreen");
        }} filters={carlyFilters}></CarlyFilterScreen>
    )


    const [sortMode, setSortMode] = useState<SortMode | undefined>(undefined);
    const SortScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'SortScreen'>) => (
        <CarlySortScreen sortMode={sortMode} onChange={(val) => {
            setSortMode(val);
            navigation.navigate("MainScreen");
        }}></CarlySortScreen>
    )

    return (
        <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ contentStyle: { backgroundColor: "#fff" } }} >
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="SortScreen" component={SortScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
    )
}