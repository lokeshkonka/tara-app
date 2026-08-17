import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { TopicExplanation } from "../../../types/learn";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TopicExplanationAccordionProps {
  explanation?: TopicExplanation;
  defaultTitle?: string;
  initiallyExpanded?: boolean;
}

export const TopicExplanationAccordion: React.FC<TopicExplanationAccordionProps> = ({
  explanation,
  defaultTitle = "What is Soil?",
  initiallyExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initiallyExpanded);
  const rotateAnim = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current;

  if (!explanation && !defaultTitle) return null;

  const title = explanation?.title || defaultTitle;
  const description =
    explanation?.description ||
    "Soil is a living, dynamic ecosystem beneath our feet. Far from inert dirt, it acts as a reservoir of moisture, a biological nursery for beneficial microbes, and the primary nutritional foundation for all plant life.";

  const bullets = explanation?.bulletPoints || [
    {
      title: "Living Habitat",
      text: "Millions of microorganisms, fungi, and earthworms recycle nutrients and build porous soil structures.",
      icon: "bug-report",
    },
    {
      title: "Water & Air Reservoir",
      text: "Pore spaces within the soil store vital moisture and oxygen directly accessible by plant root systems.",
      icon: "water-drop",
    },
    {
      title: "Nutrient Cycling",
      text: "Decomposed organic matter constantly releases essential minerals like nitrogen, phosphorus, and potassium.",
      icon: "eco",
    },
  ];

  const handleToggle = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    setIsExpanded((prev) => {
      const next = !prev;
      Animated.timing(rotateAnim, {
        toValue: next ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      return next;
    });
  };

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.cardContainer}>
      {/* Accordion Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        style={styles.headerRow}
        accessibilityRole="button"
        accessibilityLabel={`${title}, tap to ${isExpanded ? "collapse" : "expand"}`}
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.onSurfaceVariant} />
        </Animated.View>
      </TouchableOpacity>

      {/* Expandable In-Depth Body */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Divider */}
          <View style={styles.divider} />

          {/* Description Paragraph */}
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Bullet Points Section */}
          {bullets.length > 0 && (
            <View style={styles.bulletsList}>
              <Text style={styles.bulletsSectionTitle}>Key Takeaways:</Text>
              {bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <View style={styles.bulletIconBadge}>
                    <MaterialIcons
                      name={(bullet.icon as any) || "check-circle"}
                      size={16}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.bulletTextGroup}>
                    {bullet.title && (
                      <Text style={styles.bulletTitle}>{bullet.title}</Text>
                    )}
                    <Text style={styles.bulletBody}>{bullet.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    overflow: "hidden",
    marginTop: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.gutter,
    paddingVertical: 14,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "800",
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  expandedContent: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.gutter,
    gap: spacing.stackSm,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(190, 202, 185, 0.4)",
    marginBottom: 6,
  },
  descriptionText: {
    ...typography.bodyMd,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
  bulletsList: {
    marginTop: 6,
    gap: 10,
  },
  bulletsSectionTitle: {
    ...typography.labelSm,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: "rgba(190, 202, 185, 0.35)",
  },
  bulletIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  bulletTextGroup: {
    flex: 1,
    gap: 2,
  },
  bulletTitle: {
    ...typography.labelSm,
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.onSurface,
  },
  bulletBody: {
    ...typography.bodyMd,
    fontSize: 13,
    lineHeight: 18,
    color: colors.onSurfaceVariant,
  },
});
