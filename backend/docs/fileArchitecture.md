# Backend File Architecture

> **Authoritative reference for the TARA backend.** This document describes the exact architecture currently implemented, how it matches the React Native (Expo) frontend, and the **strict rules you MUST follow whenever you create a new API endpoint**.

---

## 1. Overview & Tech Stack

The backend is a minimal, **Google-OAuth-only** REST API that powers authentication and (soon) all other TARA features.

| Concern | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Web framework | Express `^5.2.1` |
| Database / ODM | MongoDB + Mongoose `^9.9.2` |
| Auth | `@react-native-google-signin` on client; `google-auth-library` on server |
| Sessions | JWT access token + opaque, DB-persisted refresh token |
| Security | `cors`, `express-rate-limit`, `dotenv` |
| Entry point | `server.js` |

> **Important:** the backend uses **CommonJS** (`require` / `module.exports`). Do not mix in ES module syntax.

---

## 2. Full Directory Tree

```text
backend/
├── .env                      # secrets (NEVER commit)
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                 # entry point: loads env, connects DB, starts HTTP server
├── docs/                     # backend documentation
│   ├── agent.md              # rules for AI agents / contributors
│   ├── businessLogic.md      # business rules & domain logic
│   └── fileArchitecture.md   # this file
└── src/
    ├── app.js                # Express app factory: middleware, routes, 404, error handler
    ├── config/
    │   └── db.js             # Mongoose connection (ConnectDB)
    ├── controllers/
    │   └── auth.controller.js# HTTP handlers: googleLogin, getCurrentUser, refreshSession, logout
    ├── middleware/
    │   └── authMiddleware.js # JWT Bearer-token guard (attaches req.user.userId)
    ├── models/
    │   ├── refreshToken.model.js  # persisted, hashed refresh tokens
    │   └── user.model.js          # User collection
    ├── routes/
    │   └── authRoutes.js     # route definitions (mounted at /api/auth)
    └── services/
        ├── googleAuth.js     # Google ID token verification
        ├── jwtService.js     # access token sign + refresh token generate/hash
        ├── sessionService.js # createSession() – issues access+refresh, persists refresh
        └── userSerializer.js # maps Mongo User doc → frontend AuthUser shape
```

---

## 3. Layer-by-Layer Explanation

### 3.1 `server.js` — entry point

- Loads `dotenv` and connects to MongoDB.
- Starts the HTTP server on `process.env.PORT || 3000`.
- Exits the process (code 1) if the database cannot be reached.

### 3.2 `src/app.js` — Express app factory

Registers, **in this order**:

1. `cors()` — allows cross-origin requests (needed for Expo web).
2. `express.json({ limit: '1mb' })` — JSON body parsing with size cap.
3. `authLimiter` — `express-rate-limit`, **100 requests / 15 minutes** for all `/api/auth/*` routes.
4. `app.use('/api/auth', authLimiter, authRoutes)` — mounts auth routes **with the `/api/auth` prefix**.
5. JSON 404 handler (`{ success: false, message: 'Route not found' }`).
6. Centralized error handler → `500 { success: false, message: 'Server error' }`.

### 3.3 `src/config/db.js`

- `ConnectDB()` → `mongoose.connect(process.env.MONGODB_URI)`.
- Logs success; logs + `process.exit(1)` on failure.

### 3.4 Models (`src/models/`)

**`user.model.js`** — collection `users`:

| Field | Type | Rules / Default |
|---|---|---|
| `googleId` | String | `required`, `unique` |
| `email` | String | `required` |
| `name` | String | `required` |
| `profilePicture` | String | optional |
| `language` | String | default `'en'` |
| `createdAt` | Date | default `Date.now` |
| `lastLogin` | Date | default `Date.now` |

**`refreshToken.model.js`** — collection `refreshtokens`:

| Field | Type | Rules / Default |
|---|---|---|
| `userId` | ObjectId (ref `User`) | `required`, indexed |
| `tokenHash` | String | `required`, `unique` (sha256 of the raw token) |
| `expiresAt` | Date | `required` |
| `createdAt` | Date | default `Date.now` |

> **Security:** raw refresh tokens are **never stored**. Only the sha256 hash is persisted.

### 3.5 Routes (`src/routes/authRoutes.js`)

| Method | Path (full) | Middleware | Controller |
|---|---|---|---|
| POST | `/api/auth/google` | — | `googleLogin` |
| GET | `/api/auth/me` | `authMiddleware` | `getCurrentUser` |
| POST | `/api/auth/refresh` | — | `refreshSession` |
| POST | `/api/auth/logout` | `authMiddleware` | `logout` |

