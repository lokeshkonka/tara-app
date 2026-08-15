import type { AudioSource } from "expo-audio";
import type { TaraExpression } from "../../components/Tara/Tara.types";

export interface TaraLanguageMessage {
  message: string;
  expression: TaraExpression;
  audio: AudioSource;
}

/**
 * Dummy TARA greeting shown on the language-selection screen.
 * Replace the audio source with backend TTS later without changing the UI.
 */
export const TARA_LANGUAGE_MESSAGE: TaraLanguageMessage = {
  message:
    "Namaste! I'm Tara. Please choose your preferred language so I can guide you better.",
  expression: "hi-wave",
  audio: require("../../../assets/dummy_voices/english-speech.mp3"),
};
