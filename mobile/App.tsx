import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen'
import { UserService } from './app/services/UserService';
import { AuthProvider } from './hooks/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { SearchScreen } from './screens/SearchScreen';


type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const CreateAccountScreenWrapper = () => (
  <CreateAccountScreen registerCallback={() => { }}
    userService={new UserService()}></CreateAccountScreen>
);


type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  const LoginScreenWrapper = ({ navigation }: Props) => (
    <LoginScreen userService={new UserService()} createAccountCallback={() => { navigation.navigate("RegisterScreen") }}
      loginUserCallback={() => {
        setAuthorized(true);
      }} ></LoginScreen>
  );

  const [authorized, setAuthorized] = useState(false);

  let element;
  if (authorized === false) {
    element = <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}
        initialRouteName='LoginScreen'>
        <Stack.Screen name="LoginScreen" component={LoginScreenWrapper} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={CreateAccountScreenWrapper} options={{ title: 'Register new account' }} />
      </Stack.Navigator>

    </NavigationContainer>;
  }
  else {
    element =

      <NavigationContainer>
        <Header
          rightComponent={
            <View style={styles.headerRight}>
              <TouchableOpacity >
                <IconFontAwesome name="user-alt" color="white" size={24} />
              </TouchableOpacity>
            </View>
          }
          leftComponent={{ text: 'Bookly', style: styles.heading }}
        />

        <SearchScreen></SearchScreen>
      </NavigationContainer>
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        {element}
      </AuthProvider>
    </SafeAreaProvider>
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
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




export default App;