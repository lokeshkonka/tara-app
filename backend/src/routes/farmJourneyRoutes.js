const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const farmJourneyController = require('../controllers/farmJourney.controller');

const router = express.Router();

// PHASE 3: Farm Journey routes (mounted under /api/v1/farm-journey/*).
// Match the IFarmJourneyRepository contract on the mobile app.

router.get('/timeline', authMiddleware, farmJourneyController.getTimelineEvents);
router.post('/timeline', authMiddleware, farmJourneyController.addTimelineEvent);

router.get('/achievements', authMiddleware, farmJourneyController.getAchievements);
router.post('/achievements/:badgeId/claim', authMiddleware, farmJourneyController.claimBadge);

router.get('/health', authMiddleware, farmJourneyController.getFarmHealth);

module.exports = router;