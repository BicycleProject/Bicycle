import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

export default function NearbyRepairShopsScreen() {
    const navigation = useNavigation();

    const [selectedShop, setSelectedShop] = useState(null);
    const [directions, setDirections] = useState(null);
    const apiKey = 'AIzaSyDvljOjmw4WGRKFE6nv8R4VBxiiVQsxHcw'; //Google Maps API 키

    const backButtonImage = require('./src/뒤로가기검정.png');

    const [location, setLocation] = useState({
        latitude: 37.51037979,
        longitude: 126.8567984,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [mapRegion, setMapRegion] = useState({
        latitude: 37.51037979,
        longitude: 126.8567984,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });

    const [nearbyRepairShops, setNearbyRepairShops] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await fetch(
                    'http://openapi.seoul.go.kr:8088/52627a4552737363373441706b5066/json/tbCycleStationInfo/1/1000/'
                );
                let data = await res.json();
                let rows = data.stationInfo.row;


                // const userLatitude = location.latitude;
                // const userLongitude = location.longitude;
                const userLatitude = 37.51037979;
                const userLongitude = 126.8567984;

                const repairShops = rows.map((station) => {
                    const shopLatitude = parseFloat(station.STA_LAT);
                    const shopLongitude = parseFloat(station.STA_LONG);
                    const hold_num = station.HOLD_NUM;
                    const address = station.STA_ADD1;

                    // Haversine 공식을 사용하여 거리 계산
                    const distance = haversine(userLatitude, userLongitude, shopLatitude, shopLongitude);

                    if (distance <= 3) {
                        return {
                            id: station.RENT_ID,
                            name: station.RENT_NM,
                            latitude: shopLatitude,
                            longitude: shopLongitude,
                            hold_num: hold_num,
                            address: address,
                            distance: distance,
                        };
                    } else {
                        return null;
                    }
                });

                const nearbyShops = repairShops.filter((shop) => shop !== null);

                // 거리를 기준으로 수리점 목록 정렬
                nearbyShops.sort((a, b) => a.distance - b.distance);

                setNearbyRepairShops(nearbyShops);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchUserLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync();
            setLocation({
                // latitude: userLocation.coords.latitude,
                // longitude: userLocation.coords.longitude,
                latitude: 37.51037979,
                longitude: 126.8567984,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            getData();
        };

        fetchUserLocation();
    }, []);

    const handleShopItemClick = (shop) => {
        setSelectedShop(shop);
        setDirections({
            destination: {
                latitude: shop.latitude,
                longitude: shop.longitude,
            },
            origin: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        });
    };

    const handleMarkerClick = (shop) => {
        setMapRegion({
            latitude: shop.latitude,
            longitude: shop.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        });
    };

    // Haversine 공식을 사용하여 두 지점 간의 거리 계산
    const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구의 반지름 (km)
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const toRad = (value) => {
        return value * Math.PI / 180;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image source={backButtonImage} style={styles.backButtonImage} />
            </TouchableOpacity>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.51037979,
                        longitude: 126.8567984,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    region={mapRegion}
                >
                    {nearbyRepairShops.map((shop) => (
                        <Marker
                            key={shop.id}
                            coordinate={{
                                latitude: shop.latitude,
                                longitude: shop.longitude,
                            }}
                            title={shop.name}
                            onPress={() => handleMarkerClick(shop)}
                        />
                    ))}

                    {directions && (
                        <MapViewDirections
                            origin={directions.origin}
                            destination={directions.destination}
                            apikey={apiKey}
                            strokeWidth={3}
                            strokeColor="blue"
                            mode="TRANSIT"
                        />
                    )}

                    <Marker
                        coordinate={{
                            latitude: 37.51037979,
                            longitude: 126.8567984,
                            // latitude: location.latitude,
                            // longitude: location.longitude,
                        }}
                        title="내 위치"
                        pinColor="blue"
                    />
                </MapView>
            </View>

            <View style={styles.shopListContainer}>
                <ScrollView contentContainerStyle={styles.shopList}>
                    {nearbyRepairShops.map((shop) => (
                        <Text
                            key={shop.id}
                            style={styles.shopItem}
                            onPress={() => handleShopItemClick(shop)}
                        >
                            대여소명 : {shop.name}{'\n'}
                            거치대 수 : {shop.hold_num}{'\n'}
                            주소 : {shop.address}{'\n'}
                            거리 : {shop.distance.toFixed(2)} km
                        </Text>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    shopListContainer: {
        flex: 1,
        paddingVertical: 16,
    },
    shopList: {
        padding: 16,

    },
    shopItem: {
        fontSize: 18,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#ababab',
        borderRadius: 10,
        paddingBottom: 8,
    },
    backButton: {
        position: 'absolute',  // 상위 컴포넌트 기준으로 위치 결정
        top: 40,               // 상단에서 얼마나 떨어져 있는지 지정 (상태바 높이 고려)
        left: 20,              // 왼쪽에서 얼마나 떨어져 있는지 지정
        zIndex: 1000,          // 다른 요소 위에 나타나게 함 
        padding: 10,
    },
    
    backButtonImage: {
        width: 25,
        height: 25,
       resizeMode:'contain'
     },
};