import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";

interface Props {
    modalVisible: boolean, 
    onClose: () => void
}
const ModalConnectWallet = (props: Props) => {
    const { modalVisible, onClose } = props;
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            backgroundColor: "rgba(225,225,225,0.5)", // Màu nền của modal
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></Pressable>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#ffffff",
            height: 450,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <View style={{ padding: 25 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../../assets/icons/png/ic_cancel_connect.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.textHeader}>Connect Wallet</Text>
              <Text></Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 27 }}>
              <Image
                source={require("../../../assets/logo/img_connect_wallet.png")}
                style={styles.image}
              />
            </View>
            <TouchableOpacity
              style={styles.box}
              // onPress={() => navigation.navigate(CreateWalletStackRouteNames.Backup)}
            >
              <Image
                source={require("../../../assets/logo/img_create.png")}
                style={styles.iconPlus}
              />
              <View style={{ width: "80%" }}>
                <Text style={styles.title}>Create new wallet</Text>
                <Text style={styles.body}>Secret phrase or swift wallet</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              // onPress={() => navigation.navigate(CreateWalletStackRouteNames.Backup)}
            >
              <Image
                source={require("../../../assets/logo/img_create.png")}
                style={styles.iconPlus}
              />
              <View style={{ width: "80%" }}>
                <Text style={styles.title}>Add existing wallet</Text>
                <Text style={styles.body}>Import, restore or view-only</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}

export default ModalConnectWallet

const styles = StyleSheet.create({
    textHeader: {
      fontSize: 20,
      fontWeight: "600",
      color: "#4871EA",
      lineHeight: 26,
      textAlign: "center",
      fontFamily: "Poppins-Bold",
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
    image: {
      width: 140,
      height: 136,
      resizeMode: "contain",
      marginBottom: 10,
    },
    box: {
      height: 75,
      backgroundColor: "#90909014",
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginTop: 16,
    },
  
    title: {
      fontSize: 14,
      fontWeight: "500",
      color: "#4871EA",
      lineHeight: 26,
      textAlign: "left",
      fontFamily: "Poppins-Medium",
    },
    body: {
      fontSize: 12,
      fontWeight: "400",
      color: "#7C7C7C",
      lineHeight: 16,
      textAlign: "left",
      fontFamily: "Poppins-Light",
    },
    iconPlus: {
      width: 40,
      height: 40,
      borderRadius: 20,
      resizeMode: "contain",
    },
    modalContent: {
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
      padding: 20,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
    },
    textButton: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.Black,
      lineHeight: 26,
      textAlign: "center",
      fontFamily: "Poppins-Medium",
      marginLeft: 10,
    },
  });