import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { SymbolView } from "expo-symbols";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

export function Collapsible({
  title,
  children,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggle = () => {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut
      );
    }

    setIsOpen((value) => !value);
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={toggle} style={styles.heading}>
        <ThemedText type="default" style={styles.title}>
          {title}
        </ThemedText>

        <SymbolView
          size={18}
          tintColor={theme.text}
          name={{
            ios: isOpen ? "chevron.up" : "chevron.down",
            android: isOpen
              ? "keyboard_arrow_up"
              : "keyboard_arrow_down",
            web: "function",
          }}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },

  title: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 8,
  },
});