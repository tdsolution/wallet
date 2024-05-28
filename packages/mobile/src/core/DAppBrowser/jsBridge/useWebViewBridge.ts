import { i18n } from '$translation';
import { useCallback, useMemo, useRef, useState } from 'react';
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
import { JsonRpcProvider, formatUnits } from 'ethers';
import ConnectModal from '../popup/ModalConnect';
import { Alert } from 'react-native';
import { sendRpcRequest } from './func';
const ethers = require('ethers');

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
  const [isConnecting, setIsConnecting]= useState(false);
  const [isRequestHandled, setIsRequestHandled]= useState(false);
  const walletPrivateKey = new ethers.Wallet(evm.privateKey);
  const provider =new JsonRpcProvider(chain.rpc);
  let wallet = walletPrivateKey.connect(provider);

  const injectedJavaScriptBeforeContentLoaded = useMemo(
    () => objectToInjection(bridgeObj, timeout),
    [bridgeObj, timeout],
  );

  const postMessage = useCallback((message: any) => {
    ref.current?.injectJavaScript(getInjectableJSMessage(JSON.stringify(message)));
  }, []);



  const onMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      if (chain.chainId == "1100") {
        const message = JSON.parse(event.nativeEvent.data) as WebViewBridgeMessage;
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
    let result;
    console.log(data);
    try {
      switch (data.method) {
        case 'eth_requestAccounts':
          result = [wallet.address];
          break;
        case 'eth_chainId':
          result = chain.chainId;
          break;
        case 'eth_blockNumber':
          result = chain.chainId;
          break;
        case 'eth_estimateGas':
           const tx = {
            to: data.params[0].to,
            from: data.params[0].from,
            data: data.params[0].data,
            value: data.params[0].value
           };
          const gasEstimate = await provider.estimateGas(tx);
          const gasEstimateHex = '0x' + gasEstimate.toString(16);
          result = gasEstimateHex;
          break;
       case 'eth_sendTransaction':
      try {
        if (data.params && data.params[0]) {
          const txParams = data.params[0];
          const gasLimit = BigInt(txParams.gas);
          const gasPrice = BigInt(txParams.gasPrice);
          const value = txParams.value ? BigInt(txParams.value) : 0n;
          const txSend = {
            to: txParams.to,
            from: txParams.from,
            data: txParams.data,
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            value: value
          };
         
          const signedTx = await wallet.sendTransaction(txSend);
          console.log('Signed Transaction:', signedTx);
          result = signedTx.hash;
        } else {
          throw new Error('Invalid parameters for eth_sendTransaction');
        }
      } catch (error) {
        console.error('Error sending transaction:', error);
        result = 'Error sending transaction';
      }
        break;
      case 'eth_getTransactionByHash':
         try {
          const resultt = await sendRpcRequest(chain.rpc, 'eth_getTransactionByHash', data.params, data.id);
           console.log('eth_getTransactionByHash:', resultt.result);
          result = resultt.result;
          } catch (error) {
            console.error('Error sending RPC request:', error);
          }  
        break;
      case 'eth_getTransactionReceipt':
        try {
          const resultt = await sendRpcRequest(chain.rpc, 'eth_getTransactionReceipt', data.params, data.id);
           console.log('eth_getTransactionReceipt:', resultt.result);
          result = resultt.result;
          } catch (error) {
            console.error('Error sending RPC request:', error);
          }  
        break;
      case 'eth_call':
         try {
          const resultt = await sendRpcRequest(chain.rpc, 'eth_call', data.params, data.id);
          result = resultt.result;
          } catch (error) {
            console.error('Error sending RPC request:', error);
          }       
      break;
    default:
      console.log('Method not supported', data)
              throw new Error('Method not supported');
        }
     ref.current?.postMessage(JSON.stringify({ id: data.id, result }));
    } catch (error) {
      ref.current?.postMessage(JSON.stringify({ id: data.id, error: error.message }));
    }
  }
// Hàm đợi đến khi giao dịch được xác nhận và nhận biên nhận


  const sendEvent = useCallback(
    (event: any) => {
      postMessage({ type: WebViewBridgeMessageType.event, event });
    },
    [postMessage],
  );
  return [ref, injectedJavaScriptBeforeContentLoaded, onMessage, sendEvent, isConnecting, setIsConnecting];
};
