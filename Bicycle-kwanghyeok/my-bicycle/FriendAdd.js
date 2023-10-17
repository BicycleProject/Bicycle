import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, Dimensions, Image, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function FriendList() {
    const navigation = useNavigation();
    const [emailInputValue, setEmailInputValue] = useState('');
    const [userProfileData, setUserProfileData] = useState(null);

    const handleBackPress = () => {
        navigation.navigate('FriendList');
    };

    const handleButton1Press = () => {
        navigation.navigate('Community');
    };

    const handleButton2Press = () => {
        navigation.navigate('ChattingList');
    };

    const handleButton3Press = () => {
        navigation.navigate('FriendList');
    };

    const handleButton4Press = () => {
        navigation.navigate('Posting');
    };
    const handleClearInput = () => {
        setEmailInputValue('');
    };

    const buttons = [
        { image: require('./src/버튼1.png'), onPress: handleButton1Press },
        { image: require('./src/버튼2.png'), onPress: handleButton2Press },
        { image: require('./src/버튼3.png'), onPress: handleButton3Press },
        { image: require('./src/버튼4.png'), onPress: handleButton4Press },
    ];
    const handleSearchPress = async () => {
        // 여기서 실제로는 서버에 요청하여 검색 결과를 받아와야 합니다.
        // 아래는 임시적인 예시입니다.
        const userDataFromServer = {
            name: '서수찬',
            profileImage: require('./src/ad.png'),  // 실제 이미지 경로
        };
        setUserProfileData(userDataFromServer);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./src/뒤로가기.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.Text}>친구목록</Text>
                
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.emailInput}
                    onChangeText={(text) => setEmailInputValue(text)}
                    value={emailInputValue}
                    placeholder="이메일 검색"
                    placeholderTextColor="#FFFFFF"
                />
                {emailInputValue ? (
                    <TouchableOpacity onPress={handleClearInput} style={styles.clearButton}>
                        <Text style={{ color: '#FFFFFF' }}>X</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            <TouchableOpacity onPress={handleSearchPress} style={styles.searchButton}>
                <Text style={{ color: '#FFFFFF' }}>검색</Text>
            </TouchableOpacity>

            {userProfileData ? (
                <View style={styles.profileContainer}>
                    <Image source={userProfileData.profileImage} style={styles.profileImage} />
                    <Text style={styles.profileName}>{userProfileData.name}</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.addButton}>
                        <Text style={{ color: '#FFFFFF' }}>친구 추가</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                emailInputValue &&
                (<Text style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>일치하는 이메일이 없습니다.</Text>)
            )}
            <View style={{ flex: 1 }}></View>

            <View style={styles.buttonContainer}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={button.onPress}>
                        <Image
                            source={button.image}
                            style={{ width: 40, height: 40 }} // 이미지 크기는 원하는 대로 조절하세요.
                            resizeMode="contain" />
                        <Text style={styles.buttonText}>{button.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        left: '0%',
        backgroundColor: '#0C1320',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 30,
        top: '5%',

    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        left: '-50%',
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    Text: {
        position: 'absolute',
        width: 73,
        height: 24,
        left: '48%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },


    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,


    },
    button: {
        backgroundColor: '#0C1320',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emailInput: {
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    emailInput: {
        flex: 1,
        height: 40,
        color: '#FFFFFF',
        paddingRight: 10, // 여기서 변경되었습니다.
    },
    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555555',
        borderRadius: 10,
        width: 20,
        height: 20,
        marginLeft: 5
    },
    searchButton: {
        backgroundColor: '#007FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    profileContainer: {
        top: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65
    },
    profileName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    addButton: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 50
    }
});

export default FriendList;