import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const Myinfo = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userProfileImageUrl, setUserProfileImageUrl] = useState(null);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = await AsyncStorage.getItem('userid');
                const response = await axios.get(`http://10.20.100.29:8082/user/${userId}`);
                
                if (response.status === 200) {  // HTTP 요청이 성공한 경우
                    setUserProfileImageUrl(response.data.profileImageUrl);  // 받아온 데이터로 'userProfileImageUrl' 상태 업데이트
                } else {  // HTTP 요청이 실패한 경우
                    console.error('Failed to fetch user profile:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };
        
        fetchUserProfile();  // useEffect 내부에서 직접 호출
    
    }, []);


    const handlenextPress = () => {
        navigation.navigate('Main');
    };
    const handlebackPress = () => {
        navigation.navigate('MainScreen');
    };
    const handleChallengePress = () => {
        navigation.navigate('ChallengeScreen');
    };

    const handleNameClick = () => {
        if (!name) {
            setName('');
        }
    };
    const handleEmailClick = () => {
        if (!email) {
            setEmail('');
        }
    };

    const handleImageSelect = async () => {
        try {
            // 권한 확인 및 요청
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // 이미지 비율 설정
                quality: 1, // 이미지 품질 (0 ~ 1)
            });
        
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
        
                let formData = new FormData();
                    
                formData.append('profile', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'profile.jpg'
                });
    
                const userId = await AsyncStorage.getItem('userid');
        
                formData.append('userId', userId);

                try {
                    const response = await axios.post('http://10.20.100.29:8082/updateProfileImage', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    
                    if (response.status === 200) {  
                        console.log('Profile image successfully updated.');
                        setSelectedImage(response.data.profileImageUrl); // 서버에서 반환한 이미지 URL로 업데이트
                    } else {  
                        console.error('Failed to update profile image:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Failed to update profile image:', error);
                }
            }
        } catch (error) {
            console.error('Image selection error:', error);
        }
    };
    
    

    return (
        <View style={styles.mainContainer}>
            <View style={styles.group1}>
                <Text style={styles.joinText}>내 정보</Text>
                <TouchableWithoutFeedback onPress={handleImageSelect}>
                    <View style={styles.imageContainer}>
                    <Image 
                        source={userProfileImageUrl ? { uri: userProfileImageUrl } : require('./src/defultImage.png')} 
                        style={styles.img} 
                    />
                        <Text style={styles.nameText}>덤디덤디</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={handleNameClick}>
                    <View style={styles.rectangle1}>
                        <TextInput
                            style={styles.inputText}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder={!name ? 'Name' : ''}
                            placeholderTextColor="#777C89"
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleEmailClick}>
                    <View style={styles.rectangle2}>
                        <TextInput
                            style={styles.inputText}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder={!email ? 'email' : ''}
                            placeholderTextColor="#777C89"
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.group2}>
                    <TouchableOpacity onPress={handlenextPress}>
                        <View style={styles.button}>
                            <Text style={styles.SignupbuttonText}>저장하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.maskGroup}>
                <TouchableOpacity onPress={handlebackPress}>
                    <Image source={require('./src/뒤로가기.png')} style={styles.arrow} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChallengePress}>
                    <Image source={require('./src/트로피.png')} style={styles.ranking} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlebackPress}>
                    <Image source={require('./src/설정.png')} style={styles.setting} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0C1320',
        alignItems: 'center',
        justifyContent: 'center',
    },
    group1: {
        position: 'absolute',
        width: 326,
        height: 713,
        left: 12,
        top: 6,
    },
    joinText: {
        position: 'absolute',
        width: 73,
        height: 24,
        left: '48%',
        top: '10%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    rectangle1: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '50%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    rectangle2: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '62.5%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    group2: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '90%',
    },
    SignupbuttonText: {
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    button: {
        width: 326,
        height: 60,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    group3: {
        flexDirection: 'row',
        left: '10%',
        top: '240%',
    },

    inputText: {
        color: '#818181',
        top: '27%',
        left: '8%',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        letterSpacing: -0.025,
    },
    maskGroup: {
        position: 'absolute',
        width: screenWidth,
        height: 27,
        left: 39,
        top: 64,
    },
    ranking: {
        position: 'absolute',
        width: 35,
        height: 35,
        right: '27%',
        top: 0,

    },
    setting: {
        position: 'absolute',
        width: 35,
        height: 35,
        right: '15%',
        top: 0,
    },
    arrow: {
        position: 'absolute',
        width: 27,
        height: 27,
        left: 0,
        top: 0,
        transform: [{ scaleY: -1 }],
    },
    img: {
        height: 120,
        width: 120,
        borderRadius: 60,

        alignSelf: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        top: '20%',
        left: '10%',
    },
    nameText: {
        marginTop: 10, // 이미지와 텍스트 사이의 간격 조정
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold', // 글꼴 굵기를 굵게 설정

    },
});

export default Myinfo;