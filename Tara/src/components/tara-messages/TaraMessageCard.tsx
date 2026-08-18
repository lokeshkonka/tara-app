import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, type ImageSource } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import type { AudioSource } from "expo-audio";
import * as Haptics from "expo-haptics";
import { useTaraAudio } from "../../hooks/useTaraAudio";
import { TARA_EXPRESSIONS } from "../Tara/expressionMap";
import type { TaraExpression } from "../Tara/Tara.types";
import { AtmosphericGlow } from "../ui/AtmosphericGlow";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";

const PULSE_DURATION = 900;
const TRUNCATION_THRESHOLD = 260;

export interface TaraMessageCardHandle {
  play: () => void;
  stop: () => void;
}

export interface TaraMessageCardProps {
  /** Optional custom headline title, e.g. "Namaste! I'm Tara." */
  title?: string;
  /** Message body or speech transcript */
  message: string;
  /** Tara expression avatar */
  expression?: TaraExpression;
  /** Optional override image source */
  image?: ImageSource;
  /** Audio voice clip */
  audioSource?: AudioSource;
  /** Auto play audio on mount */
  autoPlay?: boolean;
  /** Show volume/mic speaker button */
  showVoiceControl?: boolean;
  /** Display text rendering loader inside the message bubble */
  isLoading?: boolean;
  /** Optional floating badges displayed on hero area */
  floatingBadges?: {
    icon: keyof typeof MaterialIcons.glyphMap;
    color: string;
    bgColor: string;
    position: "top-right" | "bottom-left";
  }[];
  /** Optional custom styling for the message body text */
  bodyTextStyle?: any;
  /** Optional container style overrides */
  containerStyle?: any;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVoicePress?: () => void;
}

/**
 * Modern, High-Performance Tara Hero Dialogue Card
 * - Seamless speech bubble anchor
 * - Inline voice control button in the header
 * - Smooth expression transitions
 * - Hardware-accelerated soundwave animations
 */
export const TaraMessageCard = forwardRef<
  TaraMessageCardHandle,
  TaraMessageCardProps
