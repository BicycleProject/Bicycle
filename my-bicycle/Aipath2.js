import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ navigation }) {

    const [selectedPreference, setSelectedPreference] = useState('');

    const handlePress = () => {
        navigation.navigate('1'); // 버튼눌렀을때 이동
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>자전거 주행하실때</Text>
            <Text style={styles.fftext}>낮을 선호하세요?</Text>
            <Text style={styles.fftext}>밤을 선호하세요?</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>낮</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
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
        marginTop: 20,
        fontSize: 18,
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
        marginTop: 70,
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