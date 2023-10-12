import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet, Dimensions, Image, FlatList, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const screenHeight = Dimensions.get('window').height; // 화면 세로 크기를 가져옴

function PostDetail({ route }) {
    const post = route.params.post;

    const navigation = useNavigation();

    const [newCommentText, setNewCommentText] = useState('');

    const handleBackPress = () => {
        navigation.navigate('Community');
    };
    const handleLike = (postId) => {
        alert(`Post ${postId} liked!`);
    };

    const handleComment = (postId) => {
        alert(`Comment on post ${postId}`);

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
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

            <ScrollView style={styles.body}>

                <Text style={[{ color: '#ffffff', fontSize: 20 }]}>{post.author}</Text>
                <Text style={[{ color: '#ffffff' }]}>{post.time}</Text>

                <Image
                    source={post.image}
                    resizeMode="contain"
                    style={{ width: screenWidth, height: screenHeight * 0.3, right: 20 }} />
                <Text style={[styles.content, { color: '#ffffff', fontSize: 18 }]}>{post.content}</Text>

            </ScrollView>
            <View style={styles.commentsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => handleLike(post.id)}>
                        <Image source={require('./src/img_before_like.png')} resizeMode="contain"
                            style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    {(
                        <>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => handleComment(post.id)}>
                                    <Image source={require('./src/img_comment.png')} resizeMode="contain"
                                        style={{ width: 24, height: 24, right: 100 }} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    {post.views && (
                        <Text style={{ color: '#ffffff' }}>조회수 : {post.views}</Text>
                    )}
                </View>
                <FlatList
                    data={post.comments}
                    renderItem={({ item }) => (
                        <View style={styles.commentItem}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>{item.author}</Text>
                            <Text style={{ color: '#ffffff', fontSize: 14 }}>{item.text}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newCommentText}
                    onChangeText={text => setNewCommentText(text)}
                    placeholder="Write a comment..."
                    placeholderTextColor="#ffffff"
                />

                <Button
                    title="작성하기"
                    onPress={() => {
                        post.comments.push({
                            author: "Current User",  // 현재 사용자 이름. 실제 앱에서는 로그인한 사용자의 이름으로 대체해야 합니다.
                            text: newCommentText,
                        });
                        setNewCommentText('');  // 입력 창 초기화
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C1320',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        top: 10,
    },
    body: {
        padding: 10,
        height: screenHeight * 0.4,

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
    commentsContainer: {

        height: screenHeight * 0.25,
        padding: 10,
        marginTop: 0,
        borderTopWidth: 1,
        borderTopColor: '#ffffff',
    },
    commentItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        paddingVertical: 10,
    },
    inputContainer: {
        height: screenHeight * 0.1,

        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: '5%',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        color: '#ffffff',
    },
});

export default PostDetail;