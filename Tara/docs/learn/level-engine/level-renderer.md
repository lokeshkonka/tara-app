# Component: LevelRenderer

## Purpose
The central phase execution dispatcher that consumes level configuration data and dynamically renders the active phase component from the level's phase sequence.

## Responsibilities
- Track active phase index ($0 \le \text{currentPhaseIndex} < \text{level.phases.length}$).
- Dynamically render the corresponding phase component:
  - `"intro"` $\to$ `<LevelIntroPhase />`
  - `"learn"` $\to$ `<LearnStoryPhase />`
  - `"quiz"` $\to$ `<QuizPhase />`
  - `"practice"` $\to$ `<PracticePhase />`
  - `"verify"` $\to$ `<VerifyPhase />`
  - `"aiInterview"` $\to$ `<AIInterviewPhase />`
  - `"certification"` $\to$ `<CertificationPhase />`
  - `"awards"` $\to$ `<AwardsPhase />`
  - `"reward"` $\to$ `<RewardPhase />`
- Coordinate seamless forward transitions (`goToNextPhase`) and checkpoint persistence.
- Complete the level and notify parent container on final phase completion.

## Non-responsibilities
- Hardcoding specific phase logic (each phase component manages its own internal interactions).
- Determining routes.

## Props & Contract

```typescript
export interface LevelRendererProps {
  /** Lesson definition */
  lesson: LearnLessonDefinition;
  /** Active level definition */
  level: LearnLevelDefinition;
  /** Initial starting phase index (for resuming progress) */
  initialPhaseIndex?: number;
  /** Callback triggered when a phase completes */
  onPhaseComplete: (phaseIndex: number, phaseType: PhaseType) => void;
  /** Callback triggered when entire level finishes and rewards are claimed */
  onLevelComplete: (levelId: string, earnedXp: number) => void;
  /** Exit / Close button callback */
  onExit: () => void;
}
```

## Internal State Machine
```text
State: currentPhaseIndex (number)
Event: onPhaseComplete() -> currentPhaseIndex++
If currentPhaseIndex == phases.length -> onLevelComplete()
```

## Extensibility Rule
Adding a new phase (e.g. `communityMission`) requires only adding the phase type to `PhaseType` union and registering its component in `LevelRenderer`'s component map.
