import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

function Community() {
    const navigation = useNavigation();
    const [selectedMenu, setSelectedMenu] = useState('인기');// 초기값 설정
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

    const [posts, setPosts] = useState([]);  // 초기 상태를 빈 배열로 설정합니다.

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 'http://10.20.100.29:8082/posts' 는 실제 서버 주소와 엔드포인트로 변경해야 합니다.
                const response = await axios.get('http://10.20.100.29:8082/posts');
                
                if (response.status === 200) {  // HTTP 요청이 성공한 경우
                    setPosts(response.data);  // 받아온 데이터로 'posts' 상태 업데이트
                } else {  // HTTP 요청이 실패한 경우
                    console.error('Failed to fetch posts:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
    
        fetchPosts();  // useEffect 내부에서 직접 호출
    
    }, []);  // 빈 의존성 배열을 넣어 컴포넌트 마운트 시 한 번만 실행
    

    const contents = {
        '인기': (
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                    <View style={[styles.postItem, { flexDirection: 'column' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexShrink: 1 }}>
                                <Text style={[styles.postTitle, { color: '#FFEB81' }]}>{item.title}</Text>
                                <Text
                                    numberOfLines={3}
                                    ellipsizeMode='tail' //3줄넘어가면 ...으로 표시
                                    style={styles.postContent}>{item.content}</Text>
                            </View>
                            <View>
                                {item.imageUrls && item.imageUrls.length > 0 &&
                                    <Image
                                        source={{ uri: 'http://10.20.100.29:8082/' + item.imageUrls[0] }}
                                        style={{ width: 110, height: 110, borderRadius: 30 }}
                                        resizeMode="contain"
                                    />
                                }
                                {item.imageUrls && item.imageUrls.length > 1 &&
                                    <View style={styles.moreImagesIndicator}>
                                        <Text style={styles.moreImagesText}>+{item.imageUrls.length - 1}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                            <Text style={{ marginRight: 10 , color: '#ffffff'}}>{item.author}</Text>
                            <Text style={{ marginRight: 10, color: '#ffffff'}}>
                                {new Date(item.createdAt).toLocaleTimeString('ko-KR', { hour12: true, hour: '2-digit', minute:'2-digit' })}
                            </Text>
                            <Text style={{color: '#ffffff'}}>{"♥ " + item.likeCount}</Text>
                        </View>
                                
                    </View>
                    </TouchableOpacity>
                )}
            />
        ),
        '오늘의 라이딩일기': (
            <FlatList
            data={posts.filter((item) => item.title === '오늘의 라이딩 일기')}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                <View style={[styles.postItem, { flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={[styles.postTitle, { color: '#FFEB81' }]}>{item.title}</Text>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode='tail' //3줄넘어가면 ...으로 표시
                                style={styles.postContent}>{item.content}</Text>
                        </View>
                        <View>
                            {item.imageUrls && item.imageUrls.length > 0 &&
                                <Image
                                    source={{ uri: 'http://10.20.100.29:8082/' + item.imageUrls[0] }}
                                    style={{ width: 110, height: 110, borderRadius: 30 }}
                                    resizeMode="contain"
                                />
                            }
                            {item.imageUrls && item.imageUrls.length > 1 &&
                                <View style={styles.moreImagesIndicator}>
                                    <Text style={styles.moreImagesText}>+{item.imageUrls.length - 1}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                        <Text style={{ marginRight: 10 , color: '#ffffff'}}>{item.author}</Text>
                        <Text style={{ marginRight: 10, color: '#ffffff'}}>
                            {new Date(item.createdAt).toLocaleTimeString('ko-KR', { hour12: true, hour: '2-digit', minute:'2-digit' })}
                        </Text>
                        <Text style={{color: '#ffffff'}}>{"♥ " + item.likeCount}</Text>
                    </View>
                            
                </View>
                </TouchableOpacity>
            )}
        />
        ),
        '같이타요': (
            <FlatList
            data={posts.filter((item) => item.title === '같이타요')}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                <View style={[styles.postItem, { flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={[styles.postTitle, { color: '#FFEB81' }]}>{item.title}</Text>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode='tail' //3줄넘어가면 ...으로 표시
                                style={styles.postContent}>{item.content}</Text>
                        </View>
                        <View>
                            {item.imageUrls && item.imageUrls.length > 0 &&
                                <Image
                                    source={{ uri: 'http://10.20.100.29:8082/' + item.imageUrls[0] }}
                                    style={{ width: 110, height: 110, borderRadius: 30 }}
                                    resizeMode="contain"
                                />
                            }
                            {item.imageUrls && item.imageUrls.length > 1 &&
                                <View style={styles.moreImagesIndicator}>
                                    <Text style={styles.moreImagesText}>+{item.imageUrls.length - 1}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                        <Text style={{ marginRight: 10 , color: '#ffffff'}}>{item.author}</Text>
                        <Text style={{ marginRight: 10, color: '#ffffff'}}>
                            {new Date(item.createdAt).toLocaleTimeString('ko-KR', { hour12: true, hour: '2-digit', minute:'2-digit' })}
                        </Text>
                        <Text style={{color: '#ffffff'}}>{"♥ " + item.likeCount}</Text>
                    </View>
                            
                </View>
                </TouchableOpacity>
            )}
        />
        ),
        '경로추천': (
            <FlatList
            data={posts.filter((item) => item.title === '경로추천')}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                <View style={[styles.postItem, { flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={[styles.postTitle, { color: '#FFEB81' }]}>{item.title}</Text>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode='tail' //3줄넘어가면 ...으로 표시
                                style={styles.postContent}>{item.content}</Text>
                        </View>
                        <View>
                            {item.imageUrls && item.imageUrls.length > 0 &&
                                <Image
                                    source={{ uri: 'http://10.20.100.29:8082/' + item.imageUrls[0] }}
                                    style={{ width: 110, height: 110, borderRadius: 30 }}
                                    resizeMode="contain"
                                />
                            }
                            {item.imageUrls && item.imageUrls.length > 1 &&
                                <View style={styles.moreImagesIndicator}>
                                    <Text style={styles.moreImagesText}>+{item.imageUrls.length - 1}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                        <Text style={{ marginRight: 10 , color: '#ffffff'}}>{item.author}</Text>
                        <Text style={{ marginRight: 10, color: '#ffffff'}}>
                            {new Date(item.createdAt).toLocaleTimeString('ko-KR', { hour12: true, hour: '2-digit', minute:'2-digit' })}
                        </Text>
                        <Text style={{color: '#ffffff'}}>{"♥ " + item.likeCount}</Text>
                    </View>
                            
                </View>
                </TouchableOpacity>
            )}
        />
        ),
    };

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
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => setSelectedMenu('인기')}>
                    <Text style={menuItemStyles(selectedMenu === '인기').text}>인기</Text>
                    <View style={menuItemStyles(selectedMenu === '인기').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('오늘의 라이딩일기')}>
                    <Text style={menuItemStyles(selectedMenu === '오늘의 라이딩일기').text}>오늘의 라이딩일기</Text>
                    <View style={menuItemStyles(selectedMenu === '오늘의 라이딩일기').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('같이타요')}>
                    <Text style={menuItemStyles(selectedMenu === '같이타요').text}>같이타요</Text>
                    <View style={menuItemStyles(selectedMenu === '같이타요').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('경로추천')}>
                    <Text style={menuItemStyles(selectedMenu === '경로추천').text}>경로추천</Text>
                    <View style={menuItemStyles(selectedMenu === '경로추천').underline} />
                </TouchableOpacity>
            
            </View>
            {contents[selectedMenu]}
            <View style={{ flex: 1 }} />
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
        backgroundColor: '#0C1320',
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
        color: '#ffffff',
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
    moreImagesIndicator: {
        position:'absolute',
        right:-5,
        top:-5,
        backgroundColor:'red',
        borderRadius:15,
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center'
    },
    moreImagesText:{
        color:'#fff',
        fontWeight:'bold'
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0C1320', // 원하는 배경색으로 설정
        paddingVertical: 10,

    },
});

export default Community;
