import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Aipath4({ route }) {
    const navigation = useNavigation();
    const { sidoName: sidoName, sigunguName: sigunguName, preference: preference } = route.params;
    const [ purpose, setPurpose ] = useState('');

    const handleBackPress = () => {
        navigation.navigate('Aipath3');
    };

    const handleExercisePress = () => {
        setPurpose('운동');
        navigation.navigate('Aipath5', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: '운동' });
    };

    const handleOutingPress = () => {
        setPurpose('산책');
        navigation.navigate('Aipath5', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: '산책' });

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
                    <Text style={styles.Text1}> 라이딩
                        <Text style={styles.AIText}> 목적</Text>
                        을 알려주세요!
                    </Text>
                </View>
                <Text style={styles.text2}>
                    주로 라이딩 할 때 무슨 목적으로 타고 계신가요?</Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleExercisePress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>운동</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOutingPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>산책</Text>
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
        top: '-12%',
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
        backgroundColor: '#313A4B', 
        borderRadius: 10,  
        padding: 10,  
      },
});

export default Aipath4;