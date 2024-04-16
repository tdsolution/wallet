import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { WalletStackRouteNames } from "$navigation";
  import { colors } from "../../../constants/colors";
  import { globalStyles } from "$styles/globalStyles";
  import { navigation } from "@tonkeeper/router";
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
              <Text style={[globalStyles.textHeader, { fontSize: 16 }]}>
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
            <Text style={styles.subtitle}>
              {description}
            </Text>
            <TouchableOpacity style={styles.buttonOk} onPress={onClose}>
              <Text style={styles.textButton}>OK</Text>
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
      subtitle: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.Black,
        textAlign: "left",
        fontFamily: "Poppins-Medium",
        marginVertical: 10,
      },
      textButton: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.White,
        fontFamily: "Poppins-Medium",
      },
      buttonOk: {
        width: "25%",
        height: 40,
        backgroundColor: colors.Primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
  });
  