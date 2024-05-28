import { useDeeplinking } from "$libs/deeplinking";
import { openDAppsSearch } from "$navigation";
import { getCorrectUrl, getSearchQuery, getUrlWithoutTonProxy, isIOS } from "$utils";
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Linking, View, useWindowDimensions, Modal, ActivityIndicator, Text, Button } from "react-native";

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
import ModalConnect from "./components/ModalConnect";
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
  const chain = useChain()?.chain;
  const { url: initialUrl } = props;
  const [account, setAccount] = useState({ address: '', privateKey: '' });
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
    isConnecting,
    setIsConnecting,
    ...webViewProps
  } = useDAppBridge(walletAddress, currentUrl);
  const handleCloseModalAccount = () => {
  setIsConnecting(false);
  };
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
console.log(isConnecting)
  const injectedJavaScript = useMemo(() => `
    (function() {
      window.ethereum = {
        isMetaMask: true,
        isConnected: () => true,
        request: async ({ method, params }) => {
          const messageId = Date.now() * Math.pow(10, 3) + Math.floor(Math.random() * Math.pow(10, 3));
          window.ReactNativeWebView.postMessage(JSON.stringify({
            id: messageId,
            method: method,
            params: params
          }));

          return new Promise((resolve, reject) => {
            const handleMessage = (event) => {
              const data = JSON.parse(event.data);
              if (data.id === messageId) {
                if (data.result) {
                  resolve(data.result);
                } else {
                  reject(new Error(data.error));
                }
                window.removeEventListener('message', handleMessage);
              }
            };
            if(${isIOS}) {
              window.addEventListener('message', handleMessage);
            } else {
              document.addEventListener('message', handleMessage);
            }
          });
        }
      };
    })();
  `, []);

  
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
          injectedJavaScript={injectedJavaScript}
          {...webViewProps}
        />
        <S.LoadingBar style={loadingBarAnimatedStyle} />
      </S.DAppContainer>
    </S.Container>
  );
};

export const DAppBrowser = memo(DAppBrowserComponent);