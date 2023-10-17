import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleLoginPress = async () => {
        try {
            const response = await axios.post('http://10.20.100.29:8082/login', { 
                email: email,
                password: password,
            });
    
            if (response.status >= 200 && response.status < 300) {
                await AsyncStorage.setItem('userid', response.data.id);
                await AsyncStorage.setItem('username', response.data.name);
                            // 서버로부터 받은 메시지를 띄웁니다.
                alert(response.data.message);
                navigation.navigate('MainScreen');
            } else {
                throw new Error(); 
            }
            
        } catch (error) {
            console.log(error);
            
            if (error.response) {
                alert(JSON.stringify(error.response.data));
                
                return;
            }
        }
    };

    const handlebackPress = () => {
        navigation.navigate('Main');
    };

    const handleEmailClick = () => {
        if (!email) {
            setEmail('');
        }
    };
    const handlePasswordClick = () => {
        if (!password) {
            setPassword('');
        }
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // 눈 아이콘 클릭 시 상태를 토글
    };

    return (
        <View style={styles.mainContainer}>
                <View style={styles.group1}>
                    <Text style={styles.LoginText}>로그인</Text>
                    <View style={styles.group3}>
                        <Text style={styles.alreadyHaveAccount}>아직 회원이 아니신가요?</Text>
                        <Text style={styles.SignupButton} onPress={() => navigation.navigate('Signup')}> 회원가입 </Text>
                    </View>
                    <Text style={styles.emailLabel}>이메일</Text>
                    <Text style={styles.passwordLabel}>비밀번호</Text>
                
                    <TouchableWithoutFeedback onPress={handleEmailClick}>
                        <View style={styles.rectangle1}>
                            <Image source={require('./src/img_email.png')} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder={!email ? '이메일을 입력해주세요' : ''}
                                placeholderTextColor="#777C89"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handlePasswordClick}>
                        <View style={styles.rectangle2}>
                            <Image source={require('./src/img_password.png')} style={styles.icon} />
                            <TextInput
                                style={styles.inputText}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder={!password ? '비밀번호를 입력해주세요' : ''}
                                placeholderTextColor="#777C89"
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={toggleShowPassword}>
                            <Image
                                source={showPassword ? require('./src/img_eye_open.png') : require('./src/img_eye_close.png')}
                                style={styles.eyeIcon}
                            />
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.group2}>
                        <TouchableOpacity onPress={handleLoginPress}>
                            <View style={styles.button}>
                                <Text style={styles.LoginbuttonText}>로그인</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.maskGroup}>
        <TouchableOpacity onPress={handlebackPress}>
            <Image source={require('./src/뒤로가기.png')} style={styles.arrow} />
            </TouchableOpacity>
        </View>
            </View>
    );
}   

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
    LoginText: {
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
    alreadyHaveAccount: {
        position: 'absolute',
        width: 198.35,
        height: 23,
        left: '-5%',
        top: '110%',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#A2A2A2',
    },
    SignupButton: {
        position: 'absolute',
        width: 79.55,
        height: 23,
        left: '50%',
        top: '110%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        textDecorationLine: 'underline',
        color: '#1E58BF',
    },
    emailLabel: {
        position: 'absolute',
        width: 55,
        height: 24,
        left: '10%',
        top: '25%',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#92A3B2',
    },
    passwordLabel: {
        position: 'absolute',
        width: 73,
        height: 24,
        left: '10%',
        top: '40%',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#92A3B2',
    },
    rectangle1: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '30%',
        backgroundColor: '#313A4B',
        borderRadius: 16,
    },
    rectangle2: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '45%',
        backgroundColor: '#313A4B',
        borderRadius: 16,
    },
    group2: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '75%',
    },

    LoginbuttonText: {
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
        color: '#FFFFFF',
        top: '-25%',
        left: '20%',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        letterSpacing: -0.025,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        left: '5%',
        top: '25%',
    },
    eyeIcon: {
        width: 30,
        height: 30,
        left: '85%',
        top: '-130%',
    },
    maskGroup: {
    position: 'absolute',
    width: 27,
    height: 27,
    left: 39,
    top: 64,
    },
    arrow: {
    position: 'absolute',
    width: 27,
    height: 27,
    left:0,
    top: 0,
    transform: [{ scaleY: -1 }],
    },
});

export default Login;