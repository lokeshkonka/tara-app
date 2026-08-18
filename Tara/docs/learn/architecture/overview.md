# Learn Module — Architecture Overview

## Purpose
The TARA Learn Module provides a scalable, declarative mobile learning infrastructure that delivers engaging natural farming lessons through structured levels, interactive multi-scene stories, quizzes, mini-game practices, and field verification.

## Architecture Principles
1. **Single Responsibility Principle (SRP)**:
   - *Lesson data* defines metadata, context, and lesson levels.
   - *Level data* configures the sequential phases, stories, questions, and rewards.
   - *Reusable components* handle presentation, gesture interactions, and animations without knowing lesson-specific topic rules.
   - *Container screens & Context* coordinate navigation and persistent user progress.
2. **Data-Driven Scalability**:
   - Adding a new farming domain (e.g. *Composting Basics*, *Companion Cropping*) requires zero new React components or route modifications. It only requires a new TypeScript definition file registered in `lessonRegistry.ts`.
3. **DESIGN.md Consistency**:
   - Every surface uses the soft 3D edge (`1.5px` border + `3px` darker bottom edge).
   - Every primary interactive element uses `TactileButton` with spring physics (`tension: 320, friction: 30`).
   - Plus Jakarta Sans font hierarchy (`headlineLg`, `headlineMd`, `bodyLg`, `labelLg`).

---

## Architectural Layers

```text
┌───────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│  • LearnTab (Lesson Catalogue)                            │
│  • LessonDetail (Overview, Why It Matters, Candy Timeline)│
│  • LevelPage (Dedicated Level Experience & Phase Engine)  │
│  • Reusable Phase Renderers (Intro, Learn, Quiz, etc.)    │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                     STATE & LOGIC LAYER                   │
│  • LearnContext (Active lesson, progress query & sync)    │
│  • ProgressContext (XP increments, badge unlocking)       │
│  • useTranslation (Pan-Indian i18n key resolution)        │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                     DATA & SERVICE LAYER                  │
│  • Lesson Registry (soilBasics, smartWatering, pestControl)│
│  • Progress Storage (Expo SecureStore / SQLite)           │
│  • Services (Voice, MockCVService, MockAIInterviewService) │
│  • ILearnRepository (Environment-switched API adapter)    │
└───────────────────────────────────────────────────────────┘
```