>(function TaraMessageCard(
  {
    title,
    message,
    expression = "happy",
    image,
    audioSource,
    autoPlay = false,
    showVoiceControl = true,
    isLoading = false,
    floatingBadges,
    bodyTextStyle,
    containerStyle,
    onSpeechStart,
    onSpeechEnd,
    onVoicePress,
  },
  ref
) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeExpr, setActiveExpr] = useState<TaraExpression>(expression);

  const textFadeAnim = useRef(new Animated.Value(1)).current;
  const exprAnim = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const { isPlaying, play, stop } = useTaraAudio(audioSource, {
    onStart: () => onSpeechStart?.(),
    onEnd: () => onSpeechEnd?.(),
  });

  useImperativeHandle(ref, () => ({ play, stop }), [play, stop]);

  const hasAutoPlayedRef = useRef<any>(null);

  useEffect(() => {
    if (autoPlay && audioSource && hasAutoPlayedRef.current !== audioSource) {
      hasAutoPlayedRef.current = audioSource;
      play();
    }
  }, [autoPlay, audioSource, play]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Expression cross-fade
  useEffect(() => {
    if (expression !== activeExpr) {
      exprAnim.setValue(0.7);
      setActiveExpr(expression);
      Animated.timing(exprAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [expression, activeExpr, exprAnim]);

  // Text fade-in on message change
  useEffect(() => {
    textFadeAnim.setValue(0.3);
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [message, textFadeAnim]);

  // Audio Pulse loop
  useEffect(() => {
    if (!isPlaying) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    pulse.setValue(0);
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: PULSE_DURATION,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [isPlaying, pulse]);

  // Gentle float animation for badges
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const badgeFloat = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const handleVoiceToggle = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    onVoicePress?.();
  };

  const handleToggleExpand = () => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch {}
    setIsExpanded((prev) => !prev);
  };

  const headerTitle = useMemo(() => {
    if (title !== undefined) return title;
    if (message.startsWith("Namaste! I'm Tara.")) return "Namaste! I'm Tara.";
    return "TARA";
  }, [title, message]);

  const isLong = message.length > TRUNCATION_THRESHOLD;
  const avatarSource = image ?? TARA_EXPRESSIONS[activeExpr] ?? TARA_EXPRESSIONS.happy;
  const hasVoice = Boolean(showVoiceControl && audioSource);

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {/* 1. Tara Character Mascot & Atmospheric Backdrop */}
      <View style={styles.heroArea}>
        <View style={styles.glowWrapper}>
          <AtmosphericGlow
            size={240}
            opacity={0.8}
            tintColor="#4CAF50"
            showParticles={false}
            animated={true}
            isSpeaking={isPlaying}
            style={styles.glowCenter}
          />
        </View>

        {/* Mascot Avatar */}
        <Animated.View
          style={[
            styles.avatarWrap,
            {
              transform: [{ scale: exprAnim }],
              opacity: exprAnim,
            },
          ]}
        >
          <Image
            source={avatarSource}
            style={styles.avatarImage}
            contentFit="contain"
            accessibilityLabel={`Tara ${activeExpr}`}
          />
        </Animated.View>

        {/* Floating Badges */}
        {floatingBadges?.map((badge, idx) => (
          <Animated.View
            key={`badge-${idx}`}
            style={[
              styles.floatingBadge,
              badge.position === "top-right" ? styles.badgeTopRight : styles.badgeBottomLeft,
              { backgroundColor: badge.bgColor },
              { transform: [{ translateY: badgeFloat }] },
            ]}
          >
            <MaterialIcons name={badge.icon} size={17} color={badge.color} />
          </Animated.View>
        ))}
      </View>

      {/* 2. Dialogue Speech Bubble */}
      <View style={styles.speechBubbleContainer}>
        {/* Pointer Tail Anchor */}
        <View style={styles.bubbleTailBorder} />
        <View style={styles.bubbleTailFill} />

        {/* Speech Card Box */}
        <View style={styles.speechCard}>
          {/* Header Row: Title Badge + Voice Control */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.titleBadgeContainer}>
              <View style={styles.taraLiveDot} />
              <Text style={styles.titleText}>{headerTitle}</Text>
            </View>

            {/* Inline Voice Speaker Button */}
            {hasVoice && (
              <View style={styles.voiceBtnWrapper}>
                {isPlaying && (
                  <Animated.View
                    style={[
                      styles.voicePulseRing,
                      { transform: [{ scale: ringScale }], opacity: ringOpacity },
                    ]}
                  />
                )}
                <Pressable
                  onPress={handleVoiceToggle}
                  style={[
                    styles.voiceButton,
                    isPlaying && styles.voiceButtonActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={isPlaying ? "Stop speech audio" : "Play speech audio"}
                >
                  <MaterialIcons
                    name={isPlaying ? "volume-up" : "volume-up"}
                    size={18}
                    color={isPlaying ? "#FFFFFF" : "#15803D"}
                  />
                </Pressable>
              </View>
            )}
          </View>

          {/* Message Content */}
          <Animated.View style={[styles.textBodyContainer, { opacity: textFadeAnim }]}>
            {isLoading ? (
              <View style={styles.loadingRow}>
                <Text style={styles.loadingText}>Tara is preparing response...</Text>
              </View>
            ) : (
              <>
                <Text
                  style={[styles.bodyText, bodyTextStyle]}
                  numberOfLines={isLong && !isExpanded ? 3 : undefined}
                >
                  {message}
                </Text>

                {isLong && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleToggleExpand}
                    style={styles.expandToggle}
                  >
                    <Text style={styles.expandToggleText}>
                      {isExpanded ? "Show Less" : "Read More"}
                    </Text>
                    <MaterialIcons
                      name={isExpanded ? "expand-less" : "expand-more"}
                      size={16}
                      color="#16A34A"
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    alignItems: "center",
  },
  heroArea: {
    width: 170,
    height: 155,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  glowWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  glowCenter: {
    position: "absolute",
    alignSelf: "center",
  },
  avatarWrap: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  floatingBadge: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  badgeTopRight: {
    top: 10,
    right: 4,
  },
  badgeBottomLeft: {
    bottom: 12,
    left: 4,
  },

  // Speech Bubble Structure
  speechBubbleContainer: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    marginTop: -2,
    zIndex: 15,
  },
  bubbleTailBorder: {
    position: "absolute",
    top: -9,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: componentColors.cardBorder,
    zIndex: 16,
  },
  bubbleTailFill: {
    position: "absolute",
    top: -7,
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
    zIndex: 17,
  },
  speechCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titleBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  taraLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#16A34A",
  },
  titleText: {
    ...typography.labelLg,
    fontSize: 13.5,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.3,
  },
  voiceBtnWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
    borderWidth: 1.5,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButtonActive: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  voicePulseRing: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(22, 163, 74, 0.35)",
  },
  textBodyContainer: {
    width: "100%",
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 14,
    lineHeight: 21,
    color: colors.onSurface,
    fontWeight: "400",
  },
  loadingRow: {
    paddingVertical: 6,
  },
  loadingText: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.primary,
    fontStyle: "italic",
  },
  expandToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 2,
    marginTop: 4,
    paddingVertical: 2,
  },
  expandToggleText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#16A34A",
  },
});

export default TaraMessageCard;

