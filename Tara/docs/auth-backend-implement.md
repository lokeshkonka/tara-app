# Authentication Backend Implementation Plan

## Overview
This document outlines the planned implementation for the authentication backend for the Tara App. The app currently uses `@react-native-google-signin/google-signin` on the client side to securely obtain a Google ID Token. The backend will be responsible for validating this token, managing users, and issuing application-specific session tokens.

## Client-Side Flow
1. User taps "Continue with Google".
2. Client requests an ID Token from Google Play Services using the **Web Client ID**.
3. Client receives the Google `idToken`.
4. Client sends a POST request with the `idToken` to our backend `/api/auth/google`.

## Backend Flow (Implementation Plan)

### 1. Token Verification
- Use Google's official `google-auth-library` for Node.js (or equivalent in the chosen backend language).
- Initialize the `OAuth2Client` with the same **Web Client ID** used on the frontend.
- Verify the token signature and expiration.
- Extract the payload: `sub` (Google User ID), `email`, `name`, and `picture`.

### 2. User Management
- Check the database (e.g., PostgreSQL, MongoDB) for an existing user with the matching `google_id` (the `sub` field).
- **If user exists**: Update their `last_login` timestamp.
- **If user is new**: Create a new user record. Initialize default preferences (e.g., default language `en`).

### 3. Session Management
- **Do not use the Google ID token for API authorization.** It expires quickly and limits our control.
- Generate an application-specific JSON Web Token (JWT) or establish a secure session (e.g., Redis-backed session ID).
- Return the `accessToken` (and optionally a `refreshToken`) to the React Native client.

### 4. Client Storage & Usage
- Client stores the `accessToken` securely (e.g., `expo-secure-store`).
- Client attaches the token as a Bearer token in the `Authorization` header for all subsequent API requests.

### 5. Security Considerations
- Ensure HTTPS is enforced for all backend routes.
- Validate that the `aud` (audience) claim in the Google ID Token matches our exact Web Client ID to prevent token substitution attacks.
