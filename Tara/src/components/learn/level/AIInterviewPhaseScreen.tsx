import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTranslation } from "../../../hooks/useTranslation";
import { aiInterviewService } from "../../../services";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type {
  AIInterviewEvaluationResult,
  AIInterviewPhase,
  AIInterviewQuestion,
} from "../../../types/learn";
import type { TaraExpression } from "../../Tara/Tara.types";
import { TaraMessageCard } from "../../tara-messages/TaraMessageCard";
import { TactileButton } from "../../ui/TactileButton";

interface AIInterviewPhaseScreenProps {
  phase: AIInterviewPhase;
  onCompletePhase: (result?: { score: number; conceptsIdentified: string[] }) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const AIInterviewPhaseScreen: React.FC<AIInterviewPhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const { lang } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  const totalQuestions = phase.questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Input states
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Evaluation & Results
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] =
    useState<AIInterviewEvaluationResult | null>(null);
  const [allIdentifiedConcepts, setAllIdentifiedConcepts] = useState<string[]>([]);
  const [accumulatedScores, setAccumulatedScores] = useState<number[]>([]);

  // Animations
  const questionFadeAnim = useRef(new Animated.Value(1)).current;
  const feedbackFadeAnim = useRef(new Animated.Value(0)).current;
  const feedbackTranslateY = useRef(new Animated.Value(20)).current;
  const micPulseAnim = useRef(new Animated.Value(1)).current;
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion: AIInterviewQuestion =
    phase.questions[currentQuestionIndex] ?? phase.questions[0];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const questionXp = currentQuestion?.xp ?? phase.totalXp ?? 30;

  // Pulsing animation when recording voice
  useEffect(() => {
    let pulseLoop: Animated.CompositeAnimation | null = null;
    if (isRecording) {
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(micPulseAnim, {
            toValue: 1.25,
            duration: 650,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(micPulseAnim, {
            toValue: 1,
            duration: 650,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
    } else {
      micPulseAnim.setValue(1);
    }
    return () => {
      pulseLoop?.stop();
    };
  }, [isRecording, micPulseAnim]);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    setIsRecording(true);
    setEvaluationResult(null);
  };

  const handleStopRecordingAndSubmit = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    setIsRecording(false);
    setIsEvaluating(true);

    // Transcribe simulated audio
    const transcribed = await aiInterviewService.transcribeAudio(
      "mock_uri.m4a",
      lang
    );
    setTextInput(transcribed);
    await evaluateAnswer(transcribed);
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim() || isEvaluating) return;
    Keyboard.dismiss();
    setIsEvaluating(true);
    await evaluateAnswer(textInput);
  };

  const evaluateAnswer = async (responseContent: string) => {
    const result = await aiInterviewService.evaluateAnswer(
      currentQuestion,
      responseContent,
      lang
    );

    setEvaluationResult(result);
    setIsEvaluating(false);

    if (result.passed) {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}
      setAllIdentifiedConcepts((prev) => [
        ...new Set([...prev, ...result.detectedConcepts]),
      ]);
      setAccumulatedScores((prev) => [...prev, result.score]);
    } else {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch {}
    }

    // Animate feedback appearance
    feedbackFadeAnim.setValue(0);
    feedbackTranslateY.setValue(20);
    Animated.parallel([
      Animated.timing(feedbackFadeAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(feedbackTranslateY, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-scroll to feedback view
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const handleTryAgain = () => {
    setEvaluationResult(null);
    feedbackFadeAnim.setValue(0);
    feedbackTranslateY.setValue(20);
    if (inputMode === "voice") {
      setTextInput("");
    }
  };

  const animateToNextQuestion = useCallback(
    (nextIndex: number) => {
      questionFadeAnim.setValue(0);
      setCurrentQuestionIndex(nextIndex);
      setTextInput("");
      setEvaluationResult(null);
      feedbackFadeAnim.setValue(0);
      feedbackTranslateY.setValue(20);

      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [questionFadeAnim, feedbackFadeAnim, feedbackTranslateY]
  );

  const handleContinue = () => {
    if (isLastQuestion) {
      const avgScore =
        accumulatedScores.length > 0
          ? Math.round(
              accumulatedScores.reduce((a, b) => a + b, 0) /
                accumulatedScores.length
            )
          : 85;
      onCompletePhase({
        score: avgScore,
        conceptsIdentified: allIdentifiedConcepts,
      });
    } else {
      animateToNextQuestion(currentQuestionIndex + 1);
    }
  };

  // Derive Tara mentor state
  const isPassed = evaluationResult?.passed ?? false;
  const hasResult = evaluationResult !== null;

  const taraExpression: TaraExpression = hasResult
    ? isPassed
      ? "excited"
      : "thinking"
    : isRecording
    ? "listening"
    : currentQuestion.taraExpression || "thinking";

  const taraTitle = hasResult
    ? isPassed
      ? "Concept Mastered!"
      : "Let's Reflect"
    : isRecording
    ? "I'm Listening..."
    : "Tara's AI Interview";

  const taraMessage = hasResult
    ? evaluationResult?.feedbackText
    : currentQuestion?.taraDialogue ||
      "Explain this concept in your own words. You can speak or type your answer!";

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Progress & Header */}
        <View style={styles.progressHeader}>
          <View style={styles.progressPill}>
            <MaterialIcons name="record-voice-over" size={15} color={colors.primary} />
            <Text style={styles.progressPillText}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
          </View>
          <View style={styles.xpPill}>
            <MaterialIcons name="stars" size={15} color={colors.tertiary} />
            <Text style={styles.xpPillText}>+{questionXp} XP</Text>
          </View>
        </View>

        {/* Question Step Indicator Dots */}
        {totalQuestions > 1 && (
          <View style={styles.dotRow}>
            {phase.questions.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === currentQuestionIndex && styles.dotActive,
                  idx < currentQuestionIndex && styles.dotCompleted,
                ]}
              />
            ))}
          </View>
        )}

        {/* Tara Dialogue & Mentor Box */}
        <Animated.View style={[styles.taraWrapper, { opacity: questionFadeAnim }]}>
          <TaraMessageCard
            title={taraTitle}
            expression={taraExpression}
            message={taraMessage}
            audioSource={
              hasResult && isPassed
                ? (phase.taraSuccessAudioSource || undefined)
                : !hasResult
                ? (currentQuestion?.audioSource || currentQuestion?.taraAudio || phase.audioSource || phase.taraAudio)
                : undefined
            }
            autoPlay={true}
            showVoiceControl={Boolean(
              hasResult && isPassed
                ? phase.taraSuccessAudioSource
                : !hasResult && (currentQuestion?.audioSource || currentQuestion?.taraAudio || phase.audioSource || phase.taraAudio)
            )}
          />
        </Animated.View>

        {/* Question Prompt Card */}
        <Animated.View style={[styles.questionCard, { opacity: questionFadeAnim }]}>
          <View style={styles.questionBadgeRow}>
            <MaterialIcons name="psychology" size={18} color={colors.primary} />
            <Text style={styles.questionCategoryLabel}>ORAL CONCEPT CHECK</Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </Animated.View>

        {/* Input Mode Switcher (Voice vs Text) */}
        {!hasResult && (
          <View style={styles.modeToggleRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.modeTab,
                inputMode === "voice" && styles.modeTabActive,
              ]}
              onPress={() => {
                if (isRecording) setIsRecording(false);
                setInputMode("voice");
              }}
            >
              <MaterialIcons
                name="mic"
                size={18}
                color={inputMode === "voice" ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.modeTabText,
                  inputMode === "voice" && styles.modeTabTextActive,
                ]}
              >
                Voice Answer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.modeTab,
                inputMode === "text" && styles.modeTabActive,
              ]}
              onPress={() => {
                if (isRecording) setIsRecording(false);
                setInputMode("text");
              }}
            >
              <MaterialIcons
                name="edit"
                size={18}
                color={inputMode === "text" ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.modeTabText,
                  inputMode === "text" && styles.modeTabTextActive,
                ]}
              >
                Type Answer
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Voice Recording Card */}
        {inputMode === "voice" && !hasResult && (
          <View style={styles.voiceRecordCard}>
            <Text style={styles.voiceInstructions}>
              {isRecording
                ? "Listening... Speak clearly into your microphone."
                : "Tap the microphone below and explain your answer to Tara."}
            </Text>

            <View style={styles.micCircleContainer}>
              {isRecording && (
                <Animated.View
                  style={[
                    styles.micPulseRing,
                    { transform: [{ scale: micPulseAnim }] },
                  ]}
                />
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.micButton,
                  isRecording && styles.micButtonRecording,
                ]}
                onPress={
                  isRecording
                    ? handleStopRecordingAndSubmit
                    : handleStartRecording
                }
                accessibilityRole="button"
                accessibilityLabel={
                  isRecording ? "Stop Recording" : "Start Voice Recording"
                }
              >
                <MaterialIcons
                  name={isRecording ? "stop" : "mic"}
                  size={36}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {isRecording ? (
              <View style={styles.recordingTimerPill}>
                <View style={styles.recordRedDot} />
                <Text style={styles.recordingTimerText}>
                  00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                </Text>
              </View>
            ) : (
              <Text style={styles.micTapHint}>Tap to Start Speaking</Text>
            )}
          </View>
        )}

        {/* Text Input Area */}
        {inputMode === "text" && !hasResult && (
          <View style={styles.textInputCard}>
            <TextInput
              style={styles.textInputField}
              multiline={true}
              numberOfLines={4}
              placeholder="Type your explanation here (mention key elements like soil organisms, pore spaces, organic matter)..."
              placeholderTextColor={colors.outline}
              value={textInput}
              onChangeText={setTextInput}
              maxLength={400}
              textAlignVertical="top"
            />
            <View style={styles.textInputMetaRow}>
              <Text style={styles.charCountText}>
                {textInput.length}/400 characters
              </Text>
              {textInput.length > 0 && (
                <TouchableOpacity
                  onPress={() => setTextInput("")}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.clearTextButton}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Evaluating Spinner */}
        {isEvaluating && (
          <View style={styles.evaluatingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.evaluatingTitle}>Analyzing Your Response...</Text>
            <Text style={styles.evaluatingSubtitle}>
              Tara is detecting agricultural concepts and reasoning.
            </Text>
          </View>
        )}

        {/* Evaluation Results Card */}
        {hasResult && evaluationResult && (
          <Animated.View
            style={[
              styles.feedbackCard,
              isPassed
                ? styles.feedbackCardCorrect
                : styles.feedbackCardWarning,
              {
                opacity: feedbackFadeAnim,
                transform: [{ translateY: feedbackTranslateY }],
              },
            ]}
          >
            {/* Score & Header */}
            <View style={styles.feedbackHeaderRow}>
              <View
                style={[
                  styles.feedbackIconBadge,
                  isPassed
                    ? styles.feedbackIconCorrect
                    : styles.feedbackIconWarning,
                ]}
              >
                <MaterialIcons
                  name={isPassed ? "check-circle" : "lightbulb"}
                  size={24}
                  color={isPassed ? "#1B5E20" : "#B45309"}
                />
              </View>
              <View style={styles.feedbackTitleStack}>
                <Text
                  style={[
                    styles.feedbackTitleText,
                    isPassed
                      ? styles.feedbackTitleCorrect
                      : styles.feedbackTitleWarning,
                  ]}
                >
                  {isPassed ? "Concept Verified!" : "Concept Suggestions"}
                </Text>
                <Text style={styles.feedbackScoreText}>
                  Score: {evaluationResult.score}% Concept Alignment
                </Text>
              </View>
            </View>

            {/* Answer Transcription Snippet */}
            {textInput.length > 0 && (
              <View style={styles.transcriptQuoteBox}>
                <MaterialIcons name="format-quote" size={18} color={colors.outline} />
                <Text style={styles.transcriptQuoteText} numberOfLines={3}>
                  "{textInput}"
                </Text>
              </View>
            )}

            {/* Concept Detection Breakdown Chips */}
            <View style={styles.conceptBreakdownContainer}>
              <Text style={styles.conceptBreakdownTitle}>
                Expected Concepts Breakdown:
              </Text>
              <View style={styles.conceptChipGrid}>
                {currentQuestion.expectedConcepts.map((concept) => {
                  const isDetected = evaluationResult.detectedConcepts.includes(
                    concept.label
                  );
                  return (
                    <View
                      key={concept.id}
                      style={[
                        styles.conceptChip,
                        isDetected
                          ? styles.conceptChipDetected
                          : styles.conceptChipMissed,
                      ]}
                    >
                      <MaterialIcons
                        name={isDetected ? "check" : "add"}
                        size={14}
                        color={isDetected ? "#1B5E20" : "#B45309"}
                      />
                      <Text
                        style={[
                          styles.conceptChipText,
                          isDetected
                            ? styles.conceptChipTextDetected
                            : styles.conceptChipTextMissed,
                        ]}
                      >
                        {concept.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.fixedBottomContainer}>
        {!hasResult ? (
          inputMode === "text" ? (
            <TactileButton
              title="Submit Answer"
              icon="send"
              iconPosition="right"
              faceColor={textInput.trim() ? colors.primaryContainer : colors.surfaceDim}
              depthColor={
                textInput.trim()
                  ? colors.onPrimaryFixedVariant
                  : componentColors.cardEdge
              }
              textColor={
                textInput.trim()
                  ? colors.surfaceContainerLowest
                  : colors.onSurfaceVariant
              }
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={handleTextSubmit}
              disabled={!textInput.trim() || isEvaluating}
            />
          ) : (
            <TactileButton
              title={isRecording ? "Finish Speaking" : "Start Speaking"}
              icon={isRecording ? "stop" : "mic"}
              iconPosition="left"
              faceColor={isRecording ? colors.error : colors.primaryContainer}
              depthColor={
                isRecording ? "#991B1B" : colors.onPrimaryFixedVariant
              }
              textColor="#FFFFFF"
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={
                isRecording
                  ? handleStopRecordingAndSubmit
                  : handleStartRecording
              }
              disabled={isEvaluating}
            />
          )
        ) : (
          <TactileButton
            title={
              isPassed
                ? isLastQuestion
                  ? "Complete Interview"
                  : "Next Question"
                : "Try Again"
            }
            icon={isPassed ? "arrow-forward" : "refresh"}
            iconPosition="right"
            faceColor={
              isPassed ? colors.primaryContainer : colors.tertiaryContainer
            }
            depthColor={
              isPassed
                ? colors.onPrimaryFixedVariant
                : colors.onTertiaryFixedVariant
            }
            textColor={colors.surfaceContainerLowest}
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={isPassed ? handleContinue : handleTryAgain}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: 140,
  },

  // Progress Header
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.stackSm,
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: componentColors.chipPositiveBackground,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 2,
    borderBottomColor: componentColors.chipPositiveEdge,
  },
  progressPillText: {
    ...typography.labelLg,
    fontSize: 12,
    fontWeight: "700",
    color: componentColors.chipPositiveText,
    letterSpacing: 0.3,
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(205, 167, 33, 0.35)",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(205, 167, 33, 0.5)",
  },
  xpPillText: {
    ...typography.labelLg,
    fontSize: 12,
    fontWeight: "800",
    color: colors.tertiary,
    letterSpacing: 0.3,
  },

  // Step Indicators
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: spacing.stackMd,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceContainerHigh,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryContainer,
  },
  dotCompleted: {
    backgroundColor: colors.primary,
  },

  // Tara Wrapper
  taraWrapper: {
    marginBottom: spacing.stackMd,
  },

  // Question Card
  questionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.gutter,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    marginBottom: spacing.stackMd,
  },
  questionBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  questionCategoryLabel: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.6,
  },
  questionText: {
    ...typography.headlineMd,
    fontSize: 16.5,
    fontWeight: "700",
    color: colors.onSurface,
    lineHeight: 25,
  },

  // Mode Switcher
  modeToggleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: spacing.stackMd,
  },
  modeTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
  },
  modeTabActive: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  modeTabText: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  modeTabTextActive: {
    color: colors.primary,
    fontWeight: "800",
  },

  // Voice Card
  voiceRecordCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.gutter * 1.2,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackMd,
  },
  voiceInstructions: {
    ...typography.bodyMd,
    fontSize: 13.5,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  micCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  micPulseRing: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(220, 38, 38, 0.2)",
  },
  micButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  micButtonRecording: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
  },
  micTapHint: {
    ...typography.labelSm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  recordingTimerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  recordRedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  recordingTimerText: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "800",
    color: colors.error,
  },

  // Text Input Card
  textInputCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.gutter,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    marginBottom: spacing.stackMd,
  },
  textInputField: {
    ...typography.bodyMd,
    fontSize: 14.5,
    color: colors.onSurface,
    lineHeight: 22,
    minHeight: 90,
  },
  textInputMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    paddingTop: 6,
  },
  charCountText: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors.outline,
  },
  clearTextButton: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.error,
  },

  // Evaluating
  evaluatingCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.gutter * 1.5,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.stackMd,
  },
  evaluatingTitle: {
    ...typography.headlineMd,
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  evaluatingSubtitle: {
    ...typography.bodyMd,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },

  // Feedback Card
  feedbackCard: {
    marginTop: spacing.stackSm,
    padding: spacing.gutter,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    marginBottom: spacing.stackMd,
  },
  feedbackCardCorrect: {
    backgroundColor: componentColors.chipPositiveBackground,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomColor: componentColors.chipPositiveEdge,
  },
  feedbackCardWarning: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
    borderBottomColor: "#D97706",
  },
  feedbackHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  feedbackIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackIconCorrect: {
    backgroundColor: componentColors.chipPositiveBackground,
  },
  feedbackIconWarning: {
    backgroundColor: "#FDE68A",
  },
  feedbackTitleStack: {
    flex: 1,
  },
  feedbackTitleText: {
    ...typography.labelLg,
    fontSize: 15.5,
    fontWeight: "800",
  },
  feedbackTitleCorrect: {
    color: "#1B5E20",
  },
  feedbackTitleWarning: {
    color: "#92400E",
  },
  feedbackScoreText: {
    ...typography.bodyMd,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    fontWeight: "600",
  },

  transcriptQuoteBox: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: rounded.md,
    marginTop: 12,
  },
  transcriptQuoteText: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurface,
    fontStyle: "italic",
    flex: 1,
  },

  conceptBreakdownContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.08)",
  },
  conceptBreakdownTitle: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: 8,
  },
  conceptChipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  conceptChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
  },
  conceptChipDetected: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },
  conceptChipMissed: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },
  conceptChipText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
  },
  conceptChipTextDetected: {
    color: "#166534",
  },
  conceptChipTextMissed: {
    color: "#92400E",
  },

  // Fixed Bottom CTA
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackLg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
});
