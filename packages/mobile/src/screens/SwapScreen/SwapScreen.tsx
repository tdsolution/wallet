import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { useChain } from "@tonkeeper/shared/hooks";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontWeights } from "@tonkeeper/uikit/src/components/Text/TextStyles";
import { useNavigation } from "@tonkeeper/router";
import ModalSwap from "./ModalSwap";

const SwapScreen = () => {
  const chain = useChain()?.chain;
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSwap = () => {
    setModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={[styles.row]}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/png/ic-chevron-left-16.png")}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.textHeader]}>SwapScreen</Text>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/png/ic-settings-28.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={[styles.box]}>
          <View>
            <Text style={[styles.text]}>From</Text>
            <Text style={[styles.price]}>0</Text>
            <Text style={[styles.priceUSD]}>$ 0</Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Image
                style={[styles.imgCurrent]}
                source={require("../../assets/currency/ic-btc-48.png")}
              />
              <Image style={[styles.imgLogo]} source={{ uri: chain.logo }} />
            </View>
            <Text style={[styles.text, {}]}>tBNB</Text>
            <Image
              style={styles.icDown}
              source={require("../../assets/icons/png/ic-chevron-down-16.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 10,
            position: "relative",
            zIndex: 100,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -20,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={[styles.btnChange]}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  tintColor: "white",
                }}
                source={require("../../assets/icons/png/ic_swap_vert.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.box]}>
          <View>
            <Text style={[styles.text]}>To</Text>
            <Text style={[styles.price]}>0</Text>
            <Text style={[styles.priceUSD]}>$ 0</Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Image
                style={[styles.imgCurrent]}
                source={require("../../assets/currency/ic-btc-48.png")}
              />
              <Image style={[styles.imgLogo]} source={{ uri: chain.logo }} />
            </View>
            <Text style={[styles.text, {}]}>WBNB</Text>
            <Image
              style={styles.icDown}
              source={require("../../assets/icons/png/ic-chevron-down-16.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.resetButton]}>
        <Text style={[styles.text]}>Quote</Text>
        <Text style={[styles.text]}>1 tBNB =1 WBNB</Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={handleSwap}>
        <Text style={[styles.buttonText]}>Swap</Text>
      </TouchableOpacity>
      <ModalSwap visible={modalVisible}  closeModal={() => setModalVisible(false)} />
    </View>
  );
};

export default SwapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: colors.Primary,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: colors.White,
  },
  imgCurrent: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icDown: {
    width: 16,
    height: 16,
    tintColor: colors.Black,
    resizeMode: "contain",
    marginLeft: 30,
  },
  imgLogo: {
    width: 24,
    height: 24,
    borderRadius: 15,
    position: "absolute",
    top: -8,
    right: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.Gray,
    fontFamily: "Poppins-Bold",
    marginVertical: 10,
  },
  priceUSD: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.Gray,
    lineHeight: 26,
    fontFamily: "Poppins-Medium",
  },
  btnChange: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: colors.White,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  resetButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eeeeee",
    marginTop: 20,
  },
});
