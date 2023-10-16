import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Aipath8() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('Aipath7');
    };

    const handleStartPress = () => {
        navigation.navigate('MainScreen');

    };
    const handleRestartPress = () => {
        navigation.navigate('Aipath');

    };
    
    const userName = "서수찬"
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

            <View style={styles.profileContainer}>
                <Image
                    source={require('./src/ad.png')} // 사용자의 실제 프로필 이미지 URL을 입력해야 합니다.
                    style={styles.profileImage}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#1E58BF', borderRadius: 20, paddingHorizontal: 8 }}>
                        <Text style={[styles.profileText, { fontWeight: 'bold' }]}>{`${userName}`}</Text>
                    </View>
                    <Text style={styles.profileText}> 님의 성향은?</Text>
                </View>
                <Text style={styles.text2}>
                    서울숲부터 여의도까지의 아름다운 경치와 휴식 공간{'\n'}
                    을 제공하는 고급 자전거 경로를 추천합니다</Text>
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
    backButtonImage: {
        width: 30,
        height: 30,
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