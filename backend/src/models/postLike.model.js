const mongoose = require('mongoose');

// PHASE 2: per-user like on a community post (compound unique -> toggle).
const postLikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityPost',
        required: true
    }
}, {
    timestamps: true
});

postLikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const PostLike = mongoose.model('PostLike', postLikeSchema);

module.exports = PostLike;