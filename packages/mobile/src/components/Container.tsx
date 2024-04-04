import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { Children, ReactNode } from "react";
import { globalStyles } from "$styles/globalStyles";

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
}

const Container = (props: Props) => {
  const { title, back, right, children } = props;

  return (
    <SafeAreaView style={[globalStyles.container]}>{children}</SafeAreaView>
  );
};

export default Container;
