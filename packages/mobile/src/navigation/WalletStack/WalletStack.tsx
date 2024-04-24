import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "$hooks/useTheme";
import { WalletStackRouteNames } from "$navigation";
import {
  DevMenu,
  Logs,
  Security,
  Settings,
  LegalDocuments,
  FontLicense,
} from "$core";
import { WalletStackParamList } from "$navigation/WalletStack/WalletStack.interface";
import { Notifications } from "$core/Notifications/Notifications";
import { ChooseCurrencyScreen } from "$core/ChooseCurrencyScreen";
import { DevConfigScreen } from "$core/DevMenu/DevConfigScreen";
import { RefillBattery } from "$core/RefillBattery/RefillBattery";
import { SelectLanguage } from "../../components/Language/SelectLanguage";
import { BackupScreen } from "../../screens";
import { AddNewAccount } from "../../screens/AddNewAccountScreen";
// import { WalletScreen } from "../../../tabs/Wallet/WalletScreen";
import { WalletScreen } from "../../tabs/Wallet/WalletScreen";
import TransactionHistory from "../../screens/TransactionHistory/TransactionHistory";
import ImportToken from "../../screens/ImportToken/ImportToken";
import NotificationScreen from "../../screens/NotificationScreen/NotificationScreen";
import SendToken from "../../screens/SendToken/SendToken";
import SendCoin from "../../screens/SendCoin/SendCoin";
import DetailToken from "../../screens/DetailToken/DetailToken";
import TransferScreen from "../../screens/TransferScreen/TransferScreen";

const Stack = createNativeStackNavigator<WalletStackParamList>();

export const WalletStack: FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={WalletStackRouteNames.Wallet}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen
        name={WalletStackRouteNames.Account}
        component={AddNewAccount}
      />
      <Stack.Screen
        name={WalletStackRouteNames.Wallet}
        component={WalletScreen}
      />
      <Stack.Screen
        name={WalletStackRouteNames.TransactionHistory}
        component={TransactionHistory}
      />
      <Stack.Screen
        name={WalletStackRouteNames.ImportToken}
        component={ImportToken}
      />
      <Stack.Screen
        name={WalletStackRouteNames.Notification}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={WalletStackRouteNames.SendToken}
        component={SendToken}
      />
      <Stack.Screen
        name={WalletStackRouteNames.SendCoin}
        component={SendCoin}
      />
      <Stack.Screen
        name={WalletStackRouteNames.DetailToken}
        component={DetailToken}
      />
      <Stack.Screen
        name={WalletStackRouteNames.Transfer}
        component={TransferScreen}
      />
    </Stack.Navigator>
  );
};
