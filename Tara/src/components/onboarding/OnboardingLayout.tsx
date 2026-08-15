import { type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { TARA_EXPRESSIONS } from "../Tara/expressionMap";
import type { TaraExpression } from "../Tara/Tara.types";
import { TactileButton, type ButtonVariant } from "../ui/TactileButton";
import { OnboardingHeader } from "./OnboardingHeader";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps?: number;
  expression: TaraExpression;
  title: string;
  subtitle: string;
  actionText?: string;
  actionIcon?: keyof typeof MaterialIcons.glyphMap;
  actionVariant?: ButtonVariant;
  canGoBack?: boolean;
  canSkip?: boolean;
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
  actionText = "Next",
  actionIcon = "arrow-forward",
  actionVariant = "primary",
  canGoBack = true,
  canSkip = true,
  onBack,
  onSkip,
  onAction,
  isLoading = false,
  children,
  floatingBadges,
}: OnboardingLayoutProps) {
  const { height } = useWindowDimensions();
  const isCompact = height < 700;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {/* Header Navigation */}
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          canGoBack={canGoBack}
          canSkip={canSkip}
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
            {/* Mascot Character Hero Area */}
            <View style={[styles.avatarContainer, isCompact && styles.avatarContainerCompact]}>
              <View style={styles.avatarGlow} />
              <Image
                source={TARA_EXPRESSIONS[expression]}
                style={styles.avatarImage}
                contentFit="contain"
                accessibilityLabel={`Tara avatar ${expression}`}
              />

              {/* Optional Floating Badges */}
              {floatingBadges?.map((badge, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.floatingBadge,
                    badge.position === "top-right"
                      ? styles.badgeTopRight
                      : styles.badgeBottomLeft,
                    { backgroundColor: badge.bgColor },
                  ]}
                >
                  <MaterialIcons name={badge.icon} size={18} color={badge.color} />
                </View>
              ))}
            </View>

            {/* Typography Stack */}
            <View style={styles.textStack}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            {/* Optional Custom Slot (Cards, XP Bar, etc.) */}
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
    paddingVertical: spacing.stackMd,
  },
  scrollContentCompact: {
    paddingVertical: spacing.stackSm,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  avatarContainer: {
    width: 220,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: spacing.stackLg,
  },
  avatarContainerCompact: {
    width: 170,
    height: 190,
    marginBottom: spacing.stackMd,
  },
  avatarGlow: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: rounded.full,
    backgroundColor: "rgba(148, 249, 144, 0.2)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  floatingBadge: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeTopRight: {
    top: 4,
    right: 4,
  },
  badgeBottomLeft: {
    bottom: 12,
    left: 4,
  },
  textStack: {
    alignItems: "center",
    paddingHorizontal: spacing.gutter,
    maxWidth: 360,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.stackSm,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 22,
  },
  customSlot: {
    width: "100%",
    marginTop: spacing.stackLg,
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
