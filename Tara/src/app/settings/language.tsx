import React, { useRef, useState } from "react";
import {
  Alert,
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
import { useUser } from "../../context/UserContext";
import { useTaraAudio } from "../../hooks/useTaraAudio";
import { TARA_DEMO_CONTENT } from "../../data/taraDemoContent";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";

const ACTIVE_LANGUAGES = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    region: "Pan-India & Global",
    sample: "Hello farmer, let's nurture your soil together.",
    badge: "Official",
    audioSource: TARA_DEMO_CONTENT.english.audio,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    region: "North & Central India",
    sample: "नमस्ते किसान भाई, आइए अपनी मिट्टी को समृद्ध बनाएं।",
    badge: "Popular",
    audioSource: TARA_DEMO_CONTENT.hindi.audio,
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    region: "Andhra Pradesh & Telangana",
    sample: "నమస్కారం రైతు మిత్రమా, మన నేలను సారవంతం చేద్దాం.",
    badge: "South India",
    audioSource: TARA_DEMO_CONTENT.telugu.audio,
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    region: "Kerala & Lakshadweep",
    sample: "നമസ്കാരം കർഷക സുഹൃത്തേ, നമ്മുടെ മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കാം.",
    badge: "South India",
    audioSource: TARA_DEMO_CONTENT.malayalam.audio,
  },
];

