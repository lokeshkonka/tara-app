import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { AudioSource } from "expo-audio";
import { colors, spacing } from "../../theme/theme";
import type { TaraExpression } from "../Tara/Tara.types";
import { TactileButton, type ButtonVariant } from "../ui/TactileButton";
import { TaraMessageCard } from "../tara-messages/TaraMessageCard";
import { OnboardingHeader } from "./OnboardingHeader";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps?: number;
  expression: TaraExpression;
  title: string;
  subtitle: string;
  audioSource?: AudioSource;
  showVoiceControl?: boolean;
  actionText?: string;
  actionIcon?: keyof typeof MaterialIcons.glyphMap;
  actionVariant?: ButtonVariant;
  canGoBack?: boolean;
  canSkip?: boolean;
  showLanguageSelector?: boolean;
  onBack?: () => void;
  onSkip?: () => void;
  onAction: () => void;
  isLoading?: boolean;
  children?: ReactNode;
  floatingBadges?: {
    icon: keyof typeof MaterialIcons.glyphMap;
    color: string;
    bgColor: string;
    position: "top-right" | "bottom-left";
  }[];
}

export function OnboardingLayout({
  currentStep,
  totalSteps = 8,
  expression,
  title,
  subtitle,
  audioSource,
  showVoiceControl,
  actionText = "Next",
  actionIcon = "arrow-forward",
  actionVariant = "primary",
  canGoBack = true,
  canSkip = true,
  showLanguageSelector = false,
  onBack,
  onSkip,
  onAction,
  isLoading = false,
  children,
  floatingBadges,
}: OnboardingLayoutProps) {
  const { height } = useWindowDimensions();
  const isCompact = height < 700;

  const [isSpeaking, setIsSpeaking] = useState(true); // Defaults to true because autoPlay is true
  const autoAdvanceAnim = useRef(new Animated.Value(0)).current;

  // Handle auto-advance watery splash fill after speech ends
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isSpeaking && currentStep < totalSteps) {
      // If speech finished, wait 1.5 seconds, then take 3.5 seconds to fill the button
      timer = setTimeout(() => {
        Animated.timing(autoAdvanceAnim, {
          toValue: 1,
          duration: 3500, // Watery splash slow fill
          useNativeDriver: false, // width interpolation
        }).start(({ finished }) => {
          if (finished) {
            onAction();
          }
        });
      }, 1500); // Wait 1.5s after speech ends before filling
    } else {
      // If started speaking again, or language toggled, reset the animation and timer
      autoAdvanceAnim.stopAnimation();
      autoAdvanceAnim.setValue(0);
    }

    return () => {
      clearTimeout(timer);
      autoAdvanceAnim.stopAnimation();
      autoAdvanceAnim.setValue(0);
    };
  }, [isSpeaking, currentStep, totalSteps, onAction, autoAdvanceAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {/* Header Navigation */}
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          canGoBack={canGoBack}
          canSkip={canSkip}
          showLanguageSelector={showLanguageSelector}
          onBack={onBack}
          onSkip={onSkip}
        />

        {/* Content ScrollView */}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isCompact && styles.scrollContentCompact,
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.centerContainer}>
            {/* Unified Tara Message Card Hero */}
            <TaraMessageCard
              title={title}
              message={subtitle}
              expression={expression}
              audioSource={audioSource}
              showVoiceControl={showVoiceControl ?? Boolean(audioSource)}
              autoPlay={true}
              isLoading={isLoading}
              floatingBadges={floatingBadges}
              onSpeechStart={() => setIsSpeaking(true)}
              onSpeechEnd={() => setIsSpeaking(false)}
            />

            {/* Optional Custom Slot (Cards, XP Bar, interactive forms, etc.) */}
            {children && <View style={styles.customSlot}>{children}</View>}
          </View>
        </ScrollView>

        {/* Bottom Actions Area */}
        <View style={styles.footer}>
          <TactileButton
            title={actionText}
            icon={actionIcon}
            variant={actionVariant}
            onPress={onAction}
            loading={isLoading}
            autoAdvanceProgress={currentStep < totalSteps ? autoAdvanceAnim : undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackSm,
  },
  scrollContentCompact: {
    paddingVertical: spacing.unit,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  customSlot: {
    width: "100%",
    marginTop: spacing.stackMd,
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
    paddingTop: spacing.stackSm,
    width: "100%",
    backgroundColor: colors.background,
  },
});
