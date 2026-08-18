const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const communityController = require('../controllers/community.controller');

const router = express.Router();

// PHASE 2: Community & Voice Stories routes (mounted under /api/v1/community/*).
// Match the ICommunityRepository contract on the mobile app.

// Panchayat list + impact
router.get('/panchayats', authMiddleware, communityController.getPanchayats);
router.get('/impact/user', authMiddleware, communityController.getUserImpact);
router.get('/impact/panchayat/:panchayatId', authMiddleware, communityController.getPanchayatImpact);
router.get('/leaderboard', authMiddleware, communityController.getLeaderboard);

// Voice stories (read + like + bookmark). Audio upload is a later phase.
router.get('/voice-stories', authMiddleware, communityController.getVoiceStories);
router.post('/voice-stories/:storyId/like', authMiddleware, communityController.likeStory);
router.post('/voice-stories/:storyId/bookmark', authMiddleware, communityController.bookmarkStory);

// Posts / contributions (read + create + like + reply)
router.get('/posts', authMiddleware, communityController.getContributions);
router.post('/posts', authMiddleware, communityController.createContribution);
router.post('/posts/:postId/like', authMiddleware, communityController.likeContribution);
router.post('/posts/:postId/replies', authMiddleware, communityController.addReply);

module.exports = router;