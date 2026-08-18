# Tara Sustainable Farming Companion — Complete Backend Implementation Plan

> **Document Version:** 1.0.0  
> **Target Architecture:** Production Cloud Microservices (Node.js / Express or FastAPI + PostgreSQL 16 with `pgvector`, Redis, S3/Cloud Storage, Gemini 2.0 / OpenAI & Sarvam AI)

---

## 1. Executive Summary & Architecture Overview

The Tara backend is designed as an **offline-first, scalable, and resilient cloud infrastructure** tailored to support smallholder and regenerative farmers across rural India. The system bridges mobile edge computation with cloud intelligence to deliver:
1. **Interactive Declarative Learning**: Microlearning lessons, practice mini-games, and biometrically verified AI viva-voce assessments.
2. **Community Voice Network**: Multilingual audio voice note streaming, automatic speech-to-text transcripts, and AI-grounded agricultural Q&A.
3. **Collective Impact & Farm Journey**: Soil carbon sequestration calculations, groundwater conservation metrics, and verifiable digital certificates.
4. **Offline Resilience**: Idempotent mutation replay queues and local SQLite/AsyncStorage caches for low-connectivity rural environments.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              Tara Mobile App (Expo SDK 57)                           │
│  • React Native 0.86 / React 19 Engine                                               │
│  • Offline Cache & Mutation Sync Queue (NetInfo + StorageService)                    │
│  • Dynamic Context Providers (Learn, Community, FarmJourney, Settings, User)        │
└──────────────────────────────────────────┬───────────────────────────────────────────┘
                                           │ HTTPS / WSS (JWT Auth)
                                           ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                               Cloud API Gateway (Kong / NGINX)                       │
│  • Rate Limiting & SSL Termination                                                   │
│  • JWT Verification & Language Context Injection                                    │
└──────┬──────────────────────┬──────────────────────┬──────────────────────┬──────────┘
       │                      │                      │                      │
       ▼                      ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ User & Auth  │       │ Curriculum & │       │ Community &  │       │ AI Mentor &  │
│   Service    │       │ Progress Svc │       │  Voice Svc   │       │ Interview Svc│
└──────┬───────┘       └──────┬───────┘       └──────┬───────┘       └──────┬───────┘
       │                      │                      │                      │
       ▼                      ▼                      ▼                      ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                             Data & Storage Tier                                      │
│  • PostgreSQL 16 (Relational Entities & JSONB Schemas)                               │
│  • pgvector (ICAR Agricultural Knowledge Base Semantic Search)                       │
│  • Redis 7 (Streak counters, session store & leaderboard rankings)                   │
│  • S3 / Google Cloud Storage (Multilingual audio waveforms & farm photos)             │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Database Schema (PostgreSQL 16)

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================================
-- 1. USERS & FARM PROFILES
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    preferred_language VARCHAR(10) DEFAULT 'en', -- 'en', 'hi', 'mr', 'te', 'ta', 'kn', 'ml', 'pa', 'gu', 'bn'
    avatar_url TEXT,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    streak_days INT DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE farm_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    village_panchayat VARCHAR(100) NOT NULL,
    farm_size_acres NUMERIC(5,2) DEFAULT 1.0,
    primary_crops TEXT[] DEFAULT '{}',
    soil_health_score INT DEFAULT 75,
    active_practices_count INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. USER SETTINGS & SECURITY
-- ============================================================================
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    daily_reminders BOOLEAN DEFAULT TRUE,
    daily_reminder_time VARCHAR(10) DEFAULT '07:00 AM',
    new_lessons_alert BOOLEAN DEFAULT TRUE,
    streak_alerts BOOLEAN DEFAULT TRUE,
    community_replies_alert BOOLEAN DEFAULT TRUE,
    weekly_tips_alert BOOLEAN DEFAULT TRUE,
    push_enabled BOOLEAN DEFAULT TRUE,
    sms_alerts BOOLEAN DEFAULT FALSE,
    text_scale VARCHAR(20) DEFAULT 'standard', -- 'standard', 'large', 'extraLarge'
    high_contrast BOOLEAN DEFAULT FALSE,
    screen_reader_optimized BOOLEAN DEFAULT FALSE,
    audio_autoplay BOOLEAN DEFAULT TRUE,
    reduced_motion BOOLEAN DEFAULT FALSE,
    pin_enabled BOOLEAN DEFAULT FALSE,
    pin_hash TEXT,
    biometrics_enabled BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    show_name_on_leaderboard BOOLEAN DEFAULT TRUE,
    share_anonymous_impact BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(20) NOT NULL, -- 'mobile', 'tablet', 'desktop'
    location VARCHAR(100),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fcm_push_token TEXT,
    is_revoked BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- 3. CURRICULUM, LESSONS & PROGRESS
-- ============================================================================
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    label_key VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL
);

