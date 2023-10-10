import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
function ChallengeScreen() {
  const challenges = [
    { id: 1, title: '1km 달성', image: require('./src/bronze_medal.png') },
    { id: 2, title: '5km 달성', image: require('./src/silver_medal.png') },
    { id: 3, title: '10km 달성', image: require('./src/gold_medal.png') },
    { id: 4, title: '3일 연속 타기', image: require('./src/bronze_medal.png') },
    { id: 5, title: '5일 연속 타기', image: require('./src/silver_medal.png') },
    { id: 6, title: '10일 연속 타기', image: require('./src/gold_medal.png') },
    { id: 7, title: '경주에서 3등하기', image: require('./src/bronze_medal.png') },
    { id: 8, title: '경주에서 2등하기', image: require('./src/silver_medal.png') },
    { id: 9, title: '경주에서 1등하기', image: require('./src/gold_medal.png') },
  ];

  // 각 메달 이미지를 눌렀을 때의 동작을 처리하는 함수
  const handleMedalPress = (challenge) => {
    // 원하는 동작을 여기에 추가하세요
    console.log(`메달 ${challenge.title}를 눌렀습니다.`);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 도전과제 배너 */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>도전과제</Text>
      </View>

      {/* 가로로 3개씩 배치 */}
      <View style={styles.row}>
        {challenges.slice(0, 3).map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.item}
            onPress={() => handleMedalPress(challenge)} // 버튼 클릭 핸들러 연결
          >
            {/* 메달 이미지 */}
            <Image source={challenge.image} style={styles.medal} resizeMode="contain" />

            {/* 도전과제 제목 */}
            <Text style={styles.missionText}>{challenge.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 가로로 3개씩 배치 */}
      <View style={styles.row}>
        {challenges.slice(3, 6).map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.item}
            onPress={() => handleMedalPress(challenge)} // 버튼 클릭 핸들러 연결
          >
            {/* 메달 이미지 */}
            <Image source={challenge.image} style={styles.medal} resizeMode="contain" />

            {/* 도전과제 제목 */}
            <Text style={styles.missionText}>{challenge.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {challenges.slice(6, 9).map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.item}
            onPress={() => handleMedalPress(challenge)} // 버튼 클릭 핸들러 연결
          >
            {/* 메달 이미지 */}
            <Image source={challenge.image} style={styles.medal} resizeMode="contain" />

            {/* 도전과제 제목 */}
            <Text style={styles.missionText}>{challenge.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  banner: {
    backgroundColor: '#2E7D32', // 배너 배경색 설정
    padding: 10,
  },
  bannerText: {
    color: 'white', // 배너 텍스트 색상 설정
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    margin: 10,
  },
  medal: {
    width: 100,
    height: 100,
  },
  missionText: {
    marginTop: 5,
    fontSize: 16,
  },
});
export default ChallengeScreen;