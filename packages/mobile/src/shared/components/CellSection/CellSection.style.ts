import styled from "$styled";
import { hNs, nfs, ns } from "$utils";
import { Highlight } from "$uikit";

export const Section = styled.View`
  border-radius: ${({ theme }) => ns(theme.radius.normal)}px;
  margin-bottom: ${hNs(32)}px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.foregroundPrimary};
  boder-radius: ${hNs(15)}px;
  margin-top: ${hNs(10)}px;
`;

export const SectionItem = styled(Highlight)`
  position: relative;
`;

export const SectionItemInner = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${ns(16)}px;
  height: ${hNs(56)}px;
  boderradius: ${hNs(15)}px;
`;

export const SectionItemIndicator = styled.View`
  flex: 0 0 auto;
`;

export const SectionItemTitleWrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
