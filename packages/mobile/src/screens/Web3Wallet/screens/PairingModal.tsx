import React from 'react';
import { Button, Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignClientTypes } from "@walletconnect/types";
const { width, height } = Dimensions.get('window')

interface PairingModalProps {
    visible: boolean;
    setModalVisible: (arg1: boolean) => void;
    currentProposal:
    | SignClientTypes.EventArguments["session_proposal"]
    | undefined;
    handleAccept: () => void;
    handleReject: () => void;
}

export default function PairingModal({
    visible,
    currentProposal,
    handleAccept,
    handleReject,
}: PairingModalProps) {
    const name = currentProposal?.params?.proposer?.metadata?.name;
    const url = currentProposal?.params?.proposer?.metadata.url;
    const methods = currentProposal?.params?.requiredNamespaces.eip155.methods;
    const events = currentProposal?.params?.requiredNamespaces.eip155.events;
    const chains = currentProposal?.params?.requiredNamespaces.eip155.chains;
    const icon = currentProposal?.params.proposer.metadata.icons[0];
    console.log("Chain: ", chains)

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.modalContentContainer}>
                    <Image
                        style={styles.dappLogo}
                        source={{
                            uri: icon,
                        }}
                    />
                    <Text style={[styles.title]}>{name}</Text>
                    <Text style={[styles.subtitle]}>would like to connect</Text>
                    <Text style={[styles.url]}>Url: {url}</Text>
                    <View style={{ width: '100%', borderBottomWidth: 0.5, borderColor: "#dddddd", marginVertical: 20 }}></View>

                    <Text style={[styles.url, { marginTop: 0 }]}>REQUESTED PERMISSIONS</Text>
                    <View style={{ paddingHorizontal: 20, width }}>
                        <View style={{ backgroundColor: '#eeeeee', padding: 16, borderRadius: 16, gap: 10, marginTop: 10 }}>
                            <View style={[styles.chainsContainer, { gap: 8 }]}>
                                {chains?.map((item, index) => (
                                    <View key={index} style={styles.itemContainer}>
                                        <Text style={styles.itemText}>{item.toUpperCase()}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16 }}>
                                <Text style={styles.subHeading}>Methods:</Text>
                                <View style={[styles.chainsContainer, { gap: 8 }]}>
                                    {methods?.map((item, index) => (
                                        <View key={index} style={styles.itemContainer}>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>

                            </View>

                            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16 }}>
                                <Text style={styles.subHeading}>Methods:</Text>
                                <View style={[styles.chainsContainer, { gap: 8 }]}>
                                    {events?.map((item, index) => (
                                        <View key={index} style={styles.itemContainer}>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 20}}>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: 'red'}]} onPress={() => handleReject()}>
                                    <Text style={[styles.textBtn]}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={{width: 15}}></View>
                                <TouchableOpacity style={[styles.btn]} onPress={() => handleAccept()}>
                                    <Text style={[styles.textBtn]}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(1,1,1, 0.5)'
    },
    modalContentContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 34,
        borderWidth: 1,
        width: "100%",
        position: "absolute",
        backgroundColor: "white",
        bottom: 0,
    },
    dappLogo: {
        width: 100,
        height: 100,
        borderRadius: 16,
        marginVertical: 4,
        marginTop: 20
    },
    subHeading: {
        textAlign: "left",
        fontWeight: "600",
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black",
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: "grey",
        textAlign: 'center',
        marginTop: 5
    },
    url: {
        fontSize: 14,
        fontWeight: '500',
        color: "grey",
        textAlign: 'center',
        marginTop: 10
    },
    chainsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemContainer: {
        backgroundColor: 'grey',
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        padding: 10, // Add some padding for better appearance
        borderRadius: 8,
    },
    itemText: {
        color: 'white', // Adjust text color for better contrast
    },
    btn: {
        flex: 1,
        backgroundColor: 'green',
        borderRadius: 16,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
});
