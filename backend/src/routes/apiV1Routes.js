const express = require('express');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

// PHASE 0: aggregate router for all versioned domain services.
// Future phases mount their routers here (with authMiddleware where needed):
//   - user, settings, community, farm-journey, learn, dashboard, progress, ...
// Auth endpoints intentionally stay at /api/auth/* (see src/app.js) and are
// handled by the dedicated auth client on the mobile app.
router.use(healthRoutes);

module.exports = router;