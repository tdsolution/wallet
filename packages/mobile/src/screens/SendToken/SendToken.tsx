import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../../components/HeaderBar'
import { useNavigation } from '@tonkeeper/router'

const SendToken = () => {
    const navigation = useNavigation()
    const handleBack = () => {
        navigation.goBack()
    }
  return (
    <SafeAreaView>
      <HeaderBar title='Send MATIC' onBack={handleBack} />
      
    </SafeAreaView>
  )
}

export default SendToken

const styles = StyleSheet.create({})
