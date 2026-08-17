# Data-Driven Lesson Engine & Backend Integration Specification

This document provides the complete, production-ready specification for the **Tara Learn Module**. It details:
1. The **Universal Data-Driven Lesson Contract** (`data.ts` per lesson) that allows adding any multi-level lesson with arbitrary interactive game steps, concept cards, and quizzes purely through data.
2. The **Sarvam AI Multi-Lingual Audio Generation Pipeline** (English, Hindi, Telugu, Malayalam).
3. The **Backend Database Schema, REST API Endpoints, and Caching Model**.
4. How the **Frontend Engine dynamically parses and renders** any lesson from start to finish without writing bespoke screen code.

---

## 1. Architectural Philosophy: 100% Declarative Microlearning

Every lesson in Tara is defined by a single self-contained data file or backend JSON payload. By dropping in a `data.ts` or fetching it from the backend API, the frontend automatically:
- Builds the **Lesson Overview Header & Learning Outcomes**.
- Constructs the **Interactive Timeline Path** with dynamic nodes, lock/unlock states, and progress calculations.
- Orchestrates the **Level Experience Engine**, dynamically dispatching any combination of:
  - **Tara Dialogue & Audio** (with real Sarvam AI voiceovers in EN, HI, TE, ML)
  - **Concept Cards** (Bite-sized cards + expandable explanation accordions)
  - **Interactive Mini-Games** (`match`, `scenarioChallenge`, `memory`, `decisionChoice`, `sort`)
  - **Quizzes** (1 to N multiple choice questions with explanations & Tara reactions)
  - **Celebration Rewards** (3D Trophy, Badges, XP calculation, automatic next-level unlocking)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Single Lesson Schema (data.ts)                     │
│  • Metadata & Learning Outcomes (EN, HI, TE, ML)                            │
│  • Timeline Nodes (5 to N Levels)                                           │
│  • Dynamic Level Phases:                                                    │
│    [Tara Intro] ➔ [Concept Cards] ➔ [Mini-Game] ➔ [1..N MCQs] ➔ [Reward]   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
         ┌─────────────────────────┐       ┌─────────────────────────┐
         │   Frontend UI Engine    │       │    Backend API Server   │
         │  • Auto Timeline Map    │       │  • Sarvam AI Audio TTS  │
         │  • Dynamic Phase Runner │       │  • Secure Progress Sync │
         │  • Offline Cache Engine │       │  • PostgreSQL Database  │
         └─────────────────────────┘       └─────────────────────────┘
```

---

## 2. Multi-Lingual Text & Audio Schema (`LocalizedText` & `LocalizedAudio`)

All strings and audio clips support 4 languages out of the box:
- `en` (English)
- `hi` (Hindi - हिन्दी)
- `te` (Telugu - తెలుగు)
- `ml` (Malayalam - മലയാളം)

### TypeScript Schema

```typescript
export interface LocalizedText {
  en: string;
  hi: string;
  te: string;
  ml: string;
}

export interface LocalizedAudio {
  enUrl?: string;
  hiUrl?: string;
  teUrl?: string;
  mlUrl?: string;
}
```

---

## 3. The Universal Lesson Schema (`data.ts`)

Each lesson exports a single structured object conforming to `LessonPackageDefinition`:

```typescript
export interface LessonPackageDefinition {
  id: string; // e.g. "soil-health"
  categoryId: "soil" | "water" | "crops" | "pest" | "compost" | "finance";
  title: LocalizedText;
  description: LocalizedText;
  whyItMatters: LocalizedText;
  taraQuote: LocalizedText;
  taraExpression: "happy" | "excited" | "thinking" | "proud";
  durationMinutes: number;
  totalXp: number;
  learningOutcomes: {
    id: string;
    text: LocalizedText;
  }[];
  badgeReward: {
    id: string;
    title: LocalizedText;
    icon: string; // MaterialIcons glyph (e.g. "eco", "shield")
    description: LocalizedText;
  };
  levels: LevelPackageDefinition[];
}
```

---

## 4. Universal Level & Phase Pipeline Schema

A level can contain **any sequence** of modular phases:

```typescript
export interface LevelPackageDefinition {
  id: string; // e.g. "soil-level-1"
  levelNumber: number;
  title: LocalizedText;
  subtitle?: LocalizedText;
  xpReward: number;
  durationMinutes: number;
  phases: LevelPhasePackage[];
}

