import { Icon, Separator } from "$uikit";
import React, { FC, memo, useCallback } from "react";
import * as S from "./WebSearchSuggestCell.style";
import { StyleSheet } from "react-native";

interface Props {
  url: string;
  name: string;
  separator: boolean;
  selected: boolean;
  onPress?: (url: string, name?: string) => void;
}

const WebSearchSuggestCellComponent: FC<Props> = (props) => {
  const { url, name, separator, selected, onPress } = props;

  const handlePress = useCallback(() => {
    onPress?.(url);
  }, [url, onPress]);

  return (
    <>
      <S.CellContainer
        selected={selected}
        style={{ backgroundColor: "#ffffff" }}
      >
        <S.Cell
          style={{ backgroundColor: "#ffffff" }}
          background={selected ? "backgroundQuaternary" : "primaryColor"}
          onPress={handlePress}
        >
          <S.Container style={styles.container}>
            <S.IconContainer>
              <Icon name="ic-magnifying-glass-16" color="backgroundSecondary" />
            </S.IconContainer>
            <S.Title style={styles.title}>{name}</S.Title>
          </S.Container>
        </S.Cell>
      </S.CellContainer>
      {separator ? <Separator leftOffset={44} /> : null}
    </>
  );
};

export const WebSearchSuggestCell = memo(WebSearchSuggestCellComponent);

const styles = StyleSheet.create({
  title: {
    color: "#2B2D42",
  },
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
});
