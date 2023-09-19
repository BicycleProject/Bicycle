import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ navigation }) {

    const [selectedPreference, setSelectedPreference] = useState('');

    const handlePress = () => {
        navigation.navigate('     '); // 버튼눌렀을때 이동
    };

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>누구와 함께하고 싶나요?</Text>
            <Text style={styles.fftext}>혼자도 괜찮아요!</Text>
            <Text style={styles.fftext}>같이 어플을 사용할 사람들을 눌러주세요!</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>솔로</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>가족</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>커플</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>친구</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handlePress}>
                <Text style={styles.secondtext}>동호회</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
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