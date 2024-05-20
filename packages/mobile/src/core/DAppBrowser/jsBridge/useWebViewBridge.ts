import { useCallback, useMemo, useRef } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import {
  UseWebViewBridgeReturnType,
  WebViewBridgeMessage,
  WebViewBridgeMessageType,
} from './types';
import { getInjectableJSMessage, objectToInjection } from './utils';
import { useChain, useEvm } from '@tonkeeper/shared/hooks';
import Web3 from 'web3';
import  WalletConnectProvider  from '@walletconnect/web3-provider';
import {  ethers } from 'ethers';

export const useWebViewBridge = <
  BridgeObject extends object = {},
  Event extends object = {},
>(
  bridgeObj: BridgeObject,
  timeout: number | null = null,
): UseWebViewBridgeReturnType<Event> => {
  const ref = useRef<WebView>(null);
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const wallet = new ethers.Wallet(evm.privateKey);
  const injectedJavaScriptBeforeContentLoaded = useMemo(
    () => objectToInjection(bridgeObj, timeout),
    [bridgeObj, timeout],
  );

  const postMessage = useCallback((message: any) => {
    ref.current?.injectJavaScript(getInjectableJSMessage(JSON.stringify(message)));
  }, []);



  const onMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      console.log('onMessage');
      if (chain.chainId == "1100") {
        const message = JSON.parse(event.nativeEvent.data) as WebViewBridgeMessage;
        console.log(message);
        if (message.type === WebViewBridgeMessageType.invokeRnFunc) {
          try {
            const result = await bridgeObj[message.name](...message.args);

            postMessage({
              type: WebViewBridgeMessageType.functionResponse,
              invocationId: message.invocationId,
              status: 'fulfilled',
              data: result,
            });
          } catch (e) {
            postMessage({
              type: WebViewBridgeMessageType.functionResponse,
              invocationId: message.invocationId,
              status: 'rejected',
              data: (e as any)?.message,
            });
          }
        }
      }
      else {
       handleMessage(event);
      }
    },
    [bridgeObj, postMessage],
  );
  const handleMessage = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
    let result;
    try {
      switch (data.method) {
        case 'eth_requestAccounts':
          result = [wallet.address];
          break;
        case 'eth_chainId':
          result = chain.chainId;
          break;
        case 'eth_sign':
            result = await signMessage(data.params[0]);
            break;
        case 'eth_verifySignature':
          result = verifySignature(data.params[0], data.params[1]);
          break;
        default:
            throw new Error('Method not supported');
      }
     ref.current?.postMessage(JSON.stringify({ id: data.id, result }));
    } catch (error) {
      ref.current?.postMessage(JSON.stringify({ id: data.id, error: error.message }));
    }
  }
  async function signMessage(message) {
  try {
    console.log(`Signing message: ${message}`);
    // Ký thông điệp
    const signedMessage = await wallet.signMessage(message);
    console.log(`Signed message: ${signedMessage}`);
    return signedMessage;
  } catch (error) {
    console.error(`Error signing message: ${error}`);
    throw error;
  }
}
function verifySignature(message, signedMessage) {
  try {
    console.log(`Verifying signature for message: ${message}`);
    const address =  ethers.verifyMessage(message, signedMessage);
    console.log(`Message was signed by: ${address}`);
    return address;
  } catch (error) {
    console.error(`Error verifying signature: ${error}`);
    throw error;
  }
}
  const provider = new WalletConnectProvider({
    rpc:{
      1:'https://eth.drpc.org',
      14:'https://rpc.ankr.com/flare',
      324:'https://1rpc.io/zksync2-era',
      1116:'https://rpc-core.icecreamswap.com',
      137:'https://polygon.blockpi.network/v1/rpc/public',
      10:'https://mainnet.optimism.io',
      42161:'https://arbitrum.drpc.org',
      43114:'https://avalanche.drpc.org',
      38:'https://bsc-dataseed1.binance.org/',
      97:'https://bsc-testnet.publicnode.com'
    },
    bridge: 'https://bridge.walletconnect.org',
  },
);
  const sendEvent = useCallback(
    (event: any) => {
      postMessage({ type: WebViewBridgeMessageType.event, event });
    },
    [postMessage],
  );

  return [ref, injectedJavaScriptBeforeContentLoaded, onMessage, sendEvent];
};