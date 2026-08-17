# Component: QuizPhase

## Purpose
A reusable multiple-choice questionnaire engine that tests the learner's comprehension immediately following the learning story.

## Responsibilities
- Display 2–3 multiple choice questions sequentially.
- Support single-select option cards with active selection highlights.
- Evaluate the submitted answer against `option.isCorrect`.
- Present instant animated Tara mentor feedback:
  - **Correct**: Cheerful Tara avatar (`expression: "happy"`), celebration message, +XP sound/haptics, "Continue" CTA.
  - **Incorrect**: Encouraging Tara avatar (`expression: "thinking"`), helpful hint explanation, "Try Again" CTA without penalizing learner.
- Support score tracking and pass/retry completion.

## Non-responsibilities
- Hardcoding question text or option choices.
- Directly mutating global user XP.

## Props & Contract

```typescript
export interface QuizPhaseProps {
  /** Array of MCQ question definitions */
  questions: MCQQuestionDefinition[];
  /** Callback triggered when all questions are correctly answered */
  onComplete: (score: { total: number; correctFirstTry: number }) => void;
}
```

## Question Data Structure
```typescript
export interface MCQQuestionDefinition {
  id: string;
  questionKey: string;
  options: {
    id: string;
    textKey: string;
    isCorrect: boolean;
  }[];
  explanationKey: string;
  taraFeedback: {
    correctKey: string;
    incorrectKey: string;
  };
}
```

## Supported States
1. **Selecting**: User taps options; option card gets green outline and scale (`1.02`).
2. **Checking**: "Check Answer" button active.
3. **Feedback-Correct**: Green banner + Tara confirmation dialog + "Next Question" CTA.
4. **Feedback-Incorrect**: Soft red/yellow banner + Tara hint dialog + "Try Again" CTA.
5. **Quiz-Complete**: Summary score card with auto-progression to next level phase.

## Design System Alignment
- Option Cards: `SelectionCard` tokens (Default: border `#BECAB9`, Selected: border `2px solid #4CAF50` with `#F1F4EF` fill).
- Check Button: `TactileButton` with primary green face and 3D base.
