# Component: LessonTimeline

## Purpose
A vertical, gently curved Candy-Crush-inspired journey path that connects and organizes the sequence of `LevelNode` components for a lesson.

## Responsibilities
- Render the sequential levels of the lesson along a structured vertical path.
- Draw dashed/solid connecting line paths between adjacent level nodes showing progression direction.
- Automatically determine each level's `LevelNodeState` from user progress data (`completed`, `inProgress`, `available`, `locked`).
- Route the user to `/learn/lessons/:lessonId/levels/:levelId` when an active node is tapped.

## Non-responsibilities
- Hardcoding level contents or logic.
- Directly saving XP.

## Props & Contract

```typescript
export interface LessonTimelineProps {
  /** Lesson definition containing level configurations */
  lesson: LearnLessonDefinition;
  /** User progress data for this lesson */
  progress?: UserLearnProgress;
  /** Callback when user selects an unlocked level */
  onSelectLevel: (levelId: string) => void;
}
```

## Progression Resolution Logic
1. **Level 1**: Always unlocked (`available` or `completed`).
2. **Level $N$**: If Level $N-1$ is completed, Level $N$ is `available` (or `inProgress` if progress $> 0$). If Level $N-1$ is incomplete, Level $N$ is `locked`.

## Design System Alignment
- Connecting Path: `3px` width vertical/curved track in `#BECAB9` (dimmed) or `#4CAF50` (completed journey segment).
- Spacing: `28px` vertical gap between nodes to maintain visual rhythm without scrolling congestion.
