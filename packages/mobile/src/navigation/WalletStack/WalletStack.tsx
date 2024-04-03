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
    </Stack.Navigator>
  );
};
