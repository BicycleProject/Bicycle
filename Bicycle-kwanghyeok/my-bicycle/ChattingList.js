import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ChattingList() {
    const navigation = useNavigation();
    const [selectedMenu, setSelectedMenu] = useState('개인');// 초기값 설정

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
        // 세 번째 버튼을 눌렀을 때 실행할 작업을 여기에 추가
    };

    const handleButton4Press = () => {
        navigation.navigate('Posting');
    };
    const menuItemStyles = (isSelected) => StyleSheet.create({
        text: {
            color: isSelected ? '#007FFF' : '#ffffff',
            fontSize: 16,
        },
        underline: {
            height: 2,
            backgroundColor: isSelected ? '#007FFF' : 'transparent',
            marginTop: 5,
        },
    });
    const buttons = [
        { image: require('./src/버튼1.png'), onPress: handleButton1Press },
        { image: require('./src/버튼2.png'), onPress: handleButton2Press },
        { image: require('./src/버튼3.png'), onPress: handleButton3Press },
        { image: require('./src/버튼4.png'), onPress: handleButton4Press },
    ];
    const chats = [
        { id: '1', name: '서수찬', avatar: require('./src/ad.png'), lastMessage: '집에보내줘...제발', lastMessageTime: '오후 7시 56분', unreadMessages: 2 },
        { id: '2', name: '송인호', avatar: require('./src/ad2.png'), lastMessage: '같이 자전거 탈래?', lastMessageTime: '오후 5시 20분', unreadMessages: 0 },
        { id: '3', name: '최광혁', avatar: require('./src/ad3.png'), lastMessage: '자전거 언제탈거에요?', lastMessageTime: '오전 8시 22분', unreadMessages: 8 },
    ];
    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChattingRoom', { chatId: item.id, userName: item.name })}>
            <Image source={item.avatar} style={styles.avatar} />
            <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <View style={styles.messageInfo}>
                <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
                {
                    item.unreadMessages > 0 &&
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unreadMessages}</Text>
                    </View>
                }
            </View> 
        </TouchableOpacity>
    );
    const contents = {
        '개인': (
            <View style={{ flex: 1 }}>
                {
                    selectedMenu === "개인" &&
                    <FlatList
                        data={chats}
                        renderItem={renderChatItem}
                        keyExtractor={(item) => item.id}
                    />
                }
            </View>
        ),
        '단체': (
            <View style={{ flex: 1 }}>
                {
                    selectedMenu === "단체" &&
                    <FlatList
                    />
                }
            </View>
        ),
    };


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./src/뒤로가기.png')} style={styles.backButtonImage}/>
                </TouchableOpacity>
                <Text style={styles.Text}>채팅방</Text>
                <TouchableOpacity>
                    <Image source={require('./src/돋보기.png')} style={styles.backButtonImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => setSelectedMenu('개인')}>
                    <Text style={menuItemStyles(selectedMenu === '개인').text}>개인</Text>
                    <View style={menuItemStyles(selectedMenu === '개인').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('단체')}>
                    <Text style={menuItemStyles(selectedMenu === '단체').text}>단체</Text>
                    <View style={menuItemStyles(selectedMenu === '단체').underline} />
                </TouchableOpacity>
            </View>
            {contents[selectedMenu]}



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
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
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
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
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
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0C1320', // 원하는 배경색으로 설정
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        // borderBottomColor: "#ddd",
        // borderBottomWidth: 1
    },

    userName: {
        fontSize: 18,
        color: "#fff"
    },

    avatar: { //프로필사진
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },

    lastMessage: { //마지막으로 주고받은 메세지
        color: "#fff",
        marginTop: 5
    },

    lastMessageTime: {//마지막으로 주고받은 메세지시간
        marginLeft: "auto",
        color: "#999"
    },
    messageInfo: {
        marginLeft: "auto",
        alignItems: "flex-end"
    },

    unreadBadge: {
        backgroundColor: "#1E58BF",
        borderRadius: 10,
        width: 40,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },

    unreadText: {
        color: "#fff",
        fontSize: 12
    }
});

export default ChattingList;