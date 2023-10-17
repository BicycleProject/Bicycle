import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Main_1 = () => {
    const navigation = useNavigation();

    const handlenextPress = () => {
        navigation.navigate('Main_2'); 
    };
     // PanResponder 설정
     const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx <-100) {
                    navigation.navigate('Main_2');
                }
            },
        })
    ).current;

    return (
        <View style={styles.mainContainer}{...panResponder.panHandlers}>
            <View style={styles.group29}>
                <Image source={require('./src/image_1.png')} style={styles.image2} />
                <View style={styles.rectangle1}></View>
                <Text style={styles.earningText}>돈 벌기 어렵지 않아요</Text>
                <Text style={styles.subtitle}>자전거를 타면서 돈을 벌 수 있습니다.</Text>
            </View>
            <View style={styles.group24}>
                <TouchableOpacity onPress={handlenextPress}>
                    <View style={styles.button}>
                        <Text style={styles.startText}>다음</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.circle1}></View>
                <View style={styles.circle2}></View>
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
    group29: {
        position: 'relative',
        width: 350,
        height: 555,
        left: 5,
        top: 0,
        alignItems: 'center',
    },
    image2: {
        width: 171,
        height: 171,
    },
    rectangle1: {
        position: 'absolute',
        width: 32,
        height: 8,
        left: '40%',
        top: '80%',
        backgroundColor: '#1E58BF',
        borderRadius: 100,
        marginLeft: -16,
        marginTop: 4,
    },
    earningText: {
        width: 350,
        height: 54,
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 37,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
        border: '1px solid #000000',
        marginTop: 30,
    },
    subtitle: {
        width: 350,
        height: 54,
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
        border: '1px solid #000000',
        marginTop: 29,
    },
    group24: {
        position: 'relative',
        width: 326,
        height: 60,
        left: 0,
        top: 0,
        alignItems: 'center',
    },
    button: {
        width: 326,
        height: 60,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startText: {
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    circle1: {
        width: 8,
        height: 8,
        backgroundColor: '#919191',
        borderRadius: 100,
        position: 'absolute',
        left:'60%',
        top: '-180%',
    },
    circle2: {
        width: 8,
        height: 8,
        backgroundColor: '#919191',
        borderRadius: 100,
        position: 'absolute',
        left:'50%',
        top: '-180%',
    },
});

export default Main_1;
