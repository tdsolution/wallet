import { useDeeplinking } from "$libs/deeplinking";
import { openDAppsSearch } from "$navigation";
import { getCorrectUrl, getSearchQuery, getUrlWithoutTonProxy, isIOS } from "$utils";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Linking, View, useWindowDimensions } from "react-native";
import Web3 from 'web3';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  ShouldStartLoadRequest,
  WebViewNavigation,
  WebViewProgressEvent,
} from "react-native-webview/lib/WebViewTypes";
import { BrowserNavBar } from "./components/BrowserNavBar/BrowserNavBar";
import * as S from "./DAppBrowser.style";
import { useAppInfo } from "./hooks/useAppInfo";
import { useDAppBridge } from "./hooks/useDAppBridge";
import { useChain, useEvm, useWallet } from "@tonkeeper/shared/hooks";
import { Address } from "@tonkeeper/shared/Address";
import { config } from "$config";
import {  ethers } from 'ethers';
import  WalletConnectProvider  from '@walletconnect/web3-provider';
export interface DAppBrowserProps {
  url: string;
}

const TONKEEPER_UTM = "utm_source=tonkeeper";

const addUtmToUrl = (url: string) => {
  const startChar = url.includes("?") ? "&" : "?";

  return `${url}${startChar}${TONKEEPER_UTM}`;
};

const removeUtmFromUrl = (url: string) => {
  return url.replace(new RegExp(`[?|&]${TONKEEPER_UTM}`), "");
};

