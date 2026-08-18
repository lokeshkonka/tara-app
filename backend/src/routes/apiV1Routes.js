const express = require('express');
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./userRoutes');
const settingsRoutes = require('./settingsRoutes');
const communityRoutes = require('./communityRoutes');
const farmJourneyRoutes = require('./farmJourneyRoutes');
const learnRoutes = require('./learnRoutes');

const router = express.Router();

// PHASE 0: aggregate router for all versioned domain services.
// Auth endpoints intentionally stay at /api/auth/* (see src/app.js) and are
// handled by the dedicated auth client on the mobile app.
router.use(healthRoutes);

// PHASE 1: User & Profile + Settings services.
router.use('/user', userRoutes);        // /api/v1/user/*    -> /user/profile, /user/farm-profile, /user/xp
router.use('/settings', settingsRoutes); // /api/v1/settings/* -> /settings/notifications|accessibility|security

// PHASE 2: Community & Voice Stories service.
router.use('/community', communityRoutes); // /api/v1/community/* -> panchayats|voice-stories|posts|impact|leaderboard

// PHASE 3: Farm Journey service.
router.use('/farm-journey', farmJourneyRoutes); // /api/v1/farm-journey/* -> timeline|achievements|health

// PHASE 4: Learn & Progress service.
router.use('/learn', learnRoutes); // /api/v1/learn/* -> summary|categories|lessons|levels

// Future phases mount here:
//   router.use(dashboardRoutes);      // Phase 5
//   router.use(progressRoutes);       // Phase 5

module.exports = router;