import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen'
import { UserService } from './app/services/JwtUserService';
import { AuthProvider } from './hooks/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { SearchScreen } from './screens/SearchScreen';
import { HeaderBookly } from './components/HeaderBookly';
import { AccountScreen } from './screens/AccountScreen/AccountScreen';


type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const CreateAccountScreenWrapper = () => (
  <CreateAccountScreen registerCallback={() => { }}
    userService={new UserService()}></CreateAccountScreen>
);


type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainScreen: undefined;
  AccountScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  const LoginScreenWrapper = ({ navigation }: Props) => (
    <LoginScreen userService={new UserService()} createAccountCallback={() => { navigation.navigate("RegisterScreen") }}
      loginUserCallback={() => {
        navigation.navigate("MainScreen");
      }} ></LoginScreen>
  );


  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}
            initialRouteName='LoginScreen'>
            <Stack.Screen name="LoginScreen" component={LoginScreenWrapper} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={CreateAccountScreenWrapper} options={{ title: 'Register new account' }} />
            <Stack.Screen name="MainScreen" component={SearchScreen} options={{ header: HeaderBookly }} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ header: HeaderBookly }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}





export default App;