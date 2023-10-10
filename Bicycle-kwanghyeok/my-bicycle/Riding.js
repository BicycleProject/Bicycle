import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function Riding() {
    const apiKey = 'AIzaSyDvljOjmw4WGRKFE6nv8R4VBxiiVQsxHcw'; // Google Maps API 키

    const [mapRegion, setMapRegion] = useState({
        latitude: 36.51037979,
        longitude: 126.8567984,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [userLocation, setUserLocation] = useState(null);
    const [userPath, setUserPath] = useState([]); // 사용자의 이동 경로를 저장하는 배열

    useEffect(() => {
        (async () => {
            // 사용자의 현재 위치를 가져옵니다.
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('위치 권한이 허용되지 않았습니다.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const initialUserLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            
            setUserLocation(initialUserLocation);

            // 가져온 위치를 MapView의 초기 지도 영역으로 설정합니다.
            setMapRegion(initialUserLocation);

            // 위치 업데이트 리스너 등록
            Location.watchPositionAsync(
                { distanceInterval: 10 }, // 위치 업데이트 간격 (미터)
                (newLocation) => {
                    const newUserLocation = {
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                    };
                    setUserLocation(newUserLocation);
                    setUserPath((prevPath) => [...prevPath, newUserLocation]); // 이동 경로 업데이트
                }
            );
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={mapRegion}
            >
                {/* 사용자의 현재 위치를 표시하는 마커 */}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="현재 위치"
                        description="사용자의 현재 위치"
                    />
                )}

                {/* 사용자의 이동 경로를 폴리라인으로 표시 */}
                {userPath.length > 1 && (
                    <Polyline
                        coordinates={userPath}
                        strokeColor="#000" // 폴리라인 색상
                        strokeWidth={3} // 폴리라인 두께
                    />
                )}

                {/* 다른 마커들을 추가할 수 있습니다. */}
                {/* <Marker
                    coordinate={{
                        latitude: 37.5,
                        longitude: 127.0,
                    }}
                    title="다른 위치"
                    description="다른 위치 설명"
                /> */}
            </MapView>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
};
