import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "react-native-elements"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { ItemsService } from '../app/services/ItemsService';
import { CarlyScreen } from './CarlyScreen/CarlyScreen';
import { FlatlyScreen } from './FlatlyScreen/FlatlyScreen';
import { ParklyScreen } from './ParklyScreen/ParklyScreen';


const Tab = createBottomTabNavigator();

const CarlyScreenWrapper = () => (
    <CarlyScreen itemsService={new ItemsService()}></CarlyScreen>
)

const FlatlyScreenWrapper = () => (
    <FlatlyScreen itemsService={new ItemsService()}></FlatlyScreen>
)

const ParklyScreenWrapper = () => (
    <ParklyScreen itemsService={new ItemsService()}></ParklyScreen>
)


export const SearchScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === 'Flats') {
                        icon = <IconFontAwesome name="home" size={26} color={color} />
                    } else if (route.name === 'Cars') {
                        icon = <IconFontAwesome name="car" size={24} color={color} />
                    } else if (route.name === 'Parkings') {
                        icon = <IconMaterial name="parking" size={26} color={color} />
                    }

                    return icon;
                },
                tabBarActiveTintColor: '#0090f0',
                tabBarInactiveTintColor: 'gray',
                contentStyle: { backgroundColor: "#fff" }
            })}
        >
            <Tab.Screen name="Flats" component={FlatlyScreenWrapper} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
            <Tab.Screen name="Cars" component={CarlyScreenWrapper} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
            <Tab.Screen name="Parkings" component={ParklyScreenWrapper} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
        </Tab.Navigator>
    )
}