export type LevelPhasePackage =
  | ConceptCardsPhasePackage
  | MatchGamePhasePackage
  | ScenarioGamePhasePackage
  | MemoryGamePhasePackage
  | DecisionChoiceGamePhasePackage
  | SortGamePhasePackage
  | MCQPhasePackage
  | RewardPhasePackage;
```

### Phase 1: Concept Cards (`conceptCards`)
```typescript
export interface ConceptCardsPhasePackage {
  type: "conceptCards";
  id: string;
  title: LocalizedText;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraExpression?: "happy" | "excited" | "thinking";
  explanation: {
    tag: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    bulletPoints: {
      title: LocalizedText;
      text: LocalizedText;
      icon: string;
    }[];
  };
  progressiveHighlights?: LocalizedText[];
  transitionText?: LocalizedText;
  cards: {
    id: string;
    title: LocalizedText;
    icon: string;
    color: string;
    taraDialogue: LocalizedText;
    taraAudio?: LocalizedAudio;
  }[];
}
```

### Phase 2: Match-Up Mini-Game (`match`)
```typescript
export interface MatchGamePhasePackage {
  type: "match";
  id: string;
  title: LocalizedText;
  instructions: LocalizedText;
  xp: number;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraSuccessDialogue: LocalizedText;
  pairs: {
    id: string;
    leftText: LocalizedText;
    rightText: LocalizedText;
  }[];
}
```

### Phase 3: Choose the Better Soil / Scenario Challenge (`scenarioChallenge`)
```typescript
export interface ScenarioGamePhasePackage {
  type: "scenarioChallenge";
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  instructions: LocalizedText;
  xp: number;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraSuccessDialogue: LocalizedText;
  rounds: {
    id: string;
    roundNumber: number;
    topic: LocalizedText;
    prompt: LocalizedText;
    options: {
      id: string;
      label: string; // "A" | "B" | "C"
      text: LocalizedText;
      isCorrect: boolean;
      explanation: LocalizedText;
    }[];
  }[];
}
```

### Phase 4: Concept-Connection Memory Game (`memory`)
```typescript
export interface MemoryGamePhasePackage {
  type: "memory";
  id: string;
  title: LocalizedText;
  instructions: LocalizedText;
  xp: number;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraSuccessDialogue: LocalizedText;
  pairs: {
    id: string;
    itemA: { label: LocalizedText; icon: string; color?: string };
    itemB: { label: LocalizedText; icon: string; color?: string };
    connectionExplanation: LocalizedText;
  }[];
}
```

### Phase 5: Good Choice / Bad Choice Decision Game (`decisionChoice`)
```typescript
export interface DecisionChoiceGamePhasePackage {
  type: "decisionChoice";
  id: string;
  title: LocalizedText;
  instructions: LocalizedText;
  xp: number;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraSuccessDialogue: LocalizedText;
  rounds: {
    id: string;
    roundNumber: number;
    topic?: LocalizedText;
    situation: LocalizedText;
    choices: {
      id: string;
      label: string; // "Choice A", "Choice B"
      text: LocalizedText;
      isGoodChoice: boolean;
      taraReaction?: LocalizedText;
    }[];
  }[];
}
```

### Phase 6: Interactive Quizzes (`mcq`)
```typescript
export interface MCQPhasePackage {
  type: "mcq";
  id: string;
  totalXp: number;
  taraExpressionCorrect?: "excited" | "proud";
  taraExpressionIncorrect?: "thinking";
  questions: {
    id: string;
    question: LocalizedText;
    xp: number;
    options: {
      id: string;
      text: LocalizedText;
      isCorrect: boolean;
      explanation: LocalizedText;
    }[];
  }[];
}
```

### Phase 7: Celebration & Reward (`reward`)
```typescript
export interface RewardPhasePackage {
  type: "reward";
  id: string;
  xp: number;
  badgeTitle?: LocalizedText;
  badgeIcon?: string;
  badgeDescription?: LocalizedText;
  taraDialogue: LocalizedText;
  taraAudio?: LocalizedAudio;
  taraExpression?: "excited" | "proud";
}
```

---

## 5. Sarvam AI Text-to-Speech (TTS) Pipeline

To generate natural Indian language voiceovers for Tara, the backend integrates with **Sarvam AI Audio API**.

### Sarvam AI API Configuration

| Language | Language Code | Recommended Sarvam Speaker | Speed |
| :--- | :--- | :--- | :--- |
| **English (Indian)** | `en-IN` | `bulbul:v1` (Female: `"meera"`) | `1.0` |
| **Hindi** | `hi-IN` | `bulbul:v1` (Female: `"meera"`) | `1.0` |
| **Telugu** | `te-IN` | `bulbul:v1` (Female: `"meera"`) | `1.0` |
| **Malayalam** | `ml-IN` | `bulbul:v1` (Female: `"meera"`) | `0.95` |

### Backend Generation Script (Node.js / Python Example)

```typescript
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const SARVAM_API_KEY = process.env.SARVAM_API_KEY!;
const S3_BUCKET = process.env.AUDIO_BUCKET_NAME!;

