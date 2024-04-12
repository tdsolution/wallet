import { colors } from "../../../constants/colors";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.tabText : styles.text,
            ]}
          >
            {tab}
          </Text>
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
    backgroundColor: colors.White,
    paddingVertical: 10,
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
  tabText: {
    color: colors.Primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  text: {
    color: colors.Gray,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TabTop;
