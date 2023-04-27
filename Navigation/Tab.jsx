import StyleTab from "./StyleTab";

import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import InternalShadow from "../commponents/BoxShadow/InternalShadow";
import ExternalShadow from "../commponents/BoxShadow/ExternalShadow";
import { HomePagesNavigator } from "./Navigation";
import images from "../assets/images";
import { trendyColor, height, width } from "../assets/styles/common";
import Discover from "../pages/Discover/Discover";
import Browser from "../pages/Browser/Browser";
import Setting from "../pages/Setting/Setting";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(230, 231, 238, 0.9)",
          height: height(10),
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ExternalShadow
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                padding={0}
              >
                <InternalShadow style={StyleTab.innnerShadow}>
                  <Image
                    source={images.iconHome}
                    style={StyleTab.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
            ) : (
              <ExternalShadow>
                <View style={StyleTab.wrap}>
                  <Image source={images.iconHome} style={StyleTab.image} />
                </View>
              </ExternalShadow>
            ),
        }}
        name="HomePages"
        component={HomePagesNavigator}
      />
      {/* Discover Pages */}
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <ExternalShadow
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                padding={0}>
                <InternalShadow style={StyleTab.innnerShadow}>
                  <Image
                    source={images.iconTransfer}
                    style={StyleTab.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
            ) : (
              <ExternalShadow>
                <View style={StyleTab.wrap}>
                  <Image source={images.iconTransfer} style={StyleTab.image} />
                </View>
              </ExternalShadow>
            ),
        }}
        name="DiscoverPages"
        component={Discover}
      />
      {/* Browser Page */}
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <ExternalShadow
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                padding={0}>
                <InternalShadow style={StyleTab.innnerShadow}>
                  <Image
                    source={images.iconWallet}
                    style={StyleTab.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
            ) : (
              <ExternalShadow>
                <View style={StyleTab.wrap}>
                  <Image source={images.iconWallet} style={StyleTab.image} />
                </View>
              </ExternalShadow>
            ),
        }}
        name="BrowserPages"
        component={Browser}
      />
      {/* Setting */}
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <ExternalShadow
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                padding={0}>
                <InternalShadow style={StyleTab.innnerShadow}>
                  <Image
                    source={images.iconSetting}
                    style={StyleTab.contentImage}
                  />
                </InternalShadow>
              </ExternalShadow>
            ) : (
              <ExternalShadow>
                <View style={StyleTab.wrap}>
                  <Image source={images.iconSetting} style={StyleTab.image} />
                </View>
              </ExternalShadow>
            ),
        }}
        name="SettingPages"
        component={Setting}
      />
    </Tab.Navigator>
  );
}
