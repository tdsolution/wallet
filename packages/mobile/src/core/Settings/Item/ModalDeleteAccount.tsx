import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { Text } from "@tonkeeper/uikit";

interface Props {
  visible: boolean;
  onClose: () => void;
  onDeleteAccount: () => void;
}

const ModalDeleteAccount = (props: Props) => {
  const { visible, onClose, onDeleteAccount } = props;
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
          <Text type="h3" color="textBlack" textAlign="center" style={{ marginBottom: 10 }}>
            Are you sure you want to delete your account?
          </Text>
          <Text type="body2" color="textBlack">
            This account will delete your account and all data from this
            application.
          </Text>
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
            <TouchableOpacity onPress={onDeleteAccount}>
              <Text style={[styles.textButton]}>Delete Account And Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteAccount;

const styles = StyleSheet.create({
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Red,
  },
});