> Routes always stay thin: **no logic in the route file**, only wiring.

### 3.6 Controllers (`src/controllers/auth.controller.js`)

- `googleLogin` — validates `idToken`, verifies via Google, upserts user, issues a session.
- `getCurrentUser` — returns the authenticated user from the JWT.
- `refreshSession` — validates the refresh token, **rotates** it, issues a new session.
- `logout` — revokes the presented refresh token (or all of the user's tokens).

### 3.7 Services (`src/services/`)

| File | Responsibility |
|---|---|
| `googleAuth.js` | `verifyGoogleToken(idToken)` → `{ googleId, email, name, profilePicture }`; verifies signature + `aud` (audience) against `GOOGLE_WEB_CLIENT_ID`. Throws `'Invalid Google ID token'`. |
| `jwtService.js` | `generateAccessToken(userId)`; `generateRefreshToken()` (crypto random, 64 bytes hex); `hashRefreshToken(token)` (sha256). |
| `sessionService.js` | `createSession(user)` → builds `{ user, accessToken, refreshToken }`; persists the hashed refresh token with TTL from `JWT_REFRESH_EXPIRES_IN` (default 7d). |
| `userSerializer.js` | `toAuthUser(user)` → maps a Mongo doc to the frontend `AuthUser` shape (see §7.3). |

### 3.8 Middleware (`src/middleware/authMiddleware.js`)

- Requires `Authorization: Bearer <token>` (exact 2-part format).
- Verifies the JWT with `JWT_SECRET`.
- Attaches `req.user = { userId }` for controllers.
- Returns `401` JSON envelopes on missing/invalid tokens.

---

## 4. Request Lifecycle

```text
Client (Expo app)
   │  fetch(url, { Authorization: Bearer <accessToken> })
   ▼
Express server (src/app.js)
   │  cors() → express.json() → rateLimiter
   ▼
Route matching  (must include the /api/auth prefix)
   ▼
Middleware (authMiddleware for protected routes)
   │  verifies JWT → req.user = { userId }
   ▼
Controller (src/controllers)
   │  input validation → call service
   ▼
Service (src/services)
   │  business logic, token issuance, serialization
   ▼
Model / Database (src/models)
   ▼
JSON response  { success, message?, session? | user? }
```

---

## 5. Response Contract (MUST follow exactly)

### Success envelopes

```jsonc
// Login / refresh — ALWAYS a session object
{
  "success": true,
  "message": "Login successful",
  "session": {
    "user": { "...AuthUser shape..." },
    "accessToken": "<jwt>",
    "refreshToken": "<opaque>"
  }
}

// Fetch current user
{
  "success": true,
  "user": { "...AuthUser shape..." }
}

// Simple success (e.g. logout)
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Error envelopes

```jsonc
{
  "success": false,
  "message": "human readable reason"
}
```

### Status codes used

| Code | Meaning |
|---|---|
| 200 | Success (existing user login, me, refresh, logout) |
| 201 | Created (new user) |
| 400 | Missing/invalid required field (e.g. no `idToken`, no `refreshToken`) |
| 401 | Invalid token / bad auth header / invalid Google token |
| 404 | User not found / route not found |
| 500 | Unexpected server error |

> **Never** return an HTML error page. JSON envelopes only.

---

## 6. Authentication & Session Flow

### 6.1 Google sign-in — `POST /api/auth/google`

1. Client obtains a Google **ID token** (via Google Play Services) and sends `{ "idToken": "..." }`.
2. Backend verifies the token signature **and audience** (`GOOGLE_WEB_CLIENT_ID`).
3. If the `googleId` exists → update `lastLogin`, return **200**.
4. If not → create a user (default language `en`), return **201**.
5. In both cases a full **session** (user + accessToken + refreshToken) is returned.

### 6.2 Access token

- JWT signed with `JWT_SECRET`, payload `{ userId }`.
- TTL = `JWT_EXPIRES_IN` (default `15m`).
- Sent by the client as `Authorization: Bearer <token>`.

### 6.3 Refresh token — `POST /api/auth/refresh`

- Opaque random string; **rotated on every refresh** (old one is deleted).
- Presented as `{ "refreshToken": "..." }`.
- Returns a brand-new session. The old refresh token immediately becomes invalid.

### 6.4 Logout — `POST /api/auth/logout`

- Protected (requires access token).
- Body may include `{ "refreshToken": "..." }` → revokes that token.
- If no refresh token is sent → revokes **all** refresh tokens for the user.

### 6.5 Refresh-on-401 (client side)

The frontend `ApiClient` transparently refreshes once when any request returns `401`, then retries. The refresh endpoint itself is excluded from this loop.

---

## 7. Frontend ↔ Backend Matching

### 7.1 Environment variables

| Backend `.env` | Frontend `Tara/.env` | Purpose |
|---|---|---|
| `GOOGLE_WEB_CLIENT_ID` | `EXPO_PUBLIC_GOOGLE_CLIENT_ID` | Same Google OAuth **Web** Client ID (must match for audience check) |
| `PORT` (default 3000) | `EXPO_PUBLIC_API_PORT` (default 3000) | Backend port |
| — | `EXPO_PUBLIC_API_BASE_URL` | Full base URL; **empty in dev** → client derives `http://<dev-host>:<port>` from Expo `hostUri` |
| — | `EXPO_PUBLIC_AUTH_MODE` | `backend` (real API) or `local` (mock session) |
| — | `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` | Android-specific client ID (currently unused in code) |
| `MONGODB_URI` | — | Database connection string |
| `JWT_SECRET` | — | Access-token signing secret |
| `JWT_EXPIRES_IN` | — | Access-token TTL (`15m`) |
| `JWT_REFRESH_EXPIRES_IN` | — | Refresh-token TTL (`7d`) |

> `JWT_REFRESH_SECRET` is reserved for future use. Refresh tokens are currently opaque strings hashed with sha256 and stored in Mongo.

### 7.2 Endpoints the frontend calls

| Frontend call (`backendAuth.ts`) | Backend route | Notes |
|---|---|---|
| `POST /api/auth/google` | `POST /api/auth/google` | Body `{ idToken }` |
| `GET /api/auth/me` | `GET /api/auth/me` | Bearer token |
| `POST /api/auth/logout` | `POST /api/auth/logout` | Bearer token + `{ refreshToken }` |
| `POST /api/auth/refresh` | `POST /api/auth/refresh` | Body `{ refreshToken }` |

> **Strict:** every endpoint path in the frontend MUST start with `/api/` because routes are mounted under `/api/auth`.

### 7.3 User object mapping (Mongo doc → frontend `AuthUser`)

Implemented by `userSerializer.js` (`toAuthUser`). Frontend type: `src/auth/auth.types.ts`.

| Frontend `AuthUser` field | Backend source |
|---|---|
| `id` | `user._id.toString()` |
| `email` | `user.email` |
| `name` | `user.name` |
| `avatarUrl` | `user.profilePicture` |
| `provider` | hardcoded `'google'` |
| `createdAt` | `user.createdAt` (ISO string) |
| `updatedAt` | `user.updatedAt` ?? `user.createdAt` (ISO string) |
| `profile.language` | `user.language` |

> **Strict:** never expose `googleId`, `__v`, or `_id` directly to the client. Always serialize through `toAuthUser`.

### 7.4 Session shape expected by the client

```ts
interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}
```

The client stores the whole session in `expo-secure-store` (key `tara_auth_session`).

---

## 8. STRICT RULES — Creating a New API Endpoint

> **Read this section every time you add or modify an endpoint. These rules are mandatory.**

### 8.1 Where things go

| You are creating… | Put it in | File naming |
|---|---|---|
| HTTP route mapping | `src/routes/` | `<resource>Routes.js` (e.g. `userRoutes.js`, `farmRoutes.js`) |
| Request handler | `src/controllers/` | `<resource>.controller.js` |
| Business/DB logic | `src/services/` | `<feature>Service.js` or `<feature>.js` |
| DB schema | `src/models/` | `<entity>.model.js` |
| Cross-cutting guard | `src/middleware/` | `authMiddleware.js`, `validation.js`, … |

### 8.2 Step-by-step checklist for a new endpoint

1. **Mount new route files** in `src/app.js`:
   ```js
   app.use('/api/<resource>', authLimiter, <resource>Routes);
   ```
   - Every public resource prefix goes under `/api/`. **Never** mount at `/` or `/auth` for non-auth resources.

2. **Define the route** in `src/routes/<resource>Routes.js`:
   ```js
   const express = require('express');
   const authMiddleware = require('../middleware/authMiddleware');
   const <resource>Controller = require('../controllers/<resource>.controller');

   const router = express.Router();

   router.get('/', authMiddleware, <resource>Controller.list);
   router.post('/', authMiddleware, <resource>Controller.create);

   module.exports = router;
   ```
   - **Middleware order is sacred:** `router.<method>('/', authMiddleware, controller)` — middleware BEFORE controller. Never reverse it (a past bug broke `/me` this way).

3. **Write the controller** in `src/controllers/<resource>.controller.js`:
   - Validate required inputs **first** → return `400` with `{ success: false, message }` on failure.
   - `try/catch` the whole body; on error `console.error(...)` and return `500 { success: false, message: 'Server error' }` (or a specific code for known failures).
   - Call services; **never** talk to Mongoose models directly from controllers if a service exists.

4. **Write the service** in `src/services/`:
   - Own the business logic and DB access.
   - Reuse `toAuthUser` / serializers for any user-like payload.

5. **Protect the endpoint** if it needs an authenticated user:
   - Add `authMiddleware` and read `req.user.userId`. Never trust a client-sent userId.

6. **Return the standard envelope** (see §5):
   - Success: `{ success: true, ... }`.
   - Error: `{ success: false, message }`.
   - Never leak stack traces, DB errors, or internal messages to the client.

7. **Update the frontend client** in `Tara/src/api/` if the frontend will call it:
   - Use `ApiClient.get/post/put/patch/delete<T>(endpoint, data)` with the **full `/api/...` path**.
   - Add a repository/interface in `Tara/src/services/repositories/` and a dummy + API implementation, so screens stay data-source-agnostic.

### 8.3 Envelope & naming rules (non-negotiable)

- ❌ No snake_case fields on the wire — use the exact `AuthUser` shape the client defines.
- ❌ No `googleId`/`_id`/`__v` in responses.
- ❌ No throwing non-JSON responses.
- ✅ Route methods: `GET` for reads, `POST` for creates/actions, `PUT/PATCH` for updates, `DELETE` for removals.
- ✅ Plural resource names in paths (`/api/users`, `/api/farms`).
- ✅ camelCase function names (`connectDB`, `getCurrentUser`), PascalCase for model constructors only.
- ✅ English comments/log messages (no mixed Hindi/English).

### 8.4 Validation rules

- Validate every required field from `req.body`, `req.params`, `req.query` before use.
- Empty/missing string → `400`.
- For auth-related validation, prefer a dedicated `middleware/validation.js` for reuse.
- Never trust types coming from the client — coerce/check before DB writes.

### 8.5 Error-handling rules

- Known client errors → specific status codes (400/401/404).
- Unknown/unexpected errors → log with `console.error` and return `500` generic message.
- Auth failures → `401`, never reveal which part failed to the user.

### 8.6 Security rules

- New secrets go in `.env` (git-ignored) and are read via `process.env` — never hardcoded.
- Passwords/secrets are never returned in responses.
- Refresh tokens: always store only the sha256 hash; rotate on use.
- Rate-limit public endpoints that can be abused (`/api/auth/*` already limited to 100/15min).
- Keep `express.json()` size limit; add per-route limits if a route accepts files/audio.

---

## 9. Environment Variables Reference

All required variables are in `backend/.env` (never committed).

| Variable | Required | Default | Used by |
|---|---|---|---|
| `MONGODB_URI` | ✅ | — | `src/config/db.js` |
| `GOOGLE_WEB_CLIENT_ID` | ✅ | — | `src/services/googleAuth.js` (must equal the frontend Web Client ID) |
| `JWT_SECRET` | ✅ | — | `jwtService.js`, `authMiddleware.js` |
| `JWT_EXPIRES_IN` | ❌ | `15m` | `jwtService.js` |
| `JWT_REFRESH_EXPIRES_IN` | ❌ | `7d` | `sessionService.js` |
| `JWT_REFRESH_SECRET` | ❌ (unused) | — | reserved |
| `PORT` | ❌ | `3000` | `server.js` |

---

## 10. Security Notes & Known Constraints

- `.env` files are git-ignored; rotate any leaked secrets immediately.
- Backend is currently **Google-only** auth — there is no email/password or OTP flow.
- No centralized test suite yet; verify endpoints manually (see `agent.md`).
- The User schema stores `createdAt`/`lastLogin` manually (no `timestamps: true`).
- For physical-device development, the app derives the backend host from Expo `hostUri`; the PC must allow inbound TCP 3000 through the firewall.
