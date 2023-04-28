import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyleSetting from "./StyleSetting";
import { height, width } from "../../assets/styles/common";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import InternalShadow from "../../commponents/BoxShadow/InternalShadow";
import images from "../../assets/images";

var fullWidth = Dimensions.get("window").width;

const Setting = ({ navigation }) => {
  // Out về trang chủ
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <SafeAreaView style={StyleSetting.container}>
        <Text style={StyleSetting.title}>Settings</Text>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: width(3),
            paddingTop: height(2),
            paddingBottom: height(5),
          }}
        >
          {/* ========= Button Wallets ====== */}
          <ExternalShadow>
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.wallet}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Wallets
              </Text>
            </Pressable>
          </ExternalShadow>
          {/* ======= Button List Setting ========= */}
          {/* Switch Chain */}
          <ExternalShadow style={{ marginTop: 15 }}>
            <Pressable style={[StyleSetting.button]}>
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.iconSetting}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Switch Chain
              </Text>
            </Pressable>
          </ExternalShadow>
          {/* Privacy - Announcement */}
          <ExternalShadow
            style={{
              marginVertical: 15,
            }}
          >
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.lock}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Privacy - Announcement
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ============= */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ======== */}
            {/* Notifications */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.alert}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Notifications
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ============= */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ======== */}
            {/* Interests */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.heart}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Interests
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ============= */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ======== */}
            {/* Languages */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.language}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Languages
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
          </ExternalShadow>
          {/* ======  Wallet Connect ======== */}
          <ExternalShadow
            style={{
              marginBottom: 15,
            }}
          >
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.walletconnect}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Wallet Connect
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
          </ExternalShadow>
          {/* ============= */}
          <View
            style={[
              StyleSetting.line,
              {
                opacity: 0.6,
                marginTop: 10,
                height: height(0.1),
              },
            ]}
          />
          <View
            style={[
              StyleSetting.line,
              {
                opacity: 0.4,
                marginBottom: 10,
                height: height(0.1),
              },
            ]}
          />
          {/* ======== */}
          {/* Text */}
          <Text
            style={[
              StyleSetting.textShadow,
              {
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 20,
                color: "#404358",
                opacity: 0.6,
                marginTop: 12,
                marginLeft: 15,
              },
            ]}
          >
            Join TrendyDefi community
          </Text>
          {/* ============== Danh sách tham gia cộng đồng ========== */}
          <ExternalShadow
            style={{
              marginTop: 15,
            }}
          >
            {/* Help Center */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.help}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Help Center
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ============== */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ================ */}
            {/* Twitter */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.twitter}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Twitter
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* =========== */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ============ */}
            {/* Telegram */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.telegram}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Telegram
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ================== */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* =============== */}
            {/* Facebook */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.facebook}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Facebook
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* =============== */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ================ */}
            {/* Reddit */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.reddit}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Reddit
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
            {/* ============== */}
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.6,
                  marginTop: 10,
                  height: height(0.1),
                },
              ]}
            />
            <View
              style={[
                StyleSetting.line,
                {
                  opacity: 0.4,
                  marginBottom: 10,
                  height: height(0.1),
                },
              ]}
            />
            {/* ============== */}
            {/* Youtube */}
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.youtube}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Youtube
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
          </ExternalShadow>
          {/*  ======= About Us =========== */}
          <ExternalShadow
            style={{
              marginVertical: 15,
            }}
          >
            <Pressable
              style={[
                StyleSetting.button,
                {
                  opacity: 0.5,
                },
              ]}
              disabled={true}
            >
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.aboutus}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                About Us
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
          </ExternalShadow>
          {/* ========== Log Out =========== */}
          <ExternalShadow>
            <Pressable style={StyleSetting.button} onPress={handleLogout}>
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0.1}
              >
                <InternalShadow style={StyleSetting.innnerShadow}>
                  <Image
                    source={images.logout}
                    style={StyleSetting.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
              <Text style={[StyleSetting.textButton, StyleSetting.textShadow]}>
                Log Out
              </Text>
              <Image
                source={images.iconRight}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </Pressable>
          </ExternalShadow>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Setting;
