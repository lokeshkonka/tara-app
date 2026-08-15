import { StyleSheet } from "react-native";

export const TaraColors = {
  primaryGreen: "#2E7D32",
  darkGreen: "#1B5E20",
  lightGreen: "#E8F5E9",
  softGreen: "#C8E6C9",
  yellow: "#FFC107",
  cream: "#FFFBF0",
  white: "#FFFFFF",
  textDark: "#3E2F1C",
  textMuted: "#8A7A5C",
} as const;

export const taraStyles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  dialogueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogueRowStacked: {
    flexDirection: "column",
    alignItems: "center",
  },
  characterWrap: {
    width: "42%",
    maxWidth: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  characterWrapStacked: {
    width: "58%",
    maxWidth: 200,
    marginBottom: 16,
  },
  characterImage: {
    width: "100%",
    aspectRatio: 0.82,
  },
  characterImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  characterImageFill: {
    width: "100%",
    height: "100%",
  },
  pulseRing: {
    position: "absolute",
    width: "80%",
    aspectRatio: 1,
    borderRadius: "50%",
    borderWidth: 4,
    borderColor: TaraColors.yellow,
    backgroundColor: "rgba(255, 235, 59, 0.25)",
  },
  bubble: {
    flex: 1,
    minHeight: 150,
    marginLeft: 14,
    backgroundColor: TaraColors.cream,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#5B4A2A",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  bubbleStacked: {
    flex: 0,
    width: "100%",
    marginLeft: 0,
  },
  bubbleTail: {
    position: "absolute",
    left: -8,
    top: 26,
    width: 16,
    height: 16,
    backgroundColor: TaraColors.cream,
    transform: [{ rotate: "45deg" }],
  },
  bubbleTailStacked: {
    left: "50%",
    marginLeft: -8,
    top: -8,
  },
  bubbleName: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2.5,
    color: TaraColors.primaryGreen,
    marginBottom: 6,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
    color: TaraColors.textDark,
  },
  speechRow: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  speechButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    backgroundColor: TaraColors.yellow,
  },
  speechButtonActive: {
    backgroundColor: TaraColors.primaryGreen,
  },
  speechIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  speechLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: TaraColors.darkGreen,
  },
  speechLabelActive: {
    color: TaraColors.white,
  },
});
