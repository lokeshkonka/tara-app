import React, { useMemo } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, componentColors, rounded } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";
import { useTranslation } from "../../hooks/useTranslation";

type CommunityBannerProps = {
  onExplore?: () => void;
};

export default function CommunityBanner({ onExplore }: CommunityBannerProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Home-assets/commuinity-banner.png")}
        style={styles.banner}
        imageStyle={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t("community.title")}</Text>
          <Text style={styles.description}>{t("community.description")}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TactileButton 
            title="" 
            onPress={onExplore || (() => {})} 
            variant="primary"
            height={40}
            depth={3}
            borderRadius={20}
            paddingHorizontal={0}
            icon="arrow-forward"
            iconPosition="left"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 122,
    borderRadius: rounded.lg,
    overflow: "hidden",
    backgroundColor: "#F0F4E8",
    shadowColor: "#285C2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  banner: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    flexDirection: "row",
    alignItems: "center",
  },
  bannerImage: {
    borderRadius: rounded.lg,
  },
  content: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 12,
  },
  buttonContainer: {
    paddingRight: 18,
    width: 58,
  },
  title: {
    color: componentColors.sectionTitle,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: -0.25,
  },
  description: {
    marginTop: 6,
    color: colors.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "400",
  },
});
