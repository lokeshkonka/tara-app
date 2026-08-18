import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useSettings } from "../../context/SettingsContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const TIME_OPTIONS = [
  "06:00 AM (Early Morning Field Prep)",
  "07:30 AM (Breakfast / Before Sowing)",
  "12:30 PM (Midday Rest)",
  "06:30 PM (Evening Summary)",
  "08:00 PM (Night Review)",
];

export default function NotificationSettingsScreen() {
  const { notifications, updateNotifications } = useSettings();
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleSave = () => {
    Alert.alert(
      "Notifications Updated",
      "Your notification preferences and reminder times have been saved.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tara Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.taraAvatar}>
            <MaterialIcons name="notifications-active" size={24} color={colors.primary} />
          </View>
          <View style={styles.introTextWrap}>
            <Text style={styles.introTitle}>Farming Alerts & Reminders</Text>
            <Text style={styles.introSub}>
              Stay on top of seasonal tasks, daily practices, and community answers without clutter.
            </Text>
          </View>
        </View>

        {/* Content Alerts Group */}
        <Text style={styles.sectionTitle}>Content Alerts</Text>
        <View style={styles.toggleGroup}>
          {/* Daily Reminders */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Daily Farming Reminders</Text>
              <Text style={styles.toggleSub}>
                Updates on weather, mulching moisture, and daily actions.
              </Text>
            </View>
            <Switch
              value={notifications.dailyReminders}
              onValueChange={(val) => updateNotifications({ dailyReminders: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          {/* Daily Reminder Time Picker */}
          {notifications.dailyReminders && (
            <Pressable
              style={styles.timePickerRow}
              onPress={() => setTimePickerVisible(true)}
            >
              <View style={styles.timePickerLeft}>
                <MaterialIcons name="schedule" size={20} color={colors.primary} />
                <Text style={styles.timePickerLabel}>Reminder Time</Text>
              </View>
              <View style={styles.timePickerRight}>
                <Text style={styles.timePickerVal}>
                  {notifications.dailyReminderTime}
                </Text>
                <MaterialIcons name="edit" size={16} color={colors.onSurfaceVariant} />
              </View>
            </Pressable>
          )}

          <View style={styles.divider} />

          {/* New Lessons */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>New Lessons & Modules</Text>
              <Text style={styles.toggleSub}>
                Alert when new soil and water modules are added to Tara.
              </Text>
            </View>
            <Switch
              value={notifications.newLessons}
              onValueChange={(val) => updateNotifications({ newLessons: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          {/* Streak Alerts */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Streak & Milestone Alerts</Text>
              <Text style={styles.toggleSub}>
                Gentle nudges to keep your daily learning streak active.
              </Text>
            </View>
            <Switch
              value={notifications.streakAlerts}
              onValueChange={(val) => updateNotifications({ streakAlerts: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          {/* Community Replies */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Community Q&A Responses</Text>
              <Text style={styles.toggleSub}>
                When a fellow farmer or Tara answers your question.
              </Text>
            </View>
            <Switch
              value={notifications.communityReplies}
              onValueChange={(val) =>
                updateNotifications({ communityReplies: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          {/* Weekly Tips */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Weekly Soil Digest</Text>
              <Text style={styles.toggleSub}>
                Curated organic agronomy insights every Sunday.
              </Text>
            </View>
            <Switch
              value={notifications.weeklyTips}
              onValueChange={(val) => updateNotifications({ weeklyTips: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Delivery Channels */}
        <Text style={styles.sectionTitle}>Delivery Channels</Text>
        <View style={styles.toggleGroup}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Push Notifications</Text>
              <Text style={styles.toggleSub}>
                Direct alerts on your smartphone screen.
              </Text>
            </View>
            <Switch
              value={notifications.pushEnabled}
              onValueChange={(val) => updateNotifications({ pushEnabled: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>SMS Text Alerts</Text>
              <Text style={styles.toggleSub}>
                Critical weather & pest outbreak notices via SMS.
              </Text>
            </View>
            <Switch
              value={notifications.smsAlerts}
              onValueChange={(val) => updateNotifications({ smsAlerts: val })}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <TactileButton
          title="Save Preferences"
          icon="check"
          variant="primary"
          onPress={handleSave}
        />
      </ScrollView>

      {/* Time Picker Modal */}
      <Modal
        visible={timePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setTimePickerVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Choose Reminder Time</Text>
              <Pressable onPress={() => setTimePickerVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            {TIME_OPTIONS.map((timeOpt) => {
              const timeFormatted = timeOpt.split(" ")[0] + " " + timeOpt.split(" ")[1];
              const isSelected = notifications.dailyReminderTime.startsWith(
                timeFormatted
              );

              return (
                <Pressable
                  key={timeOpt}
                  style={[
                    styles.timeOption,
                    isSelected && styles.timeOptionActive,
                  ]}
                  onPress={() => {
                    updateNotifications({ dailyReminderTime: timeFormatted });
                    setTimePickerVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeOptionText,
                      isSelected && styles.timeOptionTextActive,
                    ]}
                  >
                    {timeOpt}
                  </Text>
                  {isSelected && (
                    <MaterialIcons name="check" size={20} color={colors.primary} />
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
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
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  taraAvatar: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  introTextWrap: {
    flex: 1,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  introSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: spacing.xs,
  },
  toggleGroup: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  toggleTextWrap: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  toggleSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  timePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    marginBottom: spacing.xs,
  },
  timePickerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timePickerLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
  },
  timePickerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timePickerVal: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(190, 202, 185, 0.3)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: rounded.xxl,
    borderTopRightRadius: rounded.xxl,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  timeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    borderRadius: rounded.lg,
  },
  timeOptionActive: {
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  timeOptionText: {
    fontSize: 14,
    color: colors.onSurface,
  },
  timeOptionTextActive: {
    fontWeight: "700",
    color: colors.primary,
  },
});
