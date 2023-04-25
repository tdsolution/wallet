import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import ButtonToBack from "../../commponents/ButtonToBack/ButtonToBack";
import styleBackup from "./stylesBackup";
import images from "../../assets/images";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LoadingScreen, {
  loaderRef,
  showLoader,
  hideLoader,
} from '../../commponents/LoadingPages';

const Backup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

  const handleCreate = () => {
    showLoader();
    setTimeout(() => {
      navigation.navigate('Restore');
      hideLoader();
    }, 1000);
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#e6e7ee",
        }}
      >
        <View style={styleBackup.container}>
          {/* Button To Back */}
          {/* ============== */}
          <ButtonToBack navigation={navigation} />
          {/* Text, Images, Check */}
          {/* =================== */}
          <View style={styleBackup.content}>
            {/* Text */}
            <Text style={styleBackup.title}>Backup your wallet right now</Text>
            <Text style={[styleBackup.body, styleBackup.textShadow]}>
              In the next step, you will see 12 words allowing you to recover
              your wallet.
            </Text>
            {/* Image */}
            <Image
              style={[
                styleBackup.image,
                {
                  marginVertical: 40,
                },
              ]}
              source={images.createWalletPage}
            />
            {/* Button Check */}
            <View style={styleBackup.checkboxContainer}>
              <ExternalShadow>
                <BouncyCheckbox
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  iconStyle={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    resizeMode: "cover",
                    alignItems: "center",
                  }}
                  innerIconStyle={{
                    borderRadius: 0,
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  checkIconImageSource={images.iconCheck}
                  fillColor="#e6e7ee"
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </ExternalShadow>
              {/* Text */}
              <Text
                style={[
                  styleBackup.body,
                  styleBackup.textShadow,
                  {
                    flex: 1,
                    textAlign: "left",
                  },
                ]}
              >
                I understand that if I lose the recovery phrases, I won't be
                able to access my wallet.
              </Text>
            </View>
          </View>
        </View>
        {/* Button Next */}
        {/* ============ */}
        <View style={styleBackup.footer}>
          <ExternalShadow>
            <Pressable
            disabled={checked ? false : true}
            style={{
              opacity: checked ? 1 : 0.5,
            }}
            onPress={handleCreate}
            >
              <Text style={styleBackup.button}>Next</Text>
            </Pressable>
          </ExternalShadow>
        </View>
        {/*  Loading Page */}
        {/* =============== */}
      <LoadingScreen ref={loaderRef} />
      </SafeAreaView>
    </>
  );
};

export default Backup;
