import type { TaraExpression } from "../components/Tara/Tara.types";

/**
 * Learn module data contracts.
 * These shapes are backend-ready: a real Learn API can return the exact
 * same payload without any frontend changes.
 */
export interface LearnSummary {
  /** XP earned from learning activities today */
  todayXp: number;
}

/** A single bite-sized lesson. Title/description are i18n keys from the backend. */
export interface LearnLesson {
  id: string;
  /** Position of the lesson within its category (1-based level) */
  level: number;
  titleKey: string;
  descriptionKey: string;
  /** Links to a LearnCategory id */
  categoryId: string;
  /** Tara expression shown on the lesson card avatar */
  expression: TaraExpression;
  /** XP awarded on completing the lesson */
  xp: number;
  durationMinutes: number;
  /** 0..1 completion progress */
  progress: number;
  isCompleted: boolean;
  totalLevels?: number;
}

/** Lesson category. `labelKey` is an i18n key; the backend sends keys, not raw text. */
export interface LearnCategory {
  id: string;
  labelKey: string;
  /** MaterialIcon name for the category chip */
  icon: string;
}

/** Individual learning outcome checklist item */
export interface OutcomeItem {
  id: string;
  textKey: string;
  text?: string;
}

/** Detail for each level node on the lesson timeline */
export interface LevelNodeDetail {
  id: string;
  levelNumber: number;
  titleKey: string;
  title?: string;
  descriptionKey: string;
  description?: string;
  durationMinutes: number;
  xp: number;
  status: "completed" | "inProgress" | "available" | "locked";
  progressFraction: number; // 0..1
}

/** Full detailed payload for a selected lesson card */
export interface LearnLessonDetail {
  id: string;
  categoryId: string;
  titleKey: string;
  title?: string;
  descriptionKey: string;
  description?: string;
  durationMinutes: number;
  totalLevels: number;
  totalXp: number;
  whyItMattersKey: string;
  whyItMattersText?: string;
  learningOutcomes: OutcomeItem[];
  taraQuoteKey: string;
  taraQuoteText?: string;
  taraExpression: TaraExpression;
  levels: LevelNodeDetail[];
}

// ─────────────────────────────────────────────
// GENERIC LEVEL STEP & PHASE EXPERIENCE ENGINE
// ─────────────────────────────────────────────

export interface HotspotElement {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  xPercent: number;
  yPercent: number;
}

export interface LearnInteractiveTopicPhase {
  type: "interactiveLearn";
  id: string;
  title: string;
  taraDialogue: string;
  taraExpression?: TaraExpression;
  audioSource?: any;
  diagramType: "soilCrossSection" | "customHotspots";
  hotspots: HotspotElement[];
  completionRequirement: "discoverAll" | "tapAny" | "continueButton";
  promptToProceed?: string;
}

export interface ConceptCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  taraDialogue: string;
  audioSource?: any;
}

export interface TopicExplanationBullet {
  title?: string;
  text: string;
  icon?: string;
}

export interface TopicExplanation {
  title?: string;
  tag?: string;
  description: string;
  bulletPoints?: TopicExplanationBullet[];
}

export interface ConceptCardPhase {
  type: "conceptCards";
  id: string;
  title: string;
  taraDialogue: string;
  taraExpression?: TaraExpression;
  audioSource?: any;
  taraAudio?: any;
  explanation?: TopicExplanation;
  progressiveHighlights?: string[];
  transitionText?: string;
  cards: ConceptCard[];
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  explanation?: string;
  xp?: number;
}

export interface MCQPhase {
  type: "mcq";
  id: string;
  questions: MCQQuestion[];
  taraExpressionCorrect?: TaraExpression;
  taraExpressionIncorrect?: TaraExpression;
  totalXp?: number;
}

export interface MatchPair {
  id: string;
  leftText: string;
  rightText: string;
}

export interface MatchPhase {
  type: "match";
  id: string;
  title: string;
  instructions?: string;
  pairs: MatchPair[];
  xp?: number;
  taraDialogue?: string;
  taraAudio?: any;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: string;
}

export interface ScenarioChallengeOption {
  id: string;
  label: string;
  title?: string;
  text?: string;
  subtitle?: string;
  icon?: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface ScenarioChallengeRound {
  id: string;
  roundNumber: number;
  topic: string;
  prompt: string;
  options: ScenarioChallengeOption[];
}

export interface ScenarioChallengePhase {
  type: "scenarioChallenge";
  id: string;
  title: string;
  subtitle?: string;
  instructions?: string;
  rounds: ScenarioChallengeRound[];
  xp?: number;
  taraDialogue?: string;
  taraAudio?: any;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: string;
}

export interface MemoryConceptPairItem {
  label: string;
  icon: string;
  color?: string;
}

export interface MemoryConceptPair {
  id: string;
  itemA: MemoryConceptPairItem;
  itemB: MemoryConceptPairItem;
  connectionExplanation?: string;
}

export interface MemoryPhase {
  type: "memory";
  id: string;
  title: string;
  instructions?: string;
  pairs: MemoryConceptPair[];
  xp?: number;
  taraDialogue?: string;
  taraAudio?: any;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: string;
}

export interface DecisionChoiceOption {
  id: string;
  label: string;
  text: string;
  isGoodChoice: boolean;
  taraReaction?: string;
}

export interface DecisionChoiceRound {
  id: string;
  roundNumber: number;
  situation: string;
  topic?: string;
  choices: DecisionChoiceOption[];
}

export interface DecisionChoicePhase {
  type: "decisionChoice";
  id: string;
  title: string;
  subtitle?: string;
  instructions?: string;
  rounds: DecisionChoiceRound[];
  xp?: number;
  taraDialogue?: string;
  taraAudio?: any;
  taraExpression?: TaraExpression;
  taraSuccessDialogue?: string;
}

export interface RewardPhase {
  type: "reward";
  id: string;
  xp: number;
  badgeTitle?: string;
  badgeIcon?: string;
  badgeDescription?: string;
  badgeImage?: any;
  taraDialogue: string;
  taraAudio?: any;
  taraExpression?: TaraExpression;
}

export type LevelPhase =
  | LearnInteractiveTopicPhase
  | ConceptCardPhase
  | MatchPhase
  | ScenarioChallengePhase
  | MemoryPhase
  | DecisionChoicePhase
  | MCQPhase
  | RewardPhase;

export interface LevelDefinition {
  id: string;
  lessonId: string;
  levelNumber: number;
  title: string;
  subtitle?: string;
  xpReward: number;
  phases: LevelPhase[];
}



