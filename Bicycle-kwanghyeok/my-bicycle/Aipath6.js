import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Aipath6() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('Aipath5');
    };

    const handleNextPress = () => {
        navigation.navigate('Aipath7');

    };

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
                    <Text style={styles.Text1}> 당신의
                        <Text style={styles.AIText}> 라이딩 등급 </Text>
                        을 알려주세요!
                    </Text>
                </View>
                <Text style={styles.text2}>
                초보자, 중급자, 전문가도 즐길 수 있다!</Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleNextPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>초보자</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>중급자</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>고급자</Text>
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
        top: '-8%',
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
        padding: 10,  // 텍스트와 배경 사이의 간격 (원하는 대로 조정)
        // 필요한 다른 스타일 요소들...
      },
});

export default Aipath6;