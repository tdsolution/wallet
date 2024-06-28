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
import NetInfo from '@react-native-community/netinfo';

async function createWeb3Wallet() {
  // Tạo hoặc khôi phục ví EIP155
  const { eip155Addresses } = await createOrRestoreEIP155Wallet();
  currentETHAddress = eip155Addresses[0];

  // Dùng project ID cứng cho tiện hướng dẫn
  const ENV_PROJECT_ID = "7a332c7f41956511e624451c0847a037";
  core = new Core({
    projectId: ENV_PROJECT_ID,
  });

  const state = await NetInfo.fetch();
  if (state.isConnected) {
    console.log(">>>>>>>>>>Wallet init: ");

    web3wallet = await Web3Wallet.init({
      core,
      metadata: {
        name: "TD Wallet",
        description: "ReactNative Web3Wallet for TD Wallet",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });
    console.log("Web3Wallet initialized successfully");
  } else {
    console.log('No internet connection detected.');
  }
}

// Khởi tạo Web3Wallet
export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {
      console.log("Error initializing", err);
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
  if (web3wallet) {
    return await web3wallet.core.pairing.pair({ uri: params.uri });
  } else {
    throw new Error("Web3Wallet is not initialized");
  }
}
