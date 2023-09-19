import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)

    // useState 훅을 사용하여 setSelectedPreference 값을 변경가능하다.
    const [selectedPreference, setSelectedPreference] = useState('');

    const handleDayPress = () => {
        setSelectedPreference('낮');
        navigation.navigate('   ', { preference: '낮에' }); // 다음창으로 넘어가면서 낮 정보를 보냄 (상태 업데이트)
    };

    const handleNightPress = () => {
        setSelectedPreference('밤');
        navigation.navigate('   ', { preference: '밤에' }); // 다음창으로 넘어가면서 밤 정보를 보냄 (상태 업데이트)
    };
    
    
  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>주로 라이딩하는 시간</Text>
            <Text style={styles.fftext}>낮과 밤 둘중에 주로</Text>
            <Text style={styles.fftext}>라이딩하는 시간을 알려주세요 🚲</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handleDayPress}>
                <Text style={styles.secondtext}>낮</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleNightPress}>
                <Text style={styles.secondtext}>밤</Text>
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