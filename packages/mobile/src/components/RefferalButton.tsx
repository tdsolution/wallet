import { useDeeplinking } from "$libs/deeplinking";
import React, { memo, useMemo } from "react";
import { Steezy } from "$styles";
import { TouchableOpacity } from "@tonkeeper/uikit";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../constants/colors";

export const ReferralButton = memo((props: any) => {

  const { amount } = props;
  const navigation = useNavigation();
  const deeplinking = useDeeplinking();
  const hitSlop = useMemo(
    () => ({
      top: 26,
      bottom: 26,
      left: 5,
      right: 5,
    }),
    []
  );
  return (
    <TouchableOpacity

      onPress={() => navigation.navigate(WalletStackRouteNames.Referral)}
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
          source={require("../assets/icons/png/ic_referral.png")}
          style={{ width: 25, height: 25, tintColor: 'grey' }}
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
            <Text style={{ color: "white", fontSize: 8, fontWeight: "bold" }}>
              {amount}
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
    padding: 5
  },
  badge: {},
  count: {},
});
