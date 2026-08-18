import type { TaraExpression } from "../components/Tara/Tara.types";

/**
 * Universal Multi-Lingual Text Dictionary
 */
export interface LocalizedText {
  en: string;
  hi?: string;
  te?: string;
  ml?: string;
}

/**
 * Universal Multi-Lingual Audio URLs (e.g. from Sarvam AI / CDN)
 */
export interface LocalizedAudio {
  enUrl?: string | any;
  hiUrl?: string | any;
  teUrl?: string | any;
  mlUrl?: string | any;
}

/**
 * Helper to resolve LocalizedText to the active app language
 */
export function resolveLocalizedText(
  localized?: LocalizedText | string,
  lang: string = "en"
): string {
  if (!localized) return "";
  if (typeof localized === "string") return localized;
  return (
    localized[lang as keyof LocalizedText] ||
    localized.en ||
    Object.values(localized)[0] ||
    ""
  );
}

/**
 * Helper to resolve LocalizedAudio to active audio URL / asset
 */
export function resolveLocalizedAudio(
  localized?: LocalizedAudio,
  lang: string = "en"
): string | any | undefined {
  if (!localized) return undefined;
  const key = `${lang}Url` as keyof LocalizedAudio;
  return localized[key] || localized.enUrl;
}

// ─────────────────────────────────────────────
// Universal Phase Packages
// ─────────────────────────────────────────────

export interface ConceptCardItemPackage {
  id: string;
  title: LocalizedText | string;
  icon: string;
  color: string;
  taraDialogue: LocalizedText | string;
  taraAudio?: LocalizedAudio;
}

export interface ConceptCardsPhasePackage {
  type: "conceptCards";
  id: string;
  title: LocalizedText | string;
  taraDialogue: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  explanation?: {
    tag?: LocalizedText | string;
    title?: LocalizedText | string;
    description: LocalizedText | string;
    bulletPoints?: {
      title?: LocalizedText | string;
      text: LocalizedText | string;
      icon?: string;
    }[];
  };
  progressiveHighlights?: (LocalizedText | string)[];
  transitionText?: LocalizedText | string;
  cards: ConceptCardItemPackage[];
}

export interface MatchPairPackage {
  id: string;
  leftText: LocalizedText | string;
  rightText: LocalizedText | string;
}

export interface MatchPhasePackage {
  type: "match";
  id: string;
  title: LocalizedText | string;
  instructions?: LocalizedText | string;
  xp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
  pairs: MatchPairPackage[];
}

export interface ScenarioOptionPackage {
  id: string;
  label: string; // "A", "B", "C"
  title?: LocalizedText | string;
  text?: LocalizedText | string;
  subtitle?: LocalizedText | string;
  icon?: string;
  isCorrect: boolean;
  explanation?: LocalizedText | string;
}

export interface ScenarioRoundPackage {
  id: string;
  roundNumber: number;
  topic: LocalizedText | string;
  prompt: LocalizedText | string;
  options: ScenarioOptionPackage[];
}

export interface ScenarioChallengePhasePackage {
  type: "scenarioChallenge";
  id: string;
  title: LocalizedText | string;
  subtitle?: LocalizedText | string;
  instructions?: LocalizedText | string;
  xp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
  rounds: ScenarioRoundPackage[];
}

export interface MemoryPairPackage {
  id: string;
  itemA: { label: LocalizedText | string; icon: string; color?: string };
  itemB: { label: LocalizedText | string; icon: string; color?: string };
  connectionExplanation?: LocalizedText | string;
}

export interface MemoryPhasePackage {
  type: "memory";
  id: string;
  title: LocalizedText | string;
  instructions?: LocalizedText | string;
  xp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
  pairs: MemoryPairPackage[];
}

export interface DecisionChoiceOptionPackage {
  id: string;
  label: string;
  text: LocalizedText | string;
  isGoodChoice: boolean;
  taraReaction?: LocalizedText | string;
}

export interface DecisionChoiceRoundPackage {
  id: string;
  roundNumber: number;
  topic?: LocalizedText | string;
  situation: LocalizedText | string;
  choices: DecisionChoiceOptionPackage[];
}

