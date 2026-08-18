const mongoose = require('mongoose');

// PHASE 3: persisted "badge unlocked" records.
// Badges themselves are computed on the fly from live user stats (see
// farmJourneySerializer catalog). This collection only records WHICH badges a
// user has unlocked and WHEN, so the mobile app can show a stable
// unlockedDate instead of re-deriving it every request.
const userAchievementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    achievementId: {
        type: String,
        required: true
    },
    unlockedAt: {
        type: Date,
        default: Date.now
    }
});

// One record per (user, achievement).
userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);

module.exports = UserAchievement;