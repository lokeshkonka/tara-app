import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import type { LearnCategory } from "../../types/learn";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { SquishyButton } from "../dashboard/DashboardTopBar";
import { LEARN_THEMES } from "./LearnTheme";

interface LearnCategoriesProps {
  categories: LearnCategory[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function LearnCategories({
  categories,
  selectedId,
  onSelect,
}: LearnCategoriesProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{t("learn.categories.title")}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {categories.map((category, index) => {
          const selected = category.id === selectedId;
          const theme = LEARN_THEMES[index % LEARN_THEMES.length];
          return (
            <SquishyButton
              key={category.id}
              onPress={() => onSelect(category.id)}
              accessibilityLabel={t(category.labelKey)}
              faceColor={selected ? theme.solid : theme.tint}
              borderColor={selected ? theme.solid : theme.border}
              borderBottomColor={selected ? theme.solidEdge : theme.edge}
              size={38}
              borderRadius={rounded.full}
              paddingHorizontal={14}
              shadowColor={theme.solid}
            >
              <MaterialIcons
                name={category.icon as keyof typeof MaterialIcons.glyphMap}
                size={16}
                color={selected ? colors.onPrimary : theme.text}
              />
              <Text
                style={[
                  styles.chipText,
                  { color: selected ? colors.onPrimary : theme.text },
                ]}
              >
                {t(category.labelKey)}
              </Text>
            </SquishyButton>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  title: {
    ...typography.headlineMd,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
    marginBottom: spacing.stackSm,
  },
  row: {
    gap: spacing.stackSm,
    paddingRight: spacing.marginMobile,
  },
  chipText: {
    ...typography.labelSm,
    fontSize: 13,
    fontWeight: "600",
  },
});
