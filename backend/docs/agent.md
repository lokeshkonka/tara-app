# Agent Guide — TARA Backend

> Instructions for AI agents and human contributors working in `backend/`. Read this file first, then read `fileArchitecture.md` (structure & API rules) and `businessLogic.md` (domain rules) before changing anything.

---

## 1. What this project is

TARA is a multilingual sustainable-farming assistant app for Indian farmers (React Native / Expo client). The backend is a small Node/Express/MongoDB REST API. **Auth is the only fully implemented feature** — everything else (farm profiles, learning, community, XP) is planned.

Two folders coexist in the repo root:

| Folder | Role |
|---|---|
| `backend/` | Express + Mongoose API (this guide) |
| `Tara/` | Expo React Native app (the client) |

Always keep both sides in sync: every backend response shape must match what `Tara/src/...` consumes.

---

## 2. Commands

Run from `backend/`:

```bash
npm install          # install dependencies
npm start            # start the server (loads .env, connects Mongo, listens on PORT || 3000)
```

There is **no test suite and no lint/typecheck** for the backend yet. Verify manually with the API (see §7).

Frontend commands (run from `Tara/`):

```bash
npm run lint         # expo lint
npx tsc --noEmit     # typecheck
```

---

## 3. Repo layout (backend)

```text
server.js            entry point
src/app.js           express app + middleware + route mounting + 404/error handlers
src/config/db.js     Mongo connection
src/routes/          route definitions (thin, no logic)
src/controllers/     HTTP handlers (validate → call service → envelope)
src/services/        business logic + DB access + serializers
src/models/          Mongoose schemas
src/middleware/      authMiddleware (JWT guard)
```

Read the full tree + responsibilities in `fileArchitecture.md` §2–§3.

---

## 4. Code conventions

- **CommonJS** (`require` / `module.exports`). No ES modules, no TypeScript.
- **camelCase** for functions/variables (`getCurrentUser`), **PascalCase** only for model constructors (`User`).
- **Comments and log messages in English** only (the codebase previously had mixed Hindi/English comments — don't repeat that).
- Keep files focused: one controller per resource, one model per entity.
- No dead imports, no placeholder `const { auth } = require('google-auth-library')` style leftovers.
- `console.error('Context:', error)` for failures; `console.log` for lifecycle messages (e.g. server start, DB connected).

---

## 5. The single most important rules

1. **Middleware order:** `router.get('/path', authMiddleware, controller)` — the guard runs BEFORE the controller. Reversing this breaks `req.user`.
2. **Response envelope:** always `{ success, message?, session? | user? }`. See `fileArchitecture.md` §5.
3. **Route prefix:** everything mounts under `/api/...` (`/api/auth`, future `/api/users`, `/api/farms`).
4. **Serialize user data:** never return `_id`, `googleId`, or `__v`. Use `toAuthUser()` from `services/userSerializer.js`.
5. **Never store raw refresh tokens** — store `hashRefreshToken(token)` (sha256) only, and rotate on refresh.
6. **Never expose secrets or error internals** to the client.

---

## 6. Adding a new endpoint (quick checklist)

1. Add a model in `src/models/<entity>.model.js` if a new collection is needed.
2. Add a service in `src/services/` for the business/DB logic.
3. Add the controller in `src/controllers/` — validate inputs (400), call service, wrap in try/catch.
4. Add the route in `src/routes/<resource>Routes.js` and mount it in `src/app.js`:
   ```js
   app.use('/api/<resource>', authLimiter, <resource>Routes);
   ```
   (Add a limiter for public, abuse-prone endpoints.)
5. Protect the route with `authMiddleware` unless it must be public, and use `req.user.userId` — never a client-sent id.
6. Return the standard envelope + proper status codes.
7. Update the frontend: new repository interface + API implementation in `Tara/src/services/`, and wire it through context so screens don't call the API directly.

Full details: `fileArchitecture.md` §8.

---

## 7. Verifying the server

```powershell
npm start                                        # start server
# Quick sanity checks (from another shell):
Invoke-RestMethod -Uri http://localhost:3000/api/auth/me -Method Get   # -> 401 (no token)
# Sign-in needs a real Google idToken. To exercise /me, /refresh, /logout:
#   1. generate an access token via jwtService
#   2. create a session via sessionService.createSession(user)
# Then call the endpoints with the Bearer token / refresh token.
```

Check the server log for `MongoDB connected successfully` and `Server is running on port 3000`.

---

## 8. Environment variables

Read `backend/.env` key names (values are secrets — never commit, never log):

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Mongo connection string |
| `GOOGLE_WEB_CLIENT_ID` | Must match the frontend `EXPO_PUBLIC_GOOGLE_CLIENT_ID` |
| `JWT_SECRET` | Access-token signing |
| `JWT_EXPIRES_IN` | Access-token TTL (default `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token TTL (default `7d`) |
| `JWT_REFRESH_SECRET` | Reserved (unused) |
| `PORT` | HTTP port (default `3000`) |

**If you introduce a new secret, add it to `.env` and document it here + in `fileArchitecture.md` §9. Do not hardcode it.**

---

## 9. Common pitfalls

- ❌ `router.post('/me', controller, authMiddleware)` — controller runs before middleware → `req.user` is `undefined` → crash.
- ❌ Returning the raw Mongoose document to the client (leaks `_id`, `googleId`, `__v`).
- ❌ Using `/auth/google` in the frontend — the path must be `/api/auth/google`.
- ❌ Forgetting `express-rate-limit` on public endpoints.
- ❌ Returning `error.message` from a catch block (may leak internals). Return a safe, fixed message.
- ❌ Mixing `POST /me` vs `GET /me` — match the verb the client actually calls.

---

## 10. Do / Don't summary

| Do | Don't |
|---|---|
| Use CommonJS, camelCase, English comments | Mix ES modules / Hindi comments |
| Keep controllers thin, logic in services | Put DB logic in routes |
| `authMiddleware` before controllers | Reverse middleware order |
| Return `{ success, ... }` JSON envelopes | Return HTML / raw errors / stack traces |
| Store hashed refresh tokens, rotate them | Store plaintext tokens, reuse forever |
| Validate inputs before using them | Trust client-provided `userId` |
| Sync response shapes with `Tara/src` | Drift from the frontend `AuthUser` contract |
| Add rate limits to public routes | Leave public endpoints unlimited |

---

## 11. Definition of done

A backend change is complete only when:

- [ ] `npm start` boots without errors and Mongo connects.
- [ ] New endpoint verified manually with correct status codes + envelope.
- [ ] `authMiddleware` used correctly on protected routes.
- [ ] No secrets leaked, no internal errors exposed.
- [ ] Frontend client/repository updated if the API surface changed.
- [ ] This docs folder updated when architecture or conventions change.
