# Overall Backend Flow

## Overview
This document covers the high-level architecture of the backend services supporting the Tara app, with a specific focus on user preferences (language), authentication lifecycle (logout), and general data flow.

## 1. User Profile & Preferences Flow

### Language Selection
- **Client**: During onboarding or via the Profile Tab, the user selects a preferred language (e.g., English, Hindi, Telugu, Malayalam).
- **Backend API**: `PUT /api/users/me/preferences`
- **Database**: The `users` table/collection should have a `preferred_language` column.
- **Content Delivery**: Whenever the client fetches dynamic content (e.g., farming tips, community posts), the backend will check the user's `preferred_language` and serve localized strings or IDs for localized audio files.
- **Sync**: Storing language on the backend ensures that if the user logs in on a new device, their language preference is immediately restored.

## 2. Logout Flow

### Client-Side
1. User taps "Logout" in the Profile Tab.
2. The client clears local session storage (`expo-secure-store`).
3. The client calls `GoogleSignin.signOut()` to clear the local Google session.
4. The client optionally makes an API call to the backend to invalidate the active session.

### Backend-Side
- **Endpoint**: `POST /api/auth/logout`
- **Action**: If using stateful sessions (e.g., Redis), the backend deletes the session ID.
- **Action**: If using JWTs with refresh tokens, the backend marks the refresh token as revoked/blacklisted in the database.

## 3. Data Flow Architecture

### Request Pipeline
1. **API Gateway / Router**: Receives the request from the mobile app.
2. **Auth Middleware**: Validates the Bearer token (JWT). Rejects unauthorized requests with `401`.
3. **Context Injection**: Attaches the `userId` and `preferredLanguage` to the request context.
4. **Controller logic**: Processes business logic (e.g., fetching user's farm data, posting to community).
5. **Database Layer**: Executes optimized queries.

### Extensibility for Future Features
- **XP & Rewards**: A dedicated service to handle transaction logs for XP gains.
- **AI Verification**: Integration with an ML microservice or external API (e.g., Google Cloud Vision) where images uploaded from the app are processed securely.
