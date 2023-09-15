import React from 'react';
import WebViewComponent from './KakaoComponent'; // kakao map 연동
import { StyleSheet } from 'react-native';


export default function App() {
  return (
    <WebViewComponent style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  webview:{
    width: 300,
    height: 200,
  }
});