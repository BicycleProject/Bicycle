import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1320',
    alignItems: 'center',
    justifyContent: 'center',
},
  adBar: {
    width: screenWidth,
    height: 400, 
    backgroundColor: '#669fef', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: 170,
    height: 170,
    borderRadius: 20,
    backgroundColor: '#313A4B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonImage: {
    width: 120, 
    height: 130, 
  },
  adImage:{
    top:70,
    width: screenWidth,
    height: 300, 
  },


  recommendationImage: {
    position: 'absolute', 
    right: -5, 
    top: '0%', 
    width: 50,
    height: 50,
  },
});

// 광고 바 컴포넌트
function AdBar() {
  return (
    <View style={styles.adBar}>
      <Image
          source={require('./src/ad.png')} 
          style={[styles.adImage, { resizeMode: 'contain' }]}/>
    </View>
  );
}
function MainScreen() {
  const navigation = useNavigation();
const handleddarungstart = () => {
  navigation.navigate('repairshop');
};
const handleridingstart = () => {
  navigation.navigate('Riding');
};
  return (
    <View style={styles.container}>
      <AdBar />
      <TouchableOpacity
        style={[styles.button, { top: 100, right: 100 }]}
        onPress={handleridingstart}>
        <Image
          source={require('./src/AI경로추천.png')} 
          style={styles.buttonImage}/>
           <Image
          source={require('./src/추천.png')} 
          style={styles.recommendationImage}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { bottom: 90, left: 100 }]}
        onPress={() => {
        }}>
        <Image
          source={require('./src/자전거탈래.png')} 
          style={styles.buttonImage}/>
      </TouchableOpacity>

     

      <TouchableOpacity
        style={[styles.button, { bottom: 60, right: 100 }]}
        onPress={() => {
        }}>
        <Image
          source={require('./src/근처대여점.png')} 
          style={styles.buttonImage}/>
         
      </TouchableOpacity>
      
      

      <TouchableOpacity
        style={[styles.button, { bottom: 250, left: 100 }]}
        onPress={handleddarungstart}>
        <Image
          source={require('./src/스토어.png')} 
          style={styles.buttonImage}/>
      </TouchableOpacity>
    </View>
  );
}

export default MainScreen;
