import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import {
  Animated,
  Easing,
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
import { colors, typography } from "../../theme/theme";

const PULSE_DURATION = 950;
const TARA_DRIFT_DURATION = 2600;
const BUBBLE_FLOAT_DURATION = 3000;

export interface TaraSideMessageCardHandle {
  play: () => void;
  stop: () => void;
}

export interface TaraSideMessageCardProps {
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
 * Horizontal character dialogue card: Tara sits on the LEFT with a soft
 * atmospheric glow and drifts subtly left <-> right, while the curved speech
 * bubble floats on the RIGHT (voice button + message) with a gentle top <-> bottom
 * float. Shares the same background, voice player and pulse treatment as
 * TaraMessageCard.
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

  const [textFadeAnim] = useState(() => new Animated.Value(1));
  const [exprAnim] = useState(() => new Animated.Value(1));
  const [pulse] = useState(() => new Animated.Value(0));

  // Subtle horizontal drift for Tara (left <-> right)
  const [taraDrift] = useState(() => new Animated.Value(0));
  // Subtle vertical float for the message bubble (top <-> bottom)
  const [bubbleFloat] = useState(() => new Animated.Value(0));

  const { t } = useTranslation();

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
    outputRange: [0, -6],
  });

  const bubbleTranslateY = bubbleFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
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

  const source = image ?? TARA_EXPRESSIONS[displayedExpression];

  // Parse title and subtitle gracefully if not passed explicitly
  const { headerTitle, messageBody } = useMemo(() => {
    if (title) {
      return { headerTitle: title, messageBody: message };
    }
    if (message.startsWith("Namaste! I'm Tara.")) {
      const remaining = message.replace("Namaste! I'm Tara.", "").trim();
      return {
        headerTitle: "Namaste! I'm Tara.",
        messageBody: remaining || "Your companion on the journey to sustainable and prosperous farming.",
      };
    }
    const firstPeriod = message.indexOf(".");
    if (firstPeriod > 0 && firstPeriod < 30) {
      return {
        headerTitle: message.slice(0, firstPeriod + 1),
        messageBody: message.slice(firstPeriod + 1).trim(),
      };
    }
    return {
      headerTitle: "Namaste! I'm Tara.",
      messageBody: message,
    };
  }, [title, message]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.row}>
        {/* 1. Character on the left with atmospheric halo */}
        <View style={styles.heroArea}>
          <AtmosphericGlow
            size={160}
            opacity={0.9}
            tintColor="#4CAF50"
            showParticles
            particleDensity="medium"
            animated
            isSpeaking={isPlaying}
            style={styles.glowPosition}
          />

          {/* Floating voice control above Tara */}
          {showVoiceControl && (
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
                    size={20}
                    color={isPlaying ? "#FFFFFF" : "#1B6D24"}
                  />
                </Pressable>
              </Animated.View>
            </View>
          )}

          {/* Tara Mascot Avatar - subtle left-right drift */}
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

        {/* 2. Curved Dialogue Speech Bubble on the right - subtle top-bottom float */}
        <Animated.View
          style={[
            styles.speechBubbleWrapper,
            { transform: [{ translateY: bubbleTranslateY }] },
          ]}
        >
          {/* Dialogue Bubble Tail / Pointer (points left toward Tara) */}
          <View style={styles.bubbleTailBorder} />
          <View style={styles.bubbleTail} />

          {/* Main Curved Dialogue Card */}
          <View style={styles.speechCard}>
            {/* Speech Title & Body Text Stack */}
            <Animated.View style={[styles.textStack, { opacity: textFadeAnim }]}>
              {isLoading ? (
                <TextRenderingLoader text={t("tara.loading")} />
              ) : (
                <>
                  <Text style={styles.titleText}>{headerTitle}</Text>
                  <Text style={styles.bodyText}>{messageBody}</Text>
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
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "rgba(168, 222, 172, 0.45)",
    paddingTop: 8,
    paddingBottom: 0,
    paddingHorizontal: 12,
    position: "relative",
    overflow: "hidden",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  /* ---------- TARA (left) ---------- */
  heroArea: {
    width: 122,
    height: 130,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  glowPosition: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    marginTop: -78,
  },
  avatarWrap: {
    width: 116,
    height: 116,
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
    marginLeft: 2,
    marginBottom: 12,
    position: "relative",
    alignItems: "center",
    zIndex: 10,
  },
  bubbleTailBorder: {
    position: "absolute",
    left: -10,
    top: "50%",
    marginTop: -10,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 11,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "rgba(185, 228, 190, 0.8)",
    zIndex: 11,
  },
  bubbleTail: {
    position: "absolute",
    left: -8.5,
    top: "50%",
    marginTop: -9,
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderRightWidth: 10,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FFFFFF",
    zIndex: 12,
  },

  // Curved Dialogue Card
  speechCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.6)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },

  // Floating voice control in the top-left corner
  voiceControlWrap: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 15,
  },
  voiceButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    width: 38,
    height: 38,
    borderRadius: 19,
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
    fontSize: 11,
    lineHeight: 16,
    color: "#4F5D4C",
    fontWeight: "400",
  },
});
