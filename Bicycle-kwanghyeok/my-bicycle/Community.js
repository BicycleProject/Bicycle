import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

// 댓글 창 부분 함수
function Comment({ username, text, commentCount, viewCount, timeAgo }) {
    return (
        <View style={styles.commentContainer}>
            <Text style={styles.commentUsername}>{username}</Text>
            <Text style={styles.commentText}>{text}</Text>
            <View style={styles.commentInfoContainer}>
                <Text>{commentCount} 댓글</Text>
                <Text>{viewCount} 조회수</Text>
                <Text>{timeAgo} 전</Text>
            </View>
            
        </View>
    );
}

export default function Community({ navigation }) {
    const [selectedPreference, setSelectedPreference] = useState('');

    return (

        <View style={styles.container}>
            <View style={styles.sectionContainer}>

                {/* 위쪽 좌측 부분 */}
                <View style={styles.upperSection1}>
                    <Image source={require('./src/user.png')} style={styles.image} />
                    <Text style={styles.name}>최광혁</Text>
                    <TouchableOpacity style={styles.nickname} onPress={() => navigation.navigate('other')}>
                        <Text>닉네임 수정 {'>'}</Text>
                    </TouchableOpacity>
                </View>

                {/* 위쪽 우측 부분 */}
                <View style={styles.upperSection1}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('mynews')}>
                        <Text style={styles.buttonText}>내소식</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('mywrite')}>
                        <Text style={styles.buttonText}>작성 게시글</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('mycomments')}>
                        <Text style={styles.buttonText}>작성 댓글</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionContainer2}>
                <View style={styles.lowerSection}>
                <ScrollView style={styles.scrollSection} showsVerticalScrollIndicator={false}>
                    <Comment 
                        text="자전거 효율적으로 타는 방법" 
                        commentCount="5" 
                        viewCount="100" 
                        timeAgo="10분"
                    />

                    <Comment 
                        text="자전거 수리방법" 
                        commentCount="3" 
                        viewCount="5" 
                        timeAgo="1분"
                    />
                    <Comment 
                        text="자전거 판매" 
                        commentCount="2" 
                        viewCount="13" 
                        timeAgo="15분"
                    />
                    <Comment 
                        text="거치대 설치 방법" 
                        commentCount="20" 
                        viewCount="106" 
                        timeAgo="1분"
                    />
                    <Comment 
                        text="어떻게 설치하나요??" 
                        commentCount="5" 
                        viewCount="106" 
                        timeAgo="20분"
                    />
                    <Comment 
                        text="삼천리자전거 수리문의" 
                        commentCount="3" 
                        viewCount="156" 
                        timeAgo="10분"
                    />
                </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    // 사용자 프로필 부분 css
    button: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
        // 버튼 밑에 선을 긋는 코드
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },

    buttonText: {
        color: 'gray',
        fontSize: 15,

    },

    name: {
        fontSize: 25,
        marginBottom: 2,
        marginTop: 5
    },

    nickname: {
        marginBottom: 25,
        marginLeft: 5
    },

    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginTop: 30
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionContainer: {
        // 상단 두개로 나눠주는 코드
        flexDirection: 'row',
        justifyContent: 'space-between',

        // ------
        width: '93%',
        height: '30%',
    },


    // 커뮤니티 부분 css
    sectionContainer2: {
        width: '93%',
        height: '65%'
    },

    scrollSection: {
        width: '88%',
    },

    upperSection1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        margin: 10
    },

    lowerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },

    // 커뮤니티 게시글 css
    commentContainer: {
        flexDirection: 'column',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    
    commentText:{
        marginBottom: 2,
        paddingBottom : 5,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    commentInfoContainer: {
        paddingBottom : 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
