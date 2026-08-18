# Component: LessonDetailHeader

## Purpose
Displays the top visual identity and metadata for a selected lesson on the Lesson Detail page.

## Responsibilities
- Render the back button (navigating back to `/learn`).
- Display the category pill chip (themed by category hue).
- Display the lesson title and brief description.
- Render quick metadata badges: Total Duration (`min`), Total Levels count, and Total Available XP (`+XP`).
- Present hero category illustration / Tara badge cleanly.

## Non-responsibilities
- Calculating progress percentages (handled by `LessonProgressSummary`).
- Handling level clicking (handled by `LessonTimeline`).
- Fetching lesson data directly.

## Props & Contract

```typescript
export interface LessonDetailHeaderProps {
  /** Lesson title string or translated text */
  title: string;
  /** Short description */
  description: string;
  /** Category ID (e.g. 'soil', 'water') */
  categoryId: string;
  /** Localized Category label (e.g. 'Soil Health') */
  categoryLabel: string;
  /** Total estimated duration in minutes */
  durationMinutes: number;
  /** Total levels in this lesson */
  totalLevels: number;
  /** Total XP available from this lesson */
  totalXp: number;
  /** Optional hero image asset */
  heroImage?: any;
  /** Back button callback */
  onBack: () => void;
}
```

## Supported States
- **Normal**: Full metadata and header loaded.
- **Loading**: Skeleton placeholder for title and badges.

## Design System Alignment
- Back button: Circular notification-bell treatment (white face, `1.5px` border `outlineVariant`).
- Category Chip: Soft 3D Edge pill (`9999px`) in category tint.
- XP Badge: Warm Yellow tint (`#FEF3C7`, border `#FDE68A`, text `#D97706`).
- Typography: Plus Jakarta Sans 700 Bold for Title (`headlineLgMobile`), 500 Medium for Description.
