import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator ,CardStyleInterpolators} from '@react-navigation/stack';
import WebViewComponent from './KakaoComponent'; // kakao map 연동
import ChallengeScreen from './ChallengeScreen'; // challenge 컴포넌트 이동
import Community from './Community';
import NearbyRepairShopsScreen from './repairshop';
import LoginScreen from './LoginScreen';
import Login from './Login';
import Main_1 from './Main_1';
import Main_2 from './Main_2';
import Main_3 from './Main_3';
import MainScreen from './MainScreen';
import Signup from './Signup';
import Main from './Main';
import Riding from './Riding';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false ,cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,}}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_1" component={Main_1} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_2" component={Main_2} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_3" component={Main_3} options={{ headerShown: false }}/>
        <Stack.Screen name="kakao" component={WebViewComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="Community" component={Community} options={{ headerShown: false }}/>
        <Stack.Screen name="challenge" component={ChallengeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="repairshop" component={NearbyRepairShopsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Riding" component={Riding} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


