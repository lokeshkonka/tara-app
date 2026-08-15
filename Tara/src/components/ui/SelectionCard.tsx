import { useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, rounded, typography } from "../../theme/theme";

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  selected: boolean;
  onPress: () => void;
  badge?: string;
  style?: StyleProp<ViewStyle>;
}

export function SelectionCard({
  title,
  subtitle,
  icon,
  selected,
  onPress,
  badge,
  style,
}: SelectionCardProps) {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          selected ? styles.containerSelected : styles.containerUnselected,
        ]}
      >
        {icon && (
          <View
            style={[
              styles.iconWrapper,
              selected ? styles.iconWrapperSelected : styles.iconWrapperUnselected,
            ]}
          >
            <MaterialIcons
              name={icon}
              size={24}
              color={selected ? colors.primaryContainer : colors.primary}
            />
          </View>
        )}
        <View style={styles.textStack}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                selected && { color: colors.primary },
              ]}
            >
              {title}
            </Text>
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View
          style={[
            styles.checkCircle,
            selected ? styles.checkCircleSelected : styles.checkCircleUnselected,
          ]}
        >
          {selected && (
            <MaterialIcons name="check" size={16} color={colors.white} />
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: rounded.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  containerUnselected: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  containerSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: rounded.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconWrapperUnselected: {
    backgroundColor: colors.surfaceContainerLow,
  },
  iconWrapperSelected: {
    backgroundColor: "rgba(76, 175, 80, 0.15)",
  },
  textStack: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.labelLg,
    fontSize: 16,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.tertiaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  badgeText: {
    ...typography.labelSm,
    color: colors.onTertiaryFixed,
    fontWeight: "700",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  checkCircleUnselected: {
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  checkCircleSelected: {
    backgroundColor: colors.primaryContainer,
    borderWidth: 0,
  },
});
