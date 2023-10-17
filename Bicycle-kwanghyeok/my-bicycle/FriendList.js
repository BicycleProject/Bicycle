import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function FriendList() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('MainScreen');
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
    const handleridingwithPress = () => {
        console.log('같이 타기')
    };
    const handleAddPress = () => {
        navigation.navigate('FriendAdd');
    };
    const buttons = [
        { image: require('./src/버튼1.png'), onPress: handleButton1Press },
        { image: require('./src/버튼2.png'), onPress: handleButton2Press },
        { image: require('./src/버튼3.png'), onPress: handleButton3Press },
        { image: require('./src/버튼4.png'), onPress: handleButton4Press },
    ];
    const friends = [
        { name: '서수찬', image: require('./src/ad.png') },
        { name: '송인호', image: require('./src/ad2.png') },
        { name: '최광혁', image: require('./src/ad3.png') },
        { name: '강희연', image: require('./src/img_after_zzim.png') },
        // ... 추가로 필요한 친구 정보 입력 ...
    ];


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./src/뒤로가기.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.Text}>친구목록</Text>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./src/돋보기.png')} style={[styles.backButtonImage, { marginLeft: 280 }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={handleAddPress}>
                    <Image source={require('./src/img_add_friend.png')} style={[styles.backButtonImage, { marginLeft: 70 }]} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {friends.map((friend, index) => (
                    <View key={index} style={styles.friendContainer}>
                        <Image source={friend.image} style={styles.friendImage} />
                        <Text style={styles.friendName}>{friend.name}</Text>
                        <TouchableOpacity onPress={handleridingwithPress} style={styles.joinButton}>

                            <Text style={{ color: '#ffffff' }}>같이타기</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

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
    scrollView: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    friendImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },

    friendName: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    joinButton: {
        marginLeft: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#007FFF',
        width: 75,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default FriendList;