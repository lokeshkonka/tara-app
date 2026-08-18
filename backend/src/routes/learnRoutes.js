const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const learnController = require('../controllers/learn.controller');

const router = express.Router();

// PHASE 4: Learn & Progress routes (mounted under /api/v1/learn/*).
// Match the ILearnRepository contract on the mobile app.

router.get('/summary', authMiddleware, learnController.getSummary);
router.get('/categories', authMiddleware, learnController.getCategories);
router.get('/lessons', authMiddleware, learnController.getLessons);
router.get('/lessons/:moduleId', authMiddleware, learnController.getLessonDetail);
router.post('/lessons/:moduleId/complete', authMiddleware, learnController.completeLesson);

router.get('/levels/:levelId', authMiddleware, learnController.getLevelDefinition);
router.post('/levels/:levelId/complete', authMiddleware, learnController.completeLevelStep);

module.exports = router;