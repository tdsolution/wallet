import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEvm, useChain } from "@tonkeeper/shared/hooks";
import { Text } from "@tonkeeper/uikit";
import { colors } from "../../../constants/colors";
import { Icon } from "$uikit";
import { TextInput } from "@tonkeeper/uikit/src/components/TextInput";
import { formatEther, parseUnits } from "ethers";

interface SimpleModalProps {
  visible: boolean;
  closeModal: () => void;
  gasLimit0: number;
  gasLimit: number;
  gasPrice0: number,
  gasPrice: number;
  handleSave: (a,b) => void;
}

const ModalEditGas: React.FC<SimpleModalProps> = ({
  visible,
  closeModal,
  gasLimit0,
  gasLimit,
  gasPrice0,
  gasPrice,
  handleSave,
}) => {
  const chain = useChain()?.chain;
  const [gasLimit1, setGasLimit1] = useState("0");
  const [gasPrice1, setGasPrice1] = useState("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLower, setIsLower] = useState<boolean>(false);
  const [isLimitLower, setIsLimitLower] = useState<boolean>(false);
  const [isHigher, setIsHigher] = useState<boolean>(false);
  const [networkFee, setNetworkFee] = useState<number>(0);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
      setGasLimit1(gasLimit.toString());
      setGasPrice1(gasPrice.toString());
  },[gasLimit, gasPrice, visible]);

  const fetchNetworkFee = () => {
   if (gasLimit1 != "" && gasPrice1 != "" && !isNaN(Number(gasLimit1)) && !isNaN(Number(gasPrice1)) ) {
    setNetworkFee(Number(formatEther(parseUnits(gasPrice1.toString(), "gwei")*(parseUnits(gasLimit1.toString(),0)))));
   }
  }; 

  const checkValue = () => {
    if (gasLimit1 == "" || gasPrice1 == "" || isNaN(Number(gasLimit1)) || isNaN(Number(gasPrice1)) ) {
      if (gasLimit1 == "" || isNaN(Number(gasLimit1)) ) {
        setGasLimit1(gasLimit.toString());
      }
      if (gasPrice1 == "" || isNaN(Number(gasPrice1))) {
        setGasPrice1(gasPrice.toString());
      }
      setIsDisable(true);
      fetchNetworkFee();
    }
    else {
      if( parseFloat(gasLimit1) < gasLimit0 || parseFloat(gasPrice1) == 0) {
       if (parseFloat(gasLimit1) < gasLimit0) {
        setIsLimitLower(true);
       } else {
        setIsLimitLower(false);
       }
        setIsDisable(true);
      } else {
        setIsDisable(false);
        setIsLimitLower(false);
      }
      Number(gasPrice1) > (gasPrice0 * 1.5) ? setIsHigher(true) : setIsHigher(false);
      Number(gasPrice1) < gasPrice0 ? setIsLower(true) : setIsLower(false);
      fetchNetworkFee();
    }
    
  };

  useEffect(() => {
    checkValue(); 
  }, [gasLimit1, gasPrice1]);
  
  const minusGasLimit = () => {
    Number(gasLimit1) >= (gasLimit0+1000)
    ?
    setGasLimit1((Number(gasLimit1)-1000).toString())
    : <></>
  };

  const plusGasLimit = () => {
    setGasLimit1((Number(gasLimit1)+1000).toString())
  };

  const minusGasPrice = () => {
    Number(gasPrice1) >=1 ? setGasPrice1((Math.round((parseFloat(gasPrice1)-1)*10000)/10000).toString()) : <></>;
  }
  const plusGasPrice = () => {
    setGasPrice1((Math.round((parseFloat(gasPrice1)+1)*10000)/10000).toString());
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalContainer} onPress={closeModal}></Pressable>
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text type="h3" textAlign="center" color="primaryColor">
            Edit Priority
          </Text>
          <Text type="label1" color="textBlack" fontSize={35} lineHeight={35} style={{marginTop: 20}}>
           ~ {networkFee.toFixed(6)} {chain.currency}
          </Text>
          <Text type="label1" color="textGrayLight" fontSize={20} style={{ marginTop: 5}}>
            $0.00
          </Text>
        </View>
         <View style={{marginTop: 20}}>
          <Text type="label1" color="textBlack">Gas limit</Text>
          <View style={styles.boxInput}>
            <TouchableOpacity style={styles.buttonCircle} onPress={minusGasLimit}>
              <Icon name="ic-minus-28" color="primaryColor" size={18}/>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={gasLimit1}
              onChangeText={(text) => [
                setGasLimit1(text.replace(/[^0-9 .]/g, "")),
              ]}
            />
            <TouchableOpacity style={styles.buttonCircle} onPress={plusGasLimit}>
              <Icon name="ic-plus-28" color="primaryColor" size={18}/>
            </TouchableOpacity>
          </View>
          {isLimitLower
          ?
          <Text type="body3" color="accentRed" lineHeight={18}>
            <Icon name="ic-exclamationmark-circle-28" color="accentRed" size={10} style={{marginBottom: -1}}></Icon>
            {} Gas limit must be higher than {gasLimit0}</Text>
          : 
          <Text lineHeight={18}></Text>
          }
          </View>
          <View style={{marginTop: 20}}>
          <Text type="label1" color="textBlack">Gas price</Text>
          <View style={styles.boxInput}>
            <TouchableOpacity style={styles.buttonCircle} onPress={minusGasPrice}>
              <Icon name="ic-minus-28" color="primaryColor" size={18}/>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={gasPrice1}
              onChangeText={(text) => [
                setGasPrice1(text.replace(/[^0-9 .]/g, "")),
              ]}
            />
            <TouchableOpacity style={styles.buttonCircle} onPress={plusGasPrice}>
              <Icon name="ic-plus-28" color="primaryColor" size={18}/>
            </TouchableOpacity>
          </View>
          {isHigher
          ?
          <Text type="body3" color="accentRed" lineHeight={18}>
            <Icon name="ic-exclamationmark-circle-28" color="accentRed" size={10} style={{marginBottom: -1}}></Icon>
            {} Gas price is higher than necessary</Text>
          :
          isLower ? <Text type="body3" color="accentRed" lineHeight={18}>
            <Icon name="ic-exclamationmark-circle-28" color="accentRed" size={10} style={{marginBottom: -1}}></Icon>
            {} Gas price is low for current network conditions</Text> : <Text lineHeight={19}></Text>
          }
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={[styles.btnReject]} onPress={closeModal}>
            <Text type="label1" color="primaryColor">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isDisable} style={[styles.button, {backgroundColor: isDisable ? colors.PrimaryDisable : colors.Primary,}]} onPress={() => handleSave(Number(gasLimit1), Number(gasPrice1))}>
            <Text type="label1">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    position: "relative",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  iconClose: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
    transform: [{ rotate: "-90deg" }],
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 10,
  },
  button: {
    width: "45%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -2,
  },
  boxInput: {
    width: "100%",
    height: 57,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    fontFamily: "Poppins-Light",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  buttonCircle: {
    width: 26,
    height: 26,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
   input: {
    width: "70%",
    paddingVertical: 5,
    paddingRight: 10,
    fontSize: 18,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "center",
    fontFamily: "Poppins-Light",
    alignItems: "center",
    justifyContent: "center",
  },
  btnReject: {
    width: "45%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.Primary,
  },
});

export default ModalEditGas;
