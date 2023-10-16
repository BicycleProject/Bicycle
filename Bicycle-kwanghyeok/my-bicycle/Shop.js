import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';


const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴
const screenHeight = Dimensions.get('window').width; // 화면 가로 크기를 가져옴


function Shop() {
    const navigation = useNavigation();
    const [selectedMenu, setSelectedMenu] = useState('요거타추천');// 초기값 설정

    const handleBackPress = () => {
        navigation.navigate('MainScreen');
    };

    const handleButton1Press = () => {
        navigation.navigate('Community');
    };

    const handleButton2Press = () => {

    };

    const handleButton3Press = () => {
        // 세 번째 버튼을 눌렀을 때 실행할 작업을 여기에 추가
    };

    const handleButton4Press = () => {
        navigation.navigate('Posting');
    };
    const handleBasketPress = () => {
        //장바구니 화면으로 이동
    };

    const handleItemPress = (item) => {
        navigation.navigate('ShopItemDetail', { item }); // ItemDetail로 네비게이션하고 선택된 아이템을 매개변수로 전달
    };

    const buttons = [
        { image: require('./src/버튼1.png'), onPress: handleButton1Press },
        { image: require('./src/버튼2.png'), onPress: handleButton2Press },
        { image: require('./src/버튼3.png'), onPress: handleButton3Press },
        { image: require('./src/img_menubar.png'), onPress: handleButton4Press },
    ];

    const bicycle_images = [
        { source: require('./src/img_bicycle1.png'), description: '턴베리 카린 접이식자전거 미니벨로 짐받이 20인치 7단', before_price: '225,000원', price: '159,000원' },
        { source: require('./src/img_bicycle2.png'), description: '아큐드 R1 로드자전거 하이텐스틸 700C 시마노 21단 스마트자전거', before_price: '335,000원', price: '239,000원' },
        { source: require('./src/img_bicycle3.png'), description: '알톤 썸탈 SUMTAL 하이브리드 자전거 입문용 출퇴근 학생용', before_price: '399,000원', price: '309,000원' },
    ];
    const menuItemStyles = (isSelected) => StyleSheet.create({
        text: {
            color: isSelected ? '#007FFF' : '#ffffff',
            fontSize: 16,
        },
        underline: {
            height: 2,
            backgroundColor: isSelected ? '#007FFF' : 'transparent',
            marginTop: 5,
        },
    });
    const contents = {
        '요거타추천': (
            <ScrollView>
                <View style={styles.adContainer}>
                    <Swiper
                        autoplay={true}
                        autoplayTimeout={5}
                        style={styles.adBanner}
                        paginationStyle={{ bottom: 0 }}>
                        <TouchableOpacity onPress={() => handleAdClick(1)} style={styles.adSlide} activeOpacity={0}>
                            <Image source={require('./src/shop_ad1.png')} style={styles.adImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAdClick(2)} style={styles.adSlide} activeOpacity={0}>
                            <Image source={require('./src/shop_ad2.png')} style={styles.adImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAdClick(3)} style={styles.adSlide} activeOpacity={0}>
                            <Image source={require('./src/shop_ad3.png')} style={styles.adImage} />
                        </TouchableOpacity>
                    </Swiper>
                </View>
                <Text style={styles.Text1}>이 상품 어때요?</Text>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {bicycle_images.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleItemPress(image)}>
                        <View key={index} style={styles.imageContainer}>
                            <Image source={image.source} style={styles.image} />
                            <Text style={styles.imageDescription} numberOfLines={2} ellipsizeMode='tail'>{image.description}</Text>
                            <Text style={styles.before_price}>{image.before_price}</Text>
                            <Text style={styles.imageDescription}>{image.price}</Text>
                        </View>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </ScrollView>
        ),
        '신상품': (
            <ScrollView>
                <View style={styles.adContainer}>
                        <Image source={require('./src/신상품.png')}  />
                </View>
            </ScrollView>
        ),

        '베스트': (
            <ScrollView>
                <View style={styles.adContainer}>
                <Image source={require('./src/베스트.png')}  />
                </View>
            </ScrollView>),
        '이벤트': (
            <ScrollView>
                <View style={styles.adContainer}>
                <Image source={require('./src/이벤트.png')}  />
                </View>
            </ScrollView>),
        '공지사항': (
            <ScrollView>
                <View style={styles.adContainer}>
                <Image source={require('./src/공지사항.png')}  />
                </View>
            </ScrollView>),
    };

    function handleAdClick(adNumber) {
        if (adNumber === 1) {
            //navigation.navigate('Login');
        } else if (adNumber === 2) {
            //navigation.navigate('Aipath');
        } else if (adNumber === 3) {
            //navigation.navigate('Community');
        }
    }


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}>
                    <Image
                        source={require('./src/뒤로가기.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
                <Image
                    source={require('./src/logo.png')}
                    style={styles.logoImage}
                />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBasketPress}>
                    <Image
                        source={require('./src/img_shopping.png')}
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => setSelectedMenu('요거타추천')}>
                    <Text style={menuItemStyles(selectedMenu === '요거타추천').text}>요거타추천</Text>
                    <View style={menuItemStyles(selectedMenu === '요거타추천').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('신상품')}>
                    <Text style={menuItemStyles(selectedMenu === '신상품').text}>신상품</Text>
                    <View style={menuItemStyles(selectedMenu === '신상품').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('베스트')}>
                    <Text style={menuItemStyles(selectedMenu === '베스트').text}>베스트</Text>
                    <View style={menuItemStyles(selectedMenu === '베스트').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('이벤트')}>
                    <Text style={menuItemStyles(selectedMenu === '이벤트').text}>이벤트</Text>
                    <View style={menuItemStyles(selectedMenu === '이벤트').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('공지사항')}>
                    <Text style={menuItemStyles(selectedMenu === '공지사항').text}>공지사항</Text>
                    <View style={menuItemStyles(selectedMenu === '공지사항').underline} />
                </TouchableOpacity>
            </View>
            {contents[selectedMenu]}

            {/* 이 부분이 있어야 아래 버튼들이 화면 하단에 렌더링 됨 */}
            <View style={{ flex: 1 }} /> 
            <View style={styles.buttonContainer}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={button.onPress}>
                        <Image
                            source={button.image}
                            style={{ width: 40, height: 40 }} // 이미지 크기는 원하는 대로 조절하세요.
                            resizeMode="contain" />
                        <Text style={styles.buttonText}>{button.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C1320',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        top: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
    },
    button: {
        backgroundColor: '#0C1320',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0C1320', // 원하는 배경색으로 설정
        paddingVertical: 10,

    },

    menuItem: {
        color: '#ffffff', //원하는 글자색으로 설정
        fontSize: 16,
    },
    selectedMenuItem: {
        color: '#007FFF',
    },
    adContainer: {
        zIndex: 0, // 광고 컨테이너는 다른 컴포넌트 위에 렌더링
        top: 0,
    },
    adBanner: {
        height: screenWidth, // 광고 배너의 높이 설정
        top: 0,
    },
    adSlide: {
        flex: 1,
    },
    adImage: {
        width: screenWidth,
        height: '100%',
    },
    Text1: {
        color: '#FFFFFF', // 원하는 글자색으로 설정
        fontSize: 25,     // 원하는 글자 크기로 설정
        margin: 15,      // 원하는 마진으로 설정 (상하좌우 동일한 마진을 적용)
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 170,
        alignItems: 'center', // 중앙 정렬
        // marginHorizontal: 10, // 좌우 마진 추가 (원하는 값으로 조정)
    },
    image: {
        width: 150,
        height: 150, // 원하는 비율로 높이 설정 (가로 크기의 75%)
        resizeMode: 'cover'
    },
    imageDescription: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 0,
        textAlign: 'center',
    },
    before_price: {
        color: '#737373',
        fontSize: 13,
        marginTop: 0,
        textAlign: 'center',
        textDecorationLine: 'line-through',
    }
});

export default Shop;