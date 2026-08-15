import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "../../theme/theme";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  progress,
  color = colors.primaryContainer,
  trackColor = colors.surfaceContainerHigh,
  height = 12,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const percentage = `${Math.round(clamped * 100)}%` as const;

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: trackColor, height, borderRadius: height / 2 },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            width: percentage,
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
