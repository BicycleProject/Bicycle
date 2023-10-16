import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, PanResponder, Alert, Platform, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { WINDOW_HEIGHT } from '../utils';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native';
import axios from 'axios'; // 날씨 api
import sunImage from '../../sun.png';
import cloudImage from '../../cloud.png';
import rainImage from '../../rain.png';
import snowImage from '../../snow.png';
import thunderstormImage from '../../thunderstorm.png';
import drizzleImage from '../../drizzle.png';
import customMarkerImage from '../../marker.png'; // 마커 디자인
import customMarkerImage2 from '../../profile.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // 구글 장소 좌표
import poingMarkerImage from '../../point.png';
import pointMarkerEndImage from '../../pointend.png';
import { captureRef } from 'react-native-view-shot';

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const apiKey = 'AIzaSyDvljOjmw4WGRKFE6nv8R4VBxiiVQsxHcw'; //Google Maps API 키
const apiplaceKey = 'AIzaSyA9WkcDHvdqB0ExtS_1T-gNwPXKjl4nqC4'; //Google place API 키


const DraggableBottomSheet = () => {
  const [location, setLocation] = useState(null); // 실시간 위치 받아오기
  const mapRef = useRef(null);
  const [isDrivingTimeVisible, setIsDrivingTimeVisible] = useState(true); // 주행시간 표시여부
  const [drivingTime, setDrivingTime] = useState(0); // 주행시간
  const drivingIntervalRef = useRef(null); // setInterval 참조 저장
  const [drivingDistance, setDrivingDistance] = useState(0); // 주행거리
  const [savedDrivingTime, setSavedDrivingTime] = useState(0); // 주행시간 저장 변수
  const [savedDrivingDistance, setSavedDrivingDistance] = useState(0); // 주행거리 저장 변수
  const [weather, setWeater] = useState(null); // 실시간 날씨 저장 변수
  const YOUR_OPENWEATHERMAP_API_KEY = '3de8cf7d9c26c3ceac514d9e7095f26d';
  const [tomorrowWeather, setTomorrowWeather] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // polyLine 그리기
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 저장 (검색기능)
  const [searchValue, setSearchValue] = useState(''); // 검색한 마커 초기화
  const googlePlacesRef = useRef(null); // 검색한 텍스트 초기화
  const [isWithinRadius, setIsWithinRadius] = useState(false); // 포인트 마커의 범위를 계산
  const [isPointGained, setIsPointGained] = useState(false); // 포인트 획득 여부 상태 변수
  const [pointsGained, setPointsGained] = useState(0); // 포인트 획득 수
  const [gainedPointIds, setGainedPointIds] = useState([]); // 포인트 점수 추가
  const [lastPointGainedTime, setLastPointGainedTime] = useState(null); // 마지막으로 포인트를 획득한 시간 저장(한번 획득6시간뒤 초기화)
  
  // 버튼을 눌렀을 때 화면 캡처
  const handleCapture = async () => {
    try {
      const captureResult = await captureRef(mapRef, {
        format: 'jpg', // 캡처 형식 (jpg, png 등)
        quality: 0.8, // 캡처 품질 (0.0 ~ 1.0)
      });
      // 캡처된 이미지 파일을 사용하거나 저장 등의 작업을 수행할 수 있습니다.
      // 예: console.log(captureResult);
    } catch (error) {
      console.error('캡처 중 에러 발생: ', error);
    }
  };

  // 마커 주변에서 위치 업데이트 발생하더라도 더이상 점수를 얻지 못하도록
  useEffect(() => {
    if (location) {
      const checkDistance = () => {
        for (let loc of locations) {
          const distance = haversine(location.latitude, location.longitude, loc.latitude, loc.longitude);
          if (distance <= 0.1 && !gainedPointIds.includes(loc.id)) {
            setIsWithinRadius(true);

            // 마지막으로 포인트를 획득한 시간이 null이거나 현재 시간과의 차이가 6시간 이상일 경우에만 포인트 획득 가능
            if (!lastPointGainedTime || Date.now() - lastPointGainedTime >= 10 * 1000){
              setIsPointGained(true);
              
              setPointsGained(prevPoints => prevPoints + 1);
              setGainedPointIds(prevIds => [...prevIds, loc.id]); // id 저장
              setLastPointGainedTime(Date.now()); // 현재 시간으로 업데이트
            
            }
            return;
          }
        }
        setIsWithinRadius(false);
      };
      checkDistance();
    }
  }, [location]);


  // 사용자가 포인트 지점 근처에 갈때마다 포인트 수가 증가
  useEffect(() => {
    if (isWithinRadius) {
      setPointsGained(prevPoints => prevPoints + 4);
    }
  }, [isWithinRadius]);

  // polyLine 그리기 코드
  useEffect(() => {
    if (isDriving && location) {
      setRouteCoordinates(prevCoords => [...prevCoords, location]);
    }
  }, [location]);


  // 실시간 날씨 useEffect()
  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${YOUR_OPENWEATHERMAP_API_KEY}`
          );
          setWeater(response.data);

          // 내일 날씨를 가져옴
          const responseForecast = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${YOUR_OPENWEATHERMAP_API_KEY}`
          );

          const currentTime = new Date();
          const tomorrow = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1);

          let tomorrowWeatherData = responseForecast.data.list.filter((weatherData) => {
            let forecastTime = new Date(weatherData.dt * 1000);

            return forecastTime.getDate() === tomorrow.getDate() &&
              forecastTime.getMonth() === tomorrow.getMonth() &&
              forecastTime.getFullYear() === tomorrow.getFullYear();
          });

          setTomorrowWeather(tomorrowWeatherData);

        } catch (error) {
          console.error(error);
        }
      };
      //fetchWeather();
      const intervalId = setInterval(fetchWeather, 1000 * 60 * 60 * 3); // 3시간마다 날씨 api 호출

      // 컴포넌트 unmount 시에 interval clear
      return () => clearInterval(intervalId);
    }
  }, [location])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 접근 허락이 되지 않았습니다.');
        return;
      }

      let locationSubscriber = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
      });

      return () => {
        if (locationSubscriber) {
          locationSubscriber.remove();
        }
      };
    })();
  }, []);


  const [isBottomSheetVisible, setBottomSheetVisible] = useState(true); // Bottom Sheet 가시성 상태
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    console.log('direction', direction);
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  // 검색 할때 반만 올리기
  const MIDDLE_TRANSLATE_Y = (MAX_UPWARD_TRANSLATE_Y + MAX_DOWNWARD_TRANSLATE_Y) / 2;

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  // 주행하기, 주행종료 여부 확인코드
  const [isDriving, setIsDriving] = useState(false); // 주행 중인지 여부를 나타냄


  // 주행하기 버튼을 눌렀을때 코드 (버튼)
  const toggleDrive = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    setIsDriving(!isDriving) // 주행 상태 토글
  };


  // 현재 위치로 가는 코드 (버튼)
  const goToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000); // 애니메이션 지속시간
    }
  };

  // 주행거리 로직
  const [prevLocation, setPrevLocation] = useState(null); // 이전위치
  useEffect(() => {
    if (isDriving && location && prevLocation) {
      const distance = haversine(prevLocation.latitude, prevLocation.longitude, location.latitude, location.longitude);
      setDrivingDistance(prevDist => prevDist + distance);
    }
    setPrevLocation(location);
  }, [location]);

  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371; // km 
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    var c = 2 * Math.atan(Math.sqrt(a));
    return R * c;
  }





  useEffect(() => {
    if (isDriving) {
      drivingIntervalRef.current = setInterval(() => {
        setDrivingTime(prevTime => prevTime + 1);
      }, 1000);
    }
    else {
      clearInterval(drivingIntervalRef.current);
    }

    return () => {
      clearInterval(drivingIntervalRef.current);
    };
  }, [isDriving]);

  const resetDrive = () => {

    setIsDriving(false); // 주행중 상태 종료

    setSavedDrivingTime(drivingTime); // 주행시간 저장
    setSavedDrivingDistance(drivingDistance); // 주행거리 저장

    setDrivingTime(0); // 주행시간 초기화
    setDrivingDistance(0); // 주행거리 초기화
    setBottomSheetVisible(true); // 바텀시트 활성화
    setRouteCoordinates([]); // polyline 초기화
  }

  // 주행시간 (초) 를 00:00 형식으로 변환하는 함수
  const formatTime = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    // 분과 초가 한 자리일 경우 '0'을 추가
    let minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
    let secondsStr = seconds < 10 ? '0' + seconds : '' + seconds;

    return `${minutesStr}:${secondsStr}`;
  }

  // 포인트 마커 생성하기 (useState로 활성화 상태 관리)
  const [locations, setLocations] = useState([
    { id: 1, latitude: 37.51037979, longitude: 126.8567984, active: true },
    // { id: 2, latitude: 37.52037979, longitude: 126.8667984 },
    // { id: 3, latitude: 36.80018, longitude: 127.07664 },
    // { id: 4, latitude: 36.78982, longitude: 127.17701 }
  ]);

  // 포인트 마커 100m 반경 거리계산
  useEffect(() => {
    if (location) {
      const checkDistance = () => {
        for (let loc of locations) { // locations는 포인트 마커들의 좌표 배열
          // haversine 공식을 사용하여 반경 계산
          const distance = haversine(location.latitude, location.longitude, loc.latitude, loc.longitude);
          if (distance <= 0.1) { // haversine 함수 결과가 0.1km = 100m
            setIsWithinRadius(true);
            setIsPointGained(true); // 포인트 획득 상태 변경
            setTimeout(() => setIsPointGained(false), 3000); // 3초 후 메세지 숨기기
            return;
          }
        }
        setIsWithinRadius(false);
      };
      checkDistance();
    }
  }, [location])

  return (
    <View style={styles.container}>

      <MapView style={styles.map}
        ref={mapRef}
        //zoomEnabled={false} // 지도 확대 비활성화
        //scrollEnabled={false} // 지도 스크롤 비활성화
        initialRegion={{
          latitude: location ? location.latitude : 37.51037979,
          longitude: location ? location.longitude : 126.8567984,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* 주행중일때 폴리라인 생성 코드 */}
        {isDriving && (
          <Polyline coordinates={routeCoordinates} strokeWidth={5} strokeColor="red" />
        )}

        {/* 검색한 건물에 마커가 찍힘 */}
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title="선택한 위치"
          />
        )}

        {/* 포인트 마커 렌더링 (코인을 먹었을때 코인이미지가 변경됨) */}
        {locations.map((loc) => {
          const isWithinCurrentMarkerRadius = location && haversine(location.latitude, location.longitude, loc.latitude, loc.longitude) <= 0.1;
          
          return (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude
            }}
            title={`포인트 ${loc.id}`}
          >
            <Image source={isWithinCurrentMarkerRadius ? pointMarkerEndImage : poingMarkerImage} style={{ width: 50, height: 50 }} />
          </Marker>
        )
      })}


        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title="현재 위치"
            >
              <Image
                source={customMarkerImage2} // MongoDB에서 가져온 사용자 프로필 이미지 URL입니다.
                style={{ width: 20, height: 20, borderRadius: 20, position: 'absolute', marginLeft: 5, marginTop: 5, zIndex: 1 }}
              />
              <Image
                source={customMarkerImage}
                style={{ width: 29.999, height: 45 }}
              />

            </Marker>

            {/* 사용자 프로필 */}

          </>
        )}
      </MapView>


      {/* 위치 버튼 */}
      <TouchableOpacity style={styles.mapButton} onPress={(goToCurrentLocation)}>
        <Image
          source={require('../../location.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      {/* Bottom Sheet 가시성에 따라 렌더링 조건부 실행 */}
      {isBottomSheetVisible && (
        <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
          <View style={styles.draggableArea} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginBottom: 10 }}>


              {/* 구글 맵 검색하기 코드 */}
              <GooglePlacesAutocomplete
                ref={googlePlacesRef} // 텍스트 리셋
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                  setSelectedPlace({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  });

                  // 선택한 위치로 맵 이동
                  if (mapRef.current) {
                    mapRef.current.animateToRegion({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }, 1000);
                  }
                }}

                textInputProps={{
                  onFocus: () => {
                    // 바텀시트 반만 올리기
                    lastGestureDy.current = MIDDLE_TRANSLATE_Y;
                    Animated.spring(animatedValue, {
                      toValue: lastGestureDy.current,
                      useNativeDriver: true,
                    }).start();
                  },
                  onBlur: () => {
                    // 바텀시트 원위치
                    lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
                    Animated.spring(animatedValue, {
                      toValue: lastGestureDy.current,
                      useNativeDriver: true,
                    }).start();
                  },
                }}

                styles={{
                  textInputContainer: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    marginTop: 10,
                    marginLeft: 0,
                    borderRadius: 10
                  },

                  textInput: {
                    height: 38,
                    color: 'black',
                    fontSize: 12,
                    backgroundColor: 'white',
                    borderRadius: 10
                  },

                }}

                query={{
                  key: apiplaceKey,
                  language: 'ko',
                }}

                renderRightButton={() => (
                  <View style={{ position: 'absolute', right: 0, zIndex: 1 }}>
                    <TouchableOpacity
                      style={styles.resetButton2}
                      onPress={() => {
                        setSelectedPlace(null);
                        if (googlePlacesRef.current) {
                          googlePlacesRef.current.clear();
                        }
                      }}
                    >
                      <Image source={require('../../reset2.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                  </View>
                )}

              />


            </View>

            {/* 실시간 현재 날씨 */}
            {weather && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19, marginLeft: 5, left: '25%' }}>
                {/* 오늘의 날씨 */}
                <View style={{ alignItems: 'center', marginTop: 8, marginLeft: 8 }}>
                  { /* 날씨에 따른 아이콘 표시 */}
                  {weather.weather[0].main === 'Clear' && <Image source={sunImage} style={{ width: 30, height: 30 }} />}
                  {weather.weather[0].main === 'Clouds' && <Image source={cloudImage} style={{ width: 40, height: 40 }} />}
                  {weather.weather[0].main === 'Rain' && <Image source={rainImage} style={{ width: 40, height: 40 }} />}
                  {weather.weather[0].main === 'Drizzle' && <Image source={drizzleImage} style={{ width: 40, height: 40 }} />}
                  {weather.weather[0].main === 'Thunderstorm' && <Image source={thunderstormImage} style={{ width: 40, height: 40 }} />}
                  {weather.weather[0].main === 'Snow' && <Image source={snowImage} style={{ width: 40, height: 40 }} />}
                  <Text style={{ marginTop: 5, marginLeft: 2, color: 'white' }}>{(weather.main.temp - 273.15).toFixed(0)}°</Text>
                </View>
                { /* 내일 날씨 */}
                {tomorrowWeather && tomorrowWeather.length > 0 &&
                  (<View style={{ marginLeft: 20, alignItems: 'center', marginTop: 8 }}>
                    {/* 내일 날씨에 따른 아이콘 표시 */}
                    {tomorrowWeather[0].weather[0].main === 'Clear' && <Image source={sunImage} style={{ width: 30, height: 30 }} />}
                    {tomorrowWeather[0].weather[0].main === 'Clouds' && <Image source={cloudImage} style={{ width: 40, height: 40 }} />}
                    {tomorrowWeather[0].weather[0].main === 'Rain' && < Image source={rainImage} style={{ width: 40, height: 40 }} />}
                    {tomorrowWeather[0].weather[0].main === 'Drizzle' && <Image source={drizzleImage} style={{ width: 40, height: 40 }} />}
                    {tomorrowWeather[0].weather[0].main === 'Thunderstorm' && <Image source={thunderstormImage} style={{ width: 40, height: 40 }} />}
                    {tomorrowWeather[0].weather[0].main === 'Snow' && <Image source={snowImage} style={{ width: 40, height: 40 }} />}
                    <Text style={{ marginTop: 5, marginLeft: 2, color: 'white' }}>{(tomorrowWeather[0].main.temp - 273.15).toFixed(0)}°</ Text>
                  </View>
                  )
                }
              </View>
            )}

              {/* 주행기록 (시간, 거리) */}
              <View style={{ flex: 1, justifyContent: 'flex-end', padding: 5, marginBottom: 10 }}>
              

              {/* 이전 기록 표시 */}
              <Text style={styles.drivingInfoText}>이전 주행 시간: {formatTime(savedDrivingTime)}</Text>
              <Text style={styles.drivingInfoText}>이전 주행 거리: {savedDrivingDistance.toFixed(3)} km</Text>

              {/* 현재 기록 표시 */}
              <Text style={styles.drivingInfoText}>총 주행 시간</Text>
              <Text style={styles.drivingInfoText}> {formatTime(drivingTime)}</Text>
              <Text style={styles.drivingInfoText}>총 주행 거리</Text>
              <Text style={styles.drivingInfoText}>{drivingDistance.toFixed(3)} km</Text>

              <TouchableOpacity onPress={handleCapture}>
                <Text>화면 캡처</Text>
              </TouchableOpacity>
            </View>


          </View>
        </Animated.View>
      )}

      {/* Bottom Sheet 토글 버튼 */}
      <View style={styles.driveButtonContainer}>
        <TouchableOpacity onPress={toggleDrive}>
          <Image
            source={isDriving ? require('../../drive_end.png') : require('../../drive_start.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>



      {/* Driving Time */}
      {(isDriving || isDrivingTimeVisible) && (
        <View style={styles.drivingInfoContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection:'row',marginBottom:10 }}>
            {/* 포인트 점수 표시 */}
            <Text style={styles.pointsGainedText}>{` Point: ${pointsGained} `}</Text>
            <Text style={styles.drivingTimeText}>{formatTime(drivingTime)}</Text>
            <Text style={styles.drivingDistanceText}>{`${drivingDistance.toFixed(3)} km`}</Text>
          </View>
          {/* 포인트 획득 메세지 */}
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50,marginRight:40 }}>
            {isPointGained && (
              <Text style={{ position: 'absolute',marginRight:5, top: '50%', right: '50%', color: '#FFFFFF', fontSize: 20, backgroundColor: '#FF6347', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>포인트를 획득하였습니다!</Text>
            )}
          </View>
        </View>
      )}

      {/* Reset Button */}
      {isDrivingTimeVisible &&
        <TouchableOpacity style={styles.resetButtonContainer} onPress={resetDrive}>
          <Image
            source={require('../../reset.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: .9,
  },

  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: '#0C1320',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dragHandle: {
    width: 60,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginTop: 14
  },

  mapButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5
  },

  resetButtonContainer: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    right: 10,
    top: 70,
  },

  driveButtonContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    right: 10,
    top: 130,
  },

  drivingTimeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 5,
  },

  drivingTimeText: {
    fontSize: 18, // 글자 크기
    color: 'white', // 글자 색상
    fontWeight: 'bold', // 폰트 두껍게
    backgroundColor: '#424242',
    borderRadius: 5,
    paddingVertical: 5, // 상하 패딩값 
    width: 70,
    height: 40,
    textAlign: 'center', // 가로 중앙 정렬
    textAlignVertical: 'center' // 세로 중앙 정렬 (Android 전용)
  },

  drivingDistanceText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#424242',
    borderRadius: 5,
    paddingVertical: 5,
    width: 100,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 5
  },

  pointsGainedText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#424242',
    borderRadius: 5,
    paddingVertical: 5,
    width: 'auto', // 폭을 자동으로 조정
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 5
  },

  drivingInfoContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  drivingInfoText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },

  searchButton: {
    backgroundColor: "#6a9",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 4
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },

  resetButton2: {
    backgroundColor: 'white', // 배경색 지정
    paddingVertical: 9, // 상하 패딩
    paddingHorizontal: 20, // 좌우 패딩
    borderRadius: 5, // 둥근 모서리 정도
    marginLeft: 6,
    marginTop: 2
  },



});

export default DraggableBottomSheet;

