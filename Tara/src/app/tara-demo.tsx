import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Tara from "../components/Tara/Tara";
import type { TaraExpression, TaraHandle } from "../components/Tara/Tara.types";
import { TaraColors } from "../components/Tara/Tara.styles";
import {
  TARA_DEMO_CONTENT,
  TARA_DEMO_LANGUAGES,
} from "../data/taraDemoContent";
import type { TaraLanguage } from "../data/taraDemoContent";

const FALLBACK_PER_CHAR_MS: Record<TaraLanguage, number> = {
  english: 80,
  hindi: 120,
  malayalam: 120,
  telugu: 120,
};

const MESSAGE_EXPRESSIONS: TaraExpression[] = [
  "happy",
  "happy",
  "thinking",
  "thinking",
  "happy",
  "listening",
  "thinking",
  "excited",
  "surprised",
  "excited",
  "happy",
];

const LANGUAGE_LABELS: Record<TaraLanguage, string> = {
  english: "English",
  hindi: "Hindi",
  malayalam: "Malayalam",
  telugu: "Telugu",
};

const EXPRESSION_LABELS: Record<TaraExpression, string> = {
  neutral: "Neutral",
  happy: "Happy",
  thinking: "Thinking",
  excited: "Excited",
  surprised: "Surprised",
  sad: "Sad",
  laughing: "Laughing",
  listening: "Listening",
  "hi-wave": "Hi Wave",
  winking: "Winking",
};

export default function TaraDemoScreen() {
  const [language, setLanguage] = useState<TaraLanguage>("english");
  const [messageIndex, setMessageIndex] = useState(0);
  const expression = MESSAGE_EXPRESSIONS[messageIndex] ?? MESSAGE_EXPRESSIONS[0];
  const taraRef = useRef<TaraHandle>(null);
  const advanceTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const content = TARA_DEMO_CONTENT[language];
  const currentMessage =
    content.messages[messageIndex] ?? content.messages[0];

  const clearAdvanceTimers = useCallback(() => {
    advanceTimersRef.current.forEach((timer) => clearTimeout(timer));
    advanceTimersRef.current = [];
  }, []);

  useEffect(() => () => clearAdvanceTimers(), [clearAdvanceTimers]);

  const scheduleMessageAdvance = useCallback(
    (durationMs: number | null) => {
      clearAdvanceTimers();
      const messages = content.messages;
      const totalChars = messages.reduce((sum, m) => sum + m.length, 0);
      const perCharMs =
        durationMs && durationMs > 0
          ? durationMs / totalChars
          : FALLBACK_PER_CHAR_MS[language];
      let offset = 0;
      for (let i = 0; i < messages.length - 1; i++) {
        offset += messages[i].length * perCharMs;
        advanceTimersRef.current.push(
          setTimeout(() => setMessageIndex(i + 1), offset)
        );
      }
    },
    [clearAdvanceTimers, content, language]
  );

  const startSequence = useCallback(() => {
    setMessageIndex(0);
    clearAdvanceTimers();
    const durationMs =
      typeof taraRef.current?.duration === "number"
        ? taraRef.current.duration * 1000
        : null;
    scheduleMessageAdvance(durationMs);
  }, [clearAdvanceTimers, scheduleMessageAdvance]);

  const changeLanguage = (lang: TaraLanguage) => {
    if (lang === language) {
      return;
    }
    taraRef.current?.stop();
    clearAdvanceTimers();
    setLanguage(lang);
    setMessageIndex(0);
  };

  const handlePlayPress = () => {
    startSequence();
    taraRef.current?.play();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>TARA DEMO</Text>

        <Tara
          ref={taraRef}
          expression={expression}
          message={currentMessage}
          audioSource={content.audio}
          onSpeechStart={startSequence}
          onSpeechEnd={clearAdvanceTimers}
        />

        <View style={styles.expressionReadout}>
          <Text style={styles.readoutLabel}>Expression</Text>
          <Text style={styles.readoutValue}>{EXPRESSION_LABELS[expression]}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Language</Text>
          <View style={styles.chipRow}>
            {TARA_DEMO_LANGUAGES.map((lang) => {
              const active = lang === language;
              return (
                <Pressable
                  key={lang}
                  onPress={() => changeLanguage(lang)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {LANGUAGE_LABELS[lang]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={handlePlayPress}
          style={({ pressed }) => [
            styles.playButton,
            pressed && styles.playButtonPressed,
          ]}
        >
          <Text style={styles.playButtonIcon}>▶</Text>
          <Text style={styles.playButtonText}>PLAY</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TaraColors.lightGreen,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  screenTitle: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 6,
    color: TaraColors.primaryGreen,
    marginBottom: 14,
  },
  expressionReadout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: TaraColors.white,
    borderWidth: 1,
    borderColor: TaraColors.softGreen,
  },
  readoutLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: TaraColors.textMuted,
  },
  readoutValue: {
    fontSize: 13,
    fontWeight: "800",
    color: TaraColors.primaryGreen,
  },
  section: {
    width: "100%",
    maxWidth: 480,
    marginTop: 28,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: TaraColors.textMuted,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: TaraColors.white,
    borderWidth: 1,
    borderColor: TaraColors.softGreen,
  },
  chipActive: {
    backgroundColor: TaraColors.primaryGreen,
    borderColor: TaraColors.primaryGreen,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: TaraColors.textDark,
  },
  chipTextActive: {
    color: TaraColors.white,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: TaraColors.yellow,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonPressed: {
    opacity: 0.75,
  },
  playButtonIcon: {
    fontSize: 14,
    marginRight: 8,
    color: TaraColors.darkGreen,
  },
  playButtonText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: TaraColors.darkGreen,
  },
});
