import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)

    // 이전 화면에서 전달된 선호 시간 (낮/밤), 목적 (운동/나들이), 동행자 정보 및 라이딩 등급
    const { timePreference, purpose, companion, level } = route.params; 
    const [selectedRoadType, setSelectedRoadType] = useState('');

    const handleBikeRoadPress = () => {
        setSelectedRoadType('자전거 도로');
        navigation.navigate('       ', { timePreference: timePreference , purpose: purpose , companion: companion , level: level , roadType: '자전거 도로로 주행하고 싶은데 한강 자전거 경로를 추천해줘' });
    };

    const handleWalkRoadPress = () => {
        setSelectedRoadType('산책로');
        navigation.navigate('       ', { timePreference: timePreference , purpose: purpose , companion: companion , level: level , roadType: '산책로로 주행하고 싶은데 한강 자전거 경로를 추천해줘' });
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>어떤 도로 위주로 탐색해 드릴까요?</Text>
            <Text style={styles.fftext}>원하시는 도로로 추천해 드려요 :D</Text>
            <Text style={styles.fftext}></Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handleBikeRoadPress}>
                <Text style={styles.secondtext}>자전거 도로</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleWalkRoadPress}>
                <Text style={styles.secondtext}>산책로</Text>
            </TouchableOpacity>
        </View>


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
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