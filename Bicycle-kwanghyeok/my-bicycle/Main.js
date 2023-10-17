import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
    const navigation = useNavigation();
  
    const handleLoginPress = () => {
      // 로그인 버튼을 누를 때 다른 화면으로 이동하도록 설정
      navigation.navigate('Login'); // 다음 화면의 이름으로 수정
    };

    const handlemainPress = () => {
        navigation.navigate('Main_1');
    };
    const handlesignupPress = () => {
        navigation.navigate('Signup');
    };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.group40}>
        <Image source={require('./src/logo.png')} style={styles.image3} />
        <Image source={require('./src/road.png')} style={styles.image5} />
        <TouchableOpacity onPress={handleLoginPress}>
          <View style={styles.rectangle31}>
            <Text style={styles.login}>로그인</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.group3}>
          <Text style={styles.notAMember}>아직 회원이 아니신가요?</Text>
          <TouchableOpacity onPress={handlesignupPress}>
            <Text style={styles.signUp}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.group3}></View>
      <View style={styles.maskGroup}>
      <TouchableOpacity onPress={handlemainPress}>
        <Image source={require('./src/뒤로가기.png')} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#0C1320',
    },
    group40: {
      flex: 1,
      alignItems: 'center',
      top: 0,
    },
    image3: { // 로고 이미지
      width: 258,
      height: 190,
      top: '15%',
      left: '3%',
    },
    image5: { //도로 이미지
      width: 420,
      height: 460,
      top: '20%',
    },
    rectangle31: {
      width: 282,
      height: 52,
      backgroundColor: '#1E58BF',
      borderWidth: 1,
      borderColor: '#35383F',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      top: '100%',
    },
    login: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    group3: {
      flexDirection: 'row',
      top: '30%',
    },
    notAMember: {
      color: '#A2A2A2',
      fontSize: 16,
      marginRight: 10,
    },
    signUp: {
      color: '#1E58BF',
      fontSize: 16,
      textDecorationLine: 'underline',
    },
    maskGroup: {
      position: 'absolute',
      width: 27,
      height: 27,
      left: 39,
      top: 64,
    },
    arrow: {
      position: 'absolute',
      width: 27,
      height: 27,
      left:0,
      top: 0,
      transform: [{ scaleY: -1 }],
    },
  });
  
  export default Main;
