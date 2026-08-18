const mongoose = require('mongoose');

// PHASE 2: per-user bookmark on a voice story (for offline playback later).
const voiceStoryBookmarkSchema = new mongoose.Schema({
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

voiceStoryBookmarkSchema.index({ userId: 1, storyId: 1 }, { unique: true });

const VoiceStoryBookmark = mongoose.model('VoiceStoryBookmark', voiceStoryBookmarkSchema);

module.exports = VoiceStoryBookmark;