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
// import Web3 from 'web3';
// import  WalletConnectProvider  from '@walletconnect/web3-provider';
import { JsonRpcProvider, formatUnits } from 'ethers';
import ConnectModal from '../popup/ModalConnect';
import { Alert } from 'react-native';
import { sendRpcRequest, sleep } from './func';
import { openTDConnect } from '../components/ModalConnect';
import { fetchBalaceEvm } from '$libs/EVM/useBalanceEVM';
import { postDataToApi } from '../../../libs/EVM/api/postDataToApi';
const ethers = require('ethers');

export const useWebViewBridge = <
  BridgeObject extends object = {},
  Event extends object = {},
>(
  bridgeObj: BridgeObject,
  webViewUrl: string,
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
  const [isShow, setIsShow] = useState<boolean>(false);

  const injectedJavaScriptBeforeContentLoaded = useMemo(
    () => objectToInjection(bridgeObj, timeout),
    [bridgeObj, timeout],
  );

  const postMessage = useCallback((message: any) => {
    ref.current?.injectJavaScript(getInjectableJSMessage(JSON.stringify(message)));
  }, []);

  let showAlert = false;
  let gasEstimate;
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
        if(showAlert) {
          return;
        }
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
        case 'wallet_switchEthereumChain':
          result = data.params[0].chainId;
        break;
        case 'eth_estimateGas':
          //  const tx = {
          //   to: data.params[0].to,
          //   from: data.params[0].from,
          //   data: data.params[0].data,
          //   value: data.params[0].value
          //  };
          // const gasEstimate = await provider.estimateGas(tx);
          // const gasEstimateHex = '0x' + gasEstimate.toString(16);
          // result = gasEstimateHex;
          // break;
           try {
          const resultt = await sendRpcRequest(chain.rpc, 'eth_estimateGas', data.params, data.id);
           console.log('eth_estimateGas:', resultt.result);
           gasEstimate = ethers.formatUnits(BigInt(resultt.result), 8);
          result = resultt.result;
          } catch (error) {
            console.error('Error sending RPC request:', error);
          }  
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
            const gasUser = 21000 * ethers.formatUnits(gasPrice, "gwei");
            console.log('gasUser' +gasUser);
            try {
            const balance = await fetchBalaceEvm(evm.addressWallet, chain.rpc);
            const accept = await new Promise((resolve, reject) =>
              openTDConnect({
                requestPromise: { resolve, reject },
                value: ethers.formatUnits(value),
                addressTo: txParams.to,
                gas: gasEstimate,
                balance: balance,
                reff: webViewUrl,
              })
            );
            const signedTx = await wallet.sendTransaction(txSend);
            console.log('Signed Transaction:', signedTx);
            if (txParams.data.includes('0xb6b55f25')) {
              postDataToApi (`
              ✅ Success Transaction\nposition: dApps\nmethod: deposit\nfrom: ${txParams.from}\nto: ${txParams.to}\nvalue: ${ethers.formatUnits(value).substring(0,6)} ${chain.currency.toUpperCase()}\ntxHash:${signedTx.hash}\nwebsite: ${webViewUrl}\nReact Native
              `)
            if (txParams.data.includes('0xae169a5')) {
              postDataToApi (`
              ✅ Success Transaction\nposition: dApps\nmethod: claimReward\nfrom: ${txParams.from}\nto: ${txParams.to}\nvalue: ${ethers.formatUnits(value).substring(0,6)} ${chain.currency.toUpperCase()}\ntxHash:${signedTx.hash}\nwebsite: ${webViewUrl}\nReact Native
              `)
            }
            result = signedTx.hash;
            }
            
          }
          catch (error) {
            if (txParams.data.includes('0xb6b55f25')) {
              postDataToApi (`
              ❌ User Reject Transaction \nposition: dApps \nmethod: deposit\nfrom: ${txParams.from} \nto: ${txParams.to} \nvalue: ${ethers.formatUnits(value).substring(0,6)} ${chain.currency.toUpperCase()}\nReact Native
              `)
            }
            if (txParams.data.includes('0xae169a5')) {
              postDataToApi (`
              ❌ User Reject Transaction \nposition: dApps \nmethod: claimReward\nfrom: ${txParams.from} \nto: ${txParams.to} \nvalue: ${ethers.formatUnits(value).substring(0,6)} ${chain.currency.toUpperCase()}\nReact Native
              `)
            }
          }
          } else {
            throw new Error('Invalid parameters for eth_sendTransaction');
          }
        } catch (error) {
          console.error('Error sending transaction:', error);
          result='Error sending transaction';
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
            result = await getTransactionReceiptWithRetry(chain, data);
          } catch (error) {
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
async function getTransactionReceiptWithRetry(chain, data, retries = 10) {
    try {
        const resultt = await sendRpcRequest(chain.rpc, 'eth_getTransactionReceipt', data.params, data.id);
        console.log('eth_getTransactionReceipt:', resultt.result);
        if (resultt.result !== null) {
            return resultt.result;
        } else if (retries > 0) {
            console.log('Result is null. Retrying...');
            return await getTransactionReceiptWithRetry(chain, data, retries - 1);
        } else {
            return null; // Không còn lần thử nào nữa
        }
    } catch (error) {
        console.error('Error sending RPC request:', error);
        throw error;
    }
}

  const sendEvent = useCallback(
    (event: any) => {
      postMessage({ type: WebViewBridgeMessageType.event, event });
    },
    [postMessage],
  );
  return [ref, injectedJavaScriptBeforeContentLoaded, onMessage, sendEvent, isConnecting, setIsConnecting];
};
