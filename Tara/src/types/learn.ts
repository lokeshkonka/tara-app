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
}

/** Detail for each level node on the lesson timeline */
export interface LevelNodeDetail {
  id: string;
  levelNumber: number;
  titleKey: string;
  descriptionKey: string;
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
  descriptionKey: string;
  durationMinutes: number;
  totalLevels: number;
  totalXp: number;
  whyItMattersKey: string;
  learningOutcomes: OutcomeItem[];
  taraQuoteKey: string;
  taraExpression: TaraExpression;
  levels: LevelNodeDetail[];
}