export interface DecisionChoicePhasePackage {
  type: "decisionChoice";
  id: string;
  title: LocalizedText | string;
  subtitle?: LocalizedText | string;
  instructions?: LocalizedText | string;
  xp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
  rounds: DecisionChoiceRoundPackage[];
}

export interface MCQOptionPackage {
  id: string;
  text: LocalizedText | string;
  isCorrect: boolean;
  explanation?: LocalizedText | string;
}

export interface MCQQuestionPackage {
  id: string;
  question: LocalizedText | string;
  xp: number;
  options: MCQOptionPackage[];
}

export interface MCQPhasePackage {
  type: "mcq";
  id: string;
  totalXp?: number;
  taraExpressionCorrect?: TaraExpression;
  taraExpressionIncorrect?: TaraExpression;
  questions: MCQQuestionPackage[];
}

export interface RewardPhasePackage {
  type: "reward";
  id: string;
  xp: number;
  badgeTitle?: LocalizedText | string;
  badgeIcon?: string;
  badgeDescription?: LocalizedText | string;
  taraDialogue: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
}

export interface InteractiveLearnPhasePackage {
  type: "interactiveLearn";
  id: string;
  title: LocalizedText | string;
  taraDialogue: LocalizedText | string;
  taraExpression?: TaraExpression;
  taraAudio?: LocalizedAudio;
  diagramType: "soilCrossSection" | "customHotspots";
  hotspots?: {
    id: string;
    name: LocalizedText | string;
    icon: string;
    color: string;
    description: LocalizedText | string;
    xPercent: number;
    yPercent: number;
  }[];
  completionRequirement?: "discoverAll" | "tapAny" | "continueButton";
  promptToProceed?: LocalizedText | string;
}

export interface AIInterviewConceptPackage {
  id: string;
  label: LocalizedText | string;
  keywords: (LocalizedText | string)[];
}

export interface AIInterviewQuestionPackage {
  id: string;
  question: LocalizedText | string;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  expectedConcepts: AIInterviewConceptPackage[];
  hint?: LocalizedText | string;
  followUpDialogue?: LocalizedText | string;
  sampleAnswer?: LocalizedText | string;
  passingScore?: number; // Minimum required percentage or minimum concepts (default 60%)
  xp?: number;
}

export interface AIInterviewPhasePackage {
  type: "aiInterview";
  id: string;
  title: LocalizedText | string;
  subtitle?: LocalizedText | string;
  instructions?: LocalizedText | string;
  totalXp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
  questions: AIInterviewQuestionPackage[];
}

export interface FaceVerificationPhasePackage {
  type: "faceVerification";
  id: string;
  title: LocalizedText | string;
  subtitle?: LocalizedText | string;
  instructions?: LocalizedText | string;
  totalXp?: number;
  taraDialogue?: LocalizedText | string;
  taraAudio?: LocalizedAudio;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: LocalizedText | string;
}

export type LevelPhasePackage =
  | InteractiveLearnPhasePackage
  | ConceptCardsPhasePackage
  | MatchPhasePackage
  | ScenarioChallengePhasePackage
  | MemoryPhasePackage
  | DecisionChoicePhasePackage
  | MCQPhasePackage
  | FaceVerificationPhasePackage
  | AIInterviewPhasePackage
  | RewardPhasePackage;

// ─────────────────────────────────────────────
// Level & Lesson Packages
// ─────────────────────────────────────────────

export interface LevelPackageDefinition {
  id: string; // e.g. "soil-level-1"
  levelNumber: number;
  title: LocalizedText;
  subtitle?: LocalizedText;
  xpReward: number;
  durationMinutes: number;
  phases: LevelPhasePackage[];
}

export interface LessonPackageDefinition {
  id: string;
  categoryId: string;
  title: LocalizedText;
  description: LocalizedText;
  whyItMatters: LocalizedText;
  taraQuote: LocalizedText;
  taraExpression: TaraExpression;
  durationMinutes: number;
  totalXp: number;
  learningOutcomes: {
    id: string;
    text: LocalizedText;
  }[];
  badgeReward: {
    id: string;
    title: LocalizedText;
    icon: string;
    description: LocalizedText;
  };
  levels: LevelPackageDefinition[];
}
