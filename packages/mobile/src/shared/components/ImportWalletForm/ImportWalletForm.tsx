import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { deviceHeight, isAndroid, ns, parseLockupConfig } from "$utils";
import { InputItem } from "./InputItem";
import {
  Button,
  Input,
  NavBarHelper,
  Text,
  TouchableOpacity,
  View,
} from "$uikit";
import * as S from "./ImportWalletForm.style";
import { useReanimatedKeyboardHeight } from "$hooks/useKeyboardHeight";
import { ImportWalletFormProps } from "./ImportWalletForm.interface";
import { useInputsRegistry } from "./useInputRegistry";
import { WordHintsPopup, WordHintsPopupRef } from "./WordHintsPopup";
import { Alert, Keyboard, ScrollView } from "react-native";
import { wordlist } from "$libs/Ton/mnemonic/wordlist";
import { Toast } from "$store";
import { t } from "@tonkeeper/shared/i18n";
import {
  addWalletFromMnemonic,
  createWalletFromMnemonic,
  generateMnemonic,
} from "$libs/EVM/createWallet";
import { CreateWalletStackRouteNames } from "$navigation/CreateWalletStack/types";
import { ImportWalletStackRouteNames } from "$navigation/ImportWalletStack/types";
import { MainStackRouteNames } from "$navigation";

import { useNavigation } from "@tonkeeper/router";
import { Wallet as WalletETH } from "ethers";
import { walletActions } from "$store/wallet";

