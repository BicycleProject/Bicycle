import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)

    const { preference: timePreference } = route.params; // 이전 화면에서 전달된 선호 시간(낮/밤)
    const [selectedPurpose, setSelectedPurpose] = useState('');

    // 운동 눌렀을때
    const handleExercisePress = () => {
        setSelectedPurpose('운동');
        navigation.navigate('    ', { timePreference: timePreference, purpose: '운동 목적으로' });
    };

    // 나들이 눌렀을때
    const handleOutingPress  = () => {
        setSelectedPurpose('나들이');
        navigation.navigate('    ', { timePreference: timePreference, purpose: '나들이 목적으로' });
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>라이딩 목적</Text>
            <Text style={styles.fftext}>주로 라이딩을 할때 무슨 목적으로 타시고 계신가요?</Text>
            <Text style={styles.fftext}></Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handleExercisePress}>
                <Text style={styles.secondtext}>운동</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleOutingPress}>
                <Text style={styles.secondtext}>나들이</Text>
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
        marginTop: 90,
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