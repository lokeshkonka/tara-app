import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing } from "../../theme/theme";
import { SquishyButton } from "../dashboard/DashboardTopBar";

interface LearnSearchFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  filterActive?: boolean;
}

export function LearnSearchFilter({
  value,
  onChangeText,
  onFilterPress,
  filterActive = false,
}: LearnSearchFilterProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      {/* 3D pill search field */}
      <View style={styles.searchField}>
        <MaterialIcons name="search" size={22} color={colors.onSurfaceVariant} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t("learn.searchPlaceholder")}
          placeholderTextColor={colors.onSurfaceVariant}
          style={styles.input}
          returnKeyType="search"
          accessibilityRole="search"
          accessibilityLabel={t("learn.searchPlaceholder")}
        />
      </View>

      {/* 3D circular filter button */}
      <SquishyButton
        onPress={onFilterPress}
        accessibilityLabel={t("learn.filter")}
        faceColor={filterActive ? colors.primaryFixed : componentColors.cardBackground}
        borderColor={filterActive ? "rgba(27, 94, 32, 0.22)" : componentColors.cardBorder}
        borderBottomColor={filterActive ? "rgba(27, 94, 32, 0.38)" : componentColors.cardEdge}
        size={48}
        borderRadius={rounded.full}
        shadowColor={filterActive ? colors.primaryContainer : undefined}
      >
        <MaterialIcons
          name="tune"
          size={24}
          color={filterActive ? colors.primary : colors.onSurfaceVariant}
        />
      </SquishyButton>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.stackSm,
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    paddingLeft: 14,
    paddingRight: 6,
    gap: spacing.stackSm,
  },
  input: {
    flex: 1,
    height: 44,
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: "500",
  },
});
