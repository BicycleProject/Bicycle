import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const ChallengeScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState('업적');// 초기값 설정

  const navigation = useNavigation();

  const handleSettingPress = () => {
    //환경설정 페이지로 이동
  };
  const handlebackPress = () => {
    navigation.navigate('Myinfo');
  };
  const handleChallengePress = () => {
    navigation.navigate('ChallengeScreen');
  };
  const menuItemStyles = (isSelected) => StyleSheet.create({
    text: {
      color: isSelected ? '#007FFF' : '#ffffff',
      fontSize: 16,
    },
    underline: {
      height: 2,
      backgroundColor: isSelected ? '#007FFF' : 'transparent',
      marginTop: 5,
    },
  });
  const challenges = [
    { title: 'AI경로 부자', description: '▶ AI경로 추천받고 저장하기', image: require('./src/img_challenge_1.png'), completed: 0, total: 20 },
    { title: '노력왕', description: '▶ 일주일 연속 출석 성공!', image: require('./src/img_challenge_2.png'), completed: 0, total: 7 },
    { title: '기록왕', description: '▶ 주행 시 라이딩 기록 게시물 올리기', image: require('./src/img_challenge_3.png'), completed: 0, total: 30 },
    { title: '덤디덤디', description: '▶ 덤디덤디', image: require('./src/img_challenge_1.png'), completed: 0, total: 7 },

  ];
  const contents = {
    '업적': (
<View style={{ flex: 1 }}>
        <View style={styles.leveltextContainer}>
          <Text style={styles.levelText}>중급자</Text>
          <Text style={styles.levelText}>고급자</Text>
        </View>
        <View style={styles.leveltextContainer}>

          <AnimatedCircularProgress
            size={70}
            width={7}
            fill={90}
            tintColor="#FFC300"
            backgroundColor="#3d5875">
            {(fill) => (<Text style={styles.circularbarText}>{`${fill}%`}</Text>)}
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={70}
            width={7}
            fill={70}
            tintColor="#FF6C6C"
            backgroundColor="#3d5875">
            {(fill) => (<Text style={styles.circularbarText}>{`${fill}%`}</Text>)}
          </AnimatedCircularProgress>
        </View>

        <Text style={[styles.nameText, { left: screenWidth * -0.25 }]}>중급자가 되어가는 과정</Text>

        <ScrollView >
          {challenges.map((challenge, index) => (
            <View key={index} style={[styles.challengeContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <View style={styles.challengeimageContainer}>
                <Image source={challenge.image} style={{ width: 60, height: 60 }} />
              </View>
              <View>
                <Text style={styles.challengeTitle}>"{challenge.title}"</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#ffffff', textAlign: 'right' }}>({challenge.completed}/{challenge.total})</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    ),
    '내 경로': (
        <ScrollView>
          <Image source={require('./src/신상품.png')}  />
        </ScrollView>
    ),
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.maskGroup}>
        <TouchableOpacity onPress={handlebackPress}>
          <Image source={require('./src/뒤로가기.png')} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChallengePress}>
          <Image source={require('./src/img_user.png')} style={styles.ranking} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettingPress}>
          <Image source={require('./src/설정.png')} style={styles.setting} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: '35%' }}></View>
      <View style={styles.imageContainer}>
        <Image source={require('./src/img_user.png')} style={styles.img}
        />
        <Text style={styles.nameText}>덤디덤디</Text>
        <Text style={styles.levelText}>초급자</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setSelectedMenu('업적')}>
          <Text style={menuItemStyles(selectedMenu === '업적').text}>업적</Text>
          <View style={menuItemStyles(selectedMenu === '업적').underline} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMenu('내 경로')}>
          <Text style={menuItemStyles(selectedMenu === '내 경로').text}>내 경로</Text>
          <View style={menuItemStyles(selectedMenu === '내 경로').underline} />
        </TouchableOpacity>
      </View>
      {contents[selectedMenu]}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0C1320',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskGroup: {
    position: 'absolute',
    width: screenWidth,
    height: 27,
    left: 39,
    top: 64,
  },
  joinText: {
    position: 'absolute',
    width: 73,
    height: 24,
    left: '48%',
    top: '10%',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.025,
    color: '#FFFFFF',
  },

  ranking: {
    position: 'absolute',
    width: 35,
    height: 35,
    right: '27%',
    top: 0,

  },
  setting: {
    position: 'absolute',
    width: 35,
    height: 35,
    right: '15%',
    top: 0,
  },
  arrow: {
    position: 'absolute',
    width: 27,
    height: 27,
    left: 0,
    top: 0,
    transform: [{ scaleY: -1 }],
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 60,

    alignSelf: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    top: '0%',
    left: '0%',
  },
  nameText: {
    marginTop: 10, // 이미지와 텍스트 사이의 간격 조정
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold', // 글꼴 굵기를 굵게 설정
  },
  levelText: {
    marginTop: 10, // 이미지와 텍스트 사이의 간격 조정
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0C1320', // 원하는 배경색으로 설정
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    width: '100%',
  },
  circularbarText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  leveltextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    width: '50%',
    left: '15%',
  },
  challengeContainer: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#313A4B',
    borderRadius: 10,
    width: screenWidth * 0.9,
  },
  challengeTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  challengeDescription: {
    color: '#ffffff',
    fontSize: 15
  },
  challengeimageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#393F4A',
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },


});

export default ChallengeScreen;