# Component: LessonOverview

## Purpose
Provides contextual learning motivation by rendering the **"Why It Matters"** card and the **"What You'll Learn"** key outcomes checklist.

## Responsibilities
- Display real-world farming value statement from `lesson.whyItMattersKey`.
- Render learning outcome checkpoints with soft-green checkmark icons from `lesson.learningOutcomes`.
- Integrate an optional Tara supportive quote or visual callout.

## Non-responsibilities
- Hardcoding outcome bullet points (all come from lesson data array).
- Displaying level timeline nodes.

## Props & Contract

```typescript
export interface LessonOverviewProps {
  /** "Why it matters" narrative body text */
  whyItMatters: string;
  /** Array of learning outcomes */
  learningOutcomes: string[];
  /** Optional Tara message */
  taraNote?: {
    expression: TaraExpression;
    text: string;
  };
}
```

## Design System Alignment
- Containers: `SurfaceContainerLowest` (`#FFFFFF`) with `1.5px` border `#BECAB9` and `3px` bottom edge `#C7CFC6`. Radius: `16px` (`rounded.lg`).
- Checkmarks: Leaf Green (`#16A34A`) check circle icons.
- Typography: Plus Jakarta Sans 600 SemiBold section headings (`headlineMd`), 400 Regular body (`bodyMd` with `24px` line-height).
