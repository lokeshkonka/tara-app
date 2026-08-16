# Business Logic — TARA Backend

> Domain rules, entities, and the business flows the backend must enforce. Read alongside `fileArchitecture.md` (structure) and `agent.md` (agent rules).

---

## 1. Domain Overview

TARA is a **multilingual, voice-driven sustainable-farming mentor** for Indian farmers.

Business goals that shape the backend:

- Farmers (and farm enthusiasts) learn sustainable practices in their **own language** (English, Hindi, Malayalam, Telugu, Tamil, Kannada).
- The app guides users from **learning → practice → real-world farm action**.
- **Tara** (the avatar) speaks to users; audio/voice assets are currently local but are planned to be served by the backend (TTS).
- The product targets low-literacy, high-outdoor-use contexts → short flows, voice first, offline tolerance, regional languages.

The frontend follows a strict `Screen → Context → Repository → (Dummy | API)` architecture; the backend is the eventual **real repository** behind every feature.

---

## 2. Core Business Entities

### 2.1 User (implemented)

| Field | Business meaning | Rules |
|---|---|---|
| `googleId` | Google `sub` claim — identity | `required`, `unique`; one user per Google account |
| `email` | Contact/identity | `required` |
| `name` | Display name from Google | `required` |
| `profilePicture` | Avatar URL | optional |
| `language` | **App content language** | default `'en'`; future: synced via `PUT /api/users/me/preferences` |
| `createdAt` | Account creation | auto |
| `lastLogin` | Last successful sign-in | updated on every Google login |

### 2.2 RefreshToken (implemented)

Represents one active login session for a user.

| Field | Business meaning |
|---|---|
| `userId` | Owning user |
| `tokenHash` | sha256 of the raw refresh token (never stored plaintext) |
| `expiresAt` | When the session expires (TTL from `JWT_REFRESH_EXPIRES_IN`, default 7d) |

### 2.3 Future entities (planned, not yet modeled)

- **FarmProfile** — farm size/unit, crops, location (state/district). Populated during onboarding (`farm_setup` step exists in the frontend types but is not yet wired).
- **UserPreferences** — preferred language (currently the `User.language` field), notifications, etc.
- **LearningContent / Lessons** — localized lessons, tips, and audio (served per `preferred_language`).
- **Practice / Verification** — user-uploaded photos verified by AI (planned: ML service such as Google Cloud Vision).
- **Community posts** — localized community content.
- **XP & Rewards** — transaction logs for XP gains, streaks, rewards.

---

## 3. Business Rules — Authentication

The app is **Google-sign-in only**. There is deliberately no email/password or OTP registration.

### 3.1 Sign-in rules (`POST /api/auth/google`)

1. Client obtains a Google **ID token** from Google Play Services.
2. Backend **verifies the signature and the `aud` (audience)** claim against `GOOGLE_WEB_CLIENT_ID`.
   - Purpose: prevent token-substitution attacks (a token minted for another app must be rejected).
