const mongoose = require('mongoose');

// PHASE 1: extended User schema.
// Merges the identity/auth fields (googleId/email/...) with the profile fields
// the mobile app expects (UserProfile + AccountProfile superset) plus an
// embedded `settings` subdocument (notifications / accessibility / security).
// Defaults mirror the frontend dummy data (Tara/src/data/dummy/settingsData.ts)
// so API responses stay consistent with what the app already renders.
const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    // ── Profile fields (UserProfile / AccountProfile superset) ──────────────
    phone: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: 'en'
    },
    userType: {
        type: String,
        default: 'smallholder'
    },
    avatarExpression: {
        type: String,
        default: 'happy'
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    streakDays: {
        type: Number,
        default: 0
    },
    badges: {
        type: [String],
        default: []
    },
    onboarded: {
        type: Boolean,
        default: false
    },
    // ── Embedded settings (ISettingsRepository contract) ────────────────────
    settings: {
        notifications: {
            type: {
                dailyReminders: { type: Boolean, default: true },
                dailyReminderTime: { type: String, default: '07:00 AM' },
                newLessons: { type: Boolean, default: true },
                streakAlerts: { type: Boolean, default: true },
                communityReplies: { type: Boolean, default: true },
                weeklyTips: { type: Boolean, default: true },
                pushEnabled: { type: Boolean, default: true },
                smsAlerts: { type: Boolean, default: false },
                soundEnabled: { type: Boolean, default: true }
            },
            default: () => ({})
        },
        accessibility: {
            type: {
                textScale: { type: String, enum: ['standard', 'large', 'extraLarge'], default: 'standard' },
                highContrast: { type: Boolean, default: false },
                screenReaderOptimized: { type: Boolean, default: false },
                audioAutoPlay: { type: Boolean, default: true },
                voiceInputSensitivity: { type: String, enum: ['normal', 'high'], default: 'normal' },
                reducedMotion: { type: Boolean, default: false }
            },
            default: () => ({})
        },
        security: {
            type: {
                pinEnabled: { type: Boolean, default: false },
                // PIN is stored hashed (scrypt) — never store/return the raw PIN.
                pinHash: { type: String, default: null },
                biometricsEnabled: { type: Boolean, default: true },
                twoFactorEnabled: { type: Boolean, default: false },
                showNameOnLeaderboard: { type: Boolean, default: true },
                shareAnonymousImpact: { type: Boolean, default: true }
            },
            default: () => ({})
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;