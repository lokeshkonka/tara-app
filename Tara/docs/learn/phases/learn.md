# Component: LearnStoryPhase

## Purpose
Renders Phase 2 (Learning Story) as an interactive, bite-sized multi-scene narrative (2–4 minutes) combining illustrations, explanations, and Tara mentor speech.

## Responsibilities
- Render multi-scene cards sequentially ($1 \dots M$ scenes).
- Show scene pagination indicator dots/pills (`Scene 1 of 4`).
- Display illustrated diagrams and visual concepts per scene.
- Present Tara's spoken dialogue using `<TaraParagraph />` with auto-play / listen toggle.
- Support "Next Scene" and "Previous Scene" navigation.
- Emit `onComplete` when the final scene is finished.

## Non-responsibilities
- Hardcoding scene copy or images.
- Evaluating quizzes.

## Props & Contract

```typescript
export interface LearnStoryPhaseProps {
  /** Array of story scenes */
  scenes: LearnSceneDefinition[];
  /** Callback on finishing all scenes */
  onComplete: () => void;
}
```

## Scene Data Structure
```typescript
export interface LearnSceneDefinition {
  id: string;
  titleKey: string;
  bodyKey: string;
  image?: any;
  tara?: {
    expression: TaraExpression;
    textKey: string;
    voiceId?: string;
  };
}
```

## Design System Alignment
- Container: Soft 3D card elevation on `#F7FAF5` surface.
- Navigation CTA: Tactile primary green button (`TactileButton`) at the bottom.
- Pagination: Step indicator dots matching `docs/DESIGN.md` (Active step: `32px x 8px` green pill).
