import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Rate, { AndroidMarket } from "react-native-rate";
import { Alert, Linking, Platform, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Animated from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

import * as S from "./Settings.style";
import { Icon, PopupSelect, ScrollHandler, Spacer, Text } from "$uikit";
import { Icon as NewIcon } from "@tonkeeper/uikit";
import { useShouldShowTokensButton } from "$hooks/useShouldShowTokensButton";
import { useNavigation } from "@tonkeeper/router";
import { List } from "@tonkeeper/uikit";
import {
  AppStackRouteNames,
  MainStackRouteNames,
  SettingsStackRouteNames,
  openDeleteAccountDone,
  openDevMenu,
  openLegalDocuments,
  openManageTokens,
  openNotifications,
  openRefillBattery,
  openSecurity,
  openSelectLanguage,
  openSubscriptions,
} from "$navigation";
import { walletActions } from "$store/wallet";
import {
  APPLE_STORE_ID,
  GOOGLE_PACKAGE_NAME,
  LargeNavBarHeight,
  IsTablet,
} from "$shared/constants";
import { checkIsTonDiamondsNFT, hNs, ns, throttle } from "$utils";
import { LargeNavBarInteractiveDistance } from "$uikit/LargeNavBar/LargeNavBar";
import { CellSectionItem } from "$shared/components";
import { useFlags } from "$utils/flags";
import { SearchEngine, useBrowserStore } from "$store";
import AnimatedLottieView from "lottie-react-native";
import { Steezy } from "$styles";
import { i18n, t } from "@tonkeeper/shared/i18n";
import { trackEvent } from "$utils/stats";
import { openAppearance } from "$core/ModalContainer/AppearanceModal";
import { config } from "$config";
import {
  useNftsState,
  useWallet,
  useWalletCurrency,
  useWalletSetup,
} from "@tonkeeper/shared/hooks";
import { tk } from "$wallet";
import { mapNewNftToOldNftData } from "$utils/mapNewNftToOldNftData";
import { WalletListItem } from "@tonkeeper/shared/components";
import { useSubscriptions } from "@tonkeeper/shared/hooks/useSubscriptions";
import { nativeLocaleNames } from "@tonkeeper/shared/i18n/translations";
import { colors } from "../../constants/colors";
import ModalSignOut from "./Item/ModalSignOut";
import ModalDeleteAccount from "./Item/ModalDeleteAccount";
import SaveListToken from "$libs/EVM/HistoryEVM/SaveToken";
import SaveTransaction from "$libs/EVM/HistoryEVM/SaveTransaction";
import SaveListWallet from "$libs/EVM/SaveWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings: FC = () => {
  const animationRef = useRef<AnimatedLottieView>(null);
  const devMenuHandlerRef = useRef(null);
  const [modalVisibleSignOut, setModalVisibleSignOut] =
    useState<boolean>(false);
  const [modalVisibleDeleteAccount, setModalVisibleDeleteAccount] =
    useState<boolean>(false);

  const flags = useFlags([
    "disable_apperance",
    "disable_support_button",
    "disable_feedback_button",
    "address_style_settings",
    "address_style_nobounce",
  ]);

  const nav = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const fiatCurrency = useWalletCurrency();
  const dispatch = useDispatch();
  const hasSubscriptions = useSubscriptions(
    (state) => Object.values(state.subscriptions).length > 0
  );
  const wallet = useWallet();
  const shouldShowTokensButton = useShouldShowTokensButton();

  const { lastBackupAt } = useWalletSetup();

  const isBatteryVisible =
    !!wallet && !wallet.isWatchOnly && !config.get("disable_battery");

  const searchEngine = useBrowserStore((state) => state.searchEngine);
  const setSearchEngine = useBrowserStore(
    (state) => state.actions.setSearchEngine
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAnimateDiamond = useCallback(
    throttle(() => {
      animationRef?.current?.play();
    }, 500),
    []
  );

  const handleRateApp = useCallback(() => {
    const options = {
      preferInApp: false,
      AppleAppID: APPLE_STORE_ID,
      GooglePackageName: GOOGLE_PACKAGE_NAME,
      preferredAndroidMarket: AndroidMarket.Google,
    };

    Rate.rate(options, (_) => {
      //
    });
  }, []);

  const handleFeedback = useCallback(() => {
    Linking.openURL(config.get("supportLink")).catch((err) => console.log(err));
  }, []);

  const handleLegal = useCallback(() => {
    openLegalDocuments();
  }, []);

  const handleNews = useCallback(() => {
    Linking.openURL(config.get("tonkeeperNewsUrl")).catch((err) =>
      console.log(err)
    );
  }, []);

  const handleSupport = useCallback(() => {
    Linking.openURL(config.get("directSupportUrl")).catch((err) =>
      console.log(err)
    );
  }, []);

  const handleClearToken = async () => {
    try {
      await SaveListToken.clearData();
      await SaveTransaction.clearData();
      await SaveListWallet.clearData();
      await AsyncStorage.removeItem('EVMPrivateKey');
      await AsyncStorage.removeItem('EVMAddress');
      await AsyncStorage.removeItem('EVMMnemonic');
      await AsyncStorage.removeItem('EVMMname');
      console.log("Token clear successfully!: ");
    } catch (error) {
      console.error("Error clear token:", error);
    }
  };

  const handleResetWallet = useCallback(() => {
    // Alert.alert(
    //   t("settings_reset_alert_title"),
    //   t("settings_reset_alert_caption"),
    //   [
    //     {
    //       text: t("cancel"),
    //       style: "cancel",
    //     },
    //     {
    //       text: t("settings_reset_alert_button"),
    //       style: "destructive",
    //       onPress: () => {
    //         dispatch(walletActions.cleanWallet());
    //       },
    //     },
    //   ]
    // );
    dispatch(walletActions.cleanWallet());

    setModalVisibleSignOut(false);
    handleClearToken();
  }, [dispatch]);

  const handleStopWatchWallet = useCallback(() => {
    Alert.alert(t("settings_delete_watch_account"), undefined, [
      {
        text: t("cancel"),
        style: "cancel",
      },
      {
        text: t("settings_delete_watch_account_button"),
        style: "destructive",
        onPress: () => {
          dispatch(walletActions.cleanWallet());
        },
      },
    ]);
  }, [dispatch]);

  const handleSubscriptions = useCallback(() => {
    openSubscriptions();
  }, []);

  const handleNotifications = useCallback(() => {
    openNotifications();
  }, []);

  const searchEngineVariants = Object.values(SearchEngine);

  const handleSwitchLanguage = useCallback(() => {
    if (Platform.OS === "android") {
      return openSelectLanguage();
    }

    Alert.alert(t("language.language_alert.title"), undefined, [
      {
        text: t("language.language_alert.cancel"),
        style: "cancel",
      },
      {
        text: t("language.language_alert.open"),
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]);
  }, []);

  const handleDevMenu = useCallback(() => {
    openDevMenu();
  }, []);

  const handleSecurity = useCallback(() => {
    openSecurity();
  }, []);

  const handleBackupSettings = useCallback(() => {
    nav.navigate(SettingsStackRouteNames.Backup);
  }, [nav]);

  const handleAppearance = useCallback(() => {
    openAppearance();
  }, []);

  const handleManageTokens = useCallback(() => {
    openManageTokens();
  }, []);

  const handleBattery = useCallback(() => {
    openRefillBattery();
  }, []);

  const handleDeleteAccount = useCallback(() => {
    //Alert.alert(
    //   t("settings_delete_alert_title"),
    //   t("settings_delete_alert_caption"),
    //   [
    //     {
    //       text: t("cancel"),
    //       style: "cancel",
    //     },
    //     {
    //       text: t("settings_delete_alert_button"),
    //       style: "destructive",
    //       onPress: () => {
    //         trackEvent("delete_wallet");
    //         openDeleteAccountDone();
    //       },
    //     },
    //   ]
    // );
    trackEvent("delete_wallet");
    openDeleteAccountDone();
    setModalVisibleSignOut(false);
  }, []);

  const handleCustomizePress = useCallback(
    () => nav.navigate(AppStackRouteNames.CustomizeWallet),
    [nav]
  );

  const backupIndicator = React.useMemo(() => {
    if (lastBackupAt !== null) {
      return null;
    }

    return (
      <View style={styles.backupIndicatorContainer.static}>
        <S.BackupIndicator />
      </View>
    );
  }, [lastBackupAt]);

  const accountNfts = useNftsState((s) => s.accountNfts);

  const hasDiamods = useMemo(() => {
    if (!wallet || wallet.isWatchOnly) {
      return false;
    }

    return Object.values(accountNfts).find((nft) =>
      checkIsTonDiamondsNFT(
        mapNewNftToOldNftData(nft, wallet.address.ton.friendly)
      )
    );
  }, [wallet, accountNfts]);

  const isAppearanceVisible = React.useMemo(() => {
    return hasDiamods && !flags.disable_apperance;
  }, [hasDiamods, flags.disable_apperance]);

  return (
    <S.Wrap>
      <ScrollHandler navBarTitle={t("settings_title")}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: IsTablet ? ns(8) : hNs(LargeNavBarHeight),
            paddingBottom: tabBarHeight,
            alignItems: IsTablet ? "center" : undefined,
          }}
          scrollEventThrottle={16}
        >
          {wallet ? (
            <>
            <View style={[stylesButton.shadow, {width: '100%'}]}>
              <List>
                <WalletListItem
                  onPress={handleCustomizePress}
                  wallet={wallet}
                  subtitle={t("customize")}
                  rightContent={
                    <Image
                      source={require("../../assets/icons/png/ic-chevron-right-12.png")}
                    />
                  }
                />
              </List>
              </View>
              {/* <Spacer y={16} /> */}
            </>
          ) : null}
          <View style={[stylesButton.shadow, {padding: 15, width: '100%'}]}>
            <Pressable style={[stylesButton.row]} onPress={() => nav.navigate(SettingsStackRouteNames.WalletConnect)}>
              <Text
                style={{ color: "#2B2D42" }}
                variant="label1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Wallet Connect
              </Text>
              <Icon
                style={styles.icon.static}
                color="primaryColor"
                name="ic-lock-28"
              />
            </Pressable>
          </View>
          <Spacer y={16} />
          <View style={[stylesButton.shadow, {width: '100%'}]}>
            <List>
              {!!wallet && !wallet.isWatchOnly && (
                <List.Item
                  value={
                    <Icon
                      style={styles.icon.static}
                      color="primaryColor"
                      name={"ic-key-28"}
                    />
                  }
                  title={
                    <View style={styles.backupTextContainer.static}>
                      <Text
                        style={{ color: "#2B2D42" }}
                        variant="label1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {t("settings_backup_seed")}
                      </Text>
                      {backupIndicator}
                    </View>
                  }
                  onPress={handleBackupSettings}
                />
              )}
              {shouldShowTokensButton && (
                <List.Item
                  value={
                    <Icon
                      style={styles.icon.static}
                      color="primaryColor"
                      name={"ic-jetton-28"}
                    />
                  }
                  title={t("settings_jettons_list")}
                  onPress={handleManageTokens}
                />
              )}
              {hasSubscriptions && (
                <List.Item
                  value={
                    <Icon
                      style={styles.icon.static}
                      color="primaryColor"
                      name={"ic-ticket-28"}
                    />
                  }
                  title={t("settings_subscriptions")}
                  onPress={handleSubscriptions}
                />
              )}
              {!!wallet &&
                wallet.notifications.isAvailable &&
                !wallet.isTestnet && (
                  <List.Item
                    value={
                      <Icon color="primaryColor" name={"ic-notification-28"} />
                    }
                    title={t("settings_notifications")}
                    onPress={handleNotifications}
                  />
                )}
              {isAppearanceVisible && (
                <List.Item
                  value={
                    <Icon
                      style={styles.icon.static}
                      color="primaryColor"
                      name={"ic-appearance-28"}
                    />
                  }
                  title={t("settings_appearance")}
                  onPress={handleAppearance}
                />
              )}
              <List.Item
                value={
                  <S.SelectedCurrency>
                    {fiatCurrency.toUpperCase()}
                  </S.SelectedCurrency>
                }
                title={t("settings_primary_currency")}
                onPress={() => nav.navigate("ChooseCurrency")}
              />
              {isBatteryVisible && (
                <List.Item
                  value={
                    <NewIcon
                      style={styles.icon.static}
                      color="accentBlue"
                      name={"ic-battery-28"}
                    />
                  }
                  title={t("battery.settings")}
                  onPress={handleBattery}
                />
              )}
              {!config.get("disable_holders_cards") &&
                !!wallet &&
                !wallet.isWatchOnly && (
                  <List.Item
                    value={
                      <NewIcon
                        style={styles.icon.static}
                        color="accentBlue"
                        name={"ic-creditcard-28"}
                      />
                    }
                    title={t("settings_bank_card")}
                    onPress={() =>
                      nav.navigate(MainStackRouteNames.HoldersWebView)
                    }
                  />
                )}
            </List>
          </View>
          <Spacer y={16} />
          <View style={[stylesButton.shadow, {width: '100%'}]}>
          <List>
            {!!wallet && tk.walletForUnlock && (
              <List.Item
                value={
                  <Icon
                    style={styles.icon.static}
                    color="primaryColor"
                    name="ic-lock-28"
                  />
                }
                title={t("settings_security")}
                onPress={handleSecurity}
              />
            )}
            <PopupSelect
              items={searchEngineVariants}
              selected={searchEngine}
              onChange={setSearchEngine}
              keyExtractor={(item) => item}
              width={176}
              renderItem={(item) => (
                <Text style={{ color: colors.Black }} variant="label1">
                  {item}
                </Text>
              )}
            >
              <List.Item
                value={
                  <Text variant="label1" color="primaryColor">
                    {searchEngine}
                  </Text>
                }
                title={t("settings_search_engine")}
              />
            </PopupSelect>
            <List.Item
              onPress={handleSwitchLanguage}
              value={
                <Text variant="label1" color="primaryColor">
                  {nativeLocaleNames[i18n.locale]}
                </Text>
              }
              title={t("language.title")}
            />
            {wallet && !wallet.isWatchOnly && flags.address_style_settings ? (
              <List.Item
                value={
                  <Text variant="label1" color="primaryColor">
                    EQ » UQ
                  </Text>
                }
                title={t("address_update.title")}
                onPress={() =>
                  nav.navigate(MainStackRouteNames.AddressUpdateInfo)
                }
              />
            ) : null}
          </List>
          </View>
          <Spacer y={16} />
          <View style={[stylesButton.shadow, {width: '100%'}]}>
          <List>
            {!flags.disable_support_button ? (
              <List.Item
                onPress={handleSupport}
                value={
                  <Icon
                    style={styles.icon.static}
                    color="primaryColor"
                    name={"ic-message-bubble-28"}
                  />
                }
                title={t("settings_support")}
              />
            ) : null}
            <List.Item
              onPress={handleNews}
              value={
                <Icon
                  style={styles.icon.static}
                  color="iconSecondary"
                  name={"ic-telegram-28"}
                />
              }
              title={t("settings_news")}
            />
            {!flags.disable_feedback_button ? (
              <List.Item
                onPress={handleFeedback}
                value={
                  <Icon
                    style={styles.icon.static}
                    color="iconSecondary"
                    name={"ic-envelope-28"}
                  />
                }
                title={t("settings_contact_support")}
              />
            ) : null}
            <List.Item
              onPress={handleRateApp}
              value={
                <Icon
                  style={styles.icon.static}
                  color="iconSecondary"
                  name={"ic-star-28"}
                />
              }
              title={t("settings_rate")}
            />
            {!!wallet && !wallet.isWatchOnly && (
              <View>
                <List.Item
                  onPress={() => setModalVisibleDeleteAccount(true)}
                  value={
                    <Icon
                      style={styles.icon.static}
                      color="iconSecondary"
                      name={"ic-trash-bin-28"}
                    />
                  }
                  title={t("settings_delete_account")}
                />
                <ModalDeleteAccount
                  visible={modalVisibleDeleteAccount}
                  onClose={() => setModalVisibleDeleteAccount(false)}
                  onDeleteAccount={handleDeleteAccount}
                />
              </View>
            )}
            <List.Item
              onPress={handleLegal}
              value={
                <Icon
                  style={styles.icon.static}
                  color="iconSecondary"
                  name={"ic-doc-28"}
                />
              }
              title={t("settings_legal_documents")}
            />
          </List>
          </View>
          <Spacer y={16} />
          {!!wallet && (
            <>
            <View style={[stylesButton.shadow, {width: '100%'}]}>
              <List>
                {wallet.isWatchOnly ? (
                  <CellSectionItem
                    onPress={handleStopWatchWallet}
                    icon="ic-trash-bin-28"
                  >
                    {t("stop_watch")}
                  </CellSectionItem>
                ) : (
                  // <CellSectionItem
                  //   onPress={handleResetWallet}
                  //   icon="ic-door-28"
                  // >
                  //   {t("settings_reset")}
                  // </CellSectionItem>
                  <View>
                    <TouchableOpacity
                      style={stylesButton.button}
                      onPress={() => setModalVisibleSignOut(true)}
                    >
                      <Text style={stylesButton.textButton}>Sign Out</Text>
                      <Image
                        style={stylesButton.iconClose}
                        source={require("../../assets/icons/png/ic-door-28.png")}
                      />
                    </TouchableOpacity>
                    <ModalSignOut
                      visible={modalVisibleSignOut}
                      onClose={() => setModalVisibleSignOut(false)}
                      onSignOut={handleResetWallet}
                    />
                  </View>
                )}
              </List>
              </View>
              <Spacer y={16} />
            </>
          )}
          <S.Content>
            <TapGestureHandler
              simultaneousHandlers={devMenuHandlerRef}
              onHandlerStateChange={handleAnimateDiamond}
            >
              <TapGestureHandler
                ref={devMenuHandlerRef}
                numberOfTaps={5}
                onGestureEvent={() => console.log(true)}
                onActivated={handleDevMenu}
              >
                <S.AppInfo>
                  {/* <S.AppInfoIcon
                    ref={animationRef}
                    loop={false}
                    source={require("$assets/lottie/diamond.json")}
                  /> */}

                  <Image
                    source={require("../../assets/logo/logo_app.png")}
                    style={stylesButton.logo}
                  />

                  <S.AppInfoTitleWrapper>
                    <Text
                      fontSize={14}
                      lineHeight={20}
                      fontWeight="700"
                      color="primaryColor"
                    >
                      {DeviceInfo.getApplicationName()}
                    </Text>
                  </S.AppInfoTitleWrapper>
                  <S.AppInfoVersionWrapper>
                    <Text variant="label3" color="foregroundSecondary">
                      {t("settings_version")} {DeviceInfo.getVersion()}
                    </Text>
                  </S.AppInfoVersionWrapper>
                </S.AppInfo>
              </TapGestureHandler>
            </TapGestureHandler>
          </S.Content>
          <View style={{ height: LargeNavBarInteractiveDistance }} />
        </Animated.ScrollView>
      </ScrollHandler>
    </S.Wrap>
  );
};

const styles = Steezy.create({
  icon: {
    marginTop: -2,
    marginBottom: -2,
  },
  backupTextContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  backupIndicatorContainer: {
    height: 24,
    paddingTop: 9.5,
    paddingBottom: 6.5,
    marginLeft: 8,
  },
});
const stylesButton = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.Primary,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
  },
  iconClose: {
    width: 28,
    height: 28,
    tintColor: colors.White,
    resizeMode: "contain",
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 30,
    resizeMode: "contain",
  },
  row: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }
});
