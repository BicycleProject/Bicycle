import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';



export default function Aipath({ navigation }) {

    const [selectedPreference, setSelectedPreference] = useState('');

    const handlePress1 = () => {
        navigation.navigate(' '); // 처음으로 돌아가서 다시시작
    };

    const handlePress2 = () => {
        // 여기에 ai 분석 결과를 디비에 넣는 코드를 적어야함.
    }

  return (
    <View>
        <View style={styles.container}>
            <Image source={require('./src/user.png')} style={styles.image} />
            <Text style={styles.firsttext}>최광혁 님의 성향은</Text>
            <Text style={styles.firsttext}></Text>
            <Text style={styles.f1text}></Text>
            <Text style={styles.f2text}></Text>
        </View>
        <View style={[styles.buttonView, styles.buttonContainer]}>
            <TouchableOpacity style={styles.buttonText1} onPress={handlePress1}>
                <Text style={styles.secondtext}>재설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonText2} onPress={handlePress2}>
                <Text style={styles.secondtext2}>결과 저장</Text>
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

    buttonText1: {
        width: 180,
        height: 50,
        marginRight: 15,
        // 버튼 스타일 지정
        backgroundColor: '#98DFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    buttonText2: {
        width: 180,
        height: 50,

        // 버튼 스타일 지정
        backgroundColor: '#E6F5FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    secondtext2: {
        color: '#29B6F6'
    },


    buttonView: {
        marginTop: 220,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
    },

    secondtext: {
        color: 'white'
    }
});