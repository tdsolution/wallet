import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Screen, Spacer, Text, copyText } from "@tonkeeper/uikit";
import { useParams } from "@tonkeeper/router/src/imperative";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@tonkeeper/router";
import { t } from "@tonkeeper/shared/i18n";
import { useEvm, useWalletSetup } from "@tonkeeper/shared/hooks";
import { MainStackRouteNames } from "$navigation";
import { colors } from "../../constants/colors";
import { TextInput } from "react-native-gesture-handler";

function getRandIndexes(length: number, indexes: number[] = []) {
  if (indexes.length === length) {
    return indexes.sort((a, b) => a - b);
  }

  const randIndex = Math.floor(Math.random() * 23);
  if (!indexes.includes(randIndex)) {
    indexes.push(randIndex);
  }

  return getRandIndexes(length, indexes);
}

export const BackupPhraseScreen = memo(() => {
  const params = useParams<{ mnemonic: string; isBackupAgain?: boolean }>();
  const safeArea = useSafeAreaInsets();
  const nav = useNavigation();
  const mnemonic = params.mnemonic!;
  const phrase = useMemo(() => mnemonic.split(" "), [mnemonic]);
  const leftColumn = useMemo(() => phrase.slice(0, 12), [phrase]);
  const rightColumn = useMemo(() => phrase.slice(12, 24), [phrase]);
  const evm = useEvm()?.evm;
  let evmAddress = evm.privateKey;
  evmAddress = evmAddress.replace(/^"|"$/g, '');
  const str = evm.mnemonic;
  const [dataSecurity, setDataSecurity] = useState<string[]>();
    useEffect(() => {
    if (str) {
    const arrStringSecurity = str.split(" ");
    setDataSecurity(arrStringSecurity)
  }
  }, []);
  
  const [dataPhrase, setDataPhrase] = useState<string[]>(phrase);
  const [privateKey, setprivateKey] = useState<string>(evmAddress);
  const [isShowPrivateKey, setIsShowPrivateKey] = useState<boolean>(true);
  const [isShowSecurity, setIsShowSecurity] = useState<boolean>(false);
  const [isShowPhrase, setIsShowPhrase] = useState<boolean>(false);

  const handleShow = () => {
    setIsShowPrivateKey(!isShowPrivateKey);
  };

  

  const { lastBackupAt } = useWalletSetup();

  const getRandomWords = useCallback(() => {
    return getRandIndexes(3).map((index) => ({ word: phrase[index], index }));
  }, [phrase]);

  return (
    <Screen>
      <View style={{ backgroundColor: colors.White }}>
        <Screen.Header />
      </View>
      <Screen.ScrollView>
        <View style={styles.container}>
          <Text type="h2" textAlign="center" style={{ color: colors.Primary }}>
            {t("recovery_phrase.title")}
          </Text>
          <Spacer y={4} />
          <Text type="body1" color="textSecondary" textAlign="center">
            {t("recovery_phrase.caption")}
          </Text>
          <Spacer y={16} />

          {/* <View style={styles.centered}>
            <View style={styles.box}>
              <View style={styles.leftColumn}>
                {leftColumn.map((word, index) => (
                  <View style={styles.line} key={`${word}-${index}`}>
                    <Text
                      type="body2"
                      color="textSecondary"
                      style={[styles.num, {}]}
                    >
                      {index + 1}.
                    </Text>
                    <Text type="body1" style={{ color: colors.Black }}>
                      {word}
                    </Text>
                  </View>
                ))}
              </View>
              <View>
                {rightColumn.map((word, index) => (
                  <View style={styles.line} key={`${word}-${index + 1 + 12}`}>
                    <Text type="body2" color="textSecondary" style={styles.num}>
                      {index + 1 + 12}.
                    </Text>
                    <Text type="body1" style={{ color: colors.Black }}>
                      {word}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View> */}

          <View style={[styles.box, { marginBottom: 20 }]}>
            <FlatList
              contentContainerStyle={{ gap: 16 }}
              data={dataPhrase}
              numColumns={2}
              renderItem={({ item, index }) => (
                <View style={styles.row}>
                  <Text type="body1">{index + 1}. </Text>
                  <Text type="body1">{item}</Text>
                </View>
              )}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <View
              style={[styles.hide, { display: isShowPhrase ? "none" : "flex" }]}
            >
              <Image
                style={styles.image}
                source={require("../../assets/icons_v1/icon_eye_2.png")}
              />
              <TouchableOpacity onPress={() => setIsShowPhrase(true)}>
                <Text type="body1" color="primaryColor" style={{ marginLeft: 16}}>
                  Tap to see
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#dddddd",
            paddingVertical: 5,
          }}
        >
          <Text type="label1" color="textBlack" fontSize={18} style={{ marginLeft: 16}}>EVM Networks</Text>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          {str
          ?
          <View>
          <View style={[styles.right, { paddingVertical: 16 }]}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={copyText(str)}>
            <Text type="body1" color="primaryColor" style={{ marginLeft: 16}}>Copy</Text>
              <Image
                style={styles.iconCopy}
                source={require("../../assets/icons/png/ic-copy-16.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <FlatList
              contentContainerStyle={{ gap: 16 }}
              data={dataSecurity}
              numColumns={2}
              renderItem={({ item, index }) => (
                <View style={styles.row}>
                  <Text type="body1">{index + 1}. </Text>
                  <Text type="body1">{item}</Text>
                </View>
              )}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <View
              style={[
                styles.hide,
                { display: isShowSecurity ? "none" : "flex" },
              ]}
            >
              <Image
                style={styles.image}
                source={require("../../assets/icons_v1/icon_eye_2.png")}
              />
              <TouchableOpacity onPress={() => setIsShowSecurity(true)}>
                <Text type="body1" color="primaryColor" style={{ marginLeft: 16}}>
                  Tap to see
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
          :<></>
          }
          <View style={{ marginTop: 16 }}>
            <Text type="label1" color="textBlack" style={{marginBottom:10}}>*Your private key EVM</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.input}
                value={privateKey}
                onChangeText={(text) => setprivateKey(privateKey)}
                placeholder="Private key"
                placeholderTextColor={colors.Gray_Light}
                secureTextEntry={isShowPrivateKey}
              />
              <TouchableOpacity onPress={handleShow}>
                <Image
                  style={styles.iconCopy}
                  source={
                    isShowPrivateKey
                      ? require("../../assets/icons_v1/icon_eye_2.png")
                      : require("../../assets/icons_v1/icon_eye.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Screen.ButtonSpacer />
      </Screen.ScrollView>
      <Screen.ButtonContainer>
        {lastBackupAt !== null && !params.isBackupAgain ? (
          <Button
            title={t("recovery_phrase.copy_button")}
            onPress={copyText(mnemonic)}
            color="secondary"
          />
        ) : (
          <Button
            title={t("recovery_phrase.check_button")}
            onPress={() =>
              nav.navigate(MainStackRouteNames.BackupCheckPhrase, {
                words: getRandomWords(),
              })
            }
          />
        )}
      </Screen.ButtonContainer>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.White,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  columns: {
    flexDirection: "row",
    maxWidth: 310,
    paddingVertical: 16,
  },
  line: {
    width: 151,
    flexDirection: "row",
    marginBottom: 8,
    height: 24,
  },
  leftColumn: {
    paddingHorizontal: 16,
  },
  num: {
    width: 24,
    height: 23,
    marginRight: 4,
    position: "relative",
    top: 3,
  },
  iconCopy: {
    width: 24,
    height: 24,
    marginLeft: 8,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  box: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.Primary,
    backgroundColor: "#eeeeee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    height: 50,
    padding: 10,
    backgroundColor: colors.Primary,
    borderRadius: 5,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.Primary,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    fontSize: 16,
    color: colors.Black,
    fontWeight: "600",
    marginBottom: 4,
  },
  hide: {
    flex: 1,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    borderRadius: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
});
