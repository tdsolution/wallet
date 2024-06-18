
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Dimensions, Share, Platform, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../constants/colors'
import { useNavigation } from '@tonkeeper/router'
import { useEvm, useChain } from "@tonkeeper/shared/hooks";
import { Text, copyText } from "@tonkeeper/uikit";
import { throttle } from '@tonkeeper/router';
import { ethers, formatUnits, formatEther } from 'ethers'
import { ScrollView } from 'react-native';
import { WalletStackRouteNames } from "$navigation";
import { useReferral } from "@tonkeeper/shared/hooks/useReferral";
import ModalReferral from './item/ModalReferral';


const { width, height } = Dimensions.get('window');


const Referral = () => {
    const navigation = useNavigation();
    const evm = useEvm()?.evm;
    const { isReferrer, setIsReferrer } = useReferral();
    const chain = useChain()?.chain;
    const addressEvm = evm.addressWallet;
    const privateKey = evm.privateKey
    const [code, setCode] = useState<string>('');
    const [userList, setUserList] = useState([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('Success');
    const [subtitleModal, setSubtitleModal] = useState<string>('Registration successful!');
    // const [isReferrer, setIsReferrer] = useState<boolean>(isReferrerAddress);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    let disable = code.length > 0 && isLoading == false;
    const formatAddress = (address: string) => {
        var str = address.slice(-8);
        return str;
    }

    const CHPLAY = 'https://play.google.com/store/apps/details?id=com.mobile_1.tdwallet.app&pli=1';
    const APPSTORE = 'https://apps.apple.com/vn/app/td-wallet-app/id6471485477?l=vi&platform=iphone';
    const URL_NETWORK = chain.rpc;
    const PRIVATE_KEY = privateKey;

    // const contractAddress = '0xc24B642357D7Dd1bBE33F3D8Aa0101DFA2cf6EB9';
    const contractAddress = '0xC02a02471B491689D79c59116FBCeAfdB9eA554a';
    // ABI của hợp đồng thông minh
    const contractABI = [
        "function register(address _referrer, string memory _code) external",
        "function userInfosByCode(string code) view returns (address, address, uint256, uint256, uint256, bool, string)",
        "function isReferrer(address _address) view returns (bool)",
        // "function getTotalUserByUp(address _referrer, uint256 _limit, uint256 _skip) view returns (tuple(address userAddress, address referByAddress, uint256 dateTime, uint256 totalRefer, uint256 totalRefer10, bool top10Refer, string code)[], uint256)"
        "function getTotalUserByUp(address _referrer, uint256 _limit, uint256 _skip) view returns ((address, address, uint256, uint256, uint256, bool, string)[], uint256)"

    ];

    const handleCloseModal = () => {
        setIsVisible(false);
    }

    const checkIsReferrer = async () => {
        try {
            // Tạo provider
            const provider = new ethers.JsonRpcProvider(URL_NETWORK);

            // Kết nối đến contract
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            // Gọi hàm isReferrer
            const isReferrer = await contract.isReferrer(addressEvm);

            console.log("isReferrer: ", isReferrer);
            // Hiển thị kết quả
            if (isReferrer) {
                setIsReferrer(true);
                return true;
            } else {
                setIsReferrer(false);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchUsers = async (_referrer: string, _limit: number, _skip: number) => {
        try {
            const provider = new ethers.JsonRpcProvider(URL_NETWORK);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            const [users, totalItems] = await contract.getTotalUserByUp(_referrer, _limit, _skip);

            // Convert totalItems from BigNumber to number

            // Map users array to formattedUsers
            const formattedUsers = users.map(user => ({
                userAddress: user[1],
                referByAddress: user[0],
                dateTime: user[2].toString(), // Convert to string if needed
                totalRefer: user[3].toString(), // Convert to string if needed
                totalRefer10: user[4].toString(), // Convert to string if needed
                top10Refer: user[5],
                code: user[6],
            }));

            // console.log("Formatted Users: ", formattedUsers);
            // console.log("Total Items: ", totalItems);

            // Set state with formattedUsers and totalItems
            setUserList(formattedUsers);
            setTotalItems(Number(totalItems.toString()));
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };
    const handleDefaultCore = () => {
        setCode('d9cbfe0a');
    }

    const register = async (referrer: string) => {
        try {
            // Tạo provider
            const provider = new ethers.JsonRpcProvider(URL_NETWORK);

            // Lấy private key của người dùng
            const privateKey = PRIVATE_KEY;
            const wallet = new ethers.Wallet(privateKey, provider);
            const value = ethers.parseEther('0.1');

            // Kết nối đến contract
            const contract = new ethers.Contract(contractAddress, contractABI, wallet);

            const referralCode = addressEvm.slice(-8).toLocaleLowerCase();
            // Gọi hàm register
            const tx = await contract.register(referrer, referralCode, { value });

            // Chờ giao dịch được xác nhận
            const transaction = await tx.wait();
            console.log("Transactions: ", transaction);
            setTitleModal("Success");
            setSubtitleModal("Registration successful!");
            setIsVisible(true);
            // Alert.alert('Success', 'Registration successful!');
            setIsReferrer(true);
        } catch (error) {
            console.log(error);

            // Hiển thị thông báo lỗi chi tiết hơn
            if (error.reason) {
                setTitleModal("Oops");
                setSubtitleModal("Your wallet already registered!");
                setIsVisible(true);
                // Alert.alert('Error', 'Your wallet already registered!');
            } else {
                // Alert.alert('Error', "You do not have enough funds to cover the gas fee for registration. Please add more funds to your account and try again."
                // Alert.alert('Error', "Not enough core for gas fee"
                setTitleModal("Oops");
                setSubtitleModal("Not enough core for gas fee");
                setIsVisible(true);
            
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Mã code giới thiệu cần chuyển đổi thành địa chỉ ví
    // const referrerCode = "66d97f88";
    // Hàm xử lý khi nhấn nút lấy thông tin
    const handleGetUserInfo = async () => {
        setIsLoading(true);
        try {
            if (code.length == 8) {
                // Tạo provider từ URL RPC của mạng BSC Testnet
                const provider = new ethers.JsonRpcProvider(URL_NETWORK);

                // Tạo đối tượng contract từ ABI và địa chỉ contract
                const contract = new ethers.Contract(contractAddress, contractABI, provider);

                // Gọi phương thức userInfosByCode
                const userInfo = await contract.userInfosByCode(code);
                const lastItem = userInfo.length - 1;
                if (userInfo[lastItem] === '') {
                    Alert.alert("Error", "Referral ID don't exist!");
                    setIsLoading(false);
                } else {
                    register(userInfo[0])
                    // Alert.alert("Success", `Referral ID: ${userInfo[lastItem]}`);
                }
                console.log('userInfo: ', userInfo);
            } else {
                // Alert.alert("Error", "Please enter exactly 8 characters!");
                setTitleModal("Oops");
                setSubtitleModal("Please enter exactly 8 characters!");
                setIsVisible(true);
                setIsLoading(false);

            }

        } catch (err) {
            console.log('Error getting user info:', err.message);
            setIsLoading(false);
        }
    };

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

    useEffect(() => {
        fetchUsers(addressEvm, 10, 0);
    }, [totalItems])

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.headerBar]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={[styles.btnBack]} source={require('../../assets/icons/png/ic_back.png')} />
                    </TouchableOpacity>
                    <Text fontSize={20} color='primaryColor' type='h3'>
                        Referral
                    </Text>
                    <View style={{ width: 15 }}></View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 20, height: height * 0.65 }}>
                    {
                        isReferrer ? (
                            <Text type="h1" color='primaryColor' fontSize={30} textAlign='center'>{totalItems * 10} $TDS</Text>
                        ) : null
                    }
                    <Image style={[styles.image]} source={require("../../assets/logo/img_referral.png")} />
                    <Text type="h1" color="textBlack" fontSize={30} textAlign='center'>Invite friends to mine $TDS <Text type="h1" color='primaryColor' fontSize={30} textAlign='center'>(10TDS / per)</Text></Text>

                    {
                        !isReferrer ? (
                            <View>
                                <View style={[styles.boxInput]}>
                                    <TextInput
                                        autoFocus
                                        placeholder='Referral id'
                                        placeholderTextColor={"grey"} value={code}
                                        style={[styles.input]}
                                        onChangeText={(t) => setCode(t)} />
                                    <TouchableOpacity
                                        onPress={handleDefaultCore}
                                        style={[styles.btnDefaultCode,]}>
                                        <Text color='constantWhite' fontSize={16} type='label1'>User default code</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    disabled={disable ? false : true}
                                    onPress={handleGetUserInfo}
                                    style={[styles.btnRegister, { backgroundColor: code.length >= 8 ? colors.Primary : 'grey' }]}>
                                    {
                                        isLoading ? (<ActivityIndicator size={'small'} color={'white'} />) : (
                                            <Text color='constantWhite' fontSize={16} type='label1'>Register</Text>
                                        )
                                    }
                                </TouchableOpacity>

                            </View>

                        ) : (<Text color='primaryColor' fontSize={16} type='body1' textAlign='center' style={{ marginTop: 10 }}>Your friend: {totalItems}</Text>)
                    }

                </View>
                {
                    isReferrer ? (
                        <View style={{ paddingHorizontal: 20, height: height * 0.20, alignItems: 'flex-end' }}>
                            <View style={[styles.referralId]}>
                                <Text color='textGray' fontSize={16} type='label1'>Your referral code:</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text color='constantBlack' fontSize={16} type='label1'>{formatAddress(addressEvm).toLocaleLowerCase()}</Text>
                                    <View style={{ width: 10 }}></View>
                                    <TouchableOpacity onPress={copyText(formatAddress(addressEvm).toLocaleLowerCase())}>
                                        <Image style={[styles.btnCopy]} source={require("../../assets/icons_v1/icon_copy.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.btnShare]} onPress={share(Platform.OS === 'android' ? CHPLAY : APPSTORE)}>
                                <Image style={[styles.btnCopy, { tintColor: colors.White, marginRight: 4 }]} source={require("../../assets/icons/png/ic_gift.png")} />
                                <Text color='constantWhite' fontSize={16} type='h3'>Share</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                <ModalReferral isVisible={isVisible} onClose={handleCloseModal} title={titleModal} subtitle={subtitleModal} />
            </ScrollView>
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
    referralId: {
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
    input: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        height: 40,
        borderRadius: 16,
        paddingHorizontal: 15
    },
    boxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 20
    },
    btnRegister: {
        backgroundColor: colors.Primary,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 16,
        marginTop: 20
    },
    btnDefaultCode: {
        backgroundColor: colors.Primary,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    }
})