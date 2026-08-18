const mongoose = require('mongoose');

// PHASE 4: learn module (a "lesson" in the FE LearnLesson shape).
// Stores the i18n keys plus the extra metadata a lesson detail needs
// (whyItMatters / learningOutcomes / taraQuote), and the level count used to
// compute per-user progress. Heavy level play content lives in the levels
// collection (learnLevel.model.js) and may be served when seeded.
const learnModuleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    // 1-based position within its category (matches LearnLesson.level)
    level: {
        type: Number,
        default: 1
    },
    titleKey: {
        type: String,
        required: true
    },
    descriptionKey: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true,
        index: true
    },
    // FE TaraExpression: 'happy' | 'thinking' | 'excited' | 'surprised' | ...
    expression: {
        type: String,
        default: 'happy'
    },
    xp: {
        type: Number,
        default: 0
    },
    durationMinutes: {
        type: Number,
        default: 5
    },
    totalLevels: {
        type: Number,
        default: 1
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    whyItMattersKey: {
        type: String,
        default: ''
    },
    taraQuoteKey: {
        type: String,
        default: ''
    },
    taraExpression: {
        type: String,
        default: 'excited'
    },
    learningOutcomes: {
        type: [{
            id: { type: String, required: true },
            textKey: { type: String, required: true }
        }],
        default: []
    }
});

const LearnModule = mongoose.model('LearnModule', learnModuleSchema);

module.exports = LearnModule;