export async function generateAndStoreTaraVoiceover({
  text,
  languageCode, // "en-IN" | "hi-IN" | "te-IN" | "ml-IN"
  audioFileKey, // e.g. "lessons/soil/level-1-intro-hi.mp3"
}: {
  text: string;
  languageCode: string;
  audioFileKey: string;
}): Promise<string> {
  // 1. Call Sarvam AI TTS Endpoint
  const response = await axios.post(
    "https://api.sarvam.ai/text-to-speech",
    {
      inputs: [text],
      target_language_code: languageCode,
      speaker: "meera",
      pitch: 0,
      pace: 1.0,
      loudness: 1.5,
      speech_sample_rate: 22050,
      enable_preprocessing: true,
      model: "bulbul:v1",
    },
    {
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const base64Audio = response.data.audios[0];
  const audioBuffer = Buffer.from(base64Audio, "base64");

  // 2. Upload to Cloud Storage / CDN
  const s3 = new S3Client({ region: "ap-south-1" });
  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: audioFileKey,
      Body: audioBuffer,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    })
  );

  return `https://${S3_BUCKET}.s3.ap-south-1.amazonaws.com/${audioFileKey}`;
}
```

---

## 6. Backend Database Schema (PostgreSQL / Supabase)

### `lessons` Table
```sql
CREATE TABLE lessons (
    id VARCHAR(64) PRIMARY KEY, -- e.g. "soil-health"
    category VARCHAR(32) NOT NULL, -- "soil", "water", etc.
    duration_minutes INT NOT NULL,
    total_xp INT NOT NULL,
    total_levels INT NOT NULL,
    badge_id VARCHAR(64) NOT NULL,
    package_data JSONB NOT NULL, -- Full LessonPackageDefinition JSON
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `user_lesson_progress` Table
```sql
CREATE TABLE user_lesson_progress (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(64) REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    progress_fraction NUMERIC(4, 3) DEFAULT 0.0,
    current_level_id VARCHAR(64) DEFAULT 'soil-level-1',
    unlocked_level_ids TEXT[] DEFAULT ARRAY['soil-level-1'],
    completed_level_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    total_xp_earned INT DEFAULT 0,
    unlocked_badge_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, lesson_id)
);
```

### `user_level_attempts` Table
```sql
CREATE TABLE user_level_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(64) NOT NULL,
    level_id VARCHAR(64) NOT NULL,
    accuracy_percentage INT DEFAULT 100,
    xp_earned INT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. REST API Endpoints Specification

### 1. `GET /api/v1/learn/lessons`
Returns all available lessons with the current user's aggregated progress.

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalXp": 360,
      "todayXp": 80,
      "lessonsCompleted": 1,
      "currentStreak": 5,
      "badgesCount": 3
    },
    "lessons": [
      {
        "id": "soil-level-1",
        "categoryId": "soil",
        "title": "Soil Health & Living Ecosystems",
        "description": "Understand the living soil community and practical protective behaviors.",
        "durationMinutes": 26,
        "progress": 0.8,
        "isCompleted": false,
        "totalLevels": 5,
        "completedLevels": 4,
        "badgeTitle": "Soil Guardian"
      }
    ]
  }
}
```

---

### 2. `GET /api/v1/learn/lessons/:lessonId?lang=en`
Returns the resolved lesson graph for the user's selected language.

**Query Parameters:**
- `lang`: `"en"` | `"hi"` | `"te"` | `"ml"` (default: `"en"`)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "soil-level-1",
    "categoryId": "soil",
    "title": "Soil Health & Living Ecosystems",
    "description": "Understand the living soil community and practical protective behaviors.",
    "durationMinutes": 26,
    "totalLevels": 5,
    "totalXp": 360,
    "whyItMatters": "Healthy living soil holds up to 40% more moisture during dry spells.",
    "taraQuote": "Healthy soil is the heart of a flourishing farm! Let's nurture your land step-by-step.",
    "taraExpression": "excited",
    "levels": [
      {
        "id": "soil-level-1",
        "levelNumber": 1,
        "title": "What is Soil?",
        "durationMinutes": 5,
        "xp": 30,
        "status": "completed",
        "progressFraction": 1.0
      },
      {
        "id": "soil-level-2",
        "levelNumber": 2,
        "title": "Soil Is Alive",
        "durationMinutes": 4,
        "xp": 80,
        "status": "available",
        "progressFraction": 0.0
      }
    ]
  }
}
```

---

### 3. `GET /api/v1/learn/levels/:levelId?lang=en`
Fetches the complete level definition and its phase pipeline.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "soil-level-2",
    "lessonId": "soil-level-1",
    "levelNumber": 2,
    "title": "Soil Is Alive",
    "subtitle": "Discover the living ecosystem beneath your feet",
    "xpReward": 80,
    "phases": [
      {
        "type": "conceptCards",
        "id": "soil-alive-concepts",
        "title": "Soil Is Alive",
        "taraDialogue": "Look at the soil beneath your feet...",
        "taraAudioUrl": "https://cdn.tara.ag/audio/soil-level-2-intro-en.mp3",
        "cards": [...]
      },
      {
        "type": "match",
        "id": "soil-alive-match",
        "title": "Who Does What?",
        "pairs": [...]
      },
      {
        "type": "mcq",
        "id": "soil-alive-quiz",
        "questions": [...]
      },
      {
        "type": "reward",
        "id": "soil-alive-reward",
        "xp": 80,
        "badgeTitle": "Life in the Soil",
        "badgeIcon": "eco"
      }
    ]
  }
}
```

