import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';



export default function Aipath({ navigation }) {

    const [selectedPreference, setSelectedPreference] = useState('');

    const handlePress = () => {
        navigation.navigate('  '); // 다음창으로 넘어감
    };

  return (
    <View>
        <View style={styles.container}>
            <Image source={require('./src/user.png')} style={styles.image} />
            <Text style={styles.firsttext}>최광혁 님의</Text>
            <Text style={styles.firsttext}>성향을 알아볼까요?</Text>
            <Text style={styles.f1text}>AI는 간단한 성향 조사를 통해,</Text>
            <Text style={styles.f2text}>자전거 성향에 맞는 올바른 경로를 추천합니다.</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>30초 성향 분석 시작</Text>
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

    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },

    firsttext: {
        fontSize: 23,
    },
    
    f1text: {
        marginTop: 10,
        color: 'gray'
    },

    f2text: {
        marginTop: 1,
        color: 'gray'
    },

    buttonText: {
        width: 350,
        height: 50,

        // 버튼 스타일 지정
        backgroundColor: '#98DFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    buttonView: {
        marginTop: 240,
        alignItems: 'center',
        justifyContent: 'center'
    },

    secondtext: {
        color: 'white'
    }
});