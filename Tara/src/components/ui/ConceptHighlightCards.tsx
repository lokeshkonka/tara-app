import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, rounded, spacing, typography } from "../../theme/theme";

export interface ConceptCardItem {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  iconBgColor?: string;
  iconColor?: string;
}

interface ConceptHighlightCardsProps {
  cards: ConceptCardItem[];
  style?: StyleProp<ViewStyle>;
}

function SingleConceptCard({ item, index }: { item: ConceptCardItem; index: number }) {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [translateYAnim] = useState(() => new Animated.Value(12));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      delay: index * 150 + 200,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateYAnim, {
      toValue: 0,
      delay: index * 150 + 200,
      useNativeDriver: true,
      bounciness: 5,
      speed: 12,
    }).start();
  }, [fadeAnim, translateYAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const iconBg = item.iconBgColor || "rgba(76, 175, 80, 0.15)";
  const iconColor = item.iconColor || colors.primaryContainer;

  return (
    <Animated.View style={[{ flex: 1, opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateY: translateYAnim }] }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
        accessibilityRole="button"
        accessibilityLabel={item.title}
      >
        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
          <MaterialIcons name={item.icon} size={24} color={iconColor} />
        </View>
        <Text style={styles.cardLabel}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.cardSubtitle}>{item.subtitle}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

export function ConceptHighlightCards({ cards, style }: ConceptHighlightCardsProps) {
  return (
    <View style={[styles.cardsGrid, style]}>
      {cards.map((card, idx) => (
        <SingleConceptCard key={idx} item={card} index={idx} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsGrid: {
    flexDirection: "row",
    gap: spacing.gutter,
    width: "100%",
    maxWidth: 360,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.xl,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardLabel: {
    ...typography.labelLg,
    color: colors.onSurface,
    textAlign: "center",
    fontWeight: "700",
  },
  cardSubtitle: {
    ...typography.bodyMd,
    fontSize: 11.5,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 2,
  },
});
