import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../hooks/useTranslation";
import { colors, spacing, typography } from "../../theme/theme";

export default function LearnTab() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("learn.title")}</Text>
        <Text style={styles.headerSubtitle}>
          {t("learn.subtitle")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors.primary,
  },
  headerSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: spacing.unit,
  },
});
