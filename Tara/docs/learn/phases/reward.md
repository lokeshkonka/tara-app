# Component: RewardPhase

## Purpose
The celebratory culmination of a completed Level, rewarding the learner with Green XP, unlocking badges/achievements, showing updated lesson progress, and providing an immediate CTA to the next unlocked level.

## Responsibilities
- Display celebratory celebration graphics and `AtmosphericGlow` ambient light.
- Present total XP earned from this level with number bounce animation.
- Render newly unlocked Badge or Award cards.
- Show updated lesson progression progress bar (`Level 1 / 3 complete`).
- Offer two clear actions:
  1. Primary: **"Continue to Level X"** (advances directly to next level).
  2. Secondary: **"Back to Lesson"** (returns to timeline).

## Non-responsibilities
- Deciding which level to unlock next (derived from progress model).

## Props & Contract

```typescript
export interface RewardPhaseProps {
  /** Lesson title */
  lessonTitle: string;
  /** Completed level number */
  levelNumber: number;
  /** Total levels in lesson */
  totalLevels: number;
  /** XP awarded */
  earnedXp: number;
  /** Unlocked badge info if applicable */
  badge?: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  /** Next level metadata if available */
  nextLevel?: {
    id: string;
    levelNumber: number;
    title: string;
  };
  /** Callback to start next level */
  onContinueToNextLevel?: (nextLevelId: string) => void;
  /** Callback to return to timeline */
  onBackToLesson: () => void;
}
```

## Visual Layout
```text
🎉 LEVEL COMPLETE!
SOIL BASICS

+90 XP Earned
🌱 SOIL STARTER Badge Unlocked

LESSON PROGRESS
Level 1 / 3 complete
●━━━━○━━━━○

Next: LEVEL 2 · Feed Your Soil
[Continue to Level 2]
[Back to Lesson]
```

## Design System Alignment
- XP Callout: Warm Yellow reward tokens (`tertiaryContainer` `#CDA721`, text `#002204`).
- Primary CTA: `TactileButton` with primary container green face.
- Secondary CTA: Ghost text button with `outlineVariant` border.
