import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors, componentColors } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";

type TaraHomeBannerProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

export default function TaraHomeBanner({
  onPress,
  style,
}: TaraHomeBannerProps) {
  const { t } = useTranslation();
  const taraFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(taraFloat, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(taraFloat, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [taraFloat]);

  const taraTranslateX = taraFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <ImageBackground
        source={require("../../../assets/Home-assets/home-banner.png")}
        style={styles.banner}
        imageStyle={styles.bannerImage}
        resizeMode="cover"
      >
        {/* Left content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            {t("banner.title")}
            <Text style={styles.leaf}> 🌱</Text>
          </Text>

          <Text style={styles.subtitle}>
            {t("banner.subtitle")}
          </Text>
        </View>

        {/* TARA — gently swaying */}
        <Animated.Image
          source={require("../../../assets/tara/tara-expressions/winking.png")}
          style={[
            styles.tara,
            { transform: [{ translateX: taraTranslateX }] },
          ]}
          resizeMode="contain"
        />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 122,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E7F1DF",

    // Soft elevation
    shadowColor: "#285C2E",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  banner: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
  },

  bannerImage: {
    borderRadius: 16,
  },

  content: {
    position: "absolute",
    left: 18,
    top: 25,
    zIndex: 2,
  },

  title: {
    color: componentColors.sectionTitle,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: -0.25,
  },

  leaf: {
    fontSize: 12,
  },

  subtitle: {
    marginTop: 7,
    color: colors.onSurfaceVariant,
    fontSize: 9.5,
    lineHeight: 13,
    fontWeight: "400",
  },

  tara: {
    position: "absolute",

    // Places Tara on the right side
    right: 25,
    bottom: -1,

    width: 125,
    height: 120,

    zIndex: 3,
  },
});