const UPCOMING_LANGUAGES = [
  { code: "mr", name: "Marathi", nativeName: "मराठी", region: "Maharashtra" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", region: "Tamil Nadu" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", region: "Karnataka" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", region: "Punjab" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", region: "Gujarat" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", region: "West Bengal" },
];

function ActiveLanguageCard({
  item,
  isSelected,
  onSelect,
}: {
  item: (typeof ACTIVE_LANGUAGES)[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { isPlaying, play, stop } = useTaraAudio(item.audioSource);

  const handleToggleAudio = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <Pressable onPress={onSelect}>
      {({ pressed }) => (
        <View
          style={[
            styles.langCard,
            isSelected && styles.langCardSelected,
            pressed && styles.langCardPressed,
          ]}
        >
          {/* Left: Radio Selector + Names */}
          <View style={styles.langLeft}>
            <View
              style={[
                styles.radioCircle,
                isSelected && styles.radioCircleSelected,
              ]}
            >
              {isSelected && <View style={styles.radioDot} />}
            </View>
            <View style={styles.nameBlock}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.nativeName}>{item.nativeName}</Text>
                {item.badge && (
                  <View
                    style={[
                      styles.regionBadge,
                      isSelected && styles.regionBadgeSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.regionBadgeText,
                        isSelected && styles.regionBadgeTextSelected,
                      ]}
                    >
                      {item.badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.englishName}>
                {item.name} • <Text style={styles.regionText}>{item.region}</Text>
              </Text>
            </View>
          </View>

          {/* Right: Audio Sample Player Button */}
          <Pressable
            style={[
              styles.voiceTestBtn,
              isPlaying && styles.voiceTestBtnPlaying,
            ]}
            onPress={(e) => {
              e.stopPropagation();
              handleToggleAudio();
            }}
          >
            <MaterialIcons
              name={isPlaying ? "graphic-eq" : "volume-up"}
              size={18}
              color={isPlaying ? colors.primary : colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.voiceTestText,
                isPlaying && styles.voiceTestTextPlaying,
              ]}
            >
              {isPlaying ? "Stop Voice" : "Play Sample"}
            </Text>
          </Pressable>

          {/* Audio Wave / Sample Quote Box when active sample playing */}
          {isPlaying && (
            <View style={styles.sampleQuoteBox}>
              <MaterialIcons name="graphic-eq" size={16} color={colors.primary} />
              <Text style={styles.sampleQuoteText} numberOfLines={2}>
                "{item.sample}"
              </Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default function LanguageSettingsScreen() {
  const { user, updateUser } = useUser();
  const [selectedLang, setSelectedLang] = useState(user?.language || "en");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectLang = (code: string) => {
    setSelectedLang(code);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSave = async () => {
    await updateUser({ language: selectedLang });
    Alert.alert(
      "Language Saved",
      `Tara is now set to ${ACTIVE_LANGUAGES.find((l) => l.code === selectedLang)?.name || "English"}. App interface and voice assistant have been updated.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Languages & Voices</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 3D Intro Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeaderRow}>
            <View style={styles.taraAvatarWrap}>
              <MaterialIcons name="record-voice-over" size={26} color={colors.primary} />
            </View>
            <View style={styles.heroTitleWrap}>
              <Text style={styles.heroTitle}>Tara AI Voice Guidance</Text>
              <Text style={styles.heroSubtitle}>Localized audio lessons & farm voice assistant</Text>
            </View>
          </View>
          <Text style={styles.heroBody}>
            Tara speaks naturally in regional dialects with clear audio instructions designed specifically for field conditions.
          </Text>
        </View>

        {/* Auto-Translate Switch 3D Card */}
        <View style={styles.switchCard}>
          <View style={styles.switchIconWrap}>
            <MaterialIcons name="g-translate" size={22} color="#0284C7" />
          </View>
          <View style={styles.switchTextWrap}>
            <Text style={styles.switchTitle}>Auto-Translate Community Stories</Text>
            <Text style={styles.switchSub}>
              Automatically translate audio posts and farming tips shared by farmers in other regional languages.
            </Text>
          </View>
          <Switch
            value={autoTranslate}
            onValueChange={setAutoTranslate}
            trackColor={{ false: colors.outlineVariant, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        {/* Section Heading: Active Languages */}
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="verified" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Active Languages (4 Supported)</Text>
        </View>

        {/* 3D Active Languages List */}
        <View style={styles.langList}>
          {ACTIVE_LANGUAGES.map((item) => (
            <ActiveLanguageCard
              key={item.code}
              item={item}
              isSelected={selectedLang === item.code}
              onSelect={() => handleSelectLang(item.code)}
            />
          ))}
        </View>

        {/* Section Heading: Upcoming Languages */}
        <View style={[styles.sectionHeaderRow, { marginTop: spacing.md }]}>
          <MaterialIcons name="schedule" size={20} color={colors.onSurfaceVariant} />
          <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
            More Regional Languages (Coming Soon)
          </Text>
        </View>

        {/* 3D Upcoming Languages Grid */}
        <View style={styles.upcomingGrid}>
          {UPCOMING_LANGUAGES.map((item) => (
            <View key={item.code} style={styles.upcomingCard}>
              <View style={styles.upcomingLeft}>
                <View style={styles.upcomingDot} />
                <View>
                  <Text style={styles.upcomingNative}>{item.nativeName}</Text>
                  <Text style={styles.upcomingEnglish}>{item.name}</Text>
                </View>
              </View>
              <View style={styles.comingSoonPill}>
                <Text style={styles.comingSoonPillText}>Coming Soon</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <View style={styles.ctaWrap}>
          <TactileButton
            title="Save Language & Voice Preference"
            icon="check-circle"
            variant="primary"
            onPress={handleSave}
            height={52}
            depth={4}
          />
        </View>
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
    backgroundColor: colors.surfaceContainerLowest,
  },
  backBtn: {
    padding: 8,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
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
  heroCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
  },
  heroHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: 8,
  },
  taraAvatarWrap: {
    width: 44,
    height: 44,
    borderRadius: rounded.xl,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 110, 28, 0.2)",
  },
  heroTitleWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  heroSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  heroBody: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  switchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.sm,
  },
  switchIconWrap: {
    width: 38,
    height: 38,
    borderRadius: rounded.lg,
    backgroundColor: "rgba(2, 132, 199, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  switchTextWrap: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  switchSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 15,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  langList: {
    gap: spacing.sm,
  },
  langCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.xs,
  },
  langCardSelected: {
    borderColor: colors.primary,
    borderBottomColor: "#004D12",
    backgroundColor: "rgba(0, 110, 28, 0.04)",
  },
  langCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: rounded.full,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
  },
  nameBlock: {
    flex: 1,
  },
  titleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  regionBadge: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  regionBadgeSelected: {
    backgroundColor: "rgba(0, 110, 28, 0.12)",
  },
  regionBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  regionBadgeTextSelected: {
    color: colors.primary,
  },
  englishName: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  regionText: {
    fontSize: 11,
    color: colors.outline,
  },
  voiceTestBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
  },
  voiceTestBtnPlaying: {
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    borderColor: colors.primary,
  },
  voiceTestText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  voiceTestTextPlaying: {
    color: colors.primary,
  },
  sampleQuoteBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
    borderRadius: rounded.lg,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 110, 28, 0.18)",
  },
  sampleQuoteText: {
    flex: 1,
    fontSize: 12,
    fontStyle: "italic",
    color: colors.primary,
    fontWeight: "600",
  },
  upcomingGrid: {
    gap: spacing.xs,
  },
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "rgba(190, 202, 185, 0.4)",
    borderStyle: "dashed",
    opacity: 0.75,
  },
  upcomingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  upcomingDot: {
    width: 8,
    height: 8,
    borderRadius: rounded.full,
    backgroundColor: colors.outlineVariant,
  },
  upcomingNative: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  upcomingEnglish: {
    fontSize: 11,
    color: colors.outline,
  },
  comingSoonPill: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  comingSoonPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  ctaWrap: {
    marginTop: spacing.sm,
  },
});
