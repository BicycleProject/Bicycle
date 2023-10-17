import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Button, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const uri = `https://806hyogi.github.io/hostingtest/`;

// 위치 권한 요청 함수
async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "위치권한알림",
                message: "위치 권한을 허용하시겠습니까",
                buttonNegative: "취소",
                buttonPositive: "확인"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
        } else {
            console.log("Location permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

export default function WebViewComponent({ style }) {
    const [isDriving, setIsDriving] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [distance, setDistance] = useState(0);
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const startDriving = () => {
        setIsDriving(true);
        setStartTime(new Date());
    };

    const stopDriving = () => {
        setIsDriving(false);
        const endTime = new Date();
        const elapsedMilliseconds = endTime - startTime;
        const elapsedSeconds = elapsedMilliseconds / 1000;
        // 주행 거리 및 칼로리 소모량 계산 로직을 추가하세요.
        // distance와 calories 상태를 업데이트하세요.
        setElapsedTime(elapsedSeconds);
    };

    return (
        <View style={style}>
            <Button title={isDriving ? "주행 종료" : "주행 시작"} onPress={isDriving ? stopDriving : startDriving} />
            <Text>주행 시간: {elapsedTime} 초</Text>
            <Text>주행 거리: {distance} km</Text>
            <Text>칼로리 소모량: {calories} kcal</Text>
            <WebView
                style={{ flex: 1 }}
                source={{ uri }}
                geolocationEnabled={true}
                onGeolocationPermissionsShowPrompt={(origin, callback) => callback(true)}
            />
        </View>
    );
}
