import { isAndroid } from "$utils";
import { FlashList } from "@shopify/flash-list";
import { Steezy, View, ns } from "@tonkeeper/uikit";
import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface Emoji {
  emoji: string;
  name: string;
}

const emojis: Emoji[] = require("./emojis.json");

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = memo(({ onChange }) => {
  const renderEmoji = useCallback(
    ({ item }: { item: Emoji }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onChange(item.emoji)}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji.static}>{item.emoji}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [onChange]
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={emojis}
        numColumns={7}
        keyExtractor={(item) => item.name}
        renderItem={renderEmoji}
        contentContainerStyle={styles.flatListContent.static}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={ns(48)}
      />
      {/* <LinearGradient
        pointerEvents="none"
        colors={[
          "#4871EA", // Màu xanh lam
          "rgba(72, 113, 234, 0.8)", // Màu xanh lam với độ trong suốt thấp hơn
          "rgba(72, 113, 234, 0)", // Màu xanh lam với độ trong suốt tối
        ]}
        style={styles.topGradient.static}
      /> */}
      {/* <View style={styles.bottomCover} pointerEvents="none" /> */}
      {/* <LinearGradient
        pointerEvents="none"
        colors={[
          "#4871EA", // Màu xanh lam
          "rgba(72, 113, 234, 0.8)", // Màu xanh lam với độ trong suốt thấp hơn
          "rgba(72, 113, 234, 0)", // Màu xanh lam với độ trong suốt tối
        ]}
        style={styles.bottomGradient.static}
      /> */}
    </View>
  );
});

const styles = Steezy.create(({ colors }) => ({
  container: {
    flex: 1,
    position: "relative",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBlockColor: 'gray'
  },
  flatListContent: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: isAndroid ? 30 : 36,
    marginLeft: isAndroid ? -4 : 0,
  },
  topGradient: {
    height: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    height: 16,
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  bottomCover: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: "white",
  },
}));
