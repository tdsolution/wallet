import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Dimensions, ScrollView, FlatList, Platform } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants/colors'
import LinearGradient from 'react-native-linear-gradient';
import ItemPropoties from './Item/ItemPropoties';
import ItemDetail from './Item/ItemDetail';
import { Text } from '@tonkeeper/uikit';
import { useNavigation } from '@tonkeeper/router';
const { width, height } = Dimensions.get('window');
import { MainStackRouteNames, WalletStackRouteNames } from "$navigation";

const DetailNFTs = ({route}) => {
    const {data} = route.params;
    const navigation = useNavigation();
    const [properties, setProperties] = useState([
        {
            id: '1',
            title: 'Background',
            subtitle: 'Blue Sky',
        },
        {
            id: '2',
            title: 'Black',
            subtitle: 'No black',
        },
        {
            id: '3',
            title: 'Body',
            subtitle: 'White',
        },
        {
            id: '4',
            title: 'Outfits',
            subtitle: 'Cyberpunk',
        },
        {
            id: '5',
            title: 'Eyes',
            subtitle: 'Blue',
        },
        {
            id: '6',
            title: 'Hats',
            subtitle: 'No Hat',
        },
        {
            id: '7',
            title: 'Mounth',
            subtitle: 'Bubble Gum',
        },
    ]);
    return (
        <View style={[styles.container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ position: 'relative' }}>
                    <Image source={{uri: data.image}} style={[styles.image]} />

                    <TouchableOpacity style={[styles.btnBack]} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#4CA4E4', '#0C73B5', '#004FA0']} style={[styles.linearGradient]}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: colors.White, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={[styles.icBack]} source={require('../../assets/icons/png/ic_back_nft.png')} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={[styles.safeArea, {flex: 1}]}>
                    <View>
                        <Text fontSize={20} color='textBlack' fontWeight='600'>#{data.tokenId}</Text>
                        <Text fontSize={14} color='textGray' fontWeight='500' style={{ marginTop: 6 }}>{data.name}</Text>
                        <Text fontSize={14} color='textBlack' fontWeight='500' style={{ marginTop: 16, alignItems: 'center', }}>TD Wallet NFT is one of the first NFT projects on The Open Network blockchain. Robots from the resistance, as a symbol of DEX, who fight for absolute freedom...
                            <Text fontSize={14} color='primaryColor' fontWeight='600'>   Uncover</Text>
                            <Image style={[styles.icDown, { tintColor: colors.Primary }]} source={require('../../assets/icons/png/ic_chevron_down.png')} />
                        </Text>
                    </View>
                    <View style={[styles.box]}>
                        <Text fontSize={16} color='textBlack' fontWeight='600'>More about {data.name}</Text>
                        <Text fontSize={14} color='textGray' fontWeight='500' style={{ marginTop: 16, alignItems: 'center' }}>{data.description}...
                            <Text fontSize={14} color='primaryColor' fontWeight='600'>   Uncover</Text>
                            <Image style={[styles.icDown, { tintColor: colors.Primary }]} source={require('../../assets/icons/png/ic_chevron_down.png')} />
                        </Text>
                    </View>
                    <View>
                        <Text fontSize={16} color='textBlack' fontWeight='600' style={{ marginBottom: 16, marginTop: 24 }}>Properties</Text>
                        <FlatList
                            contentContainerStyle={{ gap: 16 }}
                            data={properties}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <ItemPropoties item={item} />}
                            horizontal
                            showsHorizontalScrollIndicator={false} />
                    </View>

                    <View>
                        <Text fontSize={16} color='textBlack' fontWeight='600' style={{ fontWeight: '600', marginTop: 24 }}>
                            Details
                        </Text>
                        <View style={[styles.box, { gap: 8 }]}>
                            <ItemDetail title='Contract Address' subtitle='0xBaF2c860B9746B9e6dc86b39cD048DC4211C0Fd7' color={true} />
                            <ItemDetail title='Token ID' subtitle={data.tokenId} />
                            <ItemDetail title='Token Standard' subtitle='ERC-721' />
                            <ItemDetail title='Blockchain' subtitle='Ethereum' />
                            <ItemDetail title='Limited' subtitle='9999' />
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.btnTranfer]} onPress={() => navigation.navigate(WalletStackRouteNames.SendNFT, {tokenId: data.tokenId, image: data.image})}>
                        <Text fontSize={16} color='constantWhite' fontWeight='600' >Transfer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailNFTs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
    },
    linearGradient: {
        width: 48,
        height: 48,
        borderRadius: 50,
        padding: 1,
    },
    icBack: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    btnBack: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 16,
        left: 16
    },
    image: {
        width,
        height: Platform.OS === 'ios' ? height * 0.5 : height * 0.5,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.Black,
        lineHeight: 24
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.Black,
        lineHeight: 22
    },
    icDown: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
    box: {
        backgroundColor: 'rgba(239, 244, 252, 1)',
        borderRadius: 16,
        padding: 16,
        marginTop: 16
    },
    btnTranfer: {
        width: '100%',
        height: 60,
        backgroundColor: colors.Primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 16
    },
    safeArea: {
        padding: 16,
        paddingBottom: 100,
    },
})