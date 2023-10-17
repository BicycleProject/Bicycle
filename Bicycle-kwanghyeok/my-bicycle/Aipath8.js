import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function Aipath8({ route }) {
    const navigation = useNavigation();
    // 이전 화면들에서 전달된 정보
    const { sidoName: sidoName, sigunguName: sigunguName, preference: preference,
        purpose: purpose, companion: companion, level: level, roadtype: roadtype } = route.params;

    const handleBackPress = () => {
        navigation.navigate('Aipath7');
    };
    const handleMainPress = () => {
        navigation.navigate('MainScreen');
    };

    const handleRestartPress = () => {
        navigation.navigate('Aipath');
    };

    const handleStartPress = async () => {
        navigation.navigate('MainScreen');

        try {
            let response = await axios.post(
                'http://10.20.104.109:8088/api/save-response',
                {
                    response: aiResponse
                },
            );

            if (response.data.message === 'Data saved successfully.') {
                console.log("Data has been saved to the database.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const userName = '서수찬';

    // 서버에 보낼 GPT에 물어볼 문장 변수 ask_AI 선언.
    const ask_AI = sidoName + " " + sigunguName + " " + preference + "에 " + purpose + "목적으로 " +
        companion + "와(과) " + level + " 코스 " + roadtype +
        " 1곳을 실제 도로명이나 상세한 지역 정보로 알려줘";
    console.log(ask_AI);

    const [aiResponse, setAiResponse] = useState(null);

    useEffect(() => {
        async function getAIResponse() {
            try {
                let response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-3.5-turbo',
                        messages: [{
                            role: 'user',
                            content: ask_AI,
                        }],
                    },
                    {
                        headers: {
                            Authorization: `Bearer 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`,
                            ContentType: 'application/json'
                        }
                    }
                );
                setAiResponse(response.data.choices[0].message.content);
            } catch (error) {
                console.error(error);
            }
        };
        if(!aiResponse){ // aiResponse가 null인 경우에만 요청 보내도록 함
            getAIResponse();
        }
    }, []); // 의존성 배열을 빈 배열([])로 설정하여 한 번만 실행되도록 함

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image
                        source={require('./src/뒤로가기.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} onPress={handleMainPress}>
                    <Image
                        source={require('./src/버튼1.png')}
                        style={styles.mainButtonImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#1E58BF', borderRadius: 20, paddingHorizontal: 8 }}>
                        <Text style={[styles.profileText, { fontWeight: 'bold' }]}>{`${userName}`}</Text>
                    </View>
                    <Text style={styles.profileText}> 님의 성향은?</Text>
                </View>


            </View>
            <View style={styles.ScrollViewContainer}>

                <ScrollView>
                    <Text style={styles.text2}>{aiResponse}</Text>
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRestartPress}>
                    <View style={styles.button2}>
                        <Text style={styles.ButtonText}>다시하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStartPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>저장하기</Text>
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
    mainButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        right: '10%',
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    mainButtonImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        top: '-20%',
    },
    button: {
        width: 160,
        height: 60,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    button2: {
        width: 160,
        height: 60,
        backgroundColor: '#313A4B',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
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
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: '-10%',
    },
    ScrollViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: '-10%',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    profileText: {
        color: '#FFFFFF',
        fontSize: 23
    },
    text2: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 30, //텍스트 줄 간격
    },
    AIText: {
        color: '#1E58BF',  // 파랑색 RGB 코드
        fontSize: 25,
    },

});

export default Aipath8;