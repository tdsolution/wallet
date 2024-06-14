import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { dataCoinOrg } from "./dataSwap/dataCoinOrg";
import ItemCoinOrg from "./item/ItemCoinOrg";
import { dataCoinDes } from "./dataSwap/dataCoinDes";
import ItemCoinDes from "./item/ItemCoinDes";
import { useSwapCoin } from "@tonkeeper/shared/hooks/useSwapCoin";
import { Text } from "@tonkeeper/uikit";

interface SimpleModalProps {
  visible: boolean;
  closeModal: () => void;
  swapCoin: number;
}

const ModalCoinOrg: React.FC<SimpleModalProps> = ({ visible, closeModal, swapCoin }) => {
  const {setSwapCoin } = useSwapCoin() || {};
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    swapCoin
  );
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + "..." + suffix;
  }

  const handleItemPress = (index: number) => {
    if (setSwapCoin) {
      setSwapCoin(index); // Gán giá trị mới cho swapCoin thông qua setSwapCoin
    }
    setSelectedItemIndex(index);
    closeModal();
  };

  const renderItem = ({ item, index }: any) => {
    const backgroundColor = index === selectedItemIndex ? "#d0dbfa" : "white";
    const borderColor = index === selectedItemIndex ? colors.Primary : "white";
    const color = index === selectedItemIndex ? colors.Primary : colors.Black;

    return (
      <ItemCoinOrg
        item={item}
        index={index}
        onPress={() => handleItemPress(index)}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        color={color}
      />
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalContainer} onPress={closeModal}></Pressable>
      <View style={styles.innerContainer}>
        <Text type="label1" textAlign="center" style={{marginVertical: 16}}>Select A Coin</Text>
        <TouchableOpacity style={[styles.btnClose]} onPress={closeModal}>
          <Image
            style={[styles.icClose]}
            source={require("../../assets/icons/png/ic-close-16.png")}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 500,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={dataCoinDes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
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
    backgroundColor: colors.Primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  btnClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 20,
  },
  icClose: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
});

export default ModalCoinOrg;
