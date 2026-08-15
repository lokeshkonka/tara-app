import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors, rounded } from "../../theme/theme";

interface StepIndicatorProps {
  currentStep: number; // 1-indexed
  totalSteps?: number;
}

function AnimatedDot({ isActive }: { isActive: boolean }) {
  const [widthAnim] = useState(() => new Animated.Value(isActive ? 28 : 8));
  const [opacityAnim] = useState(() => new Animated.Value(isActive ? 1 : 0.45));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: isActive ? 28 : 8,
        tension: 300,
        friction: 20,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.45,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive, widthAnim, opacityAnim]);

  const backgroundColor = widthAnim.interpolate({
    inputRange: [8, 28],
    outputRange: ["#C5D6C5", colors.primary],
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: widthAnim,
          opacity: opacityAnim,
          backgroundColor,
        },
      ]}
    />
  );
}

export function StepIndicator({
  currentStep,
  totalSteps = 8,
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <AnimatedDot key={step} isActive={step === currentStep} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: rounded.full,
  },
});

export default StepIndicator;
