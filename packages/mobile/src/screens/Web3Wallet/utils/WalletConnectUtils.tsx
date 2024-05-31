import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import { Core } from "@walletconnect/core";
import { ICore } from "@walletconnect/types";
import { Web3Wallet, IWeb3Wallet } from "@walletconnect/web3wallet";
import {
  useEvm,
} from "@tonkeeper/shared/hooks";

export let web3wallet: IWeb3Wallet;
export let core: ICore;
export let currentETHAddress: string;

import { useState, useCallback, useEffect } from "react";
import { createOrRestoreEIP155Wallet } from "./EIP155Wallet";

async function createWeb3Wallet() {
  const {evm, setEvm} = useEvm();
  // Here we create / restore an EIP155 wallet
  const { eip155Addresses } = await createOrRestoreEIP155Wallet();
    currentETHAddress = eip155Addresses[0];
  // currentETHAddress = '0xEa5007831646fa01C7079B15cFa4c62748905b04';

  // HardCoding it here for ease of tutorial
  const ENV_PROJECT_ID = "724d580c13adab7cb29dfdd8921c9103";
  const core = new Core({
    projectId: ENV_PROJECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: "Web3Wallet React Native Tutorial",
      description: "ReactNative Web3Wallet",
      url: "https://walletconnect.com/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });
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