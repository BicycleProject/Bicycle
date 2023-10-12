import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Community() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('MainScreen');
    };

    const handleButton1Press = () => {
        // 첫 번째 버튼을 눌렀을 때 실행할 작업을 여기에 추가
    };

    const handleButton2Press = () => {
        // 두 번째 버튼을 눌렀을 때 실행할 작업을 여기에 추가
    };

    const handleButton3Press = () => {
        // 세 번째 버튼을 눌렀을 때 실행할 작업을 여기에 추가
    };

    const handleButton4Press = () => {
        navigation.navigate('Posting');
    };

    const buttons = [
        { image: require('./src/버튼1.png'), onPress: handleButton1Press },
        { image: require('./src/버튼2.png'), onPress: handleButton2Press },
        { image: require('./src/버튼3.png'), onPress: handleButton3Press },
        { image: require('./src/버튼4.png'), onPress: handleButton4Press },
    ];
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: '첫 번째 게시글',
            content: '첫 번째 게시글 내용입니다.',
            image: require('./src/AI경로추천.png'),
            author: '작성자1',
            time: '2023-10-10 23:48', // 실제 앱에서는 현재 시간을 자동으로 가져오는 방식을 사용해야 합니다.
            views: 123,
            comments: [
                { author: "서수찬", text: "앙기모띠" },
                { author: "강희연", text: "안녕하세요" },
                { author: "최광혁", text: "잘보고갑니다" },
                { author: "송인호", text: "ㄷㅊ" },
                { author: "서수찬", text: "기모띠기모띠기모띠기모띠" },
                { author: "강희연", text: "기모띠기모띠기모띠기모띠기모띠" },
              ],
        },
        {
            id: 2,
            title: '두 번째 게시글',
            content: '두 번째 게시글 내용입니다.두 번째 게시글 내용입니다.두 번째 게시글 내용입니다.두 번째 게시글 내용입니다.두 번째 게시글 내용입니다.',
            image: require('./src/ad2.png'),
            author: '작성자2',
            time: '2023-10-10 23:48', 
            views: 811,
            comments: [
                { author: "서수찬", text: "앙기모띠" },
              ],
        },
        { 
            id: 3,
            title: '세 번째 게시글',
            content: '세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.세 번째 게시글 내용입니다.',
            image: require('./src/ad3.png') ,
            author: '작성자3',
            time: '2023-10-10 23:48',
            views: 1,
            comments: [
                { author: "서수찬", text: "앙기모띠" },
              ],

        },
        { id: 4, title: '네 번째 게시글', content: '네 번째 게시글 내용입니다.', image: require('./src/ad3.png') },

        // 원하는 만큼 게시글 데이터를 추가하세요.
    ]);

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}>
                    <Image
                        source={require('./src/뒤로가기.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
                <Image
                    source={require('./src/logo.png')}
                    style={styles.logoImage}
                />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}>
                    <Image
                        source={require('./src/돋보기.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                     <View style={[styles.postItem, { flexDirection: 'column' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexShrink: 1 }}>
                                <Text style={[styles.postTitle, { color: 'red' }]}>{item.title}</Text>
                                <Text
                                    numberOfLines={3}
                                    ellipsizeMode='tail' //3줄넘어가면 ...으로 표시
                                    style={styles.postContent}>{item.content}</Text>
                            </View>
                            <Image
                                source={item.image}
                                style={{ width: 110, height: 110, borderRadius: 30 }}
                                resizeMode="contain" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                            <Text style={{ marginRight: 10 }}>{item.author}</Text>
                            <Text style={{ marginRight: 10 }}>{item.time}</Text>
                            <Text>조회 {item.views}</Text>
                        </View>

                    </View>
                    </TouchableOpacity>
                )}
            />
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
        backgroundColor: '#0C1320',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        top: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    postItem: {
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10,
        borderRadius: 8,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postContent: {
        fontSize: 16,
        marginTop: 5,
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
});

export default Community;
