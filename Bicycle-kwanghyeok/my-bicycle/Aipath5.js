import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Aipath5({ route }) {
    const navigation = useNavigation();
    const { sidoName: sidoName, sigunguName: sigunguName, preference: preference,
    purpose: purpose } = route.params;
    const [ companion, setCompanion ] = useState('');

    const handleBackPress = () => {
        navigation.navigate('Aipath4');
    };

    const handleSoloPress = () => {
        setCompanion('솔로');
        navigation.navigate('Aipath6', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: purpose, companion: '혼자' });
    };

    const handleFriendsPress = () => {
        setCompanion('친구');
        navigation.navigate('Aipath6', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: purpose, companion: '친구' });
    };

    const handleCouplePress = () => {
        setCompanion('커플');
        navigation.navigate('Aipath6', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: purpose, companion: '남자/여자친구' });
    };

    const handleFamilyPress = () => {
        setCompanion('가족');
        navigation.navigate('Aipath6', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: purpose, companion: '가족' });
    };

    const handleClubPress = () => {
        setCompanion('동호회');
        navigation.navigate('Aipath6', { sidoName: sidoName, sigunguName: sigunguName,
            preference: preference, purpose: purpose, companion: '동호회 사람들' });
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
                    <Text style={styles.Text1}> 누구와 함께하고 싶나요?
  
                    </Text>
                </View>
                <Text style={styles.AIText}> 혼자도 괜찮아요! </Text>
                <Text style={styles.text2}> 같이 라이딩 할 사람들을 선택해주세요!</Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSoloPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>솔로</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFriendsPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>친구</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCouplePress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>커플</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFamilyPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>가족</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClubPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>동호회</Text>
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
        top: '-10%',
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
        top: '3%',
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
        marginTop: 10,
        fontSize: 20,
    },
    textBackground: {
        backgroundColor: '#313A4B',  // 배경색 설정
        borderRadius: 10,  // 모서리 둥글게 (원하는 대로 조정)
        padding: 10,  // 텍스트와 배경 사이의 간격 (원하는 대로 조정)
        // 필요한 다른 스타일 요소들...
      },
});

export default Aipath5;