3. Lookup user by `googleId` (the token's `sub`).
   - **Existing user** → update `lastLogin`, return `200` with a fresh session.
   - **New user** → create with defaults (`language: 'en'`), return `201` with a session.
4. The Google ID token is **never used as an API credential** after sign-in — it is exchanged for app-issued tokens.

### 3.2 Session rules

- **Access token** (JWT, `userId` payload, TTL `JWT_EXPIRES_IN` default 15m):
  - Short-lived by design; used for every authenticated API call (`Authorization: Bearer`).
- **Refresh token** (opaque, hashed in DB, TTL default 7d):
  - Used only to mint new access tokens.
  - **Rotated on every refresh** — the presented token is deleted and a new one issued, so a stolen token is usable at most once.
  - **Revoked on logout**.
  - Not meant to survive browser/app reinstalls (client stores it in `expo-secure-store`).

### 3.3 Refresh rules (`POST /api/auth/refresh`)

1. Require `refreshToken` (400 if missing).
2. Look up by sha256 hash; reject if absent **or expired** (401). Delete expired records.
3. Verify the owning user still exists.
4. **Delete the old token (rotation)** and issue a fresh session.

### 3.4 Logout rules (`POST /api/auth/logout`)

- Requires a valid access token (so we know *who* is logging out).
- If a `refreshToken` is provided → revoke that session.
- If not → revoke **all** sessions for the user (defensive; covers devices where the token was lost).
- Client also clears local storage and calls `GoogleSignin.signOut()`.

### 3.5 Client-side refresh-on-401

- If any API call returns `401`, the client attempts one refresh then retries the original request once.
- The refresh endpoint itself is excluded from this loop to avoid infinite recursion.

---

## 4. Business Rules — Language Preference

- Every user has a default language (`en`).
- Language selection happens during onboarding and in the Profile tab.
- Planned contract (from `Tara/docs/overall-backend-flow.md`):
  - `PUT /api/users/me/preferences` — persist `{ language }`.
  - On a new device, `GET`-ing the user restores their language immediately.
  - Dynamic content (tips, lessons, community) is served in the user's `preferred_language` (localized strings or audio IDs).
- **Currently:** the frontend stores language locally (`tara_onboarding_state_v1`) and the backend `User.language` is only set at sign-up. Syncing is a future step — when implemented, the backend becomes the source of truth.

---

## 5. Business Rules — Onboarding & User Profiles (planned)

Based on the frontend design (`Tara/docs/file_structure_and_general_rules.md`), the future onboarding collects:

```text
WELCOME → LANGUAGE → USER TYPE → PROFILE → FARM DETAILS → LOCATION → PREFERENCES → COMPLETE
```

Backend implications (future work):

- Persist the completed profile (name, user type: farmer/enthusiast, language).
- Persist farm details (size in acres, crops, state/district).
- Return completed onboarding state so a returning user skips straight to Home.
- Every screen remains data-driven; the backend supplies localized option lists (crops, languages, states).

---

## 6. Business Rules — Content & Learning (planned)

- Lessons and Tara's dialogue should be **localized per user language**.
- Audio: currently bundled `.mp3`; planned to be **backend-served / TTS-generated**.
- The client requests content by keys (e.g. `onboarding.welcome`) rather than hardcoded strings — the backend will provide translation/audio lookups.

---

## 7. Business Rules — Verification & Rewards (planned)

- **AI Verification:** photos uploaded from the app (e.g., practice evidence) are processed by a verification service (planned: ML microservice / Google Cloud Vision) and results returned to the app.
- **XP & Rewards:** a transaction-log service records XP gains, streaks, and rewards; the backend owns the counters so they survive reinstall and multi-device use.
- **Community:** localized posts feed; authors and content respect the user's language and privacy defaults.

---

## 8. Data Flow (current, implemented)

### 8.1 Sign-in

```text
LoginScreen → useAuth().signInWithGoogle()
  → GoogleSignin.signIn() → idToken
  → authService.signInWithGoogle(idToken)         [adapter = backend]
  → POST /api/auth/google  { idToken }
  → verifyGoogleToken() → User upsert → createSession()
  → { session: { user, accessToken, refreshToken } }
  → saved to expo-secure-store → AuthProvider.setUser()
  → route guard → /(tabs)
```

### 8.2 Authenticated request

```text
ApiClient.get("/api/...", { Bearer accessToken })
  → GET /api/...
  → authMiddleware verifies JWT → req.user.userId
  → controller → service → DB
  → { success, ... } → client
  → on 401 → auto refresh once → retry
```

### 8.3 Logout

```text
Profile → signOut()
  → POST /api/auth/logout { refreshToken }  (revokes server-side)
  → clear expo-secure-store → GoogleSignin.signOut() → setUser(null)
```
---

## 9. Business Invariants (the backend MUST guarantee)

1. **Identity:** one Google account ⇒ one user record (`googleId` unique).
2. **Token hygiene:** refresh tokens stored only as sha256 hashes; rotated on use; revoked on logout.
3. **Authorization:** protected routes require a valid access token; the acting user is always `req.user.userId`, never a client-supplied id.
4. **Data privacy:** never return `googleId`, internal ids (`_id`, `__v`), or secrets.
5. **Language persistence:** user's preferred language survives device change (via backend once synced).
6. **Consistency:** client and backend agree on every field name and envelope (`AuthUser`, `AuthSession`) — see `fileArchitecture.md` §7.
7. **No silent data loss:** logout revokes sessions; expired refresh tokens are cleaned up.

---

## 10. Future Work Backlog (business-level)

- [ ] `PUT /api/users/me/preferences` + restore language on new device.
- [ ] Onboarding persistence endpoints (profile, farm, location).
- [ ] Localized content/TTS delivery.
- [ ] Community feed (localized).
- [ ] XP/rewards transaction service.
- [ ] AI image-verification integration.
- [ ] Centralized tests for auth + these business rules.
