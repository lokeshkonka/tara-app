# Learn Module — Routing & Navigation

## Expo Router v57 Structure

The Learn Module uses dynamic segment file-based routing within `src/app/`:

```text
src/app/
├── (tabs)/
│   └── learn.tsx                              # Route: /learn (Catalogue)
└── learn/
    └── lessons/
        └── [lessonId]/
            ├── index.tsx                      # Route: /learn/lessons/:lessonId (Detail & Timeline)
            └── levels/
                └── [levelId].tsx              # Route: /learn/lessons/:lessonId/levels/:levelId (Level Engine)
```

---

## Route Breakdown

### 1. `/learn`
- **File**: `src/app/(tabs)/learn.tsx`
- **Purpose**: Displays searchable & filterable catalogue of all lessons, category chips, active progress, and today's XP stats.
- **Action on Lesson Card Press**: `router.push('/learn/lessons/' + lesson.id)`

### 2. `/learn/lessons/:lessonId`
- **File**: `src/app/learn/lessons/[lessonId]/index.tsx`
- **Purpose**: Shows the Lesson Detail overview ("Why It Matters", "What You'll Learn") and the Candy-Crush-inspired `LessonTimeline`.
- **Action on Level Node Press**: `router.push('/learn/lessons/' + lessonId + '/levels/' + levelId)`

### 3. `/learn/lessons/:lessonId/levels/:levelId`
- **File**: `src/app/learn/lessons/[lessonId]/levels/[levelId].tsx`
- **Purpose**: The focused, full-screen Dedicated Level Experience running the multi-phase state machine via `<LevelRenderer />`.
- **Exit Action**: Triggers checkpoint confirmation modal before returning to `/learn/lessons/:lessonId`.
