import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { Button, Divider, Text } from "react-native-elements"
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

    const { token } = useAuth();
    const [carlyFilters, setCarlyFilters] = useState<CarlyFilters>({ model: "", location: "", text: "" });
    const [sortMode, setSortMode] = useState<SortMode | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState<number>(0);



    const fetchData = () => {
        setLoading(true);
        let dateSort: string | undefined;
        let priceSort: string | undefined;
        if (sortMode === SortMode.dateSortAsc) {
            dateSort = "asc";
        }
        else if (sortMode === SortMode.dateSortDesc) {
            dateSort = "desc";
        }
        else if (sortMode === SortMode.priceSortAsc) {
            priceSort = "asc";
        }
        else if (sortMode === SortMode.priceSortDesc) {
            priceSort = "desc";
        }
        props.itemsService.getCarItems(token, 1, 100, dateSort, carlyFilters.location, carlyFilters.model, priceSort, carlyFilters.text)
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
                if (response.totalPages && response.items) {
                    setItemsCount(response.totalPages * response.items.length);
                } else {
                    setItemsCount(0);
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData()
    }, [carlyFilters, sortMode]);


    const [carItems, setCarItems] = useState<Array<CarItemDetails> | undefined>(undefined);

    const renderItem = ({ item }: { item: CarItemDetails }) => (
        <TouchableOpacity onPress={() => { }} >
            <CarItem details={item}></CarItem>
        </TouchableOpacity>
    );


    const onRefresh = () => {
        setLoading(true);
        setCarlyFilters({ model: "", location: "", text: "" });
        setSortMode(undefined);
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
                data={carItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onRefresh={() => onRefresh()}
                refreshing={loading}
                style={{ alignSelf: "stretch", marginBottom: 60 }}
                ListHeaderComponent={itemsCountHeader}
            />
        </View>
    )

    const FilterScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterScreen'>) => (
        <CarlyFilterScreen onChange={val => {
            setCarlyFilters(val);
            navigation.navigate("MainScreen");
        }} filters={carlyFilters}></CarlyFilterScreen>
    )


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