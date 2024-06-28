import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useEffect, useState, useCallback } from "react";
import "fast-text-encoding";
import "@walletconnect/react-native-compat";
import useInitialization, {
  currentETHAddress,
  web3wallet,
  web3WalletPair,
} from "./utils/WalletConnectUtils";
import PairingModal from './screens/PairingModal';
import { EIP155_SIGNING_METHODS } from "./utils/EIP155Lib";
import SignModal from './screens/SignModal';
import { SignClientTypes, SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import QRCodeScannerModal from './screens/QRCodeScannerModal';

const WalletConnect = () => {
  const [currentWCURI, setCurrentWCURI] = useState('');
  const [hasPaired, setHasPaired] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProposal, setCurrentProposal] = useState();
  const [successfulSession, setSuccessfulSession] = useState(false);
  const [requestSession, setRequestSession] = useState();
  const [requestEventData, setRequestEventData] = useState();
  const [signModalVisible, setSignModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Add Initialization
  useInitialization();

  console.log(">>>>>>>>>Initialization: ", useInitialization());

  // Add the pairing function from W3W
  async function pair() {
    const pairing = await web3WalletPair({ uri: currentWCURI });
    return pairing;
  }

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
      setModalVisible(true);
      setCurrentProposal(proposal);
    },
    []
  );

  const handleScanSuccess = (data: string) => {
    setCurrentWCURI(data);
  };

  async function handleAccept() {
    if (!currentProposal) return;
  
    const { id, params } = currentProposal;
    const { requiredNamespaces = {}, relays } = params;
  
    try {
      let namespaces: SessionTypes.Namespaces = {};
  
      // Build approved namespaces based on requiredNamespaces
      if (Object.keys(requiredNamespaces).length > 0) {
        Object.keys(requiredNamespaces).forEach((key) => {
          const accounts: string[] = [];
          requiredNamespaces[key].chains.forEach((chain: string) => {
            accounts.push(`${chain}:${currentETHAddress}`);
          });
  
          namespaces[key] = {
            accounts,
            methods: requiredNamespaces[key].methods,
            events: requiredNamespaces[key].events,
          };
        });
      } else {
        // Default namespaces if requiredNamespaces is empty
        // namespaces = {
        //   eip155: {
        //     accounts: [`eip155:1:${currentETHAddress}`],
        //     events: ["chainChanged", "accountsChanged"],
        //     methods: ["eth_sendTransaction", "personal_sign"],
        //   },
        // };
        namespaces = {
          eip155: {
            accounts: [
              `eip155:1:${currentETHAddress}`, 
              `eip155:56:${currentETHAddress}`, 
              `eip155:137:${currentETHAddress}`,
              `eip155:42161:${currentETHAddress}`, // Arbitrum
              `eip155:10:${currentETHAddress}`,   // Optimism
              `eip155:43114:${currentETHAddress}`, // Avalanche
              `eip155:324:${currentETHAddress}`,    // ZKsync
              `eip155:1116:${currentETHAddress}`      // Core
            ],
            events: ["chainChanged", "accountsChanged"],
            methods: ["eth_sendTransaction", "personal_sign"],
          },
          // Thêm các mạng khác nếu cần
          bsc: {
            accounts: [`bsc:56:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["bsc_sendTransaction", "personal_sign"],
          },
          polygon: {
            accounts: [`polygon:137:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["polygon_sendTransaction", "personal_sign"],
          },
          arbitrum: {
            accounts: [`arbitrum:42161:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["arbitrum_sendTransaction", "personal_sign"],
          },
          optimism: {
            accounts: [`optimism:10:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["optimism_sendTransaction", "personal_sign"],
          },
          avalanche: {
            accounts: [`avalanche:43114:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["avalanche_sendTransaction", "personal_sign"],
          },
          zksync: {
            accounts: [`zksync:324:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["zksync_sendTransaction", "personal_sign"],
          },
          core: {
            accounts: [`core:1116:${currentETHAddress}`],
            events: ["chainChanged", "accountsChanged"],
            methods: ["core_sendTransaction", "personal_sign"],
          },
        };
      }
  
      console.log("Approving session with namespaces: ", namespaces);
  
      await web3wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });
  
      // Reset state after successful approval
      setModalVisible(false);
      setCurrentWCURI("");
      setCurrentProposal(undefined);
      setSuccessfulSession(true);
    } catch (error) {
      console.error("Failed to approve session:", error);
  
      // Handle rejection if approval fails
      await web3wallet.rejectSession({
        id,
        reason: getSdkError("USER_REJECTED"),
      });
  
      setModalVisible(false);
      setCurrentWCURI("");
      setCurrentProposal(undefined);
    }
  }
  

  // async function handleAccept() {
  //   const { id, params } = currentProposal;
  //   const { requiredNamespaces, relays } = params;

  //   if (currentProposal) {
  //     const namespaces: SessionTypes.Namespaces = {};
  //     Object.keys(requiredNamespaces).forEach((key) => {
  //       const accounts: string[] = [];
  //       requiredNamespaces[key].chains.map((chain: any) => {
  //         [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
  //       });

  //       namespaces[key] = {
  //         accounts,
  //         methods: requiredNamespaces[key].methods,
  //         events: requiredNamespaces[key].events,
  //       };
  //     });

  //     console.log("Approving session with namespaces: ", namespaces);

  //     await web3wallet.approveSession({
  //       id,
  //       relayProtocol: relays[0].protocol,
  //       namespaces,
  //     });

  //     setModalVisible(false);
  //     setCurrentWCURI("");
  //     setCurrentProposal(undefined);
  //     setSuccessfulSession(true);
  //   }
  // }

  // async function disconnect() {
  //   const activeSessions = await web3wallet.getActiveSessions();
  //   const topic = Object.values(activeSessions)[0].topic;

  //   if (activeSessions) {
  //     await web3wallet.disconnectSession({
  //       topic,
  //       reason: getSdkError("USER_DISCONNECTED"),
  //     });
  //   }
  //   setSuccessfulSession(false);
  // }
  async function disconnect() {
    try {
      const activeSessions = await web3wallet.getActiveSessions();
      if (Object.keys(activeSessions).length > 0) {
        const topic = Object.values(activeSessions)[0].topic;
  
        await web3wallet.disconnectSession({
          topic,
          reason: getSdkError("USER_DISCONNECTED"),
        });
      }
    } catch (error) {
      console.error("Failed to disconnect session:", error);
    }
    setSuccessfulSession(false);
  }

  async function handleReject() {
    const { id } = currentProposal;

    if (currentProposal) {
      await web3wallet.rejectSession({
        id,
        reason: getSdkError("USER_REJECTED_METHODS"),
      });

      setModalVisible(false);
      setCurrentWCURI("");
      setCurrentProposal(undefined);
    }
  }

  // Add the following Callback listener after handleReject()
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments["session_request"]) => {
      const { topic, params } = requestEvent;
      const { request } = params;
      const requestSessionData = web3wallet.engine.signClient.session.get(topic);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          setRequestSession(requestSessionData);
          setRequestEventData(requestEvent);
          setSignModalVisible(true);
          return;
      }
    },
    []
  );

  const handleSessionDelete = useCallback(
    async (session) => {
      console.log("Session deleted:", session);
      setSuccessfulSession(false);
      setCurrentWCURI("");
      setRequestSession(undefined);
      setRequestEventData(undefined);
    },
    []
  );

  useEffect(() => {
    if (currentWCURI.length > 10 && !hasPaired) {
      pair();
      setHasPaired(true);
    } else if (currentWCURI.length <= 10) {
      setHasPaired(false);
    }
  }, [currentWCURI, hasPaired]);

  useEffect(() => {
    web3wallet?.on("session_proposal", onSessionProposal);
    web3wallet?.on("session_request", onSessionRequest);
    web3wallet?.on("session_delete", handleSessionDelete);

    // Clean up listeners on unmount
  return () => {
    web3wallet?.off("session_proposal", onSessionProposal);
    web3wallet?.off("session_request", onSessionRequest);
    web3wallet?.off("session_delete", handleSessionDelete);
  };
  }, [
    pair,
    handleAccept,
    handleReject,
    currentETHAddress,
    onSessionRequest,
    onSessionProposal,
    successfulSession,
    handleSessionDelete

  ]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Web3Wallet Tutorial</Text>
        <Text style={styles.addressContent}>
          ETH Address: {currentETHAddress ? currentETHAddress : "Loading..."}
        </Text>
        {!successfulSession ? (
          <View>
            <TextInput
              style={styles.textInputContainer}
              onChangeText={setCurrentWCURI}
              value={currentWCURI}
              placeholder="Enter WC URI (wc:1234...)"
            />
            <Button onPress={() => pair()} title="Pair Session" />
          </View>
        ) : (
          <Button onPress={() => disconnect()} title="Disconnect" />
        )}
        <Button title="Scan QR Code" onPress={() => setIsModalVisible(true)} />
      </View>
      <QRCodeScannerModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onScanSuccess={handleScanSuccess}
        onPair={pair}
      />
      <PairingModal
        handleAccept={handleAccept}
        handleReject={handleReject}
        visible={modalVisible}
        setModalVisible={setModalVisible}
        currentProposal={currentProposal}
      />
      <SignModal
        visible={signModalVisible}
        setModalVisible={setSignModalVisible}
        requestEvent={requestEventData}
        requestSession={requestSession}
      />
    </View>
  );
}

export default WalletConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 4,
  },
  addressContent: {
    textAlign: "center",
    marginVertical: 8,
  },
});
