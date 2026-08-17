# Component: PracticePhase

## Purpose
The hands-on interactive game phase that provides kinetic, gamified reinforcement of farming concepts.

## Responsibilities
- Act as the activity dispatcher for mini-game activities configured in level data.
- Support 3 core activity engines:
  1. **`MatchActivity`**: Tap pairs between left column and right column (e.g. soil component $\to$ function).
  2. **`SortActivity`**: Categorize items into appropriate buckets (e.g. "Good for Soil" vs "Not for Soil").
  3. **`MemoryActivity`**: Reveal and match identical concept card pairs.
- Track activity completion status and celebrate upon puzzle resolution.
- Support multi-activity sequences if a level specifies more than one practice game.

## Non-responsibilities
- Hardcoding game terms, pair relationships, or category buckets.

## Props & Contract

```typescript
export interface PracticePhaseProps {
  /** Array of practice activity configurations */
  activities: PracticeActivityDefinition[];
  /** Callback triggered when all activities are successfully completed */
  onComplete: () => void;
}
```

## Practice Activity Definition
```typescript
export type PracticeActivityType = "match" | "sort" | "memory";

export interface PracticeActivityDefinition {
  id: string;
  type: PracticeActivityType;
  titleKey: string;
  instructionsKey: string;
  matchData?: {
    pairs: { id: string; leftTextKey: string; rightTextKey: string }[];
  };
  sortData?: {
    categories: { id: string; titleKey: string }[];
    items: { id: string; textKey: string; targetCategoryId: string }[];
  };
  memoryData?: {
    pairs: { id: string; labelKey: string; icon: string }[];
  };
}
```

## Supported Mini-Games
1. **Match**: Learner selects item in Column A (turns active green), then taps matching item in Column B. Successful matches link with animated green checkmarks.
2. **Sort**: Learner drags/taps an item card and assigns it to Category 1 or Category 2. Immediate tactile haptic feedback confirms placement.
3. **Memory**: Grid of flipped cards. Tapping two cards reveals their illustrations; matching cards remain face-up.
