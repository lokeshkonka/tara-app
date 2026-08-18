const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

// PHASE 1: User & Profile service routes (mounted under /api/v1/user/*).
// All routes are protected — req.user.userId comes from the JWT.

// User profile (superset: UserProfile + AccountProfile)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Farm profile
router.get('/farm-profile', authMiddleware, userController.getFarmProfile);
router.put('/farm-profile', authMiddleware, userController.updateFarmProfile);

// XP award (safe, append-only milestone XP)
router.post('/xp', authMiddleware, userController.addXp);

module.exports = router;