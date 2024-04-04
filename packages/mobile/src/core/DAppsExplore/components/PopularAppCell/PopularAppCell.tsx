import { openDAppBrowser } from "$navigation";
import { Icon } from "$uikit";
import { trackEvent } from "$utils/stats";
import React, { FC, memo, useCallback } from "react";
import * as S from "./popularAppCell.style";
import { ListSeparator, View } from "@tonkeeper/uikit";
import { Image, StyleSheet } from "react-native";

// const moreIconSource = require('./more.png');

interface Props {
  url: string;
  name: string;
  description?: string;
  icon?: string;
  isMore?: boolean;
  separator?: boolean;
}

const PopularAppCellComponent: FC<Props> = (props) => {
  const { url, name, description, icon, isMore, separator } = props;

  const handlePress = useCallback(() => {
    trackEvent("click_dapp", { url, name });

    openDAppBrowser(url);
  }, [name, url]);

  return (
    <>
      <S.CellContainer style={styles.container}>
        <S.Cell style={styles.box} onPress={handlePress}>
          <S.Container>
            <S.IconContainer
              isMore={isMore}
              style={{ backgroundColor: "white" }}
            >
              {icon ? <S.Icon source={{ uri: icon }} /> : null}
              {/* {isMore ? <S.Icon source={moreIconSource} /> : null} */}
            </S.IconContainer>
            <S.Content>
              <S.Title style={styles.title}>{name}</S.Title>
              <S.SubTitle style={styles.subTitle}>{description}</S.SubTitle>
            </S.Content>
            <S.ChervonContainer>
              {/* <Icon name="ic-chevron-right-16" /> */}
              <Image
                source={require("../../../../assets/icons/png/ic-chevron-right-12.png")}
              />
            </S.ChervonContainer>
          </S.Container>
        </S.Cell>
      </S.CellContainer>
      {separator ? <ListSeparator /> : null}
    </>
  );
};

export const PopularAppCell = memo(PopularAppCellComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 20,
  },
  box: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    overflow: "hidden",
  },
  title: {
    color: "#2B2D42",
  },
  subTitle: {
    color: "#909090",
  },
});
