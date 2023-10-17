import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';


const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1320',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    top: 70,
  },
  button: {
    marginVertical: 10,
    width: 170,
    height: 170,
    borderRadius: 20,
    backgroundColor: '#313A4B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonImage: {
    width: 120,
    height: 130,
  },

  recommendationImage: {
    position: 'absolute',
    right: -5,
    top: '-10%',
    width: 50,
    height: 50,
  },
  button2: {
    width: 300,
    height: 60,
    backgroundColor: '#1E58BF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',

  },
  buttontextstyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  adBanner: {
    height: '100%', // 광고 배너의 높이 설정
    top: 0,
  },
  adSlide: {
    flex: 1,

  },
  adImage: {
    width: screenWidth,
    height: '25%',
  },
  adContainer: {
    zIndex: 0, // 광고 컨테이너는 다른 컴포넌트 위에 렌더링
    top: 50,
  },
  buttonContainer: {
    position: 'absolute',
    top: 270, // 원하는 위치로 조절
    alignSelf: 'center', // 가운데 정렬
    zIndex: 1, // 버튼은 광고 위에 렌더링
  },
});


function MainScreen() {
  const navigation = useNavigation();
  const handleddarungstart = () => {
    navigation.navigate('repairshop');
  };
  const handleridingstart = () => {
    navigation.navigate('DraggableBottomSheet');
  };
  const handleAIstart = () => {
    navigation.navigate('Aipath');
  };
  const handleBackPress = () => {
    // 뒤로 가기 동작을 수행
    navigation.navigate('Login');
  };
  const handleinfoPress = () => {
    // 내 정보 화면으로 이동
    navigation.navigate('Myinfo'); // 적절한 스크린 이름으로 변경
  };
  const handlecommunity = () => {
    navigation.navigate('Community');
  };
  const handledShopstart = () => {
    navigation.navigate('Shop');
  };
  
  function handleAdClick(adNumber) {
    if(adNumber === 1) {
      navigation.navigate('Login');
    } else if(adNumber === 2) {
      navigation.navigate('Aipath');
    } else if(adNumber === 3) {
      navigation.navigate('Community');
    }
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}>
          <Image
            source={require('./src/뒤로가기.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Image
          source={require('./src/logo.png')}
          style={styles.logoImage}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleinfoPress}>
          <Image
            source={require('./src/img_user.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.adContainer}>
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          style={styles.adBanner}>
          <TouchableOpacity onPress={() => handleAdClick(1)} style={styles.adSlide} activeOpacity={0}>
            <Image source={require('./src/ad.png')} style={styles.adImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAdClick(2)} style={styles.adSlide} activeOpacity={0}>
            <Image source={require('./src/ad2.png')} style={styles.adImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAdClick(3)} style={styles.adSlide} activeOpacity={0}>
            <Image source={require('./src/ad3.png')} style={styles.adImage} />
          </TouchableOpacity>
        </Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { top: 100, right: 100 }]}
          onPress={handleAIstart}>
          <Image
            source={require('./src/AI경로추천.png')}
            style={styles.buttonImage} />
          <Image
            source={require('./src/추천.png')}
            style={styles.recommendationImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { bottom: 90, left: 100 }]}
          onPress={handlecommunity}>
          <Image
            source={require('./src/자전거탈래.png')}
            style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { bottom: 80, right: 100 }]}
          onPress={handleddarungstart}>
          <Image
            source={require('./src/근처대여점.png')}
            style={styles.buttonImage} />

        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { bottom: 270, left: 100 }]}
          onPress={handledShopstart}>
          <Image
            source={require('./src/스토어.png')}
            style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleridingstart}>
          <View style={[styles.button2, { bottom: 200, left: -65 }]}>
            <Text style={styles.buttontextstyle}>주행하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
}



export default MainScreen;