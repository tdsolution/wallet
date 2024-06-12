import {
    StyleSheet,
    View,
    Modal,
    Pressable,
    Image,
    TouchableOpacity,
  } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { Text } from "@tonkeeper/uikit";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const ModalNotification = (props: Props) => {
  const { modalVisible, onClose, title, description} = props;

  return (
    <Modal
    // animationType="slide" // Loại animation khi mở/closed modal
    transparent={true} // Cho phép modal trở nên trong suốt
    visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
    onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalContainer}
        // onPress={() => setModalAddAccount(false)}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View></View>
            <Text type="label1" color="primaryColor" textAlign="center" style={{ marginLeft: 24, marginBottom: 10, width: "80%"}}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={[
                  styles.iconCancel,
                  { tintColor: colors.Black, width: 30, height: 30 },
                ]}
                source={require("../../../assets/icons/png/ic_cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <Text type="body2" color="textPrimaryAlternate">
            {description}
          </Text>
          <TouchableOpacity style={styles.buttonOk} onPress={onClose}>
            <Text type="label1">OK</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalNotification;

const styles = StyleSheet.create({
  iconCancel: {
      width: 24,
      height: 24,
      resizeMode: "contain",
      tintColor: colors.Primary,
    },
  modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    },
  modalContent: {
    width: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonOk: {
    width: "25%",
    height: 40,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});