import { FlatList, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Text } from '@tonkeeper/uikit'
import { colors } from '../../../constants/colors'
import ItemCardNFT from './ItemCardNFT'
import { ethers } from 'ethers';
import { ActivityIndicator } from 'react-native'
import { useEvm, useChain } from "@tonkeeper/shared/hooks";
import { useFocusEffect } from "@react-navigation/native";

const TabListNFTs = () => {
    const [nftList, setNftList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [balanceOf, setBalanceOf] = useState<boolean>(true);
    const chain = useChain()?.chain;
    const { evm } = useEvm() || {};
    const addressEvm = evm?.addressWallet;
    const privateKey = evm?.privateKey;

    // Địa chỉ của hợp đồng thông minh ERC-721
    const CONTRACT_ADDRESS = "0xBaF2c860B9746B9e6dc86b39cD048DC4211C0Fd7";
    const provider = new ethers.JsonRpcProvider(chain.rpc);
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
        "function tokenURI(uint256 tokenId) view returns (string)"
    ];

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

    const fetchNftList = async () => {
        setLoading(true)
        try {
            const address = wallet.address;
            const balance = await contract.balanceOf(address);
            let tokenIds: number[] = [];
            const tokenIndex = Number(balance.toString()) - 1
            if (tokenIndex === -1) {
                setBalanceOf(false);
                setNftList([]);
                return;
            }

            for (let i = 0; i <= tokenIndex; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(address, i);
                tokenIds.push(Number(tokenId.toString()));
            }
            const promises = tokenIds.map(async (tokenId) => {
                const tokenURI = await contract.tokenURI(tokenId);
                const response = await fetch(tokenURI);
                const data = await response.json();
                return {
                    tokenId: tokenId,
                    ...data
                };
            });

            const nftDataList = await Promise.all(promises);
            setNftList(nftDataList);
            setBalanceOf(true);
        } catch (error) {
            setBalanceOf(false);
            console.log("Error fetching NFT list:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchNftList();
        }, [addressEvm, chain.chainId])
    );

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator size={'small'} color={colors.Primary} style={{ width: '100%', height: 300 }} />
                ) : balanceOf ? (
                    <FlatList
                        scrollEnabled={false}
                        data={nftList}
                        numColumns={2}
                        keyExtractor={(item) => item.tokenId.toString()}
                        renderItem={({ item }) => <ItemCardNFT item={item} />}
                        ListFooterComponent={() => (<View style={{ height: 100 }}></View>)}
                        contentContainerStyle={{ marginTop: 16, paddingHorizontal: 8 }}
                    />
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 50 }}>
                        <Image style={styles.image} source={require('../../../assets/logo/img_not_found.png')} />
                        <Text type='h3' color='textBlack' fontSize={20} textAlign='center' style={{ marginTop: 24 }}>No NFT found</Text>
                        <Text type='body2' color='textGray' fontSize={14} textAlign='center' style={{ marginTop: 8 }}>Buy NFT stuff to your collection!</Text>
                        <TouchableOpacity style={styles.btn}>
                            <Text type='h3' color='constantWhite' fontSize={14} textAlign='center'>Open NFT marketplace</Text>
                        </TouchableOpacity>
                        <View style={{height: 100}}></View>
                    </View>
                )
            }
        </View>
    )
}

export default TabListNFTs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 60,
        marginTop: 15
    },
    btn: {
        width: '100%',
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.Primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
})