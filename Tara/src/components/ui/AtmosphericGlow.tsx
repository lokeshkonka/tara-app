import React, { useEffect, useId, useMemo } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Defs, G, RadialGradient, Rect, Stop } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export interface AtmosphericGlowProps {
  size?: number;
  width?: number;
  height?: number;
  opacity?: number;
  tintColor?: string;
  showParticles?: boolean;
  particleDensity?: "low" | "medium" | "high";
  animated?: boolean;
  /** When true, pulses in a dynamic rhythmic speech beat cadence */
  isSpeaking?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface Particle {
  id: string;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

/**
 * AtmosphericGlow
 * High-performance atmospheric green glow with live voice audio speech beat animation.
 */
export function AtmosphericGlow({
  size = 480,
  width,
  height,
  opacity = 0.95,
  tintColor = "#4CAF50",
  showParticles = true,
  particleDensity = "medium",
  animated = true,
  isSpeaking = false,
  style,
}: AtmosphericGlowProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const gradientId = `tara-atmosphere-${uniqueId}`;

  const glowWidth = width ?? size;
  const glowHeight = height ?? size;

  const particleCount = useMemo(() => {
    switch (particleDensity) {
      case "high":
        return 45;
      case "low":
        return 18;
      case "medium":
      default:
        return 28;
    }
  }, [particleDensity]);

  const particles = useMemo<Particle[]>(() => {
    if (!showParticles) return [];

    const result: Particle[] = [];
    const centerX = glowWidth * 0.5;
    const centerY = glowHeight * 0.46;
    const maxRadius = Math.min(glowWidth, glowHeight) * 0.46;

    for (let i = 0; i < particleCount; i++) {
      const randomA = Math.abs(Math.sin(i * 91.731 + glowWidth * 0.171)) % 1;
      const randomB = Math.abs(Math.cos(i * 47.213 + glowHeight * 0.237)) % 1;
      const randomC = Math.abs(Math.sin(i * 13.719 + glowWidth * 0.319)) % 1;
      const randomD = Math.abs(Math.cos(i * 27.113 + glowHeight * 0.413)) % 1;

      const distance = Math.sqrt(randomA) * maxRadius;
      const angle = randomB * Math.PI * 2;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      const normalizedDistance = distance / maxRadius;
      const edgeFade = Math.pow(Math.max(0, 1 - normalizedDistance), 1.35);

      const particleOpacity = 0.06 + edgeFade * 0.22 + randomC * 0.04;
      const radius = 0.8 + randomD * 1.5;

      result.push({
        id: `particle-${i}`,
        cx: Number(x.toFixed(1)),
        cy: Number(y.toFixed(1)),
        r: Number(radius.toFixed(1)),
        opacity: Number(particleOpacity.toFixed(3)),
      });
    }

    return result;
  }, [glowWidth, glowHeight, particleCount, showParticles]);

  // Calm ambient breathing animation
  const pulse = useSharedValue(0);
  // Dynamic audio speech beat pulse
  const speechBeat = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    pulse.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [animated, pulse]);

  useEffect(() => {
    if (isSpeaking) {
      // Dynamic organic speech cadence wave
      speechBeat.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 260, easing: Easing.out(Easing.quad) }),
          withTiming(0.35, { duration: 220, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.85, { duration: 280, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 340, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      );
    } else {
      speechBeat.value = withTiming(0, { duration: 300 });
    }
  }, [isSpeaking, speechBeat]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!animated) return {};
    const ambientScale = 1 + pulse.value * 0.015;
    const speechScaleBoost = speechBeat.value * 0.12;
    const totalScale = ambientScale + speechScaleBoost;

    const ambientOpacity = opacity * (0.90 + pulse.value * 0.10);
    const speechOpacityBoost = speechBeat.value * 0.22;
    const totalOpacity = Math.min(1, ambientOpacity + speechOpacityBoost);

    return {
      opacity: totalOpacity,
      transform: [{ scale: totalScale }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          width: glowWidth,
          height: glowHeight,
          opacity: animated ? undefined : opacity,
        },
        animated && animatedStyle,
        style,
      ]}
    >
      <Svg
        width={glowWidth}
        height={glowHeight}
        viewBox={`0 0 ${glowWidth} ${glowHeight}`}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <RadialGradient
            id={gradientId}
            cx="50%"
            cy="46%"
            r="63%"
            fx="50%"
            fy="46%"
          >
            <Stop offset="0%" stopColor={tintColor} stopOpacity={0.60} />
            <Stop offset="12%" stopColor={tintColor} stopOpacity={0.48} />
            <Stop offset="25%" stopColor={tintColor} stopOpacity={0.34} />
            <Stop offset="40%" stopColor={tintColor} stopOpacity={0.20} />
            <Stop offset="55%" stopColor={tintColor} stopOpacity={0.10} />
            <Stop offset="70%" stopColor={tintColor} stopOpacity={0.04} />
            <Stop offset="85%" stopColor={tintColor} stopOpacity={0.01} />
            <Stop offset="100%" stopColor={tintColor} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* Ambient diffused atmospheric glow */}
        <Rect
          x={0}
          y={0}
          width={glowWidth}
          height={glowHeight}
          fill={`url(#${gradientId})`}
        />

        {/* High performance particle field in single SVG layer */}
        {showParticles && (
          <G>
            {particles.map((particle) => (
              <Circle
                key={particle.id}
                cx={particle.cx}
                cy={particle.cy}
                r={particle.r}
                fill={tintColor}
                fillOpacity={particle.opacity}
              />
            ))}
          </G>
        )}
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
});

export default AtmosphericGlow;