const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();

// PHASE 5: Dashboard routes (mounted under /api/v1/dashboard/*).
// Match the IDashboardRepository contract on the mobile app.

router.get('/summary', authMiddleware, dashboardController.getSummary);

module.exports = router;