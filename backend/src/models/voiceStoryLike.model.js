const mongoose = require('mongoose');

// PHASE 2: per-user like on a voice story (compound unique -> toggle).
const voiceStoryLikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VoiceStory',
        required: true
    }
}, {
    timestamps: true
});

voiceStoryLikeSchema.index({ userId: 1, storyId: 1 }, { unique: true });

const VoiceStoryLike = mongoose.model('VoiceStoryLike', voiceStoryLikeSchema);

module.exports = VoiceStoryLike;