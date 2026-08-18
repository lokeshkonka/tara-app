const mongoose = require('mongoose');

// PHASE 4: learn level (a node within a module / lesson timeline).
// `schemaPayload` is the full data-driven LevelDefinition phase content
// (interactiveLearn/conceptCards/mcq/match/... phases). It is optional: until
// the payloads are authored/ported, it stays null and the mobile app falls
// back to its bundled lesson packages for level play content, while all
// progress/XP/streak bookkeeping still happens against this model.
const learnLevelSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    moduleId: {
        type: String,
        required: true,
        index: true
    },
    levelNumber: {
        type: Number,
        required: true
    },
    titleKey: {
        type: String,
        required: true
    },
    descriptionKey: {
        type: String,
        default: ''
    },
    durationMinutes: {
        type: Number,
        default: 5
    },
    xpReward: {
        type: Number,
        default: 30
    },
    // Full LevelDefinition phase payload; null until authored.
    schemaPayload: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    }
});

// One level id per module + position for sequence walking.
learnLevelSchema.index({ moduleId: 1, levelNumber: 1 }, { unique: true });

const LearnLevel = mongoose.model('LearnLevel', learnLevelSchema);

module.exports = LearnLevel;