export const ImportWalletForm: FC<ImportWalletFormProps> = (props) => {
  const [isWord24, setIsWord24] = useState<boolean>(true);
  const { onWordsFilled, onWordsFilled12 } = props;
  const { bottom: bottomInset } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const inputsRegistry = useInputsRegistry();
  const [inputs, setInputs] = useState(Array(24).fill(0));
  const [inputs12, setInputs12] = useState(Array(12).fill(0));
  const scrollRef = useRef<Animated.ScrollView>(null);
  const wordHintsRef = useRef<WordHintsPopupRef>(null);
  const scrollY = useSharedValue(0);
  const nav = useNavigation();

  const [isConfigInputShown, setConfigInputShown] = useState(false);
  const [config, setConfig] = useState("");
  const [isRestoring, setRestoring] = useState(false);
  let Seed = [{ id: 1, hide: false, text: "" }];
  const [selectedIndex, setIndex] = useState(0);
  const [listSeed, setListSeed] = useState(Seed);
  const [titleNoti, setTileNoti] = useState("");
  const [descriptionNoti, setDescriptionNoti] = useState("");
  const [modalNotification, setModalNotification] = useState(false);
  const [status, setStatus] = useState(0);

  const deferredScrollToInput = useRef<((offset: number) => void) | null>(null);
  const { keyboardHeight } = useReanimatedKeyboardHeight({
    enableOnAndroid: true,
    animated: true,
    onWillShow: ({ height }) => {
      if (deferredScrollToInput.current) {
        deferredScrollToInput.current(height);
        deferredScrollToInput.current = null;
      }
    },
  });

  const handleCreateTonPress = useCallback(async () => {
    dispatch(walletActions.generateVault());
    nav.navigate(ImportWalletStackRouteNames.CreatePasscode);
    setRestoring(false);
  }, [dispatch, nav]);
  const handle12Word = useCallback(() => {
    // Alert.alert(
    //   "Warning",
    //   "Selecting 12 words is not supported on the TON network.",
    //   [
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         setIsWord24(false);
    //         setInputs(inputs.slice(0, 12));
    //       },
    //     }, // Hoặc thực hiện hành động mong muốn
    //   ],
    //   { cancelable: false }

    // );
    setIsWord24(false);
    setInputs(inputs.slice(0, 12));
  }, [inputs]);
  const handle24Word = useCallback(() => {
    setIsWord24(true);
    if (inputs.length === 12) {
      const newInputs = [...inputs];
      for (let i = 12; i < 24; i++) {
        newInputs.push(0); // Hoặc bạn có thể thay thế giá trị 0 bằng giá trị mong muốn
      }
      setInputs(newInputs);
    } // Hoặc thực hiện hành động mong muốn
  }, [inputs]);
  const handleShowConfigInput = useCallback(() => {
    setConfigInputShown(true);
  }, []);

  const handleConfigChange = useCallback((text) => {
    setConfig(text);
  }, []);

  const handleMultipleWords = useCallback(
    (index: number, text: string) => {
      if (!isWord24) {
        const words = text
          .split(" ")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);
        let cursor = index;
        for (const word of words) {
          inputsRegistry.getRef(cursor)?.setValue(word);
          cursor += 1;
          if (cursor === 12) {
            break;
          }
        }
      } else {
        const words = text
          .split(" ")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);

        let cursor = index;
        for (const word of words) {
          inputsRegistry.getRef(cursor)?.setValue(word);
          cursor += 1;
          if (cursor === 24) {
            break;
          }
        }

        if (cursor > 0) {
          inputsRegistry.getRef(cursor - 1)?.focus();
        }
      }
    },
    [isWord24]
  );

  const handleSpace = useCallback((index: number) => {
    if (!isWord24) {
      if (index === 12) {
        return;
      }
      inputsRegistry.getRef(index + 1)?.focus();
    } else {
      if (index === 24) {
        return;
      }
      inputsRegistry.getRef(index + 1)?.focus();
    }
  }, []);

  const handleSend = useCallback(() => {
    if (isRestoring) {
      return;
    }
    setRestoring(true);
    const values: string[] = [];
    const totalInputs = isWord24 ? 24 : 12;
    for (let key in inputsRegistry.refs) {
      values.push(inputsRegistry.refs[key]?.getValue() ?? "");
    }
    const words = values.slice(0, totalInputs); // Chỉ lấy số lượng từ cần thiết
    console.log("Work: ", words);
    let hasFailed = false;
    for (let i = 0; i < totalInputs; i++) {
      const isFailed = !words[i].length || !wordlist.enMap.has(words[i]);
      if (isFailed) {
        console.log(hasFailed);
        hasFailed = true;
        const ref = inputsRegistry.getRef(i);
        ref?.markAsFailed();
        ref?.focus();
        break;
      }
    }

    if (hasFailed) {
      Toast.fail(t("import_wallet_wrong_words_err"));
      setRestoring(false);
      return;
    }

    Keyboard.dismiss();

    let configParsed: any = null;
    if (isConfigInputShown && config) {
      try {
        configParsed = parseLockupConfig(config);
      } catch (e) {
        Toast.fail(`Lockup: ${(e as Error).message}`);
        setRestoring(false);
        return;
      }
    }
    onWordsFilled(Object.values(words).join(" "), configParsed, () =>
      setRestoring(false)
    );
  }, [isRestoring, isConfigInputShown, config, onWordsFilled, dispatch, t]);

  const handleSend12 = useCallback(async () => {
    setRestoring(true);
    try {
      const valueMnemonic = () => {
        const values: string[] = [];
        for (let key in inputsRegistry.refs) {
          values.push(inputsRegistry.refs[key]?.getValue() ?? "");
          console.log("alaoalaoao: ");
        }
        const words = values.slice(0, 12); // Chỉ lấy số lượng từ cần thiết
        // const mnemonic = 'lunch panther exile clerk noodle keen debate silk explain outside subway scissors';
        const mnemonic = words.join(" ");
        return mnemonic;
      };

      // const wallet = WalletETH.fromPhrase(valueMnemonic());
      // console.log("Add wallet: ", wallet);
      // if (wallet) {
      //   console.log("Import wallet successfully");
      //   handleCreatePress();

      // } else {
      //   Toast.fail("Mnemonic phrase is incorrect");
      //   setRestoring(false);
      // }
      const a = await addWalletFromMnemonic(valueMnemonic());
      if (a) {
        if (a == 1) {
          console.log("Import wallet successfully");
          handleCreateTonPress();
        } else {
          console.log("Wallet already exists!");
          setRestoring(false);
        }
      } else {
        console.log("Seed phrase is wrong!");
        setRestoring(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      Toast.fail("Mnemonic phrase is incorrect");
      setRestoring(false);
    }
  }, []);

  const handleInputSubmit = useCallback(
    (index: number) => () => {
      if (!isWord24) {
        const suggests = wordHintsRef.current?.getCurrentSuggests();
        if (suggests?.length === 1) {
          inputsRegistry.getRef(index)?.setValue(suggests[0]);
        }
        if (index < 11) {
          inputsRegistry.getRef(index + 1)?.focus();
        } else {
          handleSend();
        }
      } else {
        const suggests = wordHintsRef.current?.getCurrentSuggests();
        if (suggests?.length === 1) {
          inputsRegistry.getRef(index)?.setValue(suggests[0]);
        }
        if (index < 23) {
          inputsRegistry.getRef(index + 1)?.focus();
        } else {
          handleSend();
        }
      }
    },
    [handleSend]
  );

  const scrollToInput = useCallback(
    (index: number, offsetBottom: number = 0) => {
      const inputPos = inputsRegistry.getPosition(index);
      if (inputPos !== undefined) {
        scrollRef.current?.scrollTo({
          y: inputPos - (deviceHeight - offsetBottom) / 2 + ns(10),
          animated: true,
        });
      }
    },
    []
  );

  const handleFocus = useCallback(
    (index: number) => () => {
      if (keyboardHeight.value < 1) {
        deferredScrollToInput.current = (offsetBottom: number) => {
          scrollToInput(index, offsetBottom);
        };
      } else {
        scrollToInput(index, keyboardHeight.value);
      }
    },
    [scrollToInput]
  );

  const handleBlur = useCallback(() => {
    wordHintsRef.current?.clear();
  }, []);

  const inputIndentLeft = ns(56);
  const setContentWidthInput = React.useCallback((index: number) => {
    return inputsRegistry.setContentWidth(index, (width) => {
      if (!isAndroid) {
        wordHintsRef.current?.setOffsetLeft(index, inputIndentLeft + width);
      }
    });
  }, []);

  const handleChangeText = useCallback(
    (index: number) => (text: string) => {
      const overlap = 10;
      const offsetTop =
        inputsRegistry.getPosition(index) + S.INPUT_HEIGHT - overlap;
      const contentWidth = isAndroid
        ? 0
        : inputsRegistry.getContentWidth(index);
      const offsetLeft = inputIndentLeft + contentWidth;

      wordHintsRef.current?.search({
        input: index,
        query: text,
        offsetTop,
        offsetLeft,
        onItemPress: (value) => {
          inputsRegistry.getRef(index)?.setValue(value);
          inputsRegistry.getRef(index + 1)?.focus();
        },
      });
    },
    []
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (ev) => {
      scrollY.value = ev.contentOffset.y;
    },
  });

  return (
    <>
      <WordHintsPopup
        scrollY={scrollY}
        indexedWords={wordlist.enIndexed}
        ref={wordHintsRef}
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: ns(35),
          paddingBottom: ns(35) + bottomInset,
        }}
      >
        <NavBarHelper />
        <S.Header>
          <TapGestureHandler
            numberOfTaps={5}
            onActivated={handleShowConfigInput}
          >
            <S.HeaderTitle>{t("import_wallet_title")}</S.HeaderTitle>
          </TapGestureHandler>
          <S.HeaderCaptionWrapper>
            <Text
              color="foregroundSecondary"
              variant="body1"
              textAlign="center"
            >
              {t("import_wallet_caption")}
            </Text>
          </S.HeaderCaptionWrapper>
          <S.HeaderButton>
            <Text
              style={{ color: "#4871EA", marginBottom: 4 }}
              variant="body1"
              textAlign="center"
            >
              Choose the security with
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handle24Word}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      backgroundColor: "#f9f9f9",
                      marginRight: 10,
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: "#4871EA",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginHorizontal: 10,
                        width: 15,
                        height: 15,
                        backgroundColor: isWord24 ? "#4871EA" : "#f9f9f9",
                        marginRight: 10,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: isWord24 ? "#4871EA" : "#f9f9f9",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{ color: "#4871EA" }}
                  variant="body1"
                  textAlign="center"
                >
                  24-words
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handle12Word}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      backgroundColor: "#f9f9f9",
                      marginRight: 10,
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: "#4871EA",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginHorizontal: 10,
                        width: 15,
                        height: 15,
                        backgroundColor: isWord24 ? "#f9f9f9" : "#4871EA",
                        marginRight: 10,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: isWord24 ? "#f9f9f9" : "#4871EA",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{ color: "#4871EA" }}
                  variant="body1"
                  textAlign="center"
                >
                  12-words
                </Text>
              </View>
            </View>
          </S.HeaderButton>
        </S.Header>
        {isConfigInputShown && (
          <Input
            placeholder="Put config here"
            multiline
            value={config}
            onChangeText={handleConfigChange}
          />
        )}
        {inputs.map((_, index) => (
          <InputItem
            key={`input-${index}`}
            index={index}
            onSubmitEditing={handleInputSubmit(index)}
            onFocus={handleFocus(index)}
            onBlur={handleBlur}
            ref={inputsRegistry.setRef(index)}
            onContentSizeChange={setContentWidthInput(index)}
            onLayout={inputsRegistry.setPosition(index)}
            onChangeText={handleChangeText(index)}
            onMultipleWords={handleMultipleWords}
            onSpace={handleSpace}
          />
        ))}
        <S.ButtonWrap>
          <Button
            onPress={isWord24 ? handleSend : handleSend12}
            isLoading={isRestoring}
            style={{ backgroundColor: "#4871EA" }}
          >
            {t("continue")}
          </Button>
        </S.ButtonWrap>
      </ScrollView>
    </>
  );
};
