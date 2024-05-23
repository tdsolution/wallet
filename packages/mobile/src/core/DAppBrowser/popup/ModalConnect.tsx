import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
const ConnectModal = () => {
    const [isModalVisble, setModalVisible] = useState(false);
    const toggleModal = () => {
    setModalVisible(!isModalVisble);
  };
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>Show Connect Modal</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisble} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Connect to your account</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default ConnectModal;