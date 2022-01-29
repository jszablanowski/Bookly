import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParklySearchScreen } from './ParklySearchScreen';
import { CarlySearchScreen } from './CarlySearchScreen';
import { FlatlySearchScreen } from './FlatlySearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();


export const SearchScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Flats') {
                        iconName = focused
                            ? 'information-circle'
                            : 'information-circle-outline';
                    } else if (route.name === 'Cars') {
                        iconName = 'list';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName ?? ""} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Flats" component={FlatlySearchScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Cars" component={CarlySearchScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Parkings" component={ParklySearchScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}