const { generateAccessToken, generateRefreshToken, hashRefreshToken } = require('./jwtService');
const RefreshToken = require('../models/refreshToken.model');
const { toAuthUser } = require('./userSerializer');

const parseDurationMs = (duration) => {
    const match = /^(\d+)([smhd])$/.exec(String(duration || '').trim());
    if (!match) return 7 * 24 * 60 * 60 * 1000; // default 7d

    const value = parseInt(match[1], 10);
    const unit = match[2];
    const multipliers = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
    return value * multipliers[unit];
};

// Creates an access token + opaque refresh token, persists the refresh token (hashed),
// and returns a session object matching the client's AuthSession contract.
const createSession = async (user) => {
    const refreshToken = generateRefreshToken();
    const ttlMs = parseDurationMs(process.env.JWT_REFRESH_EXPIRES_IN);

    await RefreshToken.create({
        userId: user._id,
        tokenHash: hashRefreshToken(refreshToken),
        expiresAt: new Date(Date.now() + ttlMs)
    });

    return {
        user: toAuthUser(user),
        accessToken: generateAccessToken(user._id),
        refreshToken
    };
};

module.exports = { createSession };
