import React, {
  forwardRef,
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
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";

const PULSE_DURATION = 900;
const TRUNCATION_THRESHOLD = 220;

export interface TaraSideMessageCardHandle {
  play: () => void;
  stop: () => void;
}

export interface TaraSideMessageCardProps {
  /** Optional custom headline title */
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
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVoicePress?: () => void;
}

/**
 * Modern, High-Performance Tara Horizontal Dialogue Card
 * - Left avatar with green focus ring
 * - Right speech card with seamless pointer tail
 * - Inline header with audio speaker button
 * - Clean multi-lingual text wrapping
 */
export const TaraSideMessageCard = forwardRef<
  TaraSideMessageCardHandle,
  TaraSideMessageCardProps
>(function TaraSideMessageCard(
  {
    title,
    message,
    expression = "happy",
    image,
    audioSource,
    autoPlay = false,
    showVoiceControl = true,
    isLoading = false,
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

  // Expression cross-fade without setState inside effect warning
  useEffect(() => {
    if (expression !== activeExpr) {
      exprAnim.setValue(0.75);
      setActiveExpr(expression);
      Animated.timing(exprAnim, {
        toValue: 1,
        duration: 250,
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
      duration: 220,
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

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
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

  const isLong = message.length > TRUNCATION_THRESHOLD;
  const avatarSource = image ?? TARA_EXPRESSIONS[activeExpr] ?? TARA_EXPRESSIONS.happy;
  const hasVoice = Boolean(showVoiceControl && audioSource);

  return (
    <View style={styles.container}>
      {/* 1. Mascot Avatar on the Left */}
      <View style={styles.avatarColumn}>
        <Animated.View
          style={[
            styles.avatarFrame,
            isPlaying && styles.avatarFrameSpeaking,
            { transform: [{ scale: exprAnim }] },
          ]}
        >
          <Image
            source={avatarSource}
            style={styles.avatarImage}
            contentFit="contain"
            accessibilityLabel={`Tara ${activeExpr}`}
          />
        </Animated.View>
      </View>

      {/* 2. Speech Bubble Card on the Right */}
      <View style={styles.speechBubbleWrapper}>
        {/* Left Pointer Tail Anchor */}
        <View style={styles.pointerTailBorder} />
        <View style={styles.pointerTailFill} />

        {/* Card Box */}
        <View style={styles.speechCard}>
          {/* Header Row: Title + Audio Speaker */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.titleBadgeContainer}>
              <View style={styles.taraLiveDot} />
              <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
                {title || "TARA"}
              </Text>
            </View>

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
                    name="volume-up"
                    size={17}
                    color={isPlaying ? "#FFFFFF" : "#15803D"}
                  />
                </Pressable>
              </View>
            )}
          </View>

          {/* Message Text */}
          <Animated.View style={{ opacity: textFadeAnim }}>
            {isLoading ? (
              <Text style={styles.loadingText}>Tara is preparing response...</Text>
            ) : (
              <>
                <Text
                  style={styles.bodyText}
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
                      size={15}
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
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  avatarColumn: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
    zIndex: 10,
  },
  avatarFrame: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F0FDF4",
    borderWidth: 2,
    borderColor: "#86EFAC",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarFrameSpeaking: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  speechBubbleWrapper: {
    flex: 1,
    marginLeft: 10,
    position: "relative",
  },
  pointerTailBorder: {
    position: "absolute",
    left: -8,
    top: 18,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: componentColors.cardBorder,
    zIndex: 11,
  },
  pointerTailFill: {
    position: "absolute",
    left: -6,
    top: 19,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 7,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FFFFFF",
    zIndex: 12,
  },
  speechCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 13,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  titleBadgeContainer: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingRight: 6,
  },
  taraLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  titleText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.4,
  },
  voiceBtnWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(22, 163, 74, 0.35)",
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 13.5,
    lineHeight: 19.5,
    color: colors.onSurface,
    fontWeight: "400",
  },
  loadingText: {
    ...typography.bodyMd,
    fontSize: 12.5,
    color: colors.primary,
    fontStyle: "italic",
  },
  expandToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 2,
    marginTop: 3,
  },
  expandToggleText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
  },
});

export default TaraSideMessageCard;

