import React, { useState } from "react";
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
import { useSettings } from "../../context/SettingsContext";
import { useUser } from "../../context/UserContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", sample: "Hello farmer, let's nurture your soil." },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", sample: "नमस्ते किसान भाई, आइए अपनी मिट्टी को समृद्ध बनाएं।" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", sample: "नमस्कार शेतकरी मित्र, चला आपली माती सुपीक करूया." },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", sample: "నమస్కారం రైతు మిత్రమా, మన నేలను సారవంతం చేద్దాం." },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", sample: "வணக்கம் விவசாயி, நம் மண்ணை வளப்படுத்துவோம்." },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", sample: "ನಮಸ್ಕಾರ ರೈತ ಮಿತ್ರ, ನಮ್ಮ ಮಣ್ಣನ್ನು ಫಲವತ್ತಾಗಿಸೋಣ." },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", sample: "നമസ്കാരം കർഷക സുഹൃത്തേ, നമ്മുടെ മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കാം." },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", sample: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ, ਆਓ ਆਪਣੀ ਧਰਤੀ ਨੂੰ ਖੁਸ਼ਹਾਲ ਬਣਾਈਏ।" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", sample: "નમસ્તે ખેડૂત મિત્ર, ચાલો આપણી માટીને ફળદ્રુપ બનાવીએ." },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", sample: "নমস্কার কৃষক বন্ধু, আসুন আমাদের মাটিকে উর্বর করে তুলি।" },
];

export default function LanguageSettingsScreen() {
  const { user, updateUser } = useUser();
  const [selectedLang, setSelectedLang] = useState(user?.language || "en");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [playingSample, setPlayingSample] = useState<string | null>(null);

  const handleTestAudio = (code: string) => {
    setPlayingSample(code);
    setTimeout(() => {
      setPlayingSample(null);
    }, 2500);
  };

  const handleSave = async () => {
    await updateUser({ language: selectedLang });
    Alert.alert(
      "Language Updated",
      "App interface and audio instructions will now adapt to your chosen language.",
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
        <Text style={styles.headerTitle}>Language & Voice</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.taraAvatar}>
            <MaterialIcons name="record-voice-over" size={24} color={colors.primary} />
          </View>
          <View style={styles.introTextWrap}>
            <Text style={styles.introTitle}>Tara Speaks Your Language</Text>
            <Text style={styles.introSub}>
              Select your preferred regional language for audio lessons, AI voice feedback, and navigation.
            </Text>
          </View>
        </View>

        {/* Auto-translate Switch Card */}
        <View style={styles.switchCard}>
          <View style={styles.switchTextWrap}>
            <Text style={styles.switchTitle}>Auto-Translate Community</Text>
            <Text style={styles.switchSub}>
              Automatically translate voice story transcripts & posts from other states.
            </Text>
          </View>
          <Switch
            value={autoTranslate}
            onValueChange={setAutoTranslate}
            trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
            thumbColor={colors.white}
          />
        </View>

        {/* Languages Selection List */}
        <Text style={styles.sectionTitle}>Choose Primary Language</Text>
        <View style={styles.langList}>
          {LANGUAGES.map((item) => {
            const isSelected = selectedLang === item.code;
            const isPlaying = playingSample === item.code;

            return (
              <Pressable
                key={item.code}
                style={[
                  styles.langCard,
                  isSelected && styles.langCardActive,
                ]}
                onPress={() => setSelectedLang(item.code)}
              >
                <View style={styles.langLeft}>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleActive,
                    ]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <View>
                    <Text style={styles.nativeName}>{item.nativeName}</Text>
                    <Text style={styles.englishName}>{item.name}</Text>
                  </View>
                </View>

                <Pressable
                  style={[
                    styles.voiceTestBtn,
                    isPlaying && styles.voiceTestBtnPlaying,
                  ]}
                  onPress={() => handleTestAudio(item.code)}
                >
                  <MaterialIcons
                    name={isPlaying ? "volume-up" : "play-arrow"}
                    size={18}
                    color={isPlaying ? colors.primary : colors.onSurfaceVariant}
                  />
                  <Text
                    style={[
                      styles.voiceTestText,
                      isPlaying && { color: colors.primary, fontWeight: "700" },
                    ]}
                  >
                    {isPlaying ? "Speaking..." : "Sample"}
                  </Text>
                </Pressable>
              </Pressable>
            );
          })}
        </View>

        {/* Save Button */}
        <TactileButton
          title="Save Language Preference"
          icon="check"
          variant="primary"
          onPress={handleSave}
        />
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
  switchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  switchTextWrap: {
    flex: 1,
    paddingRight: spacing.sm,
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
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginTop: spacing.xs,
  },
  langList: {
    gap: spacing.xs,
  },
  langCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  langCardActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(0, 110, 28, 0.04)",
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: rounded.full,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
  },
  nativeName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  englishName: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  voiceTestBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  voiceTestBtnPlaying: {
    backgroundColor: "rgba(0, 110, 28, 0.1)",
    borderColor: colors.primary,
  },
  voiceTestText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
});
