import { FlatList, StyleSheet, View, Image, Pressable, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Text } from '@tonkeeper/uikit'
import { colors } from '../../../constants/colors'
import LinearGradient from 'react-native-linear-gradient';
import { MainStackRouteNames, WalletStackRouteNames } from "$navigation";

import { useNavigation } from '@tonkeeper/router';

const ItemCardNFT = (props) => {
    const {item} = props;
    const navigation = useNavigation();
  return (
    <Pressable style={[styles.card]} onPress={() => navigation.navigate(WalletStackRouteNames.DetailNFT, {id : item.id})}>
                <LinearGradient colors={['#A9A9A9', '#ffffff', '#A9A9A9']} style={styles.linearGradient1}>
                    <LinearGradient colors={['#626262', '#EDEDED', '#626262']} style={styles.linearGradient2}>
                        <LinearGradient colors={['#A9A9A9', '#ffffff', '#A9A9A9']} style={styles.linearGradient3}>
                            <View style={{
                                position: 'relative', width: '100%',
                                height: '100%'
                            }}>
                                <Image style={[styles.image]} source={item.image} />

                                <ImageBackground
                                    source={item.image}
                                    // style={[styles.textBox]}
                                    blurRadius={60}
                                    style={{
                                        width: '100%', height: "30%", position: 'relative', borderBottomLeftRadius: 6,
                                        borderBottomRightRadius: 6,
                                    }}
                                    imageStyle={{
                                        borderBottomLeftRadius: 6, borderBottomRightRadius: 6, height: '100%'
                                    }}
                                >
                                    <View style={[styles.textBox]}>
                                        <Text color='constantWhite' type='h3' fontSize={24} >#000{item.id}</Text>
                                        <Text color='constantWhite' type='body3' fontSize={14} style={{ marginTop: 6 }} >TD Identification</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </LinearGradient>
            </Pressable>
  )
}

export default ItemCardNFT

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: '40%', // chiều rộng của mỗi item
        backgroundColor: '#f0f0f0',
        // marginHorizontal: 8, // khoảng cách giữa các item
        marginBottom: 16, // khoảng cách dưới cùng của mỗi item
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 3
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6

    },
    linearGradient1: {
        width: '100%',
        height: 300, // chiều rộng của mỗi item
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        padding: 2
    },
    linearGradient2: {
        width: '100%',
        height: '100%', // chiều rộng của mỗi item
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        padding: 7
    },
    linearGradient3: {
        width: '100%',
        height: '100%', // chiều rộng của mỗi item
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 2,
    },
    textBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 6,
        backgroundColor: 'rgba(1,1,1,0.5)',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    card: {
        flex: 1,
        // width: width * 0.5,
        height: 300, // chiều rộng của mỗi item
        marginHorizontal: 8, // khoảng cách giữa các item
        marginBottom: 16, // khoảng cách dưới cùng của mỗi item
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})