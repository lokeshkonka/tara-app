const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settings.controller');

const router = express.Router();

// PHASE 1: Settings service routes (mounted under /api/v1/settings/*).
// Match the ISettingsRepository contract on the mobile app.

// Notification preferences
router.get('/notifications', authMiddleware, settingsController.getNotificationSettings);
router.put('/notifications', authMiddleware, settingsController.updateNotificationSettings);

// Accessibility preferences
router.get('/accessibility', authMiddleware, settingsController.getAccessibilitySettings);
router.put('/accessibility', authMiddleware, settingsController.updateAccessibilitySettings);

// Security preferences + active devices
router.get('/security', authMiddleware, settingsController.getSecuritySettings);
router.put('/security', authMiddleware, settingsController.updateSecuritySettings);

// Remote sign-out of a specific device
router.delete('/devices/:deviceId', authMiddleware, settingsController.logoutDevice);

module.exports = router;