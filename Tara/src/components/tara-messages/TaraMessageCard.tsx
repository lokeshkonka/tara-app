import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from "react-native";
import { Image, type ImageSource } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import type { AudioSource } from "expo-audio";
import { useTaraAudio } from "../../hooks/useTaraAudio";
import { TARA_EXPRESSIONS } from "../Tara/expressionMap";
import type { TaraExpression } from "../Tara/Tara.types";
import { AtmosphericGlow } from "../ui/AtmosphericGlow";
import { colors, typography } from "../../theme/theme";

const PULSE_DURATION = 950;

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
 * TaraMessageCard
 *
 * Polished character hero card with an organic speech dialogue bubble (proper curve + tail pointer)
 * featuring a floating voice control button at the top-left corner so the message body fills
 * the whole speech bubble container smoothly.
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
  const [displayedExpression, setDisplayedExpression] = useState(expression);
  const [fadingExpression, setFadingExpression] = useState(false);

  const [messageAnim] = useState(() => new Animated.Value(1));
  const [textFadeAnim] = useState(() => new Animated.Value(1));
  const [exprAnim] = useState(() => new Animated.Value(1));
  const [pulse] = useState(() => new Animated.Value(0));

  const triggerSubtleAnim = () => {
    try {
      LayoutAnimation.configureNext({
        duration: 350,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
    } catch (e) {}
  };

  const [isVoiceFinished, setIsVoiceFinished] = useState<boolean>(false);
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const triggerTextFade = useCallback(() => {
    textFadeAnim.setValue(0.15);
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [textFadeAnim]);

  const { isPlaying, play, stop } = useTaraAudio(audioSource, {
    onStart: () => {
      onSpeechStart?.();
    },
    onEnd: () => {
      setIsVoiceFinished(true);
      triggerTextFade();
      onSpeechEnd?.();
    },
  });

  useImperativeHandle(ref, () => ({ play, stop }), [play, stop]);

  useEffect(() => {
    if (autoPlay && audioSource) {
      play();
    }
  }, [autoPlay, audioSource, play]);

  const source = image ?? TARA_EXPRESSIONS[displayedExpression];

  const { headerTitle, messageBody } = useMemo(() => {
    if (title !== undefined) {
      return { headerTitle: title, messageBody: message };
    }
    if (message.startsWith("Namaste! I'm Tara.")) {
      const remaining = message.replace("Namaste! I'm Tara.", "").trim();
      return {
        headerTitle: "Namaste! I'm Tara.",
        messageBody: remaining || "Your companion on the journey to sustainable and prosperous farming.",
      };
    }
    return {
      headerTitle: "TARA",
      messageBody: message,
    };
  }, [title, message]);

  // Split message into lines for line-by-line narration while voice plays
  const sentences = useMemo(() => {
    if (!messageBody) return [];
    if (messageBody.includes("\n\n")) {
      return messageBody.split("\n\n").map((s) => s.trim()).filter(Boolean);
    }
    const matches = messageBody.match(/[^.!?।]+[.!?।]+/g);
    if (!matches || matches.length === 0) return [messageBody];
    return matches.map((s) => s.trim());
  }, [messageBody]);

  // Handle line transitions as voice audio progresses
  useEffect(() => {
    if (!isPlaying || !audioSource || isVoiceFinished || sentences.length <= 1) {
      return;
    }

    const totalChars = messageBody.length || 1;
    let timerId: NodeJS.Timeout | null = null;

    const scheduleNext = (currentIdx: number) => {
      if (currentIdx >= sentences.length - 1) return;
      const currentSentence = sentences[currentIdx];
      const durationMs = Math.max(
        3200,
        Math.floor((currentSentence.length / totalChars) * 16500)
      );

      timerId = setTimeout(() => {
        const nextIdx = currentIdx + 1;
        triggerTextFade();
        setSentenceIndex(nextIdx);
        scheduleNext(nextIdx);
      }, durationMs);
    };

    scheduleNext(sentenceIndex);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isPlaying, audioSource, isVoiceFinished, sentences, messageBody, sentenceIndex, triggerTextFade]);

  // If voice is done, voice is off, or single line: display full paragraph
  const displayedText = useMemo(() => {
    if (isVoiceFinished || !isPlaying || !audioSource || sentences.length <= 1) {
      return messageBody;
    }
    return sentences[sentenceIndex] || messageBody;
  }, [isVoiceFinished, isPlaying, audioSource, sentences, sentenceIndex, messageBody]);

  const targetExpression = expression || "happy";

  const [displayedExpr, setDisplayedExpr] = useState<TaraExpression>(targetExpression);
  const [prevExpr, setPrevExpr] = useState<TaraExpression | null>(null);

  // Smooth fade-in text animation on initial load or message change
  useEffect(() => {
    triggerTextFade();
  }, [messageBody, triggerTextFade]);

  // Expression cross-fade + micro-elastic scale animation when expression prop changes
  useEffect(() => {
    if (targetExpression === displayedExpr) return;
    setPrevExpr(displayedExpr);
    setDisplayedExpr(targetExpression);
    exprAnim.setValue(0);

    Animated.timing(exprAnim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setPrevExpr(null);
      }
    });
  }, [targetExpression, displayedExpr, exprAnim]);

  const speaking = isPlaying;

  useEffect(() => {
    if (!speaking) {
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
  }, [speaking, pulse]);

  const [floatAnim] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

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

  const badgeWobble = pulse.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ["0deg", "-6deg", "5deg", "-4deg", "3deg", "0deg"],
  });
  const badgeScale = pulse.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.15, 1],
  });
  const badgeFloat = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const messageTranslateY = messageAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  const handleToggle = () => {
    if (isPlaying) {
      stop();
      setIsVoiceFinished(true);
      triggerTextFade();
    } else {
      play();
    }
    onVoicePress?.();
  };

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {/* 1. Character & Atmospheric Halo Area */}
      <View style={styles.heroArea}>
        <View style={styles.glowClipper}>
          <AtmosphericGlow
            size={320}
            opacity={0.95}
            tintColor="#4CAF50"
            showParticles
            particleDensity="medium"
            animated
            isSpeaking={speaking}
            style={styles.glowPosition}
          />
        </View>

        {/* Tara Mascot Avatar with subtle pop & cross-fade expression transition */}
        <Animated.View
          style={[
            styles.avatarWrap,
            {
              transform: [
                {
                  scale: exprAnim.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: [0.94, 1.05, 1.0],
                  }),
                },
              ],
            },
          ]}
        >
          {prevExpr && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.avatarOverlay,
                {
                  opacity: exprAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            >
              <Image
                source={TARA_EXPRESSIONS[prevExpr]}
                style={styles.avatarImage}
                contentFit="contain"
              />
            </Animated.View>
          )}

          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              opacity: prevExpr
                ? exprAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })
                : 1,
            }}
          >
            <Image
              source={image ?? TARA_EXPRESSIONS[displayedExpr]}
              style={styles.avatarImage}
              contentFit="contain"
              accessibilityLabel={`Tara ${displayedExpr}`}
            />
          </Animated.View>
        </Animated.View>

          {/* Floating Badges */}
          {floatingBadges?.map((badge, idx) => (
            <Animated.View
              key={idx}
              style={[
                styles.floatingBadge,
                badge.position === "top-right"
                  ? styles.badgeTopRight
                  : styles.badgeBottomLeft,
                { backgroundColor: badge.bgColor },
                {
                  transform: [
                    { translateY: badgeFloat },
                    { rotate: badgeWobble },
                    { scale: badgeScale },
                  ],
                },
              ]}
            >
              <MaterialIcons name={badge.icon} size={18} color={badge.color} />
            </Animated.View>
          ))}
        </View>

      {/* 2. Curved Dialogue Speech Bubble Container */}
      <Animated.View
        style={[
          styles.speechBubbleWrapper,
          {
            opacity: messageAnim,
            transform: [{ translateY: messageTranslateY }],
          },
        ]}
      >
        {/* Dialogue Bubble Tail / Pointer */}
        <View style={styles.bubbleTailBorder} />
        <View style={styles.bubbleTail} />

        {/* Main Curved Dialogue Card */}
        <View style={styles.speechCard}>
          {/* Floating Voice Control Button in Top-Left Corner */}
          {showVoiceControl && (
            <View style={styles.floatingVoiceContainer}>
              {speaking && (
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
                    styles.volumeButton,
                    speaking && styles.volumeButtonActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={speaking ? "Stop speech" : "Play speech"}
                >
                  <MaterialIcons
                    name="volume-up"
                    size={20}
                    color={speaking ? "#FFFFFF" : "#1B6D24"}
                  />
                </Pressable>
              </Animated.View>
            </View>
          )}

          {/* Full-Width Message Body */}
          <Animated.View style={[styles.textStack, { opacity: textFadeAnim }]}>
            {isLoading ? (
              <TextRenderingLoader text="Tara is preparing response..." />
            ) : (
              <>
                {headerTitle ? (
                  <Text style={styles.titleText}>
                    {headerTitle}
                  </Text>
                ) : null}
                <Pressable onPress={handleToggle}>
                  <Text
                    style={[styles.bodyText, bodyTextStyle]}
                    numberOfLines={
                      isVoiceFinished || !isPlaying
                        ? isExpanded
                          ? undefined
                          : 3
                        : undefined
                    }
                  >
                    {displayedText}
                  </Text>
                </Pressable>

                {(isVoiceFinished || !isPlaying) && messageBody.length > 90 && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.loadMoreButton}
                    onPress={() => {
                      try {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut
                        );
                      } catch {}
                      setIsExpanded((prev) => !prev);
                    }}
                  >
                    <Text style={styles.loadMoreText}>
                      {isExpanded ? "Show Less" : "Load More"}
                    </Text>
                    <MaterialIcons
                      name={
                        isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                      }
                      size={16}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
});

export default TaraMessageCard;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: "#F3F8F1",
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "rgba(168, 222, 172, 0.45)",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    position: "relative",
    overflow: "visible",
  },
  heroArea: {
    width: "100%",
    height: 195,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    marginBottom: -8,
    overflow: "visible",
  },
  glowClipper: {
    position: "absolute",
    top: -12,
    left: -12,
    right: -12,
    bottom: 0,
    overflow: "hidden",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  glowPosition: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    marginTop: -160,
  },
  avatarWrap: {
    width: 190,
    height: 190,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 5,
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
  floatingBadge: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  badgeTopRight: {
    top: 6,
    right: 6,
  },
  badgeBottomLeft: {
    bottom: 16,
    left: 6,
  },

  // Speech Bubble Container
  speechBubbleWrapper: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    zIndex: 10,
    marginTop: 4,
  },
  bubbleTailBorder: {
    position: "absolute",
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 11,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(185, 228, 190, 0.8)",
    zIndex: 11,
  },
  bubbleTail: {
    position: "absolute",
    top: -8.5,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
    zIndex: 12,
  },

  // Curved Dialogue Card
  speechCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.6)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: "relative",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },

  // Floating Voice Control Button on Top-Left Edge
  floatingVoiceContainer: {
    position: "absolute",
    top: -16,
    left: 14,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 25,
  },
  volumeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  volumeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  pulseRing: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: "rgba(76, 175, 80, 0.20)",
  },

  // Full-Width Text Stack
  textStack: {
    width: "100%",
    justifyContent: "center",
    paddingTop: 10,
  },
  titleText: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "800",
    color: "#181C1A",
    marginBottom: 4,
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 13.5,
    lineHeight: 20,
    color: "#3F4A3C",
    fontWeight: "400",
  },
  cursorText: {
    color: colors.primaryContainer,
    fontWeight: "800",
  },
  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 4,
    paddingVertical: 3,
    paddingHorizontal: 4,
    gap: 3,
  },
  loadMoreText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});
