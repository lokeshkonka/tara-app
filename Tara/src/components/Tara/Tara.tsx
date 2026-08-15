import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useTaraAudio } from "../../hooks/useTaraAudio";
import { TARA_EXPRESSIONS } from "./expressionMap";
import { taraStyles as styles } from "./Tara.styles";
import type { TaraHandle, TaraProps } from "./Tara.types";

const STACK_BREAKPOINT = 300;
const TALKING_PULSE_DURATION = 1200;

const Tara = forwardRef<TaraHandle, TaraProps>(function Tara(
  {
    expression,
    message,
    audioSource,
    showSpeech = true,
    autoPlay = false,
    onSpeechStart,
    onSpeechEnd,
  }: TaraProps,
  ref
) {
  const { width } = useWindowDimensions();
  const stacked = width < STACK_BREAKPOINT;

  const [displayedMessage, setDisplayedMessage] = useState(message);
  const [displayedExpression, setDisplayedExpression] = useState(expression);
  const [fadingExpression, setFadingExpression] = useState(false);

  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const exprAnim = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  const { isPlaying, duration, play, stop } = useTaraAudio(audioSource, {
    onStart: () => {
      onSpeechStart?.();
    },
    onEnd: () => {
      onSpeechEnd?.();
    },
  });

  useImperativeHandle(ref, () => ({ play, stop, duration }), [
    play,
    stop,
    duration,
  ]);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, [autoPlay, play]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bubbleAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 300,
        delay: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bubbleAnim, textAnim]);

  useEffect(() => {
    if (message === displayedMessage) {
      return;
    }
    textAnim.setValue(0.2);
    setDisplayedMessage(message);
    Animated.timing(textAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [message, displayedMessage, textAnim]);

  useEffect(() => {
    if (expression === displayedExpression) {
      return;
    }
    setFadingExpression(true);
    exprAnim.setValue(0);
    const fade = Animated.timing(exprAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    });
    fade.start();
    const timer = setTimeout(() => {
      setDisplayedExpression(expression);
      setFadingExpression(false);
      exprAnim.setValue(1);
    }, 250);
    return () => {
      clearTimeout(timer);
      fade.stop();
    };
  }, [expression, displayedExpression, exprAnim]);

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
        duration: TALKING_PULSE_DURATION,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [speaking, pulse]);

  const bubbleScale = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });
  const bubbleTranslateX = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });
  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.18],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });
  const buttonScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.07],
  });

  const handleToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.dialogueRow, stacked && styles.dialogueRowStacked]}>
        <View
          style={[styles.characterWrap, stacked && styles.characterWrapStacked]}
        >
          {speaking && (
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: ringScale }],
                  opacity: ringOpacity,
                },
              ]}
            />
          )}
          <Image
            source={TARA_EXPRESSIONS[displayedExpression]}
            style={styles.characterImage}
            contentFit="contain"
          />
          {fadingExpression && expression !== displayedExpression && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.characterImageOverlay,
                { opacity: exprAnim },
              ]}
            >
              <Image
                source={TARA_EXPRESSIONS[expression]}
                style={styles.characterImageFill}
                contentFit="contain"
              />
            </Animated.View>
          )}
        </View>

        <Animated.View
          style={[
            styles.bubble,
            stacked && styles.bubbleStacked,
            {
              opacity: bubbleAnim,
              transform: [
                { translateX: bubbleTranslateX },
                { scale: bubbleScale },
              ],
            },
          ]}
        >
          <View style={[styles.bubbleTail, stacked && styles.bubbleTailStacked]} />
          <Text style={styles.bubbleName}>TARA</Text>
          <Animated.View style={{ opacity: textAnim }}>
            <Text style={styles.bubbleText}>{displayedMessage}</Text>
          </Animated.View>

          {showSpeech && (
            <Animated.View
              style={[styles.speechRow, { transform: [{ scale: buttonScale }] }]}
            >
              <Pressable
                onPress={handleToggle}
                style={[
                  styles.speechButton,
                  speaking && styles.speechButtonActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={speaking ? "Stop speech" : "Play speech"}
              >
                <Text style={styles.speechIcon}>🔊</Text>
                <Text
                  style={[styles.speechLabel, speaking && styles.speechLabelActive]}
                >
                  {speaking ? "Speaking..." : "Listen"}
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </View>
  );
});

export default Tara;
