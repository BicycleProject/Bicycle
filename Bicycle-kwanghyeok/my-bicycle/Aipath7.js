import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)

    // 이전 화면에서 전달된 선호 시간 (낮/밤), 목적 (운동/나들이), 동행자 정보 및 라이딩 등급
    const { timePreference, purpose, companion, level, roadType } = route.params;

    // 처음으로 돌아가서 다시시작
    const handlePress1 = () => {
        navigation.navigate(' ');
    };

    const handlePress2 = () => {
        // 여기에 ai 분석 결과를 디비에 넣는 코드를 적어야함.
    }

    // 서버에 보낼 GPT에 물어볼 문장 변수 ask_AI 선언.
    const ask_AI = timePreference + " " + purpose + " " +
        companion + " " + level + " " + roadType;


    /*
       useEffect 훅을 사용하여 
       컴포넌트가 렌더링 될때마다 특정 작업을 수행하도록 설정하는 훅이다.
       ask_AI 변수를 서버에 자동으로 POST 요청을 보내는 코드
   */
    useEffect(() => {
        fetch('', {  // Spring Boot 서버의 주소
            method: 'POST', // POST 방식으로 보내기
            headers: {
                'Content-Type': 'application/json', // JSON 형식임을 나타냄
            },
            body: JSON.stringify({ // ask_AI 변수를 JSON 형식으로 변환
                question: ask_AI,
            }),
        })
            .then((response) => response.json()) // 본문 내용을 JSON형식으로 파싱
            .then((data) => { // 파싱된 데이터에 대해 작업하는 콜백함수
                console.log('Success:', data);
                // 이 부분에서 데이터 처리 또는 다른 화면으로의 네비게이션 등이 이루어질 수 있습니다.
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);  // 빈 배열([])을 전달하여 컴포넌트가 처음 마운트 될 때만 실행되도록 합니다.



    return (
        <View>
            <View style={styles.container}>
                <Image source={require('./src/user.png')} style={styles.image} />
                <Text style={styles.firsttext}>최광혁 님의 성향은</Text>
                <Text style={styles.firsttext}></Text>
                <Text style={styles.f1text}>{ask_AI}</Text>
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

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    secondtext: {
        color: 'white'
    }
});