const mongoose = require('mongoose');

const POST_TYPES = ['practice', 'tip', 'story', 'question'];
const CATEGORIES = ['soil', 'water', 'organic', 'pest', 'seeds', 'general'];

// PHASE 2: community post / contribution (practice, tip, story or question).
// Maps to the FE CommunityContribution type. Replies are embedded for
// simplicity; `taraVerifiedAnswer` is where a future AI agronomist response
// gets persisted.
const replySchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorLocation: {
        type: String,
        default: ''
    },
    authorAvatarUrl: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        required: true
    },
    isTaraVerified: {
        type: Boolean,
        default: false
    },
    likesCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const communityPostSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    panchayatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panchayat'
    },
    type: {
        type: String,
        enum: POST_TYPES,
        required: true
    },
    category: {
        type: String,
        enum: CATEGORIES,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    likesCount: {
        type: Number,
        default: 0
    },
    taraVerifiedAnswer: {
        type: {
            text: { type: String, required: true },
            verifiedBy: { type: String, default: 'Tara Agronomist' },
            actionableStep: { type: String, default: '' }
        },
        default: null
    },
    replies: {
        type: [replySchema],
        default: []
    }
}, {
    timestamps: true
});

communityPostSchema.index({ type: 1, createdAt: -1 });

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

module.exports = CommunityPost;