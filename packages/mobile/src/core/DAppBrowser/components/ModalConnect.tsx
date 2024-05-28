import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "$styles/globalStyles";
import { Icon } from "$uikit";
import { navigation } from "@tonkeeper/router";
import { colors } from "../../../constants/colors";
import SaveListWallet, { ListWalletModel } from "$libs/EVM/SaveWallet";
import { setWalletEVM } from "$libs/EVM/createWallet";

interface Props {
modalVisible: boolean;
onClose: () => void;
}

const ModalConnect = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [data2, setdata2] = useState<ListWalletModel[]>();
   useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setdata2(data);
    }
    getdata();
  }, [modalVisible, setWalletEVM]);
   const renderItem = ({ item }) => (
    <View style={{ marginBottom: 11 }}>
      <View style={styles.headerItem}>
        <TouchableOpacity 
          // onPress={() => {setModalSetMainAccount(true), setItem(item)}}
          style={{width: "80%"}}
        >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={require("../../../assets/logo/img_td.png")}
              style={styles.image}
            />
            {/* {item.addressWallet == addressEvm 
            ? <Image
              source={require("../../assets/logo/img_check_connect.png")}
              style={[styles.imageCheck]}
            />
            : <></>
            } */}
          </View>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.body}>Multi-coin wallet</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity 
          // onPress={() => {setModalAccountVisible(true), setItem(item)}}
        >
          <Image
            source={require("../../../assets/logo/img_td.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <Text style={styles.textbutton}>Backup to iCloud</Text>
      </TouchableOpacity> */}
      
    </View>
  );
  return (
    <Modal
      animationType="slide" // Loại animation khi mở/closed modal
      transparent={true} // Cho phép modal trở nên trong suốt
      visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
      onRequestClose={onClose}
    >
      <Pressable
          onPress={onClose}
          style={styles.pressable}
      ></Pressable>
      <View
        style={styles.modal}
      >
        <View style={styles.header}>
          <View></View>
          <Text
            style={[
              globalStyles.textHeader,
              {fontSize: 20,fontWeight:"600"},
            ]}
          >
          Connect Wallet
          </Text>
          <TouchableOpacity style={styles.boxClose} onPress={onClose}>
            <Image
              style={styles.iconCancel}
              source={require("../../../assets/icons/png/ic_cancel.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
             <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.privateKey.toString()}
          ListFooterComponent={<View style={{ height: 150 }} />}
          showsVerticalScrollIndicator={false}
        />
        </View>
      </View>
    </Modal>
  );
};

export default ModalConnect;

const styles = StyleSheet.create({
  pressable: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    height: "50%",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "#fff",
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalContent: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  body: {
    fontSize: 12,
    fontWeight: "400",
    color: "#909090",
    lineHeight: 16,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
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
  },
    textbutton: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4871EA",
    lineHeight: 16,
    textAlign: "right",
    fontFamily: "Poppins-Bold",
    marginTop: 8,
  },
   headerItem: {
    backgroundColor: "#4871EA14",
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
    image: {
    width: 29,
    height: 29,
    borderRadius: 15,
    resizeMode: "cover",
    marginRight: 11,
  },
   icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
    imageCheck: {
    width: 13.13,
    height: 13.13,
    borderRadius: 15,
    resizeMode: "cover",
    position: "absolute",
    top: -5,
    right: 8,
  },
    title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B2D42",
    lineHeight: 20,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
});
