import {
  StyleSheet,
  Text,
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
 import { Modal, deviceHeight } from "@tonkeeper/uikit";
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
            style={[
              globalStyles.textHeader,
            ]}
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
              <Text style={[styles.chainName, {marginBottom: -4}]}>{reff}</Text>
            </View>
            </View>
          <View style={[styles.container1, { justifyContent: "space-between"}]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text style={styles.chainName}>{chain.name}</Text>
              <Text style={styles.title}>{evm.name}</Text>
            </View>
            </View>
            <View style={{alignItems: "flex-end"}}>
              <Text style={styles.chainName}>Balance</Text>
              <Text style={styles.title}>{balance.substring(0,6)} {chain.currency}</Text>
            </View>
           </View>
           <View style={{alignItems: "center", margin: 10 * HEIGHT_RATIO}}>
           <Text style={{fontSize: 45, fontWeight: "600"}}>{value.substring(0,6)} {chain.currency.toUpperCase()}</Text>
           </View>
           <Text style={styles.title}>From:</Text>
           <View style={styles.container1}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text style={styles.title}>{evm.name}</Text>
              <Text style={styles.chainName}>Balance: {balance.substring(0,6)} {chain.currency}</Text>
            </View>
           </View>
           <Text style={[styles.title, {marginTop: 10 * HEIGHT_RATIO}]}>To:</Text>
           <View style={styles.container1}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons_v1/img_td.jpeg")}
            />
            <View>
              <Text style={styles.title}>{truncatedAddress}</Text>
            </View>
           </View>
           <View style={styles.container2}>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.title}>Estimated gas fees:</Text>
              <Text style={[styles.title, {color: colors.Primary}]}>{gas.substring(0,9)} {chain.currency}</Text>
            </View>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 5 * HEIGHT_RATIO}}>
              <Text style={styles.title}>Total:</Text>
              <Text style={styles.title}>{total.toString().substring(0,7)} {chain.currency}</Text>
            </View>
           </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff", borderWidth: 1, borderColor: colors.Primary}]} onPress={createResponseReject}>
              <Text style={[styles.textButton, {color: colors.Primary,}]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.Primary}]} onPress={createResponseAccept}>
              <Text style={[styles.textButton, {color: colors.White,}]}>Confirm</Text>
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
    backgroundColor: "#fff", 
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
    backgroundColor: colors.White,
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
    fontFamily: "Poppins-Bold",
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
  title: {
    fontSize: 14,
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  chainName: {
    fontSize: 13,
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
});