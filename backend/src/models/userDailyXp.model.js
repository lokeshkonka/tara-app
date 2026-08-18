const mongoose = require('mongoose');

// PHASE 4: daily XP tally (LearnSummary.todayXp).
// One row per user per calendar day; incremented on level completion.
const userDailyXpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    date: {
        type: String,
        required: true // 'YYYY-MM-DD' (server-local)
    },
    xp: {
        type: Number,
        default: 0
    }
});

userDailyXpSchema.index({ userId: 1, date: 1 }, { unique: true });

const UserDailyXp = mongoose.model('UserDailyXp', userDailyXpSchema);

module.exports = UserDailyXp;