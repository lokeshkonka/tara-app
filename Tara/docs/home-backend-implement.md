# Tara App: Home Page Backend Implementation Guide

This document outlines the backend architecture, data models, and business logic required to power the **Tara App Home Page**. Currently, the app uses dummy repositories (`DummyUserRepository`, `DummyProgressRepository`) which need to be replaced with real backend integrations (REST/GraphQL).

---

## 1. Core Data Entities

To render the Home screen, the backend must provide data across three primary domains: **User Profile**, **Farm Profile**, and **Progress/Gamification**.

### A. User Profile
Stores the core identity, localization preferences, and top-level gamification stats.

```typescript
type UserProfile = {
  id: string;
  name: string;
  phone: string;
  language: string; // 'en', 'hi', 'mr', 'te', 'ml' (Critical for i18n)
  userType: "smallholder" | "commercial" | "expert";
  avatarExpression: "happy" | "neutral" | "sad"; // Derived from recent progress
  xp: number; // Total experience points earned
  level: number; // Current level
  streakDays: number; // Current consecutive days active
}
```

### B. Progress & Gamification Data
Powers the Green Score, Impact Metrics, Daily Goals, and Badges rows.

```typescript
type ProgressData = {
  greenScore: number;       // Current progress in current level
  greenScoreMax: number;    // XP required to reach next level
  level: number;            // Must sync with UserProfile.level
  
  // Real-world impact estimations
  metrics: {
    id: "soil-health" | "water-saving" | "biodiversity";
    title: string;          // i18n translation key (e.g., "Soil Health")
    value: number;          // The calculated numeric value
    unit: string;           // i18n translation key (e.g., "%", "kg", "L")
    percentage?: number;    // 0-100 progress for the progress bar
    maxValue?: number;      // Optional threshold
  }[];

  // Badges status
  badges: {
    id: string;             // e.g., "soil-guardian", "water-saver"
    name: string;           // i18n translation key
    icon: string;           // MaterialIcon name (e.g., "eco", "water-drop")
    unlocked: boolean;
  }[];

  // Daily goal tracking
  dailyGoal: {
    completed: number;      // e.g., 2
    total: number;          // e.g., 3
  };
}
```

### C. Recommended Practices (Today's Practice)
Context-aware farming tasks recommended to the user for the day.

```typescript
type PracticeRecommendation = {
  id: string;
  titleKey: string;         // i18n key: "Mulch 5 plants"
  descriptionKey: string;   // i18n key: "Protect soil moisture..."
  xpReward: number;         // e.g., +50 XP
  estimatedTimeMin: number; // e.g., 10 min
  status: "pending" | "completed";
}
```

---

## 2. API Endpoints

The app will require the following primary endpoints. We recommend using GraphQL to fetch all home-screen data in a single request, or aggregating it via an API Gateway/BFF (Backend-For-Frontend) if using REST.

### `GET /api/v1/home` (BFF Aggregation Endpoint)
Returns a combined payload of User, Progress, and Daily Practices to ensure the Home Screen loads in a single network roundtrip.

**Response Payload:**
```json
{
  "user": { ...UserProfile },
  "progress": { ...ProgressData },
  "todaysPractice": { ...PracticeRecommendation }
}
```

### `POST /api/v1/practices/{id}/complete`
Called when the user clicks "Start Practice" or "Complete".
**Actions performed by Backend:**
1. Mark practice as complete.
2. Increment `dailyGoal.completed`.
3. Add `xpReward` to User's `xp` and `greenScore`.
4. Recalculate Impact Metrics (e.g., add 50L to Water Saved).
5. Evaluate Badge Rules (e.g., unlock "Water Saver" if 5 water practices are done).
6. Return updated `ProgressData` to the client for immediate UI reaction.

---

## 3. Core Business Logic & Rules Engine

The backend must implement the following business logic processors:

### A. XP & Leveling System (Green Score)
- **Calculation**: Level thresholds should use an exponential or stepped curve (e.g., Level 1 = 0-200 XP, Level 2 = 200-500 XP).
- **Backend Responsibility**: When XP is granted, the backend calculates if a level boundary is crossed. The response must update `level`, `greenScore`, and `greenScoreMax`.

### B. Streak Calculation
- **Rule**: A streak increments if the user completes at least one practice OR logs an observation on consecutive days.
- **Reset**: If a calendar day (in the user's local timezone) passes without activity, `streakDays` resets to 0.
- **Backend Responsibility**: Run a nightly cron job (per timezone) to reset inactive streaks, OR evaluate streaks on-the-fly upon user login based on the `last_activity_date`.

### C. Impact Metrics Algorithm
- **Rule**: Real-world impact must be estimated based on completed tasks.
- **Formula Example**:
  - Task: "Mulching 1 Acre" -> `Water Saved += 1500L`, `Soil Health Score += 2%`.
- **Backend Responsibility**: Maintain a mapping table of `Practice_ID` to `Impact_Modifiers`. Upon practice completion, aggregate these modifiers into the user's lifetime metrics.

### D. Localization (i18n) Strategy
- The frontend App manages the static UI translations (e.g., Greetings, "Daily Goal", "Badges") via `src/i18n/index.ts`.
- **Backend Responsibility**: The backend MUST send string identifiers (keys) instead of raw text for dynamic content (like Practice Titles, Metric Names). 
  - *Example*: Send `titleKey: "practice.mulch_plants"` instead of `"Mulch 5 plants"`. The frontend will pass this key to the `useTranslation()` hook.
  - If the backend needs to send user-generated or deeply dynamic text, the backend must detect the user's `language` preference from the request header (or DB) and return the pre-translated string.

### E. Avatar Expression Mapping
- **Backend Responsibility**: Evaluate the user's recent engagement. 
  - If `streakDays > 3`, return `avatarExpression: "happy"`. 
  - If no activity for 7 days, return `avatarExpression: "sad"`.

---

## 4. Frontend Integration Steps

Once the backend APIs are ready, frontend developers will:
1. Replace the `delay()` functions in `src/services/dummy/*` with actual `fetch` or Axios calls to the backend endpoints.
2. Wire up the `Authorization: Bearer <token>` headers using the existing `useAuth` hook token.
3. Ensure the Redux/Context state managers update globally when the `POST /complete` endpoints return new Progress data.
