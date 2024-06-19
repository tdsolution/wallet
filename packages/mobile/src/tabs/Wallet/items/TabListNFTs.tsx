import { FlatList, StyleSheet, View, Image, Pressable, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Text } from '@tonkeeper/uikit'
import { colors } from '../../../constants/colors'
import { DATA_NFTS } from './Data'
import ItemCardNFT from './ItemCardNFT'

const TabListNFTs = () => {
    return (
        <View style={[styles.container]}>
            <FlatList
                data={DATA_NFTS}
                numColumns={2}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => <ItemCardNFT item = {item} />}
                scrollEnabled={false}
                ListFooterComponent={() => (<View style={{ height: 100 }}></View>)}
                contentContainerStyle={{ marginTop: 16, paddingHorizontal: 8 }}
            />
        </View>
    )
}

export default TabListNFTs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
    }
})