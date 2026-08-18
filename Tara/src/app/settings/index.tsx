import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../auth/AuthProvider";
import { useSettings } from "../../context/SettingsContext";
import { useUser } from "../../context/UserContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const SETTINGS_SECTIONS = [
  {
    id: "account",
    title: "Account & Farm Details",
    sub: "Name, phone, farm size & crops",
    icon: "person",
    route: "/settings/account",
  },
  {
    id: "language",
    title: "Language & Audio Voice",
    sub: "Regional languages & auto-translation",
    icon: "language",
    route: "/settings/language",
  },
  {
    id: "notifications",
    title: "Notifications & Reminders",
    sub: "Daily practice alerts & lesson updates",
    icon: "notifications",
    route: "/settings/notifications",
  },
  {
    id: "accessibility",
    title: "Accessibility & Display",
    sub: "Text size, contrast & screen reader",
    icon: "accessibility",
    route: "/settings/accessibility",
  },
  {
    id: "security",
    title: "Security & Privacy",
    sub: "PIN lock, biometrics & active devices",
    icon: "security",
    route: "/settings/security",
  },
];

export default function SettingsMainScreen() {
  const { signOut } = useAuth();
  const { accountProfile } = useSettings();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => signOut() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tara Mentor Intro Card */}
        <View style={styles.taraCard}>
          <View style={styles.taraAvatarCircle}>
            <MaterialIcons name="eco" size={32} color={colors.primary} />
          </View>
          <Text style={styles.taraGreeting}>Hi, I'm Tara</Text>
          <Text style={styles.taraSub}>
            Manage your farming profile, display preferences, and notifications.
          </Text>
        </View>

        {/* Settings Navigation List */}
        <View style={styles.listContainer}>
          {SETTINGS_SECTIONS.map((item, idx) => {
            const isLast = idx === SETTINGS_SECTIONS.length - 1;
            return (
              <Pressable
                key={item.id}
                style={[styles.listItem, isLast && { borderBottomWidth: 0 }]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.itemIconWrap}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.itemTextWrap}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSub}>{item.sub}</Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={colors.outlineVariant}
                />
              </Pressable>
            );
          })}
        </View>

        {/* App Version Info */}
        <View style={styles.versionBox}>
          <Text style={styles.versionTitle}>Tara Sustainable Farming Companion</Text>
          <Text style={styles.versionText}>Version 1.2.0 • Offline Ready</Text>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  backBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  taraCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: 4,
  },
  taraAvatarCircle: {
    width: 60,
    height: 60,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  taraGreeting: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  taraSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
  },
  listContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
    gap: spacing.md,
  },
  itemIconWrap: {
    width: 38,
    height: 38,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTextWrap: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.onSurface,
  },
  itemSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  versionBox: {
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: 2,
  },
  versionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  versionText: {
    fontSize: 11,
    color: colors.outlineVariant,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: rounded.xl,
    backgroundColor: "rgba(186, 26, 26, 0.08)",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.error,
  },
});
