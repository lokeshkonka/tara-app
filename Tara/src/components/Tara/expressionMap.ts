import type { ImageSource } from "expo-image";
import type { TaraExpression } from "./Tara.types";

export const TARA_EXPRESSIONS: Record<TaraExpression, ImageSource> = {
  excited: require("../../../assets/tara/tara-expressions/Excited.png"),
  happy: require("../../../assets/tara/tara-expressions/happy.png"),
  "hi-wave": require("../../../assets/tara/tara-expressions/hi-wave.png"),
  laughing: require("../../../assets/tara/tara-expressions/laughing.png"),
  listening: require("../../../assets/tara/tara-expressions/listening.png"),
  neutral: require("../../../assets/tara/tara-expressions/neutral.png"),
  sad: require("../../../assets/tara/tara-expressions/sad.png"),
  surprised: require("../../../assets/tara/tara-expressions/surprised.png"),
  thinking: require("../../../assets/tara/tara-expressions/thinking.png"),
};

export const TARA_EXPRESSION_KEYS: TaraExpression[] = [
  "neutral",
  "happy",
  "thinking",
  "excited",
  "surprised",
  "sad",
  "laughing",
  "listening",
  "hi-wave",
];
