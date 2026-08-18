# Component: MatchActivity

## Purpose
A tactile two-column matching mini-game that challenges the learner to pair related agricultural concepts (e.g. soil component $\to$ function).

## Responsibilities
- Render items in Column A (Left) and Column B (Right) in randomized order.
- Manage selection states:
  - Selected left item highlighted with active green border.
  - Selected right item tested against selected left item.
- Animate matched pairs with green confirmation ticks and disable matched items.
- Provide light haptic vibrations on match and gentle wiggle on mismatch.
- Emit `onComplete` when all pairs are resolved.

## Props & Contract

```typescript
export interface MatchPair {
  id: string;
  leftText: string;
  rightText: string;
}

export interface MatchActivityProps {
  /** Title of the activity */
  title: string;
  /** Instructions */
  instructions: string;
  /** Array of pairs to match */
  pairs: MatchPair[];
  /** Callback when all pairs are matched */
  onComplete: () => void;
}
```

## Supported States
1. **Unselected**: White card face with `1.5px` border `#BECAB9`.
2. **Selected**: Light green background `#F1F4EF`, `2px` green border `#4CAF50`.
3. **Matched**: Faded opacity, checkmark badge, locked state.
4. **Mismatch**: Temporary red border shake animation before reset.
