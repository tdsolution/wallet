import React, { memo, useCallback, useMemo } from "react";
import { t } from "@tonkeeper/shared/i18n";
import { Modal, Spacer } from "@tonkeeper/uikit";
import { openExploreTab } from "$navigation";
import { SheetActions, useNavigation } from "@tonkeeper/router";
import { Button, Icon, Text } from "$uikit";
import * as S from "./InsufficientFunds.style";
import { delay, fromNano } from "$utils";
import { debugLog } from "$utils/debugLog";
import BigNumber from "bignumber.js";
import { store } from "$store";
import { formatter } from "$utils/formatter";
import { push } from "$navigation/imperative";
import { useBatteryBalance } from "@tonkeeper/shared/query/hooks/useBatteryBalance";
import { config } from "$config";
import { openRefillBatteryModal } from "@tonkeeper/shared/modals/RefillBatteryModal";
import { tk } from "$wallet";
import { Wallet } from "$wallet/Wallet";
import { AmountFormatter } from "@tonkeeper/core";
import { View } from "react-native";
import { colors } from "../../../constants/colors";

export interface InsufficientFundsParams {
  /**
   * Total transaction amount (in nanotons). Required to render description
   */
  totalAmount: string | number;
  /**
   * Current wallet balance (in nanotons). Required to render description
   */
  balance: string | number;
  /**
   * Token's decimals
   */
  decimals?: number;
  /**
   * Token's ticker
   */
  currency?: string;
  stakingFee?: string;
  fee?: string;
  isStakingDeposit?: boolean;
}

export const InsufficientFundsModal = memo<InsufficientFundsParams>((props) => {
  const {
    totalAmount,
    balance,
    currency = "TON",
    decimals = 9,
    stakingFee,
    fee,
    isStakingDeposit,
  } = props;
  const { balance: batteryBalance } = useBatteryBalance();
  const nav = useNavigation();
  const formattedAmount = useMemo(
    () => formatter.format(fromNano(totalAmount, decimals), { decimals }),
    [totalAmount, decimals]
  );
  const formattedBalance = useMemo(
    () => formatter.format(fromNano(balance, decimals), { decimals }),
    [balance, decimals]
  );
  const shouldShowRefillBatteryButton =
    !config.get("disable_battery") &&
    currency === "TON" &&
    batteryBalance === "0";

  const handleOpenRechargeWallet = useCallback(async () => {
    nav.goBack();
    await delay(550);
    nav.openModal("Exchange");
  }, [nav]);

  const handleOpenRefillBattery = useCallback(async () => {
    nav.goBack();
    await delay(550);
    openRefillBatteryModal();
  }, [nav]);

  const handleOpenDappBrowser = useCallback(async () => {
    nav.goBack();
    await delay(550);
    openExploreTab("defi");
  }, [nav]);

  const content = useMemo(() => {
    if (isStakingDeposit) {
      return (
        <Text variant="body1" color="foregroundSecondary" textAlign="center">
          {t("txActions.signRaw.insufficientFunds.stakingDeposit", {
            amount: formattedAmount,
            currency,
          })}
          {t("txActions.signRaw.insufficientFunds.yourBalance", {
            balance: formattedBalance,
            currency,
          })}
        </Text>
      );
    }

    if (stakingFee && fee) {
      return (
        <Text variant="body1" color="foregroundSecondary" textAlign="center">
          {t("txActions.signRaw.insufficientFunds.stakingFee", {
            count: Number(stakingFee),
            fee,
          })}
        </Text>
      );
    }

    return (
      <Text variant="body1" color="foregroundSecondary" textAlign="center">
        {t("txActions.signRaw.insufficientFunds.toBePaid", {
          amount: formattedAmount,
          currency,
        })}
        {currency === "TON" &&
          t("txActions.signRaw.insufficientFunds.withFees")}
        {t("txActions.signRaw.insufficientFunds.yourBalance", {
          balance: formattedBalance,
          currency,
        })}
      </Text>
    );
  }, [
    currency,
    fee,
    formattedAmount,
    formattedBalance,
    isStakingDeposit,
    stakingFee,
  ]);

  return (
    <Modal>
      <View
        style={{
          backgroundColor: "white",
          borderTopRightRadius: 18,
          borderTopLeftRadius: 18,
          height: 500,
        }}
      >
        <Modal.Header />
        <Modal.Content>
          <S.Wrap>
            <Icon name={"ic-exclamationmark-circle-84"} colorHex="#4871EA" />
            <Spacer y={12} />
            <Text textAlign="center" variant="h2" style={{ color: "#4871EA" }}>
              {t("txActions.signRaw.insufficientFunds.title")}
            </Text>
            <Spacer y={4} />
            {content}
          </S.Wrap>
        </Modal.Content>
        <Modal.Footer>
          <View
            style={{
              backgroundColor: "white",
            }}
          >
            <S.FooterWrap>
              {shouldShowRefillBatteryButton && (
                <>
                  <Button mode="primary" onPress={handleOpenRefillBattery}>
                    {t("txActions.signRaw.insufficientFunds.rechargeBattery")}
                  </Button>
                  <Spacer y={16} />
                </>
              )}
              <Button
                style={{ backgroundColor: colors.Primary, marginBottom: 20 }}
                mode="secondary"
                onPress={
                  currency === "TON"
                    ? handleOpenRechargeWallet
                    : handleOpenDappBrowser
                }
              >
                {t("txActions.signRaw.insufficientFunds.rechargeWallet", {
                  currency,
                })}
              </Button>
              <Spacer y={16} />
            </S.FooterWrap>
          </View>
        </Modal.Footer>
      </View>
    </Modal>
  );
});

export async function checkIsInsufficient(
  amount: string | number,
  wallet: Wallet
) {
  try {
    const balances = await wallet.balances.load();
    const balance = AmountFormatter.toNano(balances.ton);
    return {
      insufficient: new BigNumber(amount).gt(new BigNumber(balance)),
      balance,
    };
  } catch (e) {
    debugLog("[checkIsInsufficient]: error", e);
  }
  return { insufficient: false, balance: null };
}

export const openInsufficientFundsModal = (params: InsufficientFundsParams) => {
  push("SheetsProvider", {
    $$action: SheetActions.ADD,
    component: InsufficientFundsModal,
    path: "InsufficientFunds",
    params,
  });

  return true;
};
