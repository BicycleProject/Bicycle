import React from 'react';
import WebViewComponent from './KakaoComponent'; // kakao map 연동
import Aipath from './Aipath'; // Aipath 컴포넌트 이동
import Aipath2 from './Aipath2'; // Aipath2 컴포넌트 이동
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// 네비게이터로 버튼 이동 구현
// 설치방법 npm install @react-navigation/native @react-navigation/stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => navigation.navigate('other')}>
          <Text>My</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.firstbutton} onPress={() => navigation.navigate('other')}>
          <Text>포인트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondbutton} onPress={() => navigation.navigate('kakao')}>
          <Text>주행하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => navigation.navigate(' ')}>
          <Text>AI 경로 추천</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => navigation.navigate('other')}>
          <Text>도전 과제</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => navigation.navigate('other')}>
          <Text>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => navigation.navigate('other')}>
          <Text>내 근처 수리점</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name=" " component={Aipath} />
        <Stack.Screen name="  " component={Aipath2} />
        <Stack.Screen name="kakao" component={WebViewComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  // 버튼 가운데 배치
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 버튼 가로로 배치
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  firstbutton: {
    marginHorizontal: 10, // 버튼 가로 간격
    width: 150,
    height: 50,
    // 버튼 스타일 지정
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  },

  secondbutton: {
    marginTop: 20, // 위 간격
    marginBottom: 20, // 아래 간격
    width: 320.5,
    height: 100,
    // 버튼 스타일 지정
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  },

  thirdbutton: {
    marginHorizontal: 10, // 버튼 가로 간격
    marginTop: 20, // 위 간격
    marginBottom: 20, // 아래 간격
    width: 150,
    height: 200,
    // 버튼 스타일 지정
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
