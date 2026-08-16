import React, { useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { colors, rounded } from "../../theme/theme";

const PILL_FACE_HEIGHT = 46;
const PILL_DEPTH = 5;

interface TabButtonProps {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  focused: boolean;
  onPress: () => void;
}

function TabButton({ label, icon, focused, onPress }: TabButtonProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // ignore on unsupported platforms
      }
    }
    // Fast, crisp press-down with no bounce
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 320,
      friction: 30,
    }).start();
  };

  const handlePressOut = () => {
    // Bouncy spring back with a slight overshoot for a lively feel
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 150,
      friction: 9,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
    }).start();
  };

  // Active tab: squish down onto its 3D base. Inactive tab: gentle press-push.
  const translateY = focused
    ? pressAnim.interpolate({ inputRange: [0, 1], outputRange: [0, PILL_DEPTH] })
    : pressAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 2.5] });
  const scale = focused
    ? pressAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.98] })
    : pressAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.94] });

  const foreground = focused ? colors.white : "#72776F";

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
    >
      <View style={styles.pill}>
        {/* 3D extruded base layer - only on the active green pill */}
        {focused ? <View style={[styles.pillDepth, { backgroundColor: "#186A25" }]} /> : null}
        {/* Face layer that squishes down on press */}
        <Animated.View
          style={[
            styles.pillFace,
            focused && { backgroundColor: colors.primaryContainer },
            focused && styles.pillFaceActiveShadow,
            { transform: [{ translateY }, { scale }] },
          ]}
        >
          <MaterialIcons name={icon} size={26} color={foreground} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

// A custom Tab Bar component to match the specific UI requested
function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={60}
      tint="light"
      style={[
        styles.tabBarContainer,
        { paddingBottom: Math.max(insets.bottom, 2) }
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const getIconName = (routeName: string): keyof typeof MaterialIcons.glyphMap => {
          switch (routeName) {
            case "index":
              return "home";
            case "learn":
              return "school";
            case "practice":
              return "agriculture";
            case "community":
              return "people";
            case "profile":
              return "person";
            default:
              return "circle";
          }
        };

        return (
          <TabButton
            key={route.key}
            label={label}
            icon={getIconName(route.name)}
            focused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </BlurView>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learnings" }} />
      <Tabs.Screen name="practice" options={{ title: "Practice" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(247, 250, 245, 0.78)",
    paddingTop: 4,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(24, 28, 26, 0.06)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    position: "relative",
    height: PILL_FACE_HEIGHT + PILL_DEPTH,
    minWidth: 58,
    justifyContent: "flex-end",
  },
  pillDepth: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: PILL_FACE_HEIGHT,
    borderRadius: rounded.full,
  },
  pillFace: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: PILL_FACE_HEIGHT,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  pillFaceActiveShadow: {
    shadowColor: "#0A4A15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
