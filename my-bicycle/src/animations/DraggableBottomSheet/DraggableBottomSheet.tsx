import React, {useRef, useState} from 'react';
import {Animated, Button, PanResponder, Platform, StyleSheet, View} from 'react-native';
import {WINDOW_HEIGHT} from '../utils';
//import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
//const uri = `https://806hyogi.github.io/hostingtest/`; // 웹뷰 url
const apiKey = 'AIzaSyDvljOjmw4WGRKFE6nv8R4VBxiiVQsxHcw'; //Google Maps API 키


const DraggableBottomSheet = () => {
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
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }

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

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={styles.container}>
      {/*
      <WebView
          source={{ uri }}
          geolocationEnabled={true}
          onGeolocationPermissionShowPrompt={(origin, callback) => callback(true)}
        />
      */}
      {/* Bottom Sheet 가시성에 따라 렌더링 조건부 실행 */}
      {isBottomSheetVisible && (
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
      </Animated.View>
      )}

      {/* Bottom Sheet 토글 버튼 */}
      <Button title="Toggle Bottom Sheet" onPress={toggleBottomSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
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
    backgroundColor: 'white',
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
    marginTop: 17
  },
});

export default DraggableBottomSheet;
