import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { Text } from '@tonkeeper/uikit';

const ItemPropoties = (props) => {
    const {item} = props;
  return (
    <View style={[styles.container]}>
      <Text fontSize={14} color='textBlack' fontWeight='600'>{item.title}</Text>
      <Text fontSize={14} color='textGray' fontWeight='500'>{item.subtitle}</Text>
    </View>
  )
}

export default ItemPropoties

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 244, 252, 1)',
        padding: 14,
        borderRadius: 10,
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
        color: colors.Gray,
        lineHeight: 22
    },
})