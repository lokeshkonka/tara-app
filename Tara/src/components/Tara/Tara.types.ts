import type { AudioSource } from "expo-audio";

export type TaraExpression =
  | "excited"
  | "happy"
  | "hi-wave"
  | "laughing"
  | "listening"
  | "neutral"
  | "sad"
  | "surprised"
  | "thinking"
  | "winking";

export interface TaraProps {
  expression: TaraExpression;
  message: string;
  audioSource: AudioSource;
  showSpeech?: boolean;
  autoPlay?: boolean;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
}

export interface TaraHandle {
  play: () => void;
  stop: () => void;
  duration: number | null;
}
