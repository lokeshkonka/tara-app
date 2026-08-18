const mongoose = require('mongoose');

// PHASE 3: farm timeline event.
// One entry per sustainable practice logged by the farmer. Maps to the FE
// FarmTimelineEvent type (id/date/title/description/category/taraNote/
// healthDelta/metricsEffect). `date` is serialized from createdAt as a
// relative label ("Today", "Yesterday", "12 Aug") by the serializer.
const farmTimelineEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['soil', 'water', 'organic', 'pest', 'energy'],
        required: true
    },
    taraNote: {
        type: String,
        default: 'Wonderful progress! Sustainable practices gradually build organic resilience across every layer of your farm.'
    },
    healthDelta: {
        type: Number,
        default: 3
    },
    metricsEffect: {
        type: String,
        default: 'Improves overall soil biological activity'
    }
}, {
    timestamps: true
});

const FarmTimelineEvent = mongoose.model('FarmTimelineEvent', farmTimelineEventSchema);

module.exports = FarmTimelineEvent;