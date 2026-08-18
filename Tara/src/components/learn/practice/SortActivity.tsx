import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

export interface SortCategory {
  id: string;
  title: string;
  icon?: string;
  color?: string;
}

export interface SortItem {
  id: string;
  text: string;
  targetCategoryId: string;
}

export interface SortActivityProps {
  title?: string;
  instructions?: string;
  categories: SortCategory[];
  items: SortItem[];
  onComplete: () => void;
}

export const SortActivity: React.FC<SortActivityProps> = ({
  title = "Categorize Items",
  instructions = "Select the correct category for the card shown below.",
  categories,
  items,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mismatchCategoryId, setMismatchCategoryId] = useState<string | null>(null);
  const [isSuccessFeedback, setIsSuccessFeedback] = useState<boolean>(false);

  const currentItem = items[currentIndex];
  const isFinished = currentIndex >= items.length;

  const handleCategoryPress = (categoryId: string) => {
    if (!currentItem || isSuccessFeedback) return;

    if (categoryId === currentItem.targetCategoryId) {
      // Correct Sort!
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}

      setIsSuccessFeedback(true);
      setMismatchCategoryId(null);

      setTimeout(() => {
        setIsSuccessFeedback(false);
        if (currentIndex < items.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
      }, 500);
    } else {
      // Incorrect Sort
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch {}

      setMismatchCategoryId(categoryId);
      setTimeout(() => {
        setMismatchCategoryId(null);
      }, 600);
    }
  };

  return (
    <View style={styles.container}>
      {/* Activity Header */}
      <View style={styles.headerGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Progress: {Math.min(currentIndex + 1, items.length)} / {items.length}
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${
                    ((Math.min(currentIndex, items.length)) / items.length) * 100
                  }%`,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Active Item Card to Sort */}
      {!isFinished && currentItem && (
        <View
          style={[
            styles.activeCardContainer,
            isSuccessFeedback && styles.activeCardSuccess,
          ]}
        >
          <View style={styles.cardHeaderTag}>
            <MaterialIcons name="touch-app" size={16} color={colors.primary} />
            <Text style={styles.cardHeaderTagText}>Sort this item</Text>
          </View>
          <Text style={styles.activeCardText}>{currentItem.text}</Text>
        </View>
      )}

      {/* Categories Drop Buckets */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => {
          const isMismatch = mismatchCategoryId === category.id;

          return (
            <TouchableOpacity
              key={category.id}
              activeOpacity={0.8}
              onPress={() => handleCategoryPress(category.id)}
              style={[
                styles.categoryBucket,
                isMismatch && styles.categoryBucketMismatch,
              ]}
            >
              <View style={styles.categoryIconBadge}>
                <MaterialIcons
                  name={(category.icon as any) || "folder"}
                  size={24}
                  color={category.color || colors.primary}
                />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.stackSm,
  },
  headerGroup: {
    marginBottom: spacing.gutter,
  },
  title: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "800",
    color: colors.onSurface,
    marginBottom: 4,
  },
  instructions: {
    ...typography.bodyMd,
    fontSize: 13.5,
    color: colors.onSurfaceVariant,
    lineHeight: 19,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  progressBarBg: {
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primaryContainer,
    borderRadius: 3,
  },
  activeCardContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    marginBottom: spacing.gutter,
  },
  activeCardSuccess: {
    backgroundColor: "#E8F5E9",
    borderColor: "#81C784",
    borderBottomColor: "#4CAF50",
  },
  cardHeaderTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  cardHeaderTagText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  activeCardText: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
    textAlign: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  categoryBucket: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: componentColors.cardBorder,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
    gap: 8,
  },
  categoryBucketMismatch: {
    borderColor: "#EF5350",
    backgroundColor: "#FFEBEE",
  },
  categoryIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(190, 202, 185, 0.4)",
  },
  categoryTitle: {
    ...typography.labelLg,
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    textAlign: "center",
  },
});