CREATE TABLE modules (
    id VARCHAR(100) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES categories(id),
    title_key VARCHAR(150) NOT NULL,
    description_key TEXT NOT NULL,
    order_index INT NOT NULL,
    total_levels INT DEFAULT 5,
    xp_reward INT DEFAULT 200
);

CREATE TABLE levels (
    id VARCHAR(100) PRIMARY KEY,
    module_id VARCHAR(100) REFERENCES modules(id) ON DELETE CASCADE,
    level_number INT NOT NULL,
    title_key VARCHAR(150) NOT NULL,
    description_key TEXT,
    duration_minutes INT DEFAULT 5,
    xp INT DEFAULT 30,
    phase_types TEXT[] NOT NULL, -- '["taraIntro","conceptCards","match","quiz","reward"]'
    schema_payload JSONB NOT NULL, -- Full universal data-driven level definition
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_level_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    level_id VARCHAR(100) REFERENCES levels(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'available', -- 'locked', 'available', 'inProgress', 'completed'
    score NUMERIC(4,2),
    attempts INT DEFAULT 1,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, level_id)
);

-- ============================================================================
-- 4. COMMUNITY PANCHAYATS, VOICE STORIES & POSTS
-- ============================================================================
CREATE TABLE panchayats (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    members_count INT DEFAULT 0,
    active_practices_count INT DEFAULT 0,
    sustainability_score INT DEFAULT 80,
    total_fertilizer_reduced_kg NUMERIC(10,2) DEFAULT 0,
    total_water_saved_liters NUMERIC(12,2) DEFAULT 0,
    total_soil_protected_acres NUMERIC(8,2) DEFAULT 0
);

CREATE TABLE voice_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    panchayat_id VARCHAR(100) REFERENCES panchayats(id),
    title VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    duration_seconds INT NOT NULL,
    duration_formatted VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'soil', 'water', 'organic', 'pest'
    language_code VARCHAR(10) NOT NULL,
    waveform_sample INT[] DEFAULT '{}',
    transcript TEXT,
    tara_takeaway TEXT,
    likes_count INT DEFAULT 0,
    plays_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE voice_story_likes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    story_id UUID REFERENCES voice_stories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, story_id)
);

CREATE TABLE voice_story_bookmarks (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    story_id UUID REFERENCES voice_stories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, story_id)
);

CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    panchayat_id VARCHAR(100) REFERENCES panchayats(id),
    post_type VARCHAR(20) NOT NULL, -- 'practice', 'tip', 'question'
    category VARCHAR(50) NOT NULL,
    title VARCHAR(250) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    tara_verified_answer JSONB,
    likes_count INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE community_post_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_tara_verified BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 5. FARM JOURNEY & ACHIEVEMENTS
-- ============================================================================
CREATE TABLE farm_timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT,
    tara_note TEXT,
    health_delta INT DEFAULT 3,
    metrics_effect VARCHAR(150),
    event_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE achievements (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    xp_reward INT DEFAULT 100,
    max_progress INT DEFAULT 1
);

CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id VARCHAR(100) REFERENCES achievements(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, achievement_id)
);
```

---

## 3. Microservices & API Endpoint Specifications

### 3.1 Authentication & Profile Service
- `POST /api/v1/auth/otp/send`: Request 6-digit SMS OTP.
- `POST /api/v1/auth/otp/verify`: Verify OTP, returns JWT token + Refresh Token.
- `POST /api/v1/auth/google`: OAuth verification for Android/iOS Google Sign-in.
- `GET /api/v1/user/profile`: Retrieve user profile, XP, streak, and farm metadata.
- `PUT /api/v1/user/profile`: Update farm profile, crops, and acreage.
- `POST /api/v1/user/xp`: Safely append XP from completed milestones.

### 3.2 Curriculum & Learning Service
- `GET /api/v1/learn/categories`: List 6 major categories with localized keys.
- `GET /api/v1/learn/lessons`: List all available modules and user progress.
- `GET /api/v1/learn/lessons/:moduleId`: Retrieve lesson overview and timeline nodes.
- `GET /api/v1/learn/levels/:levelId?lang=mr`: Fetch full level schema payload for the specified language.
- `POST /api/v1/learn/levels/:levelId/complete`: Mark level complete, award XP, update streak, unlock next level in sequence.

### 3.3 Community & Voice Stories Service
- `GET /api/v1/community/panchayats`: List Panchayats with member counts and sustainability scores.
- `GET /api/v1/community/voice-stories?category=soil`: List voice stories with audio waveforms and transcripts.
- `POST /api/v1/community/voice-stories`: Multipart audio upload + metadata $\to$ triggers Sarvam AI / Whisper transcription.
- `POST /api/v1/community/voice-stories/:id/like`: Like or unlike a voice story.
- `POST /api/v1/community/voice-stories/:id/bookmark`: Bookmark story for offline playback.
- `GET /api/v1/community/posts?type=question`: Categorized discussions feed with verified Tara responses.
- `POST /api/v1/community/posts`: Publish practice, tip, or question. Triggers async Tara AI agronomist verification answer.
- `POST /api/v1/community/posts/:id/replies`: Post reply to a discussion.
- `GET /api/v1/community/leaderboard?timeframe=weekly&scope=panchayat`: Ranked leaderboard with top 3 podium.
- `GET /api/v1/community/impact/user`: User personal and collective Panchayat environmental metrics.

### 3.4 Settings & Security Service
- `GET /api/v1/settings`: Fetch notification, accessibility, and security preferences.
- `PUT /api/v1/settings/notifications`: Update daily reminder time, streak alerts, and push preferences.
- `PUT /api/v1/settings/accessibility`: Update text scale, high contrast mode, and screen reader preferences.
- `PUT /api/v1/settings/security`: Configure PIN code, biometrics, and leaderboard visibility.
- `DELETE /api/v1/settings/devices/:deviceId`: Remotely terminate a session on a device.

### 3.5 AI Agronomist & Capstone Viva Assessment
- `POST /api/v1/ai/interview/start`: Initializes Level 5 oral viva session with camera face verification hash.
- `POST /api/v1/ai/interview/evaluate`: Sends candidate audio transcription + face landmarks to Gemini 2.0 Flash / OpenAI. Returns score (0–100%), detailed feedback, and certification status.

---

## 4. Multilingual Voice Audio Pipeline (Sarvam AI & Whisper)

```
[Farmer Records Voice Story / Question]
                 │ (WAV / M4A)
                 ▼
    [Cloud Storage Bucket (S3/GCS)]
                 │
        ┌────────┴────────┐
        ▼                 ▼
