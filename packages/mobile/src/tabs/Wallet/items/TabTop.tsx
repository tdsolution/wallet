import { Text } from "@tonkeeper/uikit";
import { colors } from "../../../constants/colors";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

interface TabTopProps {
  tabs: string[];
  initialTab: string;
  onTabChange: (tab: string) => void;
}

const TabTop: React.FC<TabTopProps> = ({ tabs, initialTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tabItem, activeTab === tab ? styles.activeTab : null]}
          onPress={() => handleTabChange(tab)}
        >
          {activeTab === tab
          ?
          <Text
            type= "label1"
            color="primaryColor"
            textAlign="center"
          >
            {tab}
          </Text>
          : 
          <Text
            type= "body2"
            color="textGray"
            textAlign="center"
          >
            {tab}
          </Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: '#e8e8e8',
    paddingVertical: 1,
  },
  tabItem: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: colors.White,
    borderBottomWidth: 1,
    borderBottomColor: colors.Primary,
  },
});

export default TabTop;