---

### 4. `POST /api/v1/learn/levels/:levelId/complete`
Persists the completion of a level step. Automatically calculates XP, unlocks next level, and unlocks badges.

**Request Body:**
```json
{
  "lessonId": "soil-level-1",
  "xpEarned": 80,
  "accuracyPercentage": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "levelId": "soil-level-2",
    "nextLevelId": "soil-level-3",
    "isLessonCompleted": false,
    "lessonProgressFraction": 0.4,
    "totalXpEarned": 110,
    "badgeUnlocked": null
  }
}
```

---

### 5. `POST /api/v1/learn/lessons/:lessonId/reset`
Resets lesson progress back to Level 1.

**Response:**
```json
{
  "success": true,
  "message": "Lesson progress reset successfully",
  "data": {
    "unlockedLevelIds": ["soil-level-1"],
    "completedLevelIds": [],
    "progressFraction": 0.0
  }
}
```

---

## 8. Summary Checklist for Adding New Lessons

To create a new lesson (e.g. `water-conservation` or `organic-mulching`):
1. **Create `data.ts`** conforming to `LessonPackageDefinition`.
2. **Add English, Hindi, Telugu, Malayalam text** for paragraphs, cards, games, and questions.
3. **Run Sarvam AI voiceover generation** to upload audio MP3s to CDN.
4. **Register in `LESSONS_REGISTRY`** or upload to the backend `lessons` table.
5. The frontend will immediately render the complete lesson overview, interactive timeline, game mechanics, and certification badge without touching a single line of React Native UI code!
