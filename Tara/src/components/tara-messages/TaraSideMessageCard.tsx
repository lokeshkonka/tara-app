import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image, type ImageSource } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import type { AudioSource } from "expo-audio";
import { useTaraAudio } from "../../hooks/useTaraAudio";
import { useTranslation } from "../../hooks/useTranslation";
import { TARA_EXPRESSIONS } from "../Tara/expressionMap";
import type { TaraExpression } from "../Tara/Tara.types";
import { AtmosphericGlow } from "../ui/AtmosphericGlow";
import { colors, componentColors, rounded, typography } from "../../theme/theme";

const PULSE_DURATION = 950;
const TARA_DRIFT_DURATION = 2600;
const BUBBLE_FLOAT_DURATION = 3000;

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
 * Animated Text Rendering Loader inside message bubble
 */
function TextRenderingLoader({ text = "Tara is preparing response..." }: { text?: string }) {
  const dot1 = useState(() => new Animated.Value(0))[0];
  const dot2 = useState(() => new Animated.Value(0))[0];
  const dot3 = useState(() => new Animated.Value(0))[0];
  const textFade = useState(() => new Animated.Value(0.5))[0];

  useEffect(() => {
    const createDotAnim = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -5,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.delay(400),
        ])
      );
    };

    const anim1 = createDotAnim(dot1, 0);
    const anim2 = createDotAnim(dot2, 140);
    const anim3 = createDotAnim(dot3, 280);

    const fadeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(textFade, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(textFade, {
          toValue: 0.5,
          duration: 550,
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();
    fadeLoop.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
      fadeLoop.stop();
    };
  }, [dot1, dot2, dot3, textFade]);

  return (
    <View style={loaderStyles.container}>
      <Animated.Text style={[loaderStyles.titleText, { opacity: textFade }]}>
        {text}
      </Animated.Text>
      <View style={loaderStyles.dotsRow}>
        <Animated.View
          style={[loaderStyles.dot, { transform: [{ translateY: dot1 }] }]}
        />
        <Animated.View
          style={[loaderStyles.dot, { transform: [{ translateY: dot2 }] }]}
        />
        <Animated.View
          style={[loaderStyles.dot, { transform: [{ translateY: dot3 }] }]}
        />
      </View>
    </View>
  );
}

const loaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  titleText: {
    ...typography.labelLg,
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
});

