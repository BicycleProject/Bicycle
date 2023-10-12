    import React, { useState } from 'react';
    import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity,Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import * as ImagePicker from 'expo-image-picker';
    const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴

    const Myinfo = () => {
        const [selectedImage, setSelectedImage] = useState(null);

        const navigation = useNavigation();
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [Intro, setIntro] = useState('');

        const handlenextPress = () => {
            navigation.navigate('Main');
        };
        const handlebackPress = () => {
            navigation.navigate('Main');
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
        const handleIntroClick = () => {
            if (!Intro) {
                setIntro('');
            }
        };
        const handleImageSelect = async () => {
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1], // 이미지 비율 설정
                    quality: 1, // 이미지 품질 (0 ~ 1)
                });
    
                if (!result.canceled) {
                    // 사용자가 이미지를 선택한 경우
                    setSelectedImage(result.assets[0].uri);
                }
            } catch (error) {
                console.error('이미지 선택 에러:', error);
            }
        };
    
        return (
            <View style={styles.mainContainer}>
                <View style={styles.group1}>
                    <Text style={styles.joinText}>내 정보</Text>
                    <TouchableWithoutFeedback onPress={handleImageSelect}> 
                    <View style={styles.imageContainer}>
                    <Image
                        source={selectedImage ? { uri: selectedImage } : require('./src/img_user.png')}
                        style={styles.img}
                    />
                    <Text style={styles.nameText}>{name}</Text>
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
                    <TouchableWithoutFeedback onPress={handleIntroClick}>
                        <View style={styles.rectangle2}>
                            <TextInput
                                style={styles.inputText}
                                value={Intro}
                                onChangeText={(text) => setIntro(text)}
                                placeholder={!Intro ? 'Introduce' : ''}
                                placeholderTextColor="#777C89"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleEmailClick}>
                        <View style={styles.rectangle3}>
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
            <TouchableOpacity onPress={handlebackPress}>
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
            left: 17,
            top: '0%',
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
        rectangle3: {
            position: 'absolute',
            width: 326,
            height: 60,
            left: '10%',
            top: '75%',
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
            right:'27%',
            top: 0,
        
        },
        setting: {
            position: 'absolute',
            width: 35,
            height: 35,
            right:'15%',
            top: 0,
        },
        arrow: {
            position: 'absolute',
            width: 27,
            height: 27,
            left:0,
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