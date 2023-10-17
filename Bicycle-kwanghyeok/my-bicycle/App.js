import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator ,CardStyleInterpolators} from '@react-navigation/stack';
import WebViewComponent from './KakaoComponent'; // kakao map 연동
import ChallengeScreen from './ChallengeScreen'; // challenge 컴포넌트 이동
import Community from './Community';
import NearbyRepairShopsScreen from './repairshop';
import Login from './Login';
import Main_1 from './Main_1';
import Main_2 from './Main_2';
import Main_3 from './Main_3';
import MainScreen from './MainScreen';
import Signup from './Signup';
import Main from './Main';
import Riding from './Riding';
import Myinfo from './Myinfo';
import PostDetail from './PostDetail';
import Posting from './Posting';
import Aipath from './Aipath';
import Aipath2 from './Aipath2';
import Aipath3 from './Aipath3';
import Aipath4 from './Aipath4';
import Aipath5 from './Aipath5';
import Aipath6 from './Aipath6';
import Aipath7 from './Aipath7';
import Aipath8 from './Aipath8';
import Shop from './Shop';
import FriendAdd from './FriendAdd';
import FriendList from './FriendList';
import ChattingList from './ChattingList';
import ChattingRoom from './ChattingRoom';
import ShopItemDetail from './ShopItemDetail';
import DraggableBottomSheet from './src/animations/DraggableBottomSheet/DraggableBottomSheet';


const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false ,cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,}}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_1" component={Main_1} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_2" component={Main_2} options={{ headerShown: false }}/>
        <Stack.Screen name="Main_3" component={Main_3} options={{ headerShown: false }}/>
        <Stack.Screen name="kakao" component={WebViewComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="Community" component={Community} options={{ headerShown: false }}/>
        <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="repairshop" component={NearbyRepairShopsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Riding" component={Riding} options={{ headerShown: false }}/>
        <Stack.Screen name="Myinfo" component={Myinfo} options={{ headerShown: false }}/>
        <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="Posting" component={Posting} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath" component={Aipath} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath2" component={Aipath2} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath3" component={Aipath3} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath4" component={Aipath4} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath5" component={Aipath5} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath6" component={Aipath6} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath7" component={Aipath7} options={{ headerShown: false }}/>
        <Stack.Screen name="Aipath8" component={Aipath8} options={{ headerShown: false }}/>
        <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }}/>
        <Stack.Screen name="ShopItemDetail" component={ShopItemDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="ChattingList" component={ChattingList} options={{ headerShown: false }}/>
        <Stack.Screen name="ChattingRoom" component={ChattingRoom} options={{ headerShown: false }}/>
        <Stack.Screen name="DraggableBottomSheet" component={DraggableBottomSheet} options={{ headerShown: false }}/>
        <Stack.Screen name="FriendAdd" component={FriendAdd} options={{ headerShown: false }}/>
        <Stack.Screen name="FriendList" component={FriendList} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

