import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import { Core } from "@walletconnect/core";
import { ICore } from "@walletconnect/types";
import { Web3Wallet, IWeb3Wallet } from "@walletconnect/web3wallet";

export let web3wallet: IWeb3Wallet;
export let core: ICore;
export let currentETHAddress: string;

import { useState, useCallback, useEffect } from "react";
import { createOrRestoreEIP155Wallet } from "./EIP155Wallet";
import {
  useEvm,
} from "@tonkeeper/shared/hooks";


async function createWeb3Wallet() {
  try {
    // Here we create / restore an EIP155 wallet
    console.log("Starting to create or restore EIP155 wallet...");
    const { eip155Addresses } = await createOrRestoreEIP155Wallet();
    currentETHAddress = eip155Addresses[0];
    console.log("EIP155 wallet created/restored successfully:", currentETHAddress);

    // HardCoding it here for ease of tutorial
    const ENV_PROJECT_ID = "aac7c0840bef3d3127aedb0da9cab988";
    console.log("Initializing WalletConnect core...");
    core = new Core({
      projectId: ENV_PROJECT_ID,
    });

    web3wallet = await Web3Wallet.init({
      core,
      metadata: {
        name: "TD Wallet",
        description: "ReactNative Web3Wallet for TD Wallet app",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });
    console.log("Web3Wallet initialized successfully");
  } catch (err: unknown) {
    console.error("Error during Web3Wallet creation:", err);
    throw err;
  }
}


// Initialize the Web3Wallet
export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {
      console.log("Error for initializing", err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
}

export async function web3WalletPair(params: { uri: string }) {
  return await web3wallet.core.pairing.pair({ uri: params.uri });
}