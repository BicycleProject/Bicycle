import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions,
StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const screenHeight = Dimensions.get('window').height; // 화면 세로 크기를 가져옴

function Posting() {
    const navigation = useNavigation();

    const [author,setAuthor] = useState('');
    const [category,setCategory] = useState('');
    const [contentText,setContentText] = useState('');
    const [imageUris,setImageUris] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
    
                if (username) {
                    setAuthor(username);  // 'author' 상태 업데이트
                } else {
                    throw new Error("No user data found");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchUserData();
    }, []);  // 빈 의존성 배열을 넣어 컴포넌트 마운트 시 한 번만 실행
    


    const handleBackPress = () => {
        navigation.navigate('Community');
    };

    const handleImagePick = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("사진 라이브러리 접근 권한이 필요합니다.");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.canceled === true) {
            return;
        }

        setImageUris([...imageUris, pickerResult.assets[0].uri]);
    };

    const handleRemoveImage = (uri) => {
        setImageUris(imageUris.filter(imageUri => imageUri !== uri));
    };

    const handleUpload = async () => {
        if (contentText.length < 10) {
            alert('글의 내용은 최소 10자 이상이어야 합니다.');
            return;
        }
    
        // FormData 객체 생성
        const formData = new FormData();
    
        // 텍스트 데이터 추가
        formData.append('title', category);
        formData.append('content', contentText);
        formData.append('author', author);
    
        for (let i = 0; i < imageUris.length; i++) {
            let uri = imageUris[i];
            let fileType = uri.substring(uri.lastIndexOf(".") + 1);
            formData.append('image', {
                uri: uri,
                name: `photo${i}.${fileType}`,
                type: `image/${fileType}`
            });
        }
    
        try {
            // 업로드 처리 (서버 주소와 엔드포인트는 실제 상황에 맞게 변경해야 함)
            await axios.post("http://10.20.100.29:8082/posting", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            });
            
            alert('게시글 업로드 완료!');
            navigation.navigate('Community');
        } catch (error) {
            console.error(error);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };
    

    return (

        <KeyboardAwareScrollView
            style={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
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
                <Text style={styles.Text}>글쓰기</Text>
            </View>
            <View style={styles.categorycontainer}>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={[
                        { label: '오늘의 라이딩 일기', value: '오늘의 라이딩 일기' },
                        { label: '같이타요', value: '같이타요' },
                        { label: '경로추천', value: '경로추천' },
                    ]}
                    placeholder={{ label: "게시글의 주제를 선택해주세요.", value: null }}
                    style={{
                        inputIOS: {
                            color: '#ffffff',
                            fontSize: 20,
                            bottom: '50%',
                        },
                        inputAndroid: {
                            color: '#ffffff',
                            fontSize: 20,
                        },
                    }}
                />
            </View>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setContentText(text)}
                value={contentText}
                placeholder="이곳에 글을 작성해주세요(최소 10자 이상)"
            />

            <View style={styles.imgContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleImagePick}>
                        <View style={[styles.button2, { marginRight: 3 }]}>
                            <Image source={require('./src/img_camera.png')} style={{ width: 50, height: 50 }} />
                        </View>
                    </TouchableOpacity>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {imageUris.map((uri, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
                                <Image source={{ uri }} style={{ width: 100, height: 100, marginLeft: 10, borderRadius: 15 }} />
                                <TouchableOpacity  onPress={()=>handleRemoveImage(uri)} style={{position:'absolute', top:0, right:0}}>
                                    <Image source={require('./src/img_delete.png')} style={{ width: 23, height: 30,left:5,bottom:5 }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleUpload}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>업로드하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
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
        padding: 10,
        top: '5%',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    categorycontainer: {
        top: '5%',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    input: {
        height: screenHeight * 0.45,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        color: 'white',
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
        left: '43%',
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
        top: '20%',
        left: '3%',
    },
    button: {
        width: 326,
        height: 60,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    imgContainer: {
        top: '5%',
        padding: 10,
        marginBottom: 20,
        borderBottomWidth: 1, // 선의 두께
        borderBottomColor: '#ffffff', // 선의 색상
    },
    button2: {
        width: 100,
        height: 100,
        backgroundColor: '#35383F',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Posting;