import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const ModalSignOut = (props: Props) => {
  const { visible, onClose, onSignOut } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
            Sign Out?
          </Text>
          <Text>This will erase key to your wallet.</Text>
          <Text>Make sure you have backed up your recovery phrase.</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.textButton, { color: colors.Primary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignOut}>
              <Text style={[styles.textButton]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSignOut;

const styles = StyleSheet.create({
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Red,
    fontFamily: "Poppins-Medium",
  },
});
