import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "../../theme/theme";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  color = colors.primaryContainer,
  trackColor = colors.surfaceContainerHigh,
  height = 12,
  style,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const progressAnim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: clamped,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(clamped);
    }
  }, [clamped, animated]);

  const widthInterpolation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: trackColor, height, borderRadius: height / 2 },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            width: widthInterpolation,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(190, 202, 185, 0.3)",
  },
  fill: {
    height: "100%",
  },
});
