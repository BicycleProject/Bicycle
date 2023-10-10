import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



export default function Aipath({ route, navigation }) { // 컴포넌트가 받아오는 props (정보, 다음화면)

    const { timePreference, purpose } = route.params; // 이전 화면에서 전달된 선호 시간 (낮/밤)과 목적 (운동/나들이)
    const [selectedCompanion, setSelectedCompanion] = useState('');

    const handleSoloPress = () => {
        setSelectedCompanion('솔로');
        navigation.navigate('     ', { timePreference: timePreference , purpose: purpose , companion: '혼자 탈거야' }); 
    };

    const handleFamilyPress = () => {
        setSelectedCompanion('가족');
        navigation.navigate('     ', { timePreference: timePreference , purpose: purpose , companion: '가족과 탈거야' });
    };

    const handleCouplePress = () => {
        setSelectedCompanion('커플');
        navigation.navigate('     ', { timePreference: timePreference , purpose: purpose , companion: '남자/여자친구와 탈거야' });
    };

    const handleFriendsPress = () => {
        setSelectedCompanion('친구');
        navigation.navigate('     ', { timePreference: timePreference , purpose: purpose , companion: '친구와 탈거야' });
    };

    const handleClubPress = () => {
        setSelectedCompanion('동호회');
        navigation.navigate('     ', { timePreference: timePreference , purpose: purpose , companion: '동호회가 탈만한' });
    };


  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.firsttext}>누구와 함께하고 싶나요?</Text>
            <Text style={styles.fftext}>혼자도 괜찮아요!</Text>
            <Text style={styles.fftext}>같이 어플을 사용할 사람들을 눌러주세요!</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonText} onPress={handleSoloPress}>
                <Text style={styles.secondtext}>솔로</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleFamilyPress}>
                <Text style={styles.secondtext}>가족</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleCouplePress}>
                <Text style={styles.secondtext}>커플</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleFriendsPress}>
                <Text style={styles.secondtext}>친구</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
            <TouchableOpacity style={styles.buttonText} onPress={handleClubPress}>
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