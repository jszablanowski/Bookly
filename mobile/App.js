import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function CountriesScreen({navigation}) {
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

function CountryDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>This is a DETAIL screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CountriesScreen" component={CountriesScreen} options={{ title: 'Countries' }} />
        <Stack.Screen name="CountryDetailsScreen" component={CountryDetailsScreen} options={{ title: 'Country Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
