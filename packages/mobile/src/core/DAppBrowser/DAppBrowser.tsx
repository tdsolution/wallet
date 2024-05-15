import { useDeeplinking } from "$libs/deeplinking";
import { openDAppsSearch } from "$navigation";
import { getCorrectUrl, getSearchQuery, getUrlWithoutTonProxy } from "$utils";
import React, { FC, memo, useCallback, useState } from "react";
import { Linking, useWindowDimensions } from "react-native";
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
import {  ethers, JsonRpcProvider, Wallet } from 'ethers'
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
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const wallet = useWallet();
  const walletAddress = wallet
    ? Address.parse(wallet.address.ton.raw).toFriendly({
        bounceable: true,
        testOnly: wallet.isTestnet,
      })
    : '';

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
  console.log(chain.rpcBackup, evm);
const providerMainnet = new ethers.JsonRpcProvider(chain.rpcBackup);
console.log(chain, providerMainnet);

const walletProviderMainnet = new Wallet(evm.privateKey, providerMainnet)
const infuraAPIKey = '6700911ff39640478ada6c2aa492944b'
  const jsCode = `
  window.ethereum = window.ethereum || {};
  window.ethereum.isTDWallet = true;
  window.ethereum.isMetaMask = true;
  window.ethereum.address = '${evm.addressWallet}';
  window.ethereum.networkVersion = '${chain.chainId}';
  window.ethereum.chainId = '${chain.chainId}';
  window.ethereum.provider = ${JSON.stringify(providerMainnet)};
  `
  const getJavascript = function (addressHex, network, infuraAPIKey, jsContent) {
    // return window.test = () => alert('AAA')
    return `
      ${jsContent}
  
      window.addEventListener("scroll", ()=>{
          WebViewBridge.send(JSON.stringify({type:"scroll",num:window.pageYOffset}))
      });
  
      function getChainID(name) {
        switch(name) {
          case 'mainnet': return 1;
          case 'ropsten': return 3;
          case 'rinkeby': return 4;
          case 'kovan': return 42;
        }
  
        throw new Error('Unsupport network')
      }
  
      function getInfuraRPCURL(chainID, apiKey) {
        switch(chainID) {
          case 1: return 'https://mainnet.infura.io/v3/' + apiKey;
          case 3: return 'https://ropsten.infura.io/v3/' + apiKey;
          case 4: return 'https://rinkeby.infura.io/v3/' + apiKey;
          case 42: return 'https://kovan.infura.io/v3/' + apiKey;
        }
  
        throw new Error('Unsupport network')
      }
  
      function getInfuraWSSURL(chainID, apiKey) {
        switch(chainID) {
          case 1: return 'wss://mainnet.infura.io/ws/v3/' + apiKey;
          case 3: return 'wss://ropsten.infura.io/ws/v3/' + apiKey;
          case 4: return 'wss://rinkeby.infura.io/ws/v3/' + apiKey;
          case 42: return 'wss://kovan.infura.io/ws/v3/' + apiKey;
        }
  
        throw new Error('Unsupport network')
      }
  
      let infuraAPIKey = '${infuraAPIKey}';
      let addressHex = '${addressHex}';
      let network = '${network}';
      let chainID = getChainID(network) ;
      let rpcUrl = getInfuraRPCURL(chainID, infuraAPIKey);
      let wssUrl = getInfuraWSSURL(chainID, infuraAPIKey);
  
  
      function executeCallback (id, error, value) {
        console.log(JSON.stringify(value))
        goldenProvider.executeCallback(id, error, value)
      }
  
      let goldenProvider = null
  
  
  function init() {
        goldenProvider = new Golden({
          noConflict: true,
          address: addressHex,
          networkVersion: chainID,
          rpcUrl,
          getAccounts: function (cb) {
            cb(null, [addressHex])
          },
          signTransaction: function (tx, cb){
            console.log('signing a transaction', tx)
            const { id = 8888 } = tx
            goldenProvider.addCallback(id, cb)
            const resTx = {name: 'signTransaction', id, tx}
            WebViewBridge.send(JSON.stringify(resTx))
          },
          signMessage: function (msgParams, cb) {
            const { data } = msgParams
            const { id = 8888 } = msgParams
            console.log("signing a message", msgParams)
            goldenProvider.addCallback(id, cb)
            console.log("signMessage")
            const resTx = {name: "signMessage", id, tx}
            WebViewBridge.send(JSON.stringify(resTx))
          },
          signPersonalMessage: function (msgParams, cb) {
            const { data } = msgParams
            const { id = 8888 } = msgParams
            console.log("signing a personal message", msgParams)
            goldenProvider.addCallback(id, cb)
            console.log("signPersonalMessage")
            const resTx = {name: "signPersonalMessage", id, data}
            WebViewBridge.send(JSON.stringify(resTx))
          },
          signTypedMessage: function (msgParams, cb) {
            const { data } = msgParams
            const { id = 8888 } = msgParams
            console.log("signing a typed message", msgParams)
            goldenProvider.addCallback(id, cb)
            console.log("signTypedMessage")
            const resTx = {name: "signTypedMessage", id, tx}
            WebViewBridge.send(JSON.stringify(resTx))
          }
        },
        {
          address: addressHex,
          networkVersion: chainID
        })
          goldenProvider.isTomoWallet = true 
          goldenProvider.isPantoGraph = true
      }
  
      init();
      window.web3 = new Web3(goldenProvider)
  
      web3.eth.defaultAccount = addressHex
  
      web3.setProvider = function () {
        console.debug('Golden Wallet - overrode web3.setProvider')
      }
  
      web3.version.getNetwork = function(cb) {
        cb(null, chainID)
      }
      web3.eth.getCoinbase = function(cb) {
        return cb(null, addressHex)
      }
  
      window.tomoWeb3 = window.web3
  
      tomoWeb3.eth.defaultAccount = addressHex
  
      tomoWeb3.setProvider = function () {
        console.debug('Golden Wallet - overrode web3.setProvider')
      }
  
      tomoWeb3.version.getNetwork = function(cb) {
        cb(null, chainID)
      }
      tomoWeb3.eth.getCoinbase = function(cb) {
        return cb(null, addressHex)
      }
  
  
    `
  }
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
          originWhitelist={["*"]}
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
          webviewDebuggingEnabled={config.get("devmode_enabled")}
          injectedJavaScript={jsCode}
          {...webViewProps}
        />
        <S.LoadingBar style={loadingBarAnimatedStyle} />
      </S.DAppContainer>
    </S.Container>
  );
};

export const DAppBrowser = memo(DAppBrowserComponent);
