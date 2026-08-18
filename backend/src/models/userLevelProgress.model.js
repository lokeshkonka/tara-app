const mongoose = require('mongoose');

// PHASE 4: per-user level progress.
// Mirrors the plan's user_level_progress table. Unlocking is sequential within
// a module: completing a level flips the next level to 'available'. A single
// record per (user, level) is upserted on completion.
const userLevelProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    levelId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['locked', 'available', 'inProgress', 'completed'],
        default: 'available'
    },
    score: {
        type: Number,
        default: null
    },
    attempts: {
        type: Number,
        default: 1
    },
    completedAt: {
        type: Date,
        default: null
    }
});

userLevelProgressSchema.index({ userId: 1, levelId: 1 }, { unique: true });

const UserLevelProgress = mongoose.model('UserLevelProgress', userLevelProgressSchema);

module.exports = UserLevelProgress;