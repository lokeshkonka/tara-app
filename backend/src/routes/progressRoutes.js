const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const progressController = require('../controllers/progress.controller');

const router = express.Router();

// PHASE 5: Progress routes (mounted under /api/v1/progress).
// Match the IProgressRepository contract on the mobile app.

router.get('/', authMiddleware, progressController.getProgress);

module.exports = router;