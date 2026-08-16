const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Google Login Route
router.post('/google', authController.googleLogin);

// Get current user (protected)
router.get('/me', authMiddleware, authController.getCurrentUser);

// Refresh session (rotates the refresh token)
router.post('/refresh', authController.refreshSession);

// Logout (revokes the refresh token)
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
