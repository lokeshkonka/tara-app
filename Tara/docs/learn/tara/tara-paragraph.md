# Component: TaraParagraph

## Purpose
A composed character mentor component that seamlessly binds the Tara character avatar, animated speech bubble, dynamic voice playback controller, expression fades, and optional action buttons into a single cohesive UI element.

## Responsibilities
- Render Tara with an expression (happy, thinking, excited, surprised, hi-wave, etc.).
- Display speech bubble with smooth enter/change animations (`Animated.timing`).
- Integrate audio voice playback using `useTaraAudio` / `expo-audio` with talking pulse ring animation (`1200ms` loop).
- Adapt layout responsively between horizontal row and vertical stacked on narrow viewports (`< 300px`).
- Accept optional action buttons or interactive trigger slots inside the dialogue bubble.

## Non-responsibilities
- Determining *what* text to speak (must be passed via props).
- Managing global audio queue.
- Hardcoding lesson or phase rules.

## Props & Contract

```typescript
export interface TaraParagraphProps {
  /** Character expression */
  expression: TaraExpression;
  /** Spoken / displayed text */
  text: string;
  /** Optional audio source (local require or remote URI) */
  audioSource?: AudioSource;
  /** Auto-play voice on mount */
  autoPlay?: boolean;
  /** Whether to show the listen button */
  showVoiceButton?: boolean;
  /** Optional CTA / action inside speech bubble */
  action?: {
    label: string;
    onPress: () => void;
  };
  /** Style container overrides */
  style?: StyleProp<ViewStyle>;
  /** Callback when voice starts playing */
  onSpeechStart?: () => void;
  /** Callback when voice finishes */
  onSpeechEnd?: () => void;
}
```

## Internal State
- `isPlaying`: Tracks whether mentor voice is actively playing.
- `displayedText`: Text state driving animated fade transitions.
- `displayedExpression`: Expression state for cross-fade morphing.

## Supported States
- **Idle**: Mentor avatar visible with static speech bubble and "Listen" button.
- **Speaking**: Pulsing green talking ring active (`#4CAF50` opacity 0.45 $\to$ 0), button shows "Speaking...".
- **Transitioning**: Smooth cross-fade of avatar expression (`250ms`) when props change.

## Design System Alignment
- Follows `docs/DESIGN.md` § Character Integration.
- Typography: Plus Jakarta Sans 600 SemiBold for spoken dialogue.
- Bubble: SurfaceContainerLowest (`#FFFFFF`), `1.5px` border `outlineVariant` (`#BECAB9`), `3px` bottom edge (`#C7CFC6`), `16px` radius.

## Example Usage
```tsx
<TaraParagraph
  expression="excited"
  text="Let's discover what makes healthy soil!"
  audioSource={require("../assets/voices/soil-intro.mp3")}
  autoPlay={true}
/>
```
