import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)
    
    // 이전 화면에서 전달된 선호 시간 (낮/밤), 목적 (운동/나들이), 동행자 정보
    const { timePreference, purpose, companion } = route.params; 
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleBeginnerPress = () => {
        setSelectedLevel('초보자');
        navigation.navigate('      ', { timePreference: timePreference , purpose: purpose , companion: companion , level: '난이도는 초보자이고' });
    };

    const handleintermediatePress = () => {
        setSelectedLevel('중급자');
        navigation.navigate('      ', { timePreference: timePreference , purpose: purpose , companion: companion , level: '난이도는 중급자이고' });
    };

    const handlehighPress = () => {
        setSelectedLevel('고급자');
        navigation.navigate('      ', { timePreference: timePreference , purpose: purpose , companion: companion , level: '난이도는 고급자이고' });
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>당신의 라이딩 등급을 알려주세요!</Text>
            <Text style={styles.fftext}>초보자, 중급자, 전문가도 즐길 수 있다!</Text>
            <Text style={styles.fftext}></Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handleBeginnerPress}>
                <Text style={styles.secondtext}>초보자</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleintermediatePress}>
                <Text style={styles.secondtext}>중급자</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlehighPress}>
                <Text style={styles.secondtext}>전문가</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 130,
        marginLeft: 30,
    },


    firsttext: {
        fontSize: 27,
    },
    
    fftext: {
        marginTop: 15,
        fontSize: 15,
    },

    buttonText: {
        width: 250,
        height: 50,

        // 버튼 스타일 지정
        backgroundColor: '#E6F5FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    buttonView: {
        marginTop: 60,
        marginLeft: 26,
    },

    secondtext: {
        color: '#29B6F6'
    },

    buttonView2: {
        marginTop: 20,
        marginLeft: 26,
    }
});