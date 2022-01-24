import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginScreen } from './components/LoginScreen';
import { CreateAccountScreen } from './components/CreateAccountScreen';
import { BookingsControllerApi, Configuration } from './app/api';
import { UserService } from './app/services/UserService';
import { AuthProvider } from './hooks/Auth';

type Props = NativeStackScreenProps<RootStackParamList, 'CountriesScreen'>;

const CountriesScreen = ({ route, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>This is a MASTER screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('CountryDetailsScreen')}
      />
    </View>
  );
}

const CountryDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>This is a DETAIL screen</Text>
    </View>
  );
}

type RootStackParamList = {
  CountriesScreen: undefined;
  CountryDetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <AuthProvider>
      <LoginScreen userService={new UserService()}></LoginScreen>
    </AuthProvider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="CountriesScreen" component={CountriesScreen} options={{ title: 'Countries' }} />
    //     <Stack.Screen name="CountryDetailsScreen" component={CountryDetailsScreen} options={{ title: 'Country Details' }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    margin: 20,
    fontSize: 18,
  }
});


export default App;