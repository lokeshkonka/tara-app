# Component: AIInterviewPhase

## Purpose
An oral and written conversational assessment checkpoint where Tara interacts with the learner to verify deep conceptual understanding of agricultural principles.

## Responsibilities
- Present oral or text interview questions configured in level data.
- Support audio voice recording or text typing for farmer responses.
- Invoke `aiInterviewService` to extract expected key concepts from the answer.
- Provide intelligent follow-up guidance if a key concept is missing.
- Award completion score and pass status.

## Non-responsibilities
- Hardcoding interview questions or rubric criteria.
- Direct LLM client API calls inside the React component.

## Props & Contract

```typescript
export interface AIInterviewPhaseProps {
  /** AI Interview configuration */
  config: AIInterviewConfigDefinition;
  /** Callback triggered when interview is passed */
  onComplete: (result: { score: number; conceptsIdentified: string[] }) => void;
}

export interface AIInterviewConfigDefinition {
  id: string;
  titleKey: string;
  questions: {
    id: string;
    questionKey: string;
    expectedConcepts: string[];
    followUpKey?: string;
  }[];
  passingScore: number;
}
```

## Supported States
1. **Tara Question**: Tara speaks the concept question with voice playback.
2. **Recording / Input**: Farmer taps "Speak Answer" (or switches to text input).
3. **Evaluating**: AI concept detection analyzing spoken keywords.
4. **Tara Follow-up / Confirmation**: Tara gives warm, actionable feedback.
5. **Interview Passed**: Score badge and progression to certification/reward phase.
