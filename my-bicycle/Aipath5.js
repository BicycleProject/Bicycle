import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ navigation }) {

    const [selectedPreference, setSelectedPreference] = useState('');

    const handlePress = () => {
        navigation.navigate('      '); // 버튼눌렀을때 이동
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>당신의 라이딩 등급을 알려주세요!</Text>
            <Text style={styles.fftext}>초보자, 중급자, 전문가도 즐길 수 있다!</Text>
            <Text style={styles.fftext}></Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>초보자</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>중급자</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
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