import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signup = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function checkEmail(email) {
        try {
            let response = await fetch(`http://10.20.102.175:8082/check-email?email=${encodeURIComponent(email)}`);
            if (response.ok) {
                let data = await response.json();
                return data.exists;  // 서버가 { exists: true } 또는 { exists: false } 형태로 응답하도록 해야 합니다.
            } else {
                console.error(`Failed to check email: ${response.status} ${response.statusText}`);
                return false;
            }
        } catch (error) {
            console.error(`Failed to check email: ${error}`);
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            // 이메일 중복 체크
            const emailExists = await checkEmail(email);
            if (emailExists) {
                alert('이미 사용중인 이메일입니다. 다른 이메일을 사용해주세요.');
                return;
            }
    
            // 서버로 회원가입 요청을 보냅니다.
            const response = await axios.post('http://10.20.102.175:8082/register', { 
                name: name,
                email: email,
                password: password,
            });
    
            if (response.status >= 200 && response.status < 300) {
                alert('회원가입 성공!');
                
                navigation.navigate('Main');
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
    }
    

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
    const handlePasswordClick = () => {
        if (!password) {
            setPassword('');
        }
    };
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.group1}>
                <Text style={styles.joinText}>가입하기</Text>
                <View style={styles.group3}>
                    <Text style={styles.alreadyHaveAccount}>이미 계정이 있으신가요?</Text>
                    <Text style={styles.loginButton} onPress={() => navigation.navigate('Login')}> 로그인 </Text>
                </View>
                <Text style={styles.nameLabel}>이름</Text>
                <Text style={styles.emailLabel}>이메일</Text>
                <Text style={styles.passwordLabel}>비밀번호</Text>
                <TouchableWithoutFeedback onPress={handleNameClick}>
                    <View style={styles.rectangle1}>
                        <Image source={require('./src/img_name.png')} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder={!name ? '이름을 입력해주세요' : ''}
                            placeholderTextColor="#777C89"
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleEmailClick}>
                    <View style={styles.rectangle2}>
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
                    <View style={styles.rectangle3}>
                        <Image source={require('./src/img_password.png')} style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder={!password ? '비밀번호를 입력해주세요' : ''}
                            placeholderTextColor="#777C89"
                            secureTextEntry={true}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.group2}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.button}>
                            <Text style={styles.SignupbuttonText}>회원가입</Text>
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
    alreadyHaveAccount: {
        position: 'absolute',
        width: 198.35,
        height: 23,
        left: '0%',
        top: '110%',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#A2A2A2',
    },
    loginButton: {
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
    nameLabel: {
        position: 'absolute',
        width: 37,
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
    emailLabel: {
        position: 'absolute',
        width: 55,
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
    passwordLabel: {
        position: 'absolute',
        width: 73,
        height: 24,
        left: '10%',
        top: '55%',
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
    rectangle3: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '60%',
        backgroundColor: '#313A4B',
        borderRadius: 16,
    },
    group2: {
        position: 'absolute',
        width: 326,
        height: 60,
        left: '10%',
        top: '80%',
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

export default Signup;