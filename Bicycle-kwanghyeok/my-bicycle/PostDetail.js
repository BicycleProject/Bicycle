import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet, Dimensions, Image, FlatList,
    KeyboardAvoidingView } from 'react-native'; // 여기에 KeyboardAvoidingView 추가
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import beforeLike from './src/img_before_like.png';
import afterLike from './src/img_after_like.png';

const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const screenHeight = Dimensions.get('window').height; // 화면 세로 크기를 가져옴



function PostDetail({ route }) {
    const post = route.params.post;

    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount); // like count 상태 추가
    const [comments,setComments] = useState([]);
    const [newCommentText,setNewCommentText] = useState('');
    const [username, setUsername] = useState('');


    
    useEffect(() => {
        (async () => {
            try {
                const userId = await AsyncStorage.getItem('userid');
    
                // 백엔드에서 사용자의 좋아요 상태를 가져옴
                const response = await axios.get(`http://10.20.102.175:8082/likeStatus`, { params: { postId: post._id, userId } });
    
                if (response.status === 200) {
                    setLiked(response.data.liked);  // 백엔드로부터 받은 '좋아함' 상태로 업데이트
                    setLikeCount(response.data.likeCount);  // '좋아요' 수 업데이트 
                }
            } catch (error) {
                console.error(error);
            }
        })();
        fetchComments();  // 페이지가 로드될 때 해당 게시글의 댓글들을 가져옴
    }, []);



    const handleBackPress = () => {
        navigation.navigate('Community');
    };


    const handleLike = async () => {
        try {
            const userId = await AsyncStorage.getItem('userid');
    
            // '좋아요' 상태와 카운트를 먼저 변경
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    
            const response = await axios.post(`http://10.20.102.175:8082/like`, { postId: post._id, userId });
    
            if (response.status !== 200) {
                throw new Error("Failed to like/unlike the post");
            }
        } catch (error) {
            console.error(error);
            // 에러 발생 시 '좋아요' 상태와 카운트를 원래대로 복구
            setLiked(liked);
            setLikeCount(liked ? likeCount + 1 : likeCount - 1);
        }
    };

    // 시간 차이 계산 함수
    const calculateTimeDiff = (date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        } else if (diffInSeconds < 3600) { // 60 * 60
            return `${Math.floor(diffInSeconds / 60)}분 전`;
        } else if (diffInSeconds < 86400) { // 60 * 60 * 24
            return `${Math.floor(diffInSeconds / 3600)}시간 전`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)}일 전`;
        }
    };
    
    // 댓글 작성 이벤트 핸들러
    const handleCommentSubmit = async () => {
        try{
            const userId= await AsyncStorage.getItem('userid');
            await axios.post(`http://10.20.102.175:8082/comments`, { postId: post._id , userId , content:newCommentText });
            
            setNewCommentText('');
            fetchComments();  // 새로운 댓글 작성 후 다시 댓글 목록 갱신

        }catch(error){
            console.error(error);
        }
    };

        //유저이름 가지고와야함
    const fetchUsername = async () => {
        try {
            const userId= await AsyncStorage.getItem('userid');
            
            const response = await axios.get(`http://10.20.102.175:8082/username?userId=${userId}`);
            
            if (response.status === 200) {
                return response.data.username;
                
            } else {
                throw new Error('Failed to fetch username');
                
            }
        } catch (error) { 
            console.error(error);
        }
    };

    // 댓글을 가져오는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://10.20.102.175:8082/comments?postId=${post._id}`);
            
            if (response.status === 200) {
                const commentsWithUsername = await Promise.all(
                    response.data.map(async (comment) => {
                        const username = await fetchUsername(comment.userId);
                        return { ...comment, username };
                    })
                );
                
                setComments(commentsWithUsername);
            }
        } catch (error) {
            console.error(error);
        }
    };


    
    useEffect(() => {
        (async () => {
            const fetchedUsername = await fetchUsername();  // fetchUsername() 함수의 반환값 저장
            setUsername(fetchedUsername);  // username 상태 업데이트
        })();
    }, []);

    // 페이지가 로드될 때 해당 게시글의 댓글들을 가져옴
    useEffect(() => {
        fetchComments();
    }, []);


    //댓글 수정
    const handleEditComment = async (commentId, newContent) => {
        try{
            await axios.patch(`http://10.20.102.175:8082/comments/${commentId}`, { content: newContent });
    
            fetchComments();  // 코멘트가 수정된 후 다시 코멘트 목록 갱신
        }catch(error){
            console.error(error);
        }
    };

    //댓글 삭제
    const handleDeleteComment = async (commentId) => {
        try{
            await axios.delete(`http://10.20.102.175:8082/comments/${commentId}`);
    
            fetchComments();  // 코멘트가 삭제된 후 다시 코멘트 목록 갱신
        }catch(error){
            console.error(error);
        }
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
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ backgroundColor: '#D9D9D9', borderRadius: 8, padding: 3 }}>
                        <Text style={[{ color: '#000000', fontSize: 16 }]}>{post.title}</Text>
                    </View>
                </View>
                <Text style={[{ color: '#ffffff', fontSize: 20 }]}>{post.author}</Text>
                <Text style={[{ color: '#ffffff' }]}>{post.time}</Text>

                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {post.imageUrls.map((imageUrl, index) => (
                        <Image
                            key={index}
                            source={{ uri: 'http://10.20.102.175:8082/' + imageUrl }}
                            resizeMode="contain"
                            style={{ width: screenWidth, height: screenHeight * 0.3 }}
                        />
                    ))}
                </ScrollView>
                <Text style={[styles.content, { color: '#ffffff', fontSize: 18 }]}>{post.content}</Text>

            </ScrollView>
            <View style={styles.commentsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={handleLike}>
                    <Image source={liked ? afterLike : beforeLike} resizeMode="contain"
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
                    data={comments}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>{item.username}</Text>
                            <Text style={{ color:'#A5A5A5', fontSize :12 , marginLeft :10}}>{calculateTimeDiff(item.createdAt)}</Text>
                            </View>
                            <Text style={{ color: '#ffffff', fontSize: 14 }}>{item.content}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newCommentText}
                    onChangeText={setNewCommentText}
                    placeholder="댓글을 입력하세요..."
                    placeholderTextColor="#ffffff"
                    onSubmitEditing={handleCommentSubmit}   // '작성하기' 버튼 클릭 시 handleCommentSubmit 함수 실행
                />
                <Button title="작성하기" onPress={handleCommentSubmit} />
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
        top: -10,

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

    row:{
        flexDirection: 'row',
    }
});

export default PostDetail;