[Sarvam AI Audio API]   [Whisper ASR Model]
 (Hi, Mr, Te, Ta, Ml)     (Panchayat Dialect)
        │                 │
        └────────┬────────┘
                 ▼
 [JSON Transcript Generated (EN, HI, MR, TE)]
                 │
                 ▼
[Tara LLM Agronomist Summarizer (Gemini 2.0)]
                 │
                 ▼
 [Tara Key Takeaways & Actionable Step Saved]
```

1. **Storage**: Audio files are stored with unique UUID keys under `audio/voice-stories/{id}.mp3`.
2. **Waveform Generation**: Server-side script computes a 16-point normalized peak array (`[30, 55, 80, 45, 90, ...]`) stored directly in `voice_stories.waveform_sample` for instant rendering in mobile audio cards.
3. **Caching**: Audio files use CDN caching with `Cache-Control: public, max-age=31536000` to prevent redundant mobile network downloads.

---

## 5. Offline-First Synchronization Strategy

The mobile app incorporates [`src/services/api/offlineCache.ts`](file:///home/loki/Codespace/tara-app/Tara/src/services/api/offlineCache.ts) and [`src/services/api/syncManager.ts`](file:///home/loki/Codespace/tara-app/Tara/src/services/api/syncManager.ts).

1. **Read Requests (GET)**:
   - When network is unreachable, requests automatically serve the latest cached response from local storage.
2. **Write Requests (POST/PUT)**:
   - When offline, mutation payloads (e.g. `completeLevelStep`, `addTimelineEvent`, `createContribution`) are appended to the `tara_offline_mutation_queue`.
3. **Reconnection Handler**:
   - `NetInfo` listens for network connectivity restoration.
   - `syncManager.syncQueuedMutations()` iterates over the queue, executing idempotent updates to the cloud backend and removing synced records.

---

## 6. Scheduled Notifications & Background Tasks

1. **Daily Morning Reminder (`expo-notifications`)**:
   - Scheduled as a local recurring cron trigger matching the user's preferred time (e.g., `07:00 AM`).
   - Content: *"🌱 Good morning Farmer! Check your soil moisture and today's sustainable practice."*
2. **Streak Preservation Cron (Server-Side)**:
   - Run at 06:00 PM daily for users who have not logged practice activity today.
   - Content: *"🔥 Your 19-day streak is at risk! Complete a quick 3-minute quiz before midnight."*

---

## 7. Next Steps for Full Deployment

1. **Repository Setup**: Create the backend microservices repository using Docker & Docker Compose (`docker-compose.yml` with PostgreSQL, Redis, and Express/FastAPI).
2. **Environment Variables Configuration**:
   ```env
   DATABASE_URL=postgresql://tara_user:password@localhost:5432/tara_db
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=tara_super_secure_jwt_secret_key_2026
   GEMINI_API_KEY=your_google_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key
   SARVAM_API_KEY=your_sarvam_ai_speech_key
   AWS_S3_BUCKET=tara-voice-assets
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   ```
3. **Switching Frontend to Live API**:
   - In `.env`, set `EXPO_PUBLIC_DATA_SOURCE=api` and `EXPO_PUBLIC_API_URL=https://api.tara-app.org/v1`.
