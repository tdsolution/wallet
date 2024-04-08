import React, { ReactNode } from "react";
import { Switch, StyleSheet, View } from "react-native";
import { Highlight } from "./Highlight/Highlight";
import { Text } from "./Text/Text";
import { colors } from "../constants/colors";

interface SwitchItemProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

export const SwitchItem: React.FC<SwitchItemProps> = (props) => {
  const { icon, title, onChange, value, disabled, subtitle } = props;

  const handleToggle = React.useCallback(
    () => onChange(!value),
    [onChange, value]
  );

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
        borderRadius: 15,
      }}
    >
      <Highlight
        onPress={handleToggle}
        style={styles.container}
        isDisabled={disabled}
      >
        <View style={styles.row}>
          {icon}
          <View style={[styles.titleContainer]}>
            <Text
              variant="label1"
              numberOfLines={1}
              color="foregroundPrimary"
              lineHeight={24}
              style={{ color: colors.Black }}
            >
              {title}
            </Text>
            {!!subtitle && (
              <Text color="foregroundSecondary" variant="body2" lineHeight={20}>
                {subtitle}
              </Text>
            )}
          </View>
          <Switch value={value} onChange={handleToggle} disabled={disabled} />
        </View>
      </Highlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
});
