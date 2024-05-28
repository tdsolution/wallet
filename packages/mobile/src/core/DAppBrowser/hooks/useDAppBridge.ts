import { AppRequest, ConnectEvent, RpcMethod, WalletEvent } from '@tonconnect/protocol';
import { useCallback, useMemo, useState } from 'react';
import { CURRENT_PROTOCOL_VERSION, TonConnect, tonConnectDeviceInfo } from '$tonconnect';
import { useWebViewBridge } from '../jsBridge';
import { TonConnectInjectedBridge } from './models';
import {
  removeInjectedConnection,
  getConnectedAppByUrl,
  useConnectedAppsStore,
  disableNotifications,
} from '$store';

export const useDAppBridge = (walletAddress: string, webViewUrl: string) => {
  const [connectEvent, setConnectEvent] = useState<ConnectEvent | null>(null);

  const [isConnected, notificationsEnabled] = useConnectedAppsStore(
    useCallback(
      (state) => {
        const app = getConnectedAppByUrl(walletAddress, webViewUrl, state);

        if (!app) {
          return [false, false];
        }

        return [
          Boolean(connectEvent && connectEvent.event === 'connect'),
          Boolean(app.notificationsEnabled),
        ];
      },
      [connectEvent, webViewUrl, walletAddress],
    ),
  );

  const bridgeObject = useMemo((): TonConnectInjectedBridge => {
    return {
      deviceInfo: tonConnectDeviceInfo,
      protocolVersion: CURRENT_PROTOCOL_VERSION,
      isWalletBrowser: true,
      connect: async (protocolVersion, request) => {
        const event = await TonConnect.connect(
          protocolVersion,
          request,
          undefined,
          undefined,
          webViewUrl,
        );

        setConnectEvent(event);

        return event;
      },
      restoreConnection: async () => {
        const event = await TonConnect.autoConnect(webViewUrl);

        setConnectEvent(event);

        return event;
      },
      disconnect: async () => {
        setConnectEvent(null);

        removeInjectedConnection(webViewUrl);

        return;
      },
      send: async <T extends RpcMethod>(request: AppRequest<T>) =>
        TonConnect.handleRequestFromInjectedBridge(request, webViewUrl),
    };
  }, [webViewUrl]);
  
  const [ref, injectedJavaScriptBeforeContentLoaded, onMessage, sendEvent, isConnecting, setIsConnecting] =
    useWebViewBridge<TonConnectInjectedBridge, WalletEvent>(bridgeObject, webViewUrl);

  const disconnect = useCallback(async () => {
    try {
      await TonConnect.disconnect(webViewUrl);
      sendEvent({ event: 'disconnect', payload: {} });
    } catch {}
  }, [webViewUrl, sendEvent]);

  const unsubscribeFromNotifications = useCallback(async () => {
    disableNotifications(walletAddress, webViewUrl);
  }, [walletAddress, webViewUrl]);

  return {
    ref,
    injectedJavaScriptBeforeContentLoaded,
    onMessage,
    isConnected,
    notificationsEnabled,
    disconnect,
    unsubscribeFromNotifications,
    isConnecting,
    setIsConnecting
  };
};
