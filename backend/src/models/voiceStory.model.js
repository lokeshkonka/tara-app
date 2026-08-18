const mongoose = require('mongoose');

const CATEGORIES = ['soil', 'water', 'organic', 'pest', 'seeds', 'general'];

// PHASE 2: Voice story (multilingual audio note shared in the community).
// Maps to the FE VoiceStory type. Audio upload/transcription is a later phase;
// this model already carries the fields the pipeline will fill (audioUrl,
// waveformSample, transcript, taraTakeaway).
const voiceStorySchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    panchayatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panchayat'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    durationSeconds: {
        type: Number,
        default: 0
    },
    durationFormatted: {
        type: String,
        default: '0:00'
    },
    category: {
        type: String,
        enum: CATEGORIES,
        required: true
    },
    languageCode: {
        type: String,
        default: 'hi'
    },
    // 16-point normalized peak array for the audio waveform UI.
    waveformSample: {
        type: [Number],
        default: []
    },
    transcript: {
        type: String,
        default: ''
    },
    taraTakeaway: {
        type: String,
        default: ''
    },
    likesCount: {
        type: Number,
        default: 0
    },
    playsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

voiceStorySchema.index({ category: 1, createdAt: -1 });

const VoiceStory = mongoose.model('VoiceStory', voiceStorySchema);

module.exports = VoiceStory;