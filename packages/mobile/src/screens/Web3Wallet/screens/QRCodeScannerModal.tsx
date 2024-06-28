import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

interface QRCodeScannerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onScanSuccess: (data: string) => void;
    onPair: () => void;
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({ isVisible, onClose, onScanSuccess, onPair }) => {
    const handleSuccess = (e: any) => {
        onScanSuccess(e.data);
        // onPair();
        onClose();
    };

    return (
        <Modal visible={isVisible} onRequestClose={onClose} transparent>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <QRCodeScanner
                        onRead={handleSuccess}
                        topContent={<Text style={styles.centerText}>Scan the QR Code</Text>}
                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable} onPress={onClose}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    centerText: {
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    buttonTouchable: {
        width: 100,
        height: 100,
        padding: 16,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
});

export default QRCodeScannerModal;
