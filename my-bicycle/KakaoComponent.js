import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';

const uri = `https://806hyogi.github.io/hostingtest/`;

// 위치 권한 요청 함수
async function requestLocationPermission() {
    try {
        // 안드로이드 위치 접근 권한 요청
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "위치권한알림",
                message:
                    "위치 권한을 허용하시겠습니까",
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

    // 처음 화면에 나타날 때 위치 권한 요청 함수 호출
    useEffect(() => {
        requestLocationPermission();
    }, []);

    return (
        // 웹뷰로 페이지 로드
        <WebView 
            style={style}
            source={{ uri }}
            
            // 웹뷰에서 Geolocation API 호출하여 항상 위치 접근 허용
            geolocationEnabled={true}
            onGeolocationPermissionsShowPrompt={(origin, callback) => callback(true)}
            
        />
    );
}
