import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParklySearchScreen } from './ParklySearchScreen';
import { CarlySearchScreen } from './CarlySearchScreen';
import { FlatlySearchScreen } from './FlatlySearchScreen';
import { Icon } from "react-native-elements"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();


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
            })}
        >
            <Tab.Screen name="Flats" component={FlatlySearchScreen} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
            <Tab.Screen name="Cars" component={CarlySearchScreen} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
            <Tab.Screen name="Parkings" component={ParklySearchScreen} options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }} />
        </Tab.Navigator>
    )
}