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
          const value = BigInt(txParams.value);
          const txSend = {
            to: txParams.to,
            from: txParams.from,
            data: txParams.data,
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            value: value
          };
          console.log('txSend:', txSend);
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
      //   if (data.params && data.params[0]) {
      //     const txParams = data.params[0];
      //     const gasLimit = BigInt(txParams.gas);
      //     const txSend = {
      //       to: txParams.to,
      //       from: txParams.from,
      //       data: txParams.data,
      //       gasLimit: gasLimit,
      //     };
      //     const signedTx = await wallet.sendTransaction(txSend);
      //     console.log('Signed Transaction:', signedTx);
      //     result = signedTx.hash;
      //   } else {
      //     throw new Error('Invalid parameters for eth_sendTransaction');
      //   }
      // } catch (error) {
      //   console.error('Error sending transaction:', error);
      //   result = 'Error sending transaction';
      // }
        break;
      case 'eth_getTransactionByHash':
        const txTransaction = await provider.getTransaction(data.params[0]);
        result = txTransaction;
        break;
      case 'eth_getTransactionReceipt':
        const txReceipt = await provider.getTransactionReceipt(data.params[0]);
        result = txReceipt?.blockHash;
        break;
      case 'eth_call':
      //  try {
        // if (data.params && data.params[0]) {
        //   const txParams = data.params[0] ;
        //   if(txParams.data == '0x70a08231000000000000000000000000ea5007831646fa01c7079b15cfa4c62748905b04'||
        //     txParams.data == '0xd54ad2a1'||
        //    txParams.data == '0x46b5887f' ||
        //     txParams.data == '0x27d60f9b'||
        //      txParams.data == '0xade58ee6'||
        //      txParams.data == '0x5556db65' || txParams.data == '0xaca7b156000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047771777100000000000000000000000000000000000000000000000000000000'){
        //       return;
        //   }
          // else 
          // if (txParams.data == '0xae169a500000000000000000000000000000000000000000000000000000000000000000' || txParams.data == '0xae169a50')
          //   {
          //   const value = txParams.value != null ? BigInt(txParams.value) : 0;
          //   const txSend = {
          //       to: txParams.to,
          //       from: txParams.from,
          //       data: '0xae169a500000000000000000000000000000000000000000000000000000000000000000',
          //       gasLimit: txParams.gas,
          //       value: value
          //     };
          //  const signedTx = await wallet.sendTransaction(txSend);
          //  console.log('Signed Transaction:', signedTx);
          //  const txReceipt = await provider.getTransactionReceipt(signedTx.hash);
          //  result = txReceipt;
          // }
          // else {
            let demo;
              sendRpcRequest(chain.rpc, 'eth_call', data.params, data.id, function (error, resultt) {
                if (error) {
                  console.error('Error sending RPC request:', error);
                } else {
                  demo = resultt.result;
                  console.log('RPC Response:',demo);
                }
              });
              result = demo;
          // }
        // } 
        // else {
        //   throw new Error('Invalid parameters for eth_sendTransaction');
        // }
      // } 
      // catch (error) {
      //   console.error('Error sending transaction:', error);
      //   result = 'Error sending transaction';
      // }
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
