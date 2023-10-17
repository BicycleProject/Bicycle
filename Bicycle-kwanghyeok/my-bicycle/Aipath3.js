import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Aipath3({ route }) {
    const navigation = useNavigation();
    const { sidoName: sidoName, sigunguName: sigunguName } = route.params;
    const [ preference, setPreference ] = useState('');

    const handleBackPress = () => {
        navigation.navigate('Aipath2');
    };

    const handleDayPress = () => {
        setPreference('낮');
        navigation.navigate('Aipath4', { sidoName: sidoName, sigunguName: sigunguName,
        preference: '낮' });
    };

    const handleNightPress = () => {
        setPreference('밤');
        navigation.navigate('Aipath4', { sidoName: sidoName, sigunguName: sigunguName,
        preference: '밤' });
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image
                        source={require('./src/뒤로가기.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
                <View style={styles.textBackground}>
                    <Text style={styles.Text1}> 주로 라이딩하는
                        <Text style={styles.AIText}> 시간</Text>
                        은?
                    </Text>
                </View>
                <Text style={styles.text2}>
                낮☀, 밤🌙 중에 주로 라이딩하는{'\n'}시간을 알려주세요!</Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleDayPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>낮</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNightPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>밤</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0C1320',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        top: '10%',

    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        left: '0%',
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        top: '-30%',
        flexDirection: 'column',
    },
    button: {
        margin: 10,
        width: 326,
        height: 60,
        backgroundColor: '#313A4B',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: '-10%',
    },

    Text1: {
        color: '#FFFFFF',
        fontSize: 23
    },
    text2: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 40, //텍스트 줄 간격
    },
    AIText: {
        color: '#007FFF',  // 파랑색 RGB 코드
        fontSize: 25,
    },
    textBackground: {
        backgroundColor: '#313A4B',  // 배경색 설정
        borderRadius: 10,  // 모서리 둥글게 (원하는 대로 조정)
        padding: 10, 
      },
});

export default Aipath3;