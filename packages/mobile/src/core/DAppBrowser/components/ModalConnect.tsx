import {
  StyleSheet,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { globalStyles } from "$styles/globalStyles";
import { Button, Icon } from "$uikit";
import { SheetActions, navigation, useNavigation } from "@tonkeeper/router";
import { colors } from "../../../constants/colors";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { push } from "$navigation/imperative";
 import { Modal, Text, deviceHeight } from "@tonkeeper/uikit";
 import * as S from '../../TonConnect/TonConnect.style';
import { useTheme } from "$hooks/useTheme";
import { shortenWalletAddress } from "$libs/EVM/createWallet";

interface Props {
modalVisible: boolean;
onClose: () => void;
}
const HEIGHT_RATIO = deviceHeight / 844;
export interface TDConnectModalResponse {
  accept: boolean;
}
export type TDConnectModalProps = {  
  requestPromise: {
    resolve: (response: boolean) => void;
    reject: () => void;
  };
  value: any;
  gas: any;
  addressTo: any;
  balance: any;
  reff: string;
};



const ModalConnect = (props: TDConnectModalProps) => {
  const nav = useNavigation();
  const { requestPromise, value, gas, addressTo, balance, reff } = props;
  const total = parseFloat(value) + parseFloat(gas);
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const theme = useTheme();
  let truncatedAddress = shortenWalletAddress(addressTo);
  
  const onClose = useCallback(() => nav.goBack(), [nav]);

  const createResponseAccept = useCallback(async () => {
    let accept = true;
    onClose();
    requestPromise.resolve(accept);   
  },[]);
  const createResponseReject = useCallback(async () => {
    onClose();
    requestPromise.reject();   
  },[]);

  return (
    <Modal>
      <Modal.Content safeArea>
        <View style={styles.modal}>
        <View style={styles.header}>
          <View></View>
          <Text
            type="h3" color="primaryColor" style={{marginLeft:20}}
          >
          Confirm Transaction
          </Text>
          <TouchableOpacity style={styles.boxClose} onPress={createResponseReject}>
            <Image
              style={styles.iconCancel}
              source={require("../../../assets/icons/png/ic_cancel.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <View style={{alignItems: "center", marginBottom: 15 * HEIGHT_RATIO}}>
            <View style={styles.container3}>
              <Icon name="ic-globe-16" color="constantDark" style={{margin: 3 * HEIGHT_RATIO}}/>
              <Text type="body2" color="textBlack">{reff}</Text>
            </View>
            </View>
          <View style={[styles.container1, { justifyContent: "space-between"}]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text type="body2" color="textBlack">{chain.name}</Text>
              <Text type="label1" color="textBlack">{evm.name}</Text>
            </View>
            </View>
            <View style={{alignItems: "flex-end"}}>
              <Text type="body2" color="textBlack">Balance</Text>
              <Text type="label1" color="textBlack">{balance.substring(0,6)} {chain.currency}</Text>
            </View>
           </View>
           <View style={{alignItems: "center", margin: 10 * HEIGHT_RATIO}}>
           <Text type="h1" color="textBlack">{value.substring(0,6)} {chain.currency.toUpperCase()}</Text>
           </View>
           <Text type="label1" color="textBlack">From:</Text>
           <View style={styles.container1}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text type="label1" color="textBlack">{evm.name}</Text>
              <Text type="body2" color="textBlack">Balance: {balance.substring(0,6)} {chain.currency}</Text>
            </View>
           </View>
           <Text type="label1" color="textBlack" style={{marginTop: 10 * HEIGHT_RATIO}}>To:</Text>
           <View style={styles.container1}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text type="label2" color="textBlack">{truncatedAddress}</Text>
            </View>
           </View>
           <View style={styles.container2}>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
              <Text type="body2" color="textBlack">Estimated gas fees:</Text>
              <Text type="body2" color="primaryColor">{gas.substring(0,9)} {chain.currency}</Text>
            </View>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 5 * HEIGHT_RATIO}}>
              <Text type="body2" color="textBlack">Total:</Text>
              <Text type="body2" color="textBlack">{total.toString().substring(0,7)} {chain.currency}</Text>
            </View>
           </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff", borderWidth: 1, borderColor: colors.Primary}]} onPress={createResponseReject}>
              <Text type="label1" color="primaryColor">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.Primary}]} onPress={createResponseAccept}>
              <Text type="label1">Confirm</Text>
            </TouchableOpacity>
           </View>
           

        </View>
     
        </View>
    
      </Modal.Content>
    </Modal>
  );
};

export default ModalConnect;

export function openTDConnect(props: TDConnectModalProps) {
  push('SheetsProvider', {
    $$action: SheetActions.ADD,
    component: ModalConnect,
    params: props,
    path: 'TDConnect',
  });
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fafafa", 
  },
  modalContent: {
    paddingHorizontal: 20 * HEIGHT_RATIO,
    marginBottom: 20 * HEIGHT_RATIO,
    marginTop:10 * HEIGHT_RATIO,
    justifyContent: "flex-end"
  },
  boxClose: {
    width: 26,
    height: 26,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  iconCancel: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
     width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 5 * HEIGHT_RATIO,
  },
  button: {
    width: "47%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10 * HEIGHT_RATIO,
  },
  textButton: {
    fontSize: 13,
  },
  container1: {
    marginVertical: 5 * HEIGHT_RATIO,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    borderColor: "#DDDDDD",
  },
  container3: {
    marginVertical: 5 * HEIGHT_RATIO,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    borderColor: "#DDDDDD",
  },
  container2: {
    marginBottom: 35 * HEIGHT_RATIO,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    borderColor: "#4871EA",
    marginTop: 25 * HEIGHT_RATIO,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 10 * HEIGHT_RATIO,
  },
});