// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';  // 우리가 만든 첫 화면
import LoginScreen from './screens/LoginScreen';    // 다음 화면 만들 거야!
import UserInfoScreen from './screens/UserInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
	<Stack.Screen name="UserInfo" component={UserInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
