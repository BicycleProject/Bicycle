// 카카오 api 연동 컴포넌트
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button } from 'react-native';

const apiKey = "180de339da461cd47b488bce6adeca83";
const uri = `https://map.kakao.com/?apikey=${apiKey}`;

// 각각의 경로 옵션
const routes = [
    { id: 'short', level: '초급', description: '뚝섬 유원지-서울숲 코스(6.7km)', points: ['뚝섬 유원지', '서울숲'] },
    { id: 'long', level: '중급', description: '창릉천-공릉천 코스(80km)', points: ['창릉천'] },
];

export default function WebViewComponent({ style }) {
    const [routeId, setRouteId] = useState(null);

    const handleShortRoute = () => {
        setRouteId('short');
    }

    const handleLongRoute = () => {
        setRouteId('long');
    }

    let uri;

    if (routeId) {
        const route = routes.find(route => route.id === routeId);
        uri = `https://map.kakao.com/?apikey=${apiKey}&route=${route.id}`;




        return (
            <WebView
                style={style}
                source={{ uri }}
            />
        );

    } else {
        return (
            <View>
                <Button title="짧은 경로 선택" onPress={handleShortRoute} />
                <Button title="긴 경로 선택" onPress={handleLongRoute} />
            </View>
        );
    }
}