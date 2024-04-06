import React, { FC, useCallback, useMemo } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Animated from "react-native-reanimated";
import { Icon, NavBar, ScrollHandler, Text } from "$uikit";
import { ns } from "$utils";
import { CellSection, CellSectionItem } from "$shared/components";
import * as S from "./LegalDocuments.style";
import { openDAppBrowser, openFontLicense } from "$navigation";
import { t } from "@tonkeeper/shared/i18n";
import { colors } from "../../constants/colors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export const LegalDocuments: FC = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const handleTerms = useCallback(() => {
    openDAppBrowser("https://tonkeeper.com/terms");
  }, []);

  const handlePrivacy = useCallback(() => {
    openDAppBrowser("https://tonkeeper.com/privacy");
  }, []);

  const handleFontLicense = useCallback(() => {
    openFontLicense();
  }, []);

  const ChevronIcon = useMemo(
    () => <Icon name="ic-chevron-16" color="foregroundSecondary" />,
    []
  );

  return (
    <S.Wrap>
      <NavBar>{t("legal_header_title")}</NavBar>
      <ScrollHandler>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: ns(16),
            paddingBottom: tabBarHeight,
          }}
          scrollEventThrottle={16}
        >
          {/* <CellSection>
            <CellSectionItem indicator={ChevronIcon} onPress={handleTerms}>
              {t("legal_terms")}
            </CellSectionItem>
            <CellSectionItem indicator={ChevronIcon} onPress={handlePrivacy}>
              {t("legal_privacy")}
            </CellSectionItem>
          </CellSection> */}
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.button} onPress={handleTerms}>
              <Text style={styles.textButton}>Terms of service</Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/png/ic-chevron-right-16.png")}
              />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: colors.Gray,
                marginLeft: 15,
              }}
            ></View>
            <TouchableOpacity style={styles.button} onPress={handlePrivacy}>
              <Text style={styles.textButton}>Privacy policy</Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/png/ic-chevron-right-16.png")}
              />
            </TouchableOpacity>
          </View>

          <S.LicensesTitleWrapper>
            <Text style={{ color: colors.Primary }} variant="h3">
              {t("legal_licenses_title")}
            </Text>
          </S.LicensesTitleWrapper>
          {/* <CellSection>
            <CellSectionItem
              indicator={ChevronIcon}
              onPress={handleFontLicense}
            >
              {t("legal_font_license")}
            </CellSectionItem>
          </CellSection> */}
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.button} onPress={handleFontLicense}>
              <Text style={styles.textButton}>Montserrat font</Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/png/ic-chevron-right-16.png")}
              />
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </ScrollHandler>
    </S.Wrap>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Poppins-Medium",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: colors.Black,
    resizeMode: "contain",
  },
  listItem: {
    borderRadius: 15,
    backgroundColor: colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    overflow: "hidden",
    marginVertical: 16,
  },
});
