import { useDeeplinking } from "$libs/deeplinking";
import React, { memo, useMemo } from "react";
import { Steezy } from "$styles";
import { Text, TouchableOpacity, isIOS } from "@tonkeeper/uikit";
import { Image, View } from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../constants/colors";

export const NotificationButton = memo((props: any) => {
  const { amount } = props;
  const navigation = useNavigation();
  const deeplinking = useDeeplinking();
  const hitSlop = useMemo(
    () => ({
      top: 26,
      bottom: 26,
      left: 3,
      right: 5,
    }),
    []
  );
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(WalletStackRouteNames.Notification)}
      style={[styles.container]}
      activeOpacity={0.6}
      hitSlop={hitSlop}
    >
      <View
        style={
          {
            //  flexDirection: "row",
            //  alignItems: "center",
          }
        }
      >
        <Image
          source={require("../assets/icons_v1/icon_notification.png")}
          style={{ width: 25, height: 25 }}
          resizeMode="contain"
        />
        {amount > 0 ? (
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 10,
              width: 10,
              height: 10,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Text type="label3" fontSize={8} lineHeight={8} style={{marginBottom: isIOS ? -1 : -2}}>
              {amount > 9 ? '9+' : amount}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
const styles = Steezy.create({
  container: {
    zIndex: 3,
    marginHorizontal: 5,
    padding: 5
  },
  badge: {},
  count: {},
});