/**
 * TaraSideMessageCard
 *
 * Horizontal character dialogue card: Adapts dynamically based on:
 * 1. Single-line vs Two-line vs Multi-line (with Read More expander)
 * 2. Voice ON vs Voice OFF compact sizing
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
  const [displayedExpression, setDisplayedExpression] = useState(expression);
  const [fadingExpression, setFadingExpression] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [textFadeAnim] = useState(() => new Animated.Value(1));
  const [exprAnim] = useState(() => new Animated.Value(1));
  const [pulse] = useState(() => new Animated.Value(0));

  // Subtle horizontal drift for Tara (left <-> right)
  const [taraDrift] = useState(() => new Animated.Value(0));
  // Subtle vertical float for the message bubble (top <-> bottom)
  const [bubbleFloat] = useState(() => new Animated.Value(0));

  const { t } = useTranslation();

  const hasVoice = Boolean(showVoiceControl && audioSource);
  const isLongMessage = message.length > 125;
  const isSingleLine = message.length < 48 && !title;

  const { isPlaying, play, stop } = useTaraAudio(audioSource, {
    onStart: () => onSpeechStart?.(),
    onEnd: () => onSpeechEnd?.(),
  });

  useImperativeHandle(ref, () => ({ play, stop }), [play, stop]);

  useEffect(() => {
    if (autoPlay && audioSource) {
      play();
    }
  }, [autoPlay, audioSource, play]);

  // Smooth inner text cross-fade animation
  useEffect(() => {
    textFadeAnim.setValue(0.3);
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [message, textFadeAnim]);

  // Expression cross-fade
  useEffect(() => {
    if (expression === displayedExpression) return;
    setFadingExpression(true);
    exprAnim.setValue(0);
    Animated.timing(exprAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    const timer = setTimeout(() => {
      setDisplayedExpression(expression);
      setFadingExpression(false);
      exprAnim.setValue(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [expression, displayedExpression, exprAnim]);

  // Punchy pulse beat animation while playing audio
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

  // Subtle left-right drift for Tara
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(taraDrift, {
          toValue: 1,
          duration: TARA_DRIFT_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(taraDrift, {
          toValue: 0,
          duration: TARA_DRIFT_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [taraDrift]);

  // Subtle top-bottom float for the message bubble
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleFloat, {
          toValue: 1,
          duration: BUBBLE_FLOAT_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(bubbleFloat, {
          toValue: 0,
          duration: BUBBLE_FLOAT_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bubbleFloat]);

  const taraTranslateX = taraDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const bubbleTranslateY = bubbleFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  const ringScaleInner = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.65],
  });
  const ringOpacityInner = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 0],
  });

  const ringScaleOuter = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.15],
  });
  const ringOpacityOuter = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  const buttonScale = pulse.interpolate({
    inputRange: [0, 0.4, 0.7, 1],
    outputRange: [1, 1.15, 1.08, 1],
  });

  const handleToggle = () => {
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

  const source = image ?? TARA_EXPRESSIONS[displayedExpression];

  return (
    <View style={[styles.outerContainer, hasVoice ? styles.outerWithVoice : styles.outerCompact]}>
      <View style={styles.row}>
        {/* 1. Character on the left - stays anchored at bottom */}
        <View style={[styles.heroArea, hasVoice ? styles.heroWithVoice : styles.heroCompact]}>
          <AtmosphericGlow
            size={hasVoice ? 150 : 130}
            opacity={0.85}
            tintColor="#4CAF50"
            showParticles={hasVoice}
            particleDensity="low"
            animated
            isSpeaking={isPlaying}
            style={hasVoice ? styles.glowWithVoice : styles.glowCompact}
          />

          {/* Floating voice control above Tara (only when voice audio exists) */}
          {hasVoice && (
            <View style={styles.voiceControlWrap}>
              {isPlaying && (
                <>
                  <Animated.View
                    style={[
                      styles.pulseRing,
                      {
                        transform: [{ scale: ringScaleOuter }],
                        opacity: ringOpacityOuter,
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.pulseRing,
                      {
                        transform: [{ scale: ringScaleInner }],
                        opacity: ringOpacityInner,
                      },
                    ]}
                  />
                </>
              )}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={handleToggle}
                  style={[
                    styles.voiceButton,
                    isPlaying && styles.voiceButtonActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={isPlaying ? t("tara.speech.stop") : t("tara.speech.play")}
                >
                  <MaterialIcons
                    name="volume-up"
                    size={19}
                    color={isPlaying ? "#FFFFFF" : "#1B6D24"}
                  />
                </Pressable>
              </Animated.View>
            </View>
          )}

          {/* Tara Mascot Avatar - anchored at bottom */}
          <Animated.View
            style={[
              styles.avatarWrap,
              { transform: [{ translateX: taraTranslateX }] },
            ]}
          >
            <Image
              source={source}
              style={styles.avatarImage}
              contentFit="contain"
              accessibilityLabel={`Tara ${displayedExpression}`}
            />
            {fadingExpression && expression !== displayedExpression && (
              <Animated.View
                pointerEvents="none"
                style={[styles.avatarOverlay, { opacity: exprAnim }]}
              >
                <Image
                  source={image ?? TARA_EXPRESSIONS[expression]}
                  style={styles.avatarFill}
                  contentFit="contain"
                />
              </Animated.View>
            )}
          </Animated.View>
        </View>

        {/* 2. Curved Dialogue Speech Bubble on the right */}
        <Animated.View
          style={[
            styles.speechBubbleWrapper,
            isSingleLine && styles.speechBubbleWrapperSingleLine,
            { transform: [{ translateY: bubbleTranslateY }] },
          ]}
        >
          {/* Main Curved Dialogue Card (Adapts to Single-Line, Two-Line, and Multi-Line) */}
          <View
            style={[
              styles.speechCard,
              isSingleLine && styles.speechCardSingleLine,
              isLongMessage && styles.speechCardLong,
            ]}
          >
            {/* Seamless Pointer Tail pointing to Tara */}
            <View
              style={[
                styles.bubblePointer,
                isSingleLine && styles.bubblePointerSingleLine,
              ]}
            />

            <Animated.View style={[styles.textStack, { opacity: textFadeAnim }]}>
              {isLoading ? (
                <TextRenderingLoader text={t("tara.loading")} />
              ) : (
                <>
                  {!!title && <Text style={styles.titleText}>{title}</Text>}
                  <Text
                    numberOfLines={isLongMessage && !isExpanded ? 2 : undefined}
                    style={[
                      styles.bodyText,
                      isSingleLine && styles.bodyTextSingleLine,
                    ]}
                  >
                    {message}
                  </Text>

                  {/* Expand / Load More Button for 3+ Line Messages */}
                  {isLongMessage && (
                    <Pressable
                      onPress={handleToggleExpand}
                      style={styles.expandButton}
                      accessibilityRole="button"
                    >
                      <Text style={styles.expandButtonText}>
                        {isExpanded ? "Show Less ▴" : "Read More ▾"}
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
});

export default TaraSideMessageCard;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: "#F3F8F1",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(168, 222, 172, 0.45)",
    paddingHorizontal: 12,
    position: "relative",
    overflow: "hidden",
  },
  outerWithVoice: {
    paddingTop: 8,
    paddingBottom: 0,
  },
  outerCompact: {
    paddingTop: 6,
    paddingBottom: 0,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  /* ---------- TARA (left) ---------- */
  heroArea: {
    width: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  heroWithVoice: {
    height: 118,
  },
  heroCompact: {
    height: 94,
  },
  glowWithVoice: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    marginTop: -75,
  },
  glowCompact: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    marginTop: -65,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 2,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  avatarFill: {
    width: "100%",
    height: "100%",
  },

  /* ---------- SPEECH BUBBLE (right) ---------- */
  speechBubbleWrapper: {
    flex: 1,
    marginLeft: 3,
    marginBottom: 8,
    position: "relative",
    justifyContent: "center",
    zIndex: 10,
  },
  speechBubbleWrapperSingleLine: {
    marginBottom: 0,
    alignSelf: "center",
  },

  // Base Curved Dialogue Card (2-Line standard)
  speechCard: {
    width: "100%",
    minHeight: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.75)",
    paddingVertical: 9,
    paddingHorizontal: 13,
    justifyContent: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },

  // Single-Line Variant
  speechCardSingleLine: {
    minHeight: 38,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  // Long Multi-Line Variant
  speechCardLong: {
    paddingVertical: 10,
  },

  // Seamless Pointer Tail
  bubblePointer: {
    position: "absolute",
    left: -6.5,
    top: "50%",
    marginTop: -6,
    width: 12,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.75)",
    transform: [{ rotate: "45deg" }],
    zIndex: 12,
  },
  bubblePointerSingleLine: {
    left: -5.5,
    marginTop: -5,
    width: 10,
    height: 10,
  },

  // Floating voice control in the top-left corner
  voiceControlWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 15,
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  voiceButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  pulseRing: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: "rgba(76, 175, 80, 0.20)",
  },

  textStack: {
    justifyContent: "center",
  },
  titleText: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "700",
    color: "#181C1A",
    marginBottom: 2,
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 13.5,
    lineHeight: 18.5,
    color: "#181C1A",
    fontWeight: "600",
  },
  bodyTextSingleLine: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
  },
  expandButton: {
    alignSelf: "flex-end",
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: "#E8F5E9",
    borderRadius: rounded.full,
  },
  expandButtonText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
  },
});
