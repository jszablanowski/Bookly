import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { Button, Text } from "react-native-elements"
import { CarItem, CarItemDetails } from "../../components/CarItem";
import { FlatItemDetails } from "../../components/FlatItem";
import { CarlyFilters, CarlyFilterScreen } from "./CarlyFilterScreen";
import { CarlySortScreen, SortMode } from "./CarlySortScreen";



type RootStackParamList = {
    FilterScreen: undefined;
    SortScreen: undefined;
    MainScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();




export const CarlySearchScreen = () => {

    const data: Array<CarItemDetails> = [{
        brand: "Audi",
        model: "A6",
        engine: "140 HP",
        id: 11,
        location: "Warsaw",
        price: 120,
        year: 2016
    },
    {
        brand: "Audi",
        model: "A8",
        engine: "140 HP",
        id: 12,
        location: "Warsaw",
        price: 120,
        year: 2016
    }];


    const renderItem = ({ item }: { item: CarItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <CarItem details={item}></CarItem>
        </TouchableOpacity>
    );

    const MainScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MainScreen'>) => (
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
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={() => { }}
                refreshing={false}
                style={{ alignSelf: "stretch" }}
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