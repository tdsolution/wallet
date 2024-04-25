import {
  TransitionOpacity,
  SegmentedControl,
  TonIcon,
  Modal,
} from "@tonkeeper/uikit";
import { ReceiveTokenContent } from "../components/ReceiveTokenContent";
import { memo, useCallback, useMemo, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { tk } from "@tonkeeper/mobile/src/wallet";
import { t } from "../i18n";
import { useEvm, useChain } from "@tonkeeper/shared/hooks";

enum Segments {
  Ton = 0,
  Tron = 1,
}

export const ReceiveModal = memo(() => {
  const [segmentIndex, setSegmentIndex] = useState(Segments.Ton);

  const tonAddress = tk.wallet.address.ton.friendly;
  const tronAddress = tk.wallet.address.tron?.proxy;
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  let evmAddress = evm.addressWallet;
  evmAddress = evmAddress.replace(/^"|"$/g, "");
  console.log("Ton Address: " + tonAddress);
  console.log("EVM Address: " + evm.addressWallet);
  const chainId = chain.chainId == "1100";
  const segments = useMemo(() => {
    const items = ["TON"];

    if (tronAddress) {
      items.push("TRC20");
    }

    return items;
  }, [tronAddress]);

  const address2url = useCallback((addr: string) => {
    if(chainId) {
      return "ton://transfer/" + addr;
    }else {
      return addr;
    }
  }, []);

  return (
    <Modal>
      <Modal.Header
        title={
          segments.length > 1 ? (
            <SegmentedControl
              onChange={(segment) => setSegmentIndex(segment)}
              index={segmentIndex}
              items={segments}
            />
          ) : undefined
        }
      />
      <Modal.Content>
        <TransitionOpacity
          isVisible={segmentIndex === Segments.Ton}
          entranceAnimation={false}
          style={styles.transition}
          duration={0}
          delay={0}
          alwaysShown
        >
          <ReceiveTokenContent
            qrCodeScale={0.8}
            logo={
              chainId ? (
                <TonIcon size="small" />
              ) : (
                <Image
                  style={{ width: 44, height: 44, resizeMode: "contain" }}
                  source={{ uri: chain.logo }}
                />
              )
            }
            qrAddress={address2url(chainId ? tonAddress : evmAddress)}
            address={chainId ? tonAddress : evmAddress}
            title={t("receiveModal.receive_title", {
              tokenName: chainId ? "Toncoin" : chain.name,
            })}
            description={
              chainId
                ? t("receiveModal.receive_description", {
                    tokenName: "Toncoin TON",
                    // chainId ? "Toncoin TON" : "Coin and Token",
                  })
                : `Send only Coin and Token in EVM network to this address, or you might lose your funds.`
            }
          />
        </TransitionOpacity>
      </Modal.Content>
    </Modal>
  );
});

const styles = StyleSheet.create({
  transition: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
