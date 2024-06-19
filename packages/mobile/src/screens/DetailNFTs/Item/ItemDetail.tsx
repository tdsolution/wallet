import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors';
import { Text } from '@tonkeeper/uikit';


type Props = {
    title: string,
    subtitle: string,
    color?: boolean
}

const ItemDetail = (props: Props) => {
    const {title, subtitle, color} = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text fontSize={14} color='constantBlack' type='body1'>{title}</Text>
            <Text fontSize={14} color= {color ? 'primaryColor' : 'textGray'} type='body1'>{subtitle}</Text>
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.Gray,
        lineHeight: 22
    },
})