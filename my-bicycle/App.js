import React, { useState } from 'react';
import WebViewComponent from './KakaoComponent'; // kakao map 연동
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [selectedButton, setSelectedButton] = useState(null);

  // 주행하기 버튼을 눌렀을때 카카오맵이 보임
  if (selectedButton === 'kakao') {
    return <WebViewComponent style={styles.container} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => setSelectedButton('other')}>
          <Text>My</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.firstbutton} onPress={() => setSelectedButton('other')}>
          <Text>포인트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondbutton} onPress={() => setSelectedButton('kakao')}>
          <Text>주행하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => setSelectedButton('other')}>
          <Text>AI 경로 추천</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => setSelectedButton('other')}>
          <Text>도전 과제</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => setSelectedButton('other')}>
          <Text>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.thirdbutton} onPress={() => setSelectedButton('other')}>
          <Text>내 근처 수리점</Text>
        </TouchableOpacity>
      </View>

    </View>
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
    backgroundColor:'#DDDDDD',
    alignItems:'center', 
    justifyContent:'center' 
  },

  secondbutton:{
    marginTop: 20, // 위 간격
    marginBottom: 20, // 아래 간격
    width: 320.5,
    height: 100,
    // 버튼 스타일 지정
    backgroundColor:'#DDDDDD',
    alignItems:'center', 
    justifyContent:'center' 
  },
  
  thirdbutton:{
    marginHorizontal: 10, // 버튼 가로 간격
    marginTop: 20, // 위 간격
    marginBottom: 20, // 아래 간격
    width: 150,
    height: 200,
    // 버튼 스타일 지정
    backgroundColor:'#DDDDDD',
    alignItems:'center', 
    justifyContent:'center'
  }
});
