import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Wallet as EthWallet } from "ethers";
import { i18n, t } from "@tonkeeper/shared/i18n";
import {
  Button,
  IconButton,
  IconButtonList,
  Screen,
  Text,
  List,
  View,
  PagerView,
  Spacer,
  copyText,
  Haptics,
  deviceHeight,
} from "@tonkeeper/uikit";
import { InternalNotification, Tag } from "$uikit";
import { useNavigation } from "@tonkeeper/router";
import { ScanQRButton } from "../../components/ScanQRButton";
import {
  ImageBackground,
  RefreshControl,
  useWindowDimensions,
  Image,
  FlatList,
  Platform
} from "react-native";
import { NFTCardItem } from "./NFTCardItem";
import { useDispatch } from "react-redux";
import { ns } from "$utils";
import { useIsFocused } from "@react-navigation/native";
import { useBalance } from "./hooks/useBalance";
import { ListItemRate } from "./components/ListItemRate";
import { TonIcon } from "@tonkeeper/uikit";
import { CryptoCurrencies, TabletMaxWidth } from "$shared/constants";
import { useBottomTabBarHeight } from "$hooks/useBottomTabBarHeight";
import { useInternalNotifications } from "./hooks/useInternalNotifications";
import { mainActions } from "$store/main";
import { useTonkens } from "./hooks/useTokens";
import { useApprovedNfts } from "$hooks/useApprovedNfts";
import { useTheme } from "$hooks/useTheme";
import { useTokenPrice } from "$hooks/useTokenPrice";
import { Steezy } from "$styles";
import { WalletContentList } from "./components/WalletContentList";
import { useFlags } from "$utils/flags";
import { useUpdatesStore } from "$store/zustand/updates/useUpdatesStore";
import { UpdatesCell } from "$core/ApprovalCell/Updates/UpdatesCell";
import { UpdateState } from "$store/zustand/updates/types";
import { ShowBalance } from "$core/HideableAmount/ShowBalance";
import { Events, SendAnalyticsFrom } from "$store/models";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { openWallet } from "$core/Wallet/ToncoinScreen";
import { trackEvent } from "$utils/stats";
import { ExpiringDomainCell } from "./components/ExpiringDomainCell";
import { BatteryIcon } from "@tonkeeper/shared/components/BatteryIcon/BatteryIcon";
import { useNetInfo } from "@react-native-community/netinfo";
import { format } from "date-fns";
import { getLocale } from "$utils/date";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  useChain,
  useWallet,
  useWalletCurrency,
  useWalletStatus,
} from "@tonkeeper/shared/hooks";
import { WalletSelector } from "./components/WalletSelector";
import { useInscriptionBalances } from "$hooks/useInscriptionBalances";
import { LogoButton } from "../../components/LogoButton";
import { NotificationButton } from "../../components/NotificationButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { chainActive } from "@tonkeeper/shared/utils/KEY_STORAGE";
import { DataChains } from "@tonkeeper/shared/utils/network";
import { WalletStackRouteNames } from "$navigation";
import ItemWallet from "./Item/ItemWallet";
import Title from "../../components/Title";
const bip39 = require("bip39");
export const WalletScreen = memo(({ navigation }: any) => {
  const chain = useChain()?.chain;
  const flags = useFlags(["disable_swap"]);
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const theme = useTheme();
  const nav = useNavigation();
  const tokens = useTonkens();
  const { enabled: inscriptions } = useInscriptionBalances();
  const { enabled: nfts } = useApprovedNfts();
  const wallet = useWallet();
  const shouldUpdate =
    useUpdatesStore((state) => state.update.state) !== UpdateState.NOT_STARTED;
  const balance = useBalance(tokens.total.fiat);
  const tonPrice = useTokenPrice(CryptoCurrencies.Ton);
  const currency = useWalletCurrency();
  const HEIGHT_RATIO = deviceHeight / 844;
  const { isReloading: isRefreshing, updatedAt: walletUpdatedAt } =
    useWalletStatus();
  const isFocused = useIsFocused();
  const tronBalances = undefined;
  const notifications = useInternalNotifications();
  const { isConnected } = useNetInfo();

  // TODO: rewrite
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(mainActions.mainStackInited());
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);
  const handlePressSwap = useCallback(() => {
    if (wallet) {
      nav.openModal("Swap");
    } else {
      openRequireWalletModal();
    }
  }, [nav, wallet]);

  const handlePressBuy = useCallback(() => {
    if (wallet) {
      nav.openModal("Exchange");
    } else {
      openRequireWalletModal();
    }
  }, [nav, wallet]);

  const handlePressSend = useCallback(() => {
    if (wallet) {
      trackEvent(Events.SendOpen, { from: SendAnalyticsFrom.WalletScreen });
      nav.go("Send", { from: SendAnalyticsFrom.WalletScreen });
    } else {
      openRequireWalletModal();
    }
  }, [nav, wallet]);

  const handlePressRecevie = useCallback(() => {
    if (wallet) {
      nav.go("ReceiveModal");
    } else {
      openRequireWalletModal();
    }
  }, [nav, wallet]);

  const handleCreateWallet = () => nav.navigate("/add-wallet");

  const handleRefresh = useCallback(() => {
    if (!wallet) {
      return;
    }
    wallet.reload();
  }, [wallet]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabLongPress", () => {
      Haptics.notificationSuccess();
      nav.openModal("/switch-wallet");
    });

    return unsubscribe;
  }, [nav, navigation]);

  const isWatchOnly = wallet && wallet.isWatchOnly;

  const ListHeader = useMemo(
    () => (
      <View style={styles.mainSection} pointerEvents="box-none">
        {notifications.map((notification, i) => (
          <InternalNotification
            key={i}
            mode={notification.mode}
            title={notification.title}
            caption={notification.caption}
            action={notification.action}
            onPress={notification.onPress}
            onClose={notification.onClose}
          />
        ))}
        {shouldUpdate && <UpdatesCell />}
        <View style={styles.amount} pointerEvents="box-none">
          <View style={styles.balanceWithBattery}>
            <ShowBalance amount={balance.total.fiat} />
            <Spacer x={4} />
            <BatteryIcon />
          </View>
          <View style={styles.addressContainer}>
            {wallet && isConnected !== false ? (
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 18, right: 18 }}
                style={{ zIndex: 3, marginVertical: 8 }}
                onPress={copyText(wallet.address.ton.friendly)}
                activeOpacity={0.6}
              >
                <Text color="textSecondary" type="body2">
                  {wallet.address.ton.short}
                </Text>
              </TouchableOpacity>
            ) : null}
            {wallet && isConnected === false && walletUpdatedAt ? (
              <View style={{ zIndex: 3, marginVertical: 8 }}>
                <Text color="textSecondary" type="body2">
                  {t("wallet.updated_at", {
                    value: format(walletUpdatedAt, "d MMM, HH:mm", {
                      locale: getLocale(),
                    }).replace(".", ""),
                  })}
                </Text>
              </View>
            ) : null}

            {wallet && wallet.isTestnet ? (
              <>
                <Tag type="warning">Testnet</Tag>
              </>
            ) : null}
            {isWatchOnly ? (
              <>
                <Tag type="warning">{t("watch_only")}</Tag>
              </>
            ) : null}
          </View>
        </View>
        <IconButtonList
          horizontalIndent={i18n.locale === "ru" ? "large" : "small"}
          style={styles.actionButtons}
        >
          {!isWatchOnly ? (
            <IconButton
              onPress={handlePressSend}
              iconName="ic-arrow-up-28"
              title={t("wallet.send_btn")}
            />
          ) : null}
          <IconButton
            onPress={handlePressRecevie}
            iconName="ic-arrow-down-28"
            title={t("wallet.receive_btn")}
          />
          {!isWatchOnly ? (
            <IconButton
              onPress={handlePressBuy}
              iconName="ic-usd-28"
              title={t("wallet.buy_btn")}
            />
          ) : null}
          {!flags.disable_swap && !isWatchOnly && (
            <IconButton
              onPress={handlePressSwap}
              iconName="ic-swap-horizontal-28"
              title={t("wallet.swap_btn")}
            />
          )}
        </IconButtonList>
        {wallet && !wallet.isWatchOnly && (
          <>
            <ExpiringDomainCell />
          </>
        )}
      </View>
    ),
    [
      balance.total.fiat,
      flags.disable_swap,
      handlePressBuy,
      handlePressRecevie,
      handlePressSend,
      handlePressSwap,
      isConnected,
      isWatchOnly,
      notifications,
      shouldUpdate,
      wallet,
      walletUpdatedAt,
    ]
  );

  // TODO: rewrite
  const dimensions = useWindowDimensions();
  const mockupCardSize = {
    width: ns(114),
    height: ns(166),
  };

  const numColumn = 3;
  const indent = ns(8);
  const heightRatio = mockupCardSize.height / mockupCardSize.width;

  const nftCardSize = useMemo(() => {
    const width = dimensions.width / numColumn - indent;
    const height = width * heightRatio;

    return { width, height };
  }, [dimensions.width]);

  const isPagerView =
    nfts.length &&
    tokens.list.length + inscriptions.length >= 2 &&
    inscriptions.length + tokens.list.length + nfts.length + 1 > 10;

  if (!wallet) {
    return (
      <Screen>
        <Screen.Header
          title={t("wallet.screen_title")}
          rightContent={<ScanQRButton />}
          hideBackButton
        />
        <Screen.ScrollView indent={false}>
          {ListHeader}
          <List>
            <List.Item
              title="Toncoin"
              onPress={() => openWallet(CryptoCurrencies.Ton)}
              leftContent={<TonIcon />}
              chevron
              subtitle={
                <ListItemRate
                  price={tonPrice.formatted.fiat ?? "-"}
                  trend={tonPrice.fiatDiff.trend}
                />
              }
            />
          </List>
        </Screen.ScrollView>
        {!wallet && (
          <View
            style={[
              styles.createWalletContainerOuter,
              { bottom: tabBarHeight },
            ]}
          >
            <View style={styles.createWalletContainerInner}>
              <Button
                onPress={handleCreateWallet}
                title={t("balances_setup_wallet")}
              />
            </View>
          </View>
        )}
      </Screen>
    );
  }
  return (
    <Screen>
      <Screen.Header
        title={<WalletSelector />}
        rightContent={
          !isWatchOnly ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <ScanQRButton />
              <View style={{ width: 10 }}></View>
              <NotificationButton />
              <View style={{ width: 10 }}></View>
            </View>
          ) : null
        }
        hideBackButton
        children={<LogoButton />}
      />
      <ScrollView>
        <View style={{ height: 120 * HEIGHT_RATIO, marginBottom: 10 }}>
          <View
            style={{ padding: 15 * HEIGHT_RATIO, margin: 1, borderRadius: 50 }}
          >
            <ImageBackground
              source={require("../../assets/logo/bg_card.png")}
              resizeMode="cover"
              style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#7A6BFF",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14 }}>Main Balance</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      nav.openModal("/select-network");
                    }}
                    activeOpacity={0.6}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          margin: 4,
                          borderWidth: 2,
                          borderRadius: 50,
                          borderColor: "#fff",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Image
                          source={{ uri: chain.logo }}
                          style={{ width: 20, height: 20, borderRadius: 10 }}
                          resizeMode="contain"
                        />
                      </View>
                      <Image
                        source={require("../../assets/icons_v1/icon_more.png")}
                        style={{ width: 14, height: 14 }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 1, marginBottom: 2 }}>
                <ShowBalance amount={balance.total.fiat} />
              </View>
              <View
                style={{
                  marginBottom: 2,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  hitSlop={{ top: 8, bottom: 8, left: 18, right: 18 }}
                  style={{ zIndex: 3, marginVertical: 8 }}
                  onPress={copyText(wallet.address.ton.friendly)}
                  activeOpacity={0.6}
                >
                  <Text
                    color="textSecondary"
                    type="body2"
                    style={{ color: "#fff" }}
                  >
                    {wallet.address.ton.short}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={copyText(wallet.address.ton.friendly)}
                  activeOpacity={0.6}
                  style={{ marginLeft: 10 }}
                >
                  <Image
                    source={require("../../assets/icons_v1/icon_copy.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View
          style={{ alignItems: "flex-end", marginRight: 20, paddingTop: 10 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate(WalletStackRouteNames.Account)}
          >
            {/* <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={()=>{ console.log('List Account')}}> */}
            <Image
              source={require("../../assets/icons_v1/icon_drow.png")}
              style={{ width: 10, height: 10, marginRight: 4 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: theme.colors.primaryColor,
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              Vi TTT
            </Text>
            <Image
              source={require("../../assets/icons_v1/icon_eye.png")}
              style={{ width: 10, height: 10, marginLeft: 4 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 4 }}>
          <IconButtonList style={styles.actionButtons}>
            {!isWatchOnly ? (
              <IconButton
                onPress={
                  // handlePressSend
                  () => {
                    // const mnemonic = 'second vital tennis inch already all define device loyal crime rescue lawsuit liar alpha unaware wish bulb limb repair can poem eager below outdoor';
                    const mnemonic =
                      "shop stick wrong green trust edge play trial manual love force hen home also direct diet conduct dish brother liar way scan maze yard";
                    let mnemonicArray: string[] = mnemonic.split(" ");
                    const wallet = EthWallet.fromPhrase(mnemonic);
                    console.log(wallet.address);
                  }
                }
                iconName="ic-arrow-up-28"
                title={t("wallet.send_btn")}
              />
            ) : null}
            <IconButton
              onPress={handlePressRecevie}
              iconName="ic-arrow-down-28"
              title={t("wallet.receive_btn")}
            />
            {!isWatchOnly ? (
              <IconButton
                onPress={handlePressBuy}
                iconName="ic-usd-28"
                title={t("wallet.buy_btn")}
              />
            ) : null}
            {!flags.disable_swap && !isWatchOnly && (
              <IconButton
                onPress={handlePressSwap}
                iconName="ic-swap-horizontal-28"
                title={t("wallet.swap_btn")}
              />
            )}
          </IconButtonList>
        </View>
        <Title title={"Holdings"} />
        <View>
          <FlatList
            // style={{ marginVertical: 25 }}
            data={DATA}
            renderItem={({ item }) => (
              <ItemWallet
                title={item.title}
                price={item.price}
                profit={item.profit}
                // image={item.imageURL}
              />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListFooterComponent={<View style={{ height: 50 }} />}
            ListHeaderComponent={<View style={{ height: 25 }} />}
          />
        </View>
      </ScrollView>

      {isPagerView ? (
        <PagerView estimatedHeaderHeight={288}>
          <PagerView.Header>
            {/* {ListHeader} */}
            <PagerView.TabBar centered>
              <PagerView.TabBarItem
                label={t("wallet.tonkens_tab_lable")}
                index={0}
              />
              <PagerView.TabBarItem
                label={t("wallet.nft_tab_lable")}
                index={1}
              />
            </PagerView.TabBar>
          </PagerView.Header>
          <PagerView.Pages>
            <PagerView.Page index={0}>
              <WalletContentList
                inscriptions={inscriptions}
                currency={currency}
                balance={balance}
                tronBalances={tronBalances}
                tokens={tokens}
                tonPrice={tonPrice}
                handleRefresh={handleRefresh}
                isRefreshing={isRefreshing}
                isFocused={isFocused}
              />
            </PagerView.Page>
            <PagerView.Page index={1}>
              <PagerView.FlatList
                key={wallet.identifier}
                contentContainerStyle={styles.scrollContainer}
                numColumns={3}
                data={nfts}
                initialNumToRender={1}
                renderItem={({ item }) => (
                  <View style={nftCardSize}>
                    <NFTCardItem item={item} />
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    onRefresh={handleRefresh}
                    refreshing={isRefreshing && isFocused}
                    tintColor={theme.colors.foregroundPrimary}
                    progressBackgroundColor={theme.colors.foregroundPrimary}
                  />
                }
              />
            </PagerView.Page>
          </PagerView.Pages>
        </PagerView>
      ) : (
        // <WalletContentList
        //   inscriptions={inscriptions}
        //   currency={currency}
        //   tronBalances={tronBalances}
        //   handleRefresh={handleRefresh}
        //   isRefreshing={isRefreshing}
        //   isFocused={isFocused}
        //   balance={balance}
        //   tokens={tokens}
        //   tonPrice={tonPrice}
        //   nfts={nfts}
        // />
        <View></View>
      )}
    </Screen>
  );
});

const styles = Steezy.create(({ isTablet }) => ({
  container: {
    position: "relative",
  },
  mainSection: {
    paddingHorizontal: 16,
  },
  amount: {
    paddingTop: 28,
    alignItems: "center",
    marginBottom: 16,
  },
  actionButtons: {
    marginBottom: 24,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  createWalletContainerOuter: {
    padding: 16,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    [isTablet]: {
      alignItems: "center",
    },
  },
  createWalletContainerInner: {
    bottom: 0,
    [isTablet]: {
      width: TabletMaxWidth,
    },
  },
  balanceWithBattery: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
    title: "TD WALLET",
    price: "$6,766.45",
    profit: "+2.75%",
    // imageURL: require("../../../assets/logo/img_td.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f635",
    title: "TWT",
    price: "$6,766.45",
    profit: "+2.75%",
    // imageURL: require("../../../assets/logo/img_twt.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d726",
    title: "USDT",
    price: "$76,766.45",
    profit: "-0.34%",
    // imageURL: require("../../../assets/logo/img_td.png"),
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba7",
    title: "TD WALLET",
    price: "$6,766.45",
    profit: "+2.75%",
    // imageURL: require("../../../assets/logo/img_td.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63i",
    title: "TWT",
    price: "$6,766.45",
    profit: "+2.75%",
    // imageURL: require("../../../assets/logo/img_twt.png"),
  },
];
