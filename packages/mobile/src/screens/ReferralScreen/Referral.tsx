import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Share, Platform } from 'react-native'
import React, {useCallback} from 'react'
import { colors } from '../../constants/colors'
import { useNavigation } from '@tonkeeper/router'
const { height } = Dimensions.get('window')
import { useEvm } from "@tonkeeper/shared/hooks";
import { copyText } from "@tonkeeper/uikit";
import { throttle } from '@tonkeeper/router';


const Referral = () => {
    const navigation = useNavigation();
    const { evm, setEvm } = useEvm();
    const addressEvm = evm.addressWallet;
    const formatAddress = (address: string) => {
        var str = address.slice(-8);
        return str;
    }

    const CHPLAY = 'https://play.google.com/store/apps/details?id=com.mobile_1.tdwallet.app&pli=1';
    const APPSTORE = 'https://apps.apple.com/vn/app/td-wallet-app/id6471485477?l=vi&platform=iphone'

    const share = useCallback(
        (address: string) =>
          throttle(() => {
            Share.share({
              message: address,
            }).catch((err) => {
              console.log('cant share', err);
            });
          }, 1000),
        [],
      );
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.headerBar]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={[styles.btnBack]} source={require('../../assets/icons/png/ic_back.png')} />
                </TouchableOpacity>
                <Text style={[styles.header]}>
                    Referral
                </Text>
                <View style={{ width: 15 }}></View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', flex: 1, paddingTop: 20 }}>
                    {/* <Text style={[styles.subTitle]}>your friends: 50 - mined: 500 TDS</Text> */}
                    <Image style={[styles.image]} source={require("../../assets/logo/img_referral.png")} />
                    <Text style={[styles.title]}>Invite friends to mine $TDS <Text style={[styles.title, { color: colors.Primary }]}>(10TDS / per)</Text></Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 70, paddingHorizontal: 20 }}>
                    <View style={[styles.input]}>
                        <Text style={[styles.referralID, { color: colors.Gray }]}>Referral ID</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.referralID]}>{formatAddress(addressEvm).toLocaleLowerCase()}</Text>
                            <View style={{ width: 10 }}></View>
                            <TouchableOpacity onPress={copyText(formatAddress(addressEvm))}>
                                <Image style={[styles.btnCopy]} source={require("../../assets/icons_v1/icon_copy.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.btnShare]} onPress={share(Platform.OS === 'android' ? CHPLAY : APPSTORE)}>
                        <Image style={[styles.btnCopy, { tintColor: colors.White }]} source={require("../../assets/icons/png/ic_gift.png")} />
                        <Text style={[styles.txtShare]}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Referral

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        paddingHorizontal: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: colors.Primary
    },
    btnBack: {
        width: 16,
        height: 16,
        tintColor: colors.Primary,
        resizeMode: 'contain'
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 16
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: colors.Black,
        textAlign: 'center',
        // width: '70%',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: colors.Gray,
        textAlign: 'center',
        // width: '70%',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f7f7f7',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    referralID: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.Black
    },
    btnCopy: {
        width: 24,
        height: 24,
        tintColor: colors.Black
    },
    btnShare: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Primary,
        borderRadius: 16,
        marginTop: 20
    },
    txtShare: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.White,
        marginLeft: 5,
        fontFamily: 'Poppins-Bold',
    },
})