const DAppBrowserComponent: FC<DAppBrowserProps> = (props) => {
  const { url: initialUrl } = props;
  const [account, setAccount] = useState({ address: '', privateKey: '' });
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const wallet = useWallet();
  const walletAddress = (chain.chainId == '1100' ?(wallet
    ? Address.parse(wallet.address.ton.raw).toFriendly({
        bounceable: true,
        testOnly: wallet.isTestnet,
      })
    : '') : evm.addressWallet);

  const deeplinking = useDeeplinking();

  const [currentUrl, setCurrentUrl] = useState(getCorrectUrl(initialUrl));

  const [webViewSource, setWebViewSource] = useState({
    uri: addUtmToUrl(currentUrl),
  });

  const app = useAppInfo(walletAddress, currentUrl);

  const [title, setTitle] = useState("");

  const [canGoBack, setCanGoBack] = useState(false);

  const {
    ref,
    isConnected,
    disconnect,
    notificationsEnabled,
    unsubscribeFromNotifications,
    // onMessage,
    ...webViewProps
  } = useDAppBridge(walletAddress, currentUrl);

  const dimensions = useWindowDimensions();

  const progress = useSharedValue(0);

  const loadingBarAnimatedStyle = useAnimatedStyle(() => ({
    width: dimensions.width * progress.value,
    opacity: progress.value === 1 ? 0 : 1,
  }));

  const handleLoadProgress = useCallback(
    (e: WebViewProgressEvent) => {
      const nextProgress = e.nativeEvent.progress;

      if (progress.value > nextProgress) {
        progress.value = 0;
      }

      progress.value = withTiming(e.nativeEvent.progress);

      setTitle(e.nativeEvent.title);
      setCurrentUrl(getUrlWithoutTonProxy(removeUtmFromUrl(e.nativeEvent.url)));
    },
    [progress]
  );

  const handleNavigationStateChange = useCallback((e: WebViewNavigation) => {
    setCanGoBack(e.canGoBack);
  }, []);

  const openUrl = useCallback(
    (url: string) => setWebViewSource({ uri: addUtmToUrl(getCorrectUrl(url)) }),
    []
  );

  const handleOpenExternalLink = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      const resolver = deeplinking.getResolver(req.url, {
        params: {
          openUrl,
          redirectToActivity: false,
        },
      });

      if (resolver) {
        setTimeout(() => {
          resolver();
        }, 200);
        return false;
      }

      if (req.url.startsWith("http")) {
        return true;
      }

      setTimeout(() => {
        Linking.openURL(req.url);
      }, 200);

      return false;
    },
    [deeplinking, openUrl]
  );

  const handleGoBackPress = useCallback(() => {
    ref.current?.goBack();
  }, [ref]);

  const handleRefreshPress = useCallback(() => {
    ref.current?.reload();
  }, [ref]);

  const handleTitlePress = useCallback(() => {
    const initialQuery =
      getSearchQuery(currentUrl) || currentUrl || getCorrectUrl(initialUrl);

    openDAppsSearch(initialQuery, openUrl);
  }, [currentUrl, initialUrl, openUrl]);


  const request = (input) => {
    console.log('input', input)
    return 1
  }
  const handleMessage = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
    let result;
    try {
      switch (data.method) {
        case 'eth_requestAccounts':
          result = evm.addressWallet;
          console.log(result);
          break;
      case 'eth_signTransaction':
          result = await signTransaction(data.params);
          break;
      default:
          throw new Error('Method not supported');
      }
     ref.current?.postMessage(JSON.stringify({ id: data.id, result }));
    } catch (error) {
      ref.current?.postMessage(JSON.stringify({ id: data.id, error: error.message }));
    }
    // if(data.method == 'enableEthereum'){
      
    // }
  //   if (data.method === 'eth_requestAccounts' || data.method === 'eth_accounts') {
  //     ref.current?.postMessage(JSON.stringify({ id: data.id, type: 'eth_requestAccounts',result: [evm.addressWallet] }));
  //  }
  }
  const providerMainnet = new ethers.JsonRpcProvider(chain.rpcBackup);
  console.log(providerMainnet);
  const signTransaction = async (params) => {
    const web3 = new Web3(provider);
    const tx = await web3.eth.accounts.signTransaction(params[0], account.privateKey);
    return tx.rawTransaction;
  };
   const signMessage = async (message, privateKey) => {
    const web3 = new Web3(provider);
    const signature = await web3.eth.accounts.sign(message, privateKey);
    return signature.signature;
  };

  // const signTypedMessage = async (params, privateKey) => {
  //   const web3 = new Web3(provider);
  //   const signature = await web3.eth.accounts.signTypedData(params, privateKey);
  //   return signature;
  // };

  const ecRecover = async (params) => {
    const web3 = new Web3(provider);
    const address = await web3.eth.accounts.recover(params[0], params[1]);
    return address;
  };

  const jsCode = `
  window.ethereum = {
    request: async function({method, params}) {
        return new Promise((resolve, reject) => {
          const messageId = Date.now() * Math.pow(10, 3) +  Math.floor(Math.random() * Math.pow(10, 3));
          window.ReactNativeWebView.postMessage(JSON.stringify({
              id: messageId,
              method: method,
              params: params
          }));

          const functionToCall = (event) => {
              const data = JSON.parse(event.data);
              if (data.id && data.id === messageId) {
                
              }
          }
          
          if(${isIOS}) {
            window.addEventListener("message", functionToCall);
          } else {
            document.addEventListener("message", functionToCall);
          }
        });
    },
    isConnected: () => true,
    isTDWallet: true,
    isMetaMask: true,
    address: '${evm.addressWallet}',
    networkVersion: '${chain.chainId}',
    chainId: '${chain.chainId}',
    provider: 'https://rpc.ankr.com/eth',
};
  `
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
  return (
    <S.Container>
      <BrowserNavBar
        title={app?.name || title}
        url={currentUrl}
        isNotificationsEnabled={notificationsEnabled}
        isConnected={isConnected}
        walletAddress={walletAddress}
        canGoBack={canGoBack}
        onBackPress={handleGoBackPress}
        onTitlePress={handleTitlePress}
        onRefreshPress={handleRefreshPress}
        disconnect={disconnect}
        unsubscribeFromNotifications={unsubscribeFromNotifications}
      />
     <S.DAppContainer>
        <S.DAppWebView
          ref={ref}
          key={webViewSource.uri}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          javaScriptCanOpenWindowsAutomatically
          mixedContentMode="always"
          decelerationRate="normal"
          hideKeyboardAccessoryView
          thirdPartyCookiesEnabled={true}
          forceDarkOn={false}
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          source={webViewSource}
          onLoadProgress={handleLoadProgress}
          pullToRefreshEnabled={true}
          allowsBackForwardNavigationGestures={true}
          onNavigationStateChange={handleNavigationStateChange}
          onShouldStartLoadWithRequest={handleOpenExternalLink}
          webviewDebuggingEnabled={config.get('devmode_enabled')}
          injectedJavaScript={jsCode}
          {...webViewProps}
        />
        <S.LoadingBar style={loadingBarAnimatedStyle} />
      </S.DAppContainer>
    </S.Container>
  );
};

export const DAppBrowser = memo(DAppBrowserComponent);
