import React, { FC, memo } from "react";
import * as S from "./SectionLabel.style";

interface Props {
  children: string;
}

const SectionLabelComponent: FC<Props> = ({ children }) => {
  return <S.Label style={{ color: "#4871EA" }}>{children}</S.Label>;
};

export const SectionLabel = memo(SectionLabelComponent);
