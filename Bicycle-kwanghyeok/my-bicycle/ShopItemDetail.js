import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width; // 화면 가로 크기를 가져옴


function ShopItemDetail() {
    const route = useRoute();
    const item = route.params.item;
    const navigation = useNavigation();
    const [selectedMenu, setSelectedMenu] = useState('상품설명');// 초기값 설정
    const [isModalVisible, setModalVisible] = useState(false);// 모달 상태 저장 (기본값은 false)
    const [quantity, setQuantity] = useState(1);

    // 찜 상태 저장 (기본값은 false)
    const [isZzim, setZzim] = useState(false);

    // 가격 문자열에서 콤마와 원 제거 후 정수로 변환
    const beforePrice = parseInt(item.before_price.replace(/,/g, '').replace('원', ''), 10);
    const price = parseInt(item.price.replace(/,/g, '').replace('원', ''), 10);

    // 할인율 계산
    const salePercent = Math.round((1 - price / beforePrice) * 100);

    const handleBackPress = () => {
        navigation.navigate('Shop');
    };
    const handleBasketPress = () => {
        //장바구니 화면으로 이동
    };
    const handleBuyPress = () => {
        setModalVisible(true);  // 모달 보이기
        setQuantity(1);
    };
    const handleBuy2Press = () => {
        //구매 로직
    };
    const handleClosePress = () => {
        setModalVisible(false);  // 모달 숨기기
    };

    const handlezzimPress = () => {
        setZzim(!isZzim);  // 현재 찜 상태를 반대로 바꿈
    };

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
        '상품설명': (
            <ScrollView>
                <Image source={item.source} style={{ width: screenWidth, height: screenWidth }} />
                <Text style={styles.title}>{item.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.sale}>{salePercent}%</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.before_price}>{item.before_price}</Text>
                </View>
            </ScrollView>
        ),
        '상세정보': (
            <ScrollView>
                <Image source={require('./src/신상품.png')} />
            </ScrollView>
        ),

        '후기': (
            <ScrollView>
                <Image source={require('./src/베스트.png')} />
            </ScrollView>
        ),
        '문의사항': (
            <ScrollView>
                <Image source={require('./src/이벤트.png')} />
            </ScrollView>
        ),
    };

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
                <TouchableOpacity onPress={() => setSelectedMenu('상품설명')}>
                    <Text style={menuItemStyles(selectedMenu === '상품설명').text}>상품설명</Text>
                    <View style={menuItemStyles(selectedMenu === '상품설명').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('상세정보')}>
                    <Text style={menuItemStyles(selectedMenu === '상세정보').text}>상세정보</Text>
                    <View style={menuItemStyles(selectedMenu === '상세정보').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('후기')}>
                    <Text style={menuItemStyles(selectedMenu === '후기').text}>후기</Text>
                    <View style={menuItemStyles(selectedMenu === '후기').underline} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu('문의사항')}>
                    <Text style={menuItemStyles(selectedMenu === '문의사항').text}>문의사항</Text>
                    <View style={menuItemStyles(selectedMenu === '문의사항').underline} />
                </TouchableOpacity>

            </View>
            {contents[selectedMenu]}
            <View style={{ flex: 1 }} />

            <View style={styles.underbar}>
                <TouchableOpacity onPress={handlezzimPress}>
                    <View style={styles.imageContainer}>
                        {isZzim ?
                            <Image source={require('./src/img_after_zzim.png')} /> :
                            <Image source={require('./src/img_before_zzim.png')} />
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBuyPress}>
                    <View style={styles.button}>
                        <Text style={styles.ButtonText}>구매하기</Text>
                    </View>
                </TouchableOpacity>

                {/* 구매창 모달 */}
                <Modal visible={isModalVisible} transparent={true} animationType="slide" >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa'}}>
                        <View style={{ backgroundColor: '#fff', padding: 30, borderRadius: 10, }}>
                            {/* 상품 정보 */}
                            <Text>상품명: {item.description.replace(/(.{25})/g, "$1\n")}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#828282', }}>
                                {/* 수량 조절 */}
                                <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)} style={styles.minusquantityButton}>
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text>{quantity}</Text>
                                <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.plusquantityButton}>
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                                {/* 총 가격 */}
                                <View style={styles.pricetext}>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                </View>
                            </View>
                            <Text style={styles.pricetext2}>총 가격: {price * quantity}원</Text>

                            {/* 닫기 버튼 */}
                            <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
                                <Image source={require('./src/img_delete.png')} style={styles.closeButtonImage} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={handleBasketPress}>
                                    <View style={styles.buybutton}>
                                        <Text style={styles.ButtonText}>장바구니</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleBuy2Press}>
                                    <View style={styles.buybutton}>
                                        <Text style={styles.ButtonText}>구매하기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View >


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C1320',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#ffffff',
    },
    sale: {
        fontSize: 20,
        paddingLeft: 20,
        color: '#FF6B00',
        fontWeight: 'bold',

    },
    price: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: '#007FFF',
        fontWeight: 'bold',

    },
    before_price: {
        fontSize: 16,
        color: '#737373',
        textDecorationLine: 'line-through',
        top: 5,
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
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0C1320', // 원하는 배경색으로 설정
        paddingVertical: 10,
    },
    underbar: {
        flexDirection: 'row',
        padding: 20,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
    },
    ButtonText: {
        fontFamily: 'System',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.025,
        color: '#FFFFFF',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        borderRadius: 16,
        marginLeft: 10,

    },
    minusquantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#787878',
        borderRadius: 15,
        marginHorizontal: 10
    },
    plusquantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007FFF',
        borderRadius: 15,
        marginHorizontal: 10
    },

    quantityButtonText: {
        color: '#ffffff',
        fontSize: 18
    },
    pricetext: {
        marginLeft: '15%',
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    itemPrice: {
        marginVertical: 10,
        fontWeight: 'bold',
        marginLeft: 60,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 0,
    },
    closeButtonImage: {
        width: 30,
        height: 30,
    },
    pricetext2: {
        color: '#1E58BF',
        marginLeft: '40%',
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buybutton: {
        width: 120,
        height: 40,
        backgroundColor: '#1E58BF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    }
});

export default ShopItemDetail;