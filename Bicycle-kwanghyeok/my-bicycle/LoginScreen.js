import React from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet } from 'react-native';

function LoginScreen({ navigation }) {
    const handleLogin = () => {
        navigation.navigate('Home'); // 다음 화면 이름을 지정
    };

    const handleSignup = () => {
        navigation.navigate('SignupScreen'); // 회원가입 화면의 이름 지정
    };

    const buttonShadow = Platform.OS === 'android' ? { elevation: 10 } : { shadowOpacity: 0.5, shadowRadius: 5, shadowColor: 'black', shadowOffset: { width: 0, height: 2 } };
    return (
        <View style={styles.container}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />

            <Text style={styles.title}>로그인</Text>
            <TextInput
                style={styles.input}
                placeholder="아이디"
                // onChangeText를 통해 입력된 텍스트를 처리할 수 있습니다.
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry // 비밀번호 입력을 마스킹합니다.
                // onChangeText를 통해 입력된 텍스트를 처리할 수 있습니다.
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button1, buttonShadow]} onPress={handleLogin} >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button2, buttonShadow]} onPress={handleSignup}>
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 200, // 로고 이미지의 너비 설정
        height: 200, // 로고 이미지의 높이 설정
        marginBottom: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row', // 버튼들을 수평으로 나열합니다.
        justifyContent: 'space-between', // 버튼 사이의 간격을 동일하게 설정합니다.
        width: '50%',
    },
    button1: {
        backgroundColor: '#6BEC62',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30, // 버튼의 모서리(radius)를 수정할 수 있습니다.
    },
    button2: {
        backgroundColor: '#00B4DB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30, // 버튼의 모서리(radius)를 수정할 수 있습니다.
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;