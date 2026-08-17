# Component: LevelNode

## Purpose
A single interactive milestone bubble on the Candy-Crush-inspired journey timeline, representing a specific Level and its completion state.

## Responsibilities
- Display node milestone circle with icon, level number, and title.
- Render 4 distinct visual states:
  1. `completed`: Green glowing checkmark node with completed pill badge.
  2. `inProgress`: Pulsing highlighted active node with percentage ring / bar and "Continue" CTA.
  3. `available`: Unlocked ready-to-play node with "+XP" indicator and "Start" action.
  4. `locked`: Dimmed gray node with lock icon (`🔒`) and completion requirement label.
- Provide tactile squish interaction (`translateY(2px)`) when tapped if available or in progress.
- Prevent interaction and display informative prompt if locked.

## Props & Contract

```typescript
export type LevelNodeState = "locked" | "available" | "inProgress" | "completed";

export interface LevelNodeProps {
  /** Level identifier */
  levelId: string;
  /** Level number (1, 2, 3...) */
  levelNumber: number;
  /** Localized Level title */
  title: string;
  /** Current progress state */
  state: LevelNodeState;
  /** Progress fraction (0 to 1) */
  progress?: number;
  /** XP reward value */
  xp: number;
  /** Duration in minutes */
  durationMinutes: number;
  /** Callback when node is pressed */
  onPress: (levelId: string) => void;
}
```

## Visual States Reference
```text
COMPLETED:    [ ✓ ]  Level 1 · Soil Basics  (+30 XP Done)
IN PROGRESS:  [ ▶ ]  Level 2 · Feed Soil    (65% Complete)
AVAILABLE:    [ ▶ ]  Level 2 · Feed Soil    (7 min · +40 XP)
LOCKED:       [ 🔒 ] Level 3 · Protect Soil (Unlock at Level 2)
```

## Design System Alignment
- Node Circle: `56px x 56px` circular 3D container.
  - Active/Available: Face `#4CAF50`, 3D Edge `#005313`, Icon `#FFFFFF`.
  - Completed: Face `#E8F5E9`, Border `2px solid #16A34A`, Icon `#16A34A`.
  - Locked: Face `#E0E3DF`, Border `1.5px solid #BECAB9`, Icon `#6F7A6B`.
- Haptics: Light tactile impact on press via `expo-haptics`.
