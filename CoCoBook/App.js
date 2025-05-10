// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import UserInfo2Screen from './screens/UserInfoScreen2';
import MainScreen from './screens/MainScreen';
import SettingScreen from './screens/SettingScreen';
import MakeStoryScreen from './screens/MakeStoryScreen';
import MakeStoryScreen2 from './screens/MakeStoryScreen2';
import AnswerScreen from './screens/AnswerScreen';
import StoryPartialScreen from './screens/StoryPartialScreen';
import StorySuccessScreen from './screens/StorySuccessScreen';
import BookShelfScreen from './screens/BookShelfScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        <Stack.Screen name="UserInfo2" component={UserInfo2Screen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="MakeStory" component={MakeStoryScreen} />
        <Stack.Screen name="MakeStory2" component={MakeStoryScreen2} />
        <Stack.Screen name="Answer" component={AnswerScreen} />
        <Stack.Screen name="StoryPartial" component={StoryPartialScreen} />
        <Stack.Screen name="StorySuccess" component={StorySuccessScreen} />
        <Stack.Screen name="BookShelf" component={BookShelfScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}