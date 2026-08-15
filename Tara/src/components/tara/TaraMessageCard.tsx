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
 * and an interactive mic button with high-strength pulsating rhythm beat while audio plays.
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
    onSpeechStart,
    onSpeechEnd,
    onVoicePress,
  },
  ref
) {
  const [displayedExpression, setDisplayedExpression] = useState(expression);
  const [fadingExpression, setFadingExpression] = useState(false);

  // Keep messageAnim wrapper opacity at 1 to prevent black background blink
  const [messageAnim] = useState(() => new Animated.Value(1));
  const [textFadeAnim] = useState(() => new Animated.Value(1));
  const [exprAnim] = useState(() => new Animated.Value(1));
  const [pulse] = useState(() => new Animated.Value(0));

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

  // Smooth inner text cross-fade animation without fading the outer white speech card container
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

  const speaking = isPlaying;

  // Punchy pulse beat animation while playing audio
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

  // Subtle wobble and beat for floating badges while speaking
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
      {/* 1. Character & Atmospheric Halo Area */}
      <View style={styles.heroArea}>
        {/* Ambient green atmospheric glow with sparkles and dynamic speech beat */}
        <AtmosphericGlow
          size={290}
          opacity={0.95}
          tintColor="#4CAF50"
          showParticles
          particleDensity="medium"
          animated
          isSpeaking={speaking}
          style={styles.glowPosition}
        />

        {/* Tara Mascot Avatar */}
        <View style={styles.avatarWrap}>
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
          {/* Left: Punchy Pulsating Mic Audio Button */}
          {showVoiceControl ? (
            <View style={styles.buttonWrap}>
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
                    name={speaking ? "mic" : "mic"}
                    size={24}
                    color={speaking ? "#FFFFFF" : "#1B6D24"}
                  />
                </Pressable>
              </Animated.View>
            </View>
          ) : (
            <View style={styles.nameBadge}>
              <MaterialIcons name="mic" size={22} color="#1B6D24" />
            </View>
          )}

          {/* Center/Right: Speech Title & Body Text Stack */}
          <Animated.View style={[styles.textStack, { opacity: textFadeAnim }]}>
            {isLoading ? (
              <TextRenderingLoader text="Tara is preparing response..." />
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
    overflow: "hidden",
  },
  heroArea: {
    width: "100%",
    height: 190,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    marginBottom: -8,
  },
  glowPosition: {
    position: "absolute",
    top: "32%",
    alignSelf: "center",
    marginTop: -145,
  },
  avatarWrap: {
    width: 195,
    height: 195,
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

  // Speech Bubble with Tail Pointer
  speechBubbleWrapper: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    zIndex: 10,
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
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },

  // Mic Action Button
  buttonWrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  volumeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  volumeButtonActive: {
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
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: "rgba(76, 175, 80, 0.20)",
  },

  nameBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.75)",
  },

  textStack: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  titleText: {
    ...typography.labelLg,
    fontSize: 15,
    fontWeight: "700",
    color: "#181C1A",
    marginBottom: 2,
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 12.5,
    lineHeight: 18,
    color: "#4F5D4C",
    fontWeight: "400",
  },
});
