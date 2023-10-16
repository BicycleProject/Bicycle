import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ChattingRoom({ route }) {
    const navigation = useNavigation();
    const { chatId, userName } = route.params;

    const handleBackPress = () => {
        navigation.navigate('ChattingList');
    };
    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        // 메시지 전송 처리
        console.log(messageText);
        setMessageText('');
    };
    // const [messages, setMessages] = useState([    //에시데이터 말고 이렇게 바꿔야함!!!!!!!!!!!!!!!!!!
    //     // 선택한 채팅방의 메시지 데이터
    //     // ...
    // ]);
    const renderMessageItem = ({ item }) => {
        // 텍스트를 15자씩 분할
        const chunks = item.text.match(/.{1,15}/g);
        // 분할된 부분들 사이에 줄바꿈 문자 추가
        const formattedText = chunks.join('\n');

        return (
            <View style={[styles.messageItem, item.isMine ? styles.myMessage : styles.otherMessage]}>
                <Text>{formattedText}</Text>
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
            </View>
        );
    };

    const messages = [
        { id: '1', text: '자전거 언제타요?', timestamp: 1634290200000, isMine: true },
        { id: '2', text: '오늘오후두시에 타실래요?', timestamp: 1634290210000, isMine: false },
        { id: '3', text: '네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네네', timestamp: 1634290220000, isMine: true },
        { id: '4', text: '네네네네네네네네네네네네네네네네네네네네', timestamp: 1634290230000, isMine: false },
        // 예시 데이터
    ];
    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./src/뒤로가기.png')} style={styles.backButtonImage}/>
                </TouchableOpacity>
                <Text style={styles.Text}>{userName}</Text>
                <TouchableOpacity>
                    <Image source={require('./src/img_menubar.png')} style={styles.backButtonImage}/>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ marginTop: 20 }}
                data={messages.sort((a, b) => a.timestamp - b.timestamp)}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.inputContainer}>
                 <TouchableOpacity>
                <Image source={require('./src/img_plus2.png')} style={{width: 20,height: 20,borderRadius:5}} />
                </TouchableOpacity>
                <TextInput
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="메시지를 입력하세요"
                    style={styles.sendbutton}
                />
                {/* 입력한 내용이 없으면 전송버튼 비활성화 */}
                <Button title="전송" onPress={handleSendMessage} disabled={!messageText} /> 
            </View>

        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        left: '0%',
        backgroundColor: '#0C1320',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
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
        left: '45%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    messageItem: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    myMessage: {
        backgroundColor: "#d9f7be",
        alignSelf: "flex-end",
        marginRight: 20

    },
    otherMessage: {
        backgroundColor: "#f0f5f5",
        alignSelf: "flex-start",
        marginLeft: 20
    },
    timestamp: {
        fontSize: 10,
        color: '#888',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
    },

    sendbutton: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
    },
});

export default ChattingRoom;