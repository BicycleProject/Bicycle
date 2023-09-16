// 카카오 api 연동 컴포넌트
import React from 'react';
import { WebView } from 'react-native-webview';

const apiKey = "180de339da461cd47b488bce6adeca83";
const uri = `https://map.kakao.com/?apikey=${apiKey}`;

export default function WebViewComponent({ style }) {
    return (
        <WebView
            style={style}
            source={{ uri }}
        />
    );
}
