const express = require('express');

const router = express.Router();

// PHASE 0: lightweight health/connectivity probe.
// The mobile app can hit GET /api/v1/health to verify the domain API is
// reachable (base URL + port + firewall), independent of any business logic.
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok',
        service: 'tara-backend',
        version: 'api/v1',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;