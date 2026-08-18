const FarmProfile = require('../models/farmProfile.model');
const FarmTimelineEvent = require('../models/farmTimelineEvent.model');
const { computeStats, toHealthMetrics } = require('../services/farmJourneySerializer');
const { toProgress } = require('../services/progressSerializer');

// PHASE 5: Progress service (/api/v1/progress).
// All responses use the `{ success, data }` envelope expected by the mobile
// app's domain ApiClient (src/services/api/apiClient.ts reads json.data).

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// GET /api/v1/progress -> ProgressData
const getProgress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todayStart = startOfDay();

        const [farm, stats, todaysEventCount] = await Promise.all([
            FarmProfile.findOne({ userId }),
            computeStats(userId),
            FarmTimelineEvent.countDocuments({ userId, createdAt: { $gte: todayStart } })
        ]);

        const health = toHealthMetrics(farm, stats);
        const progress = toProgress({
            farm,
            stats,
            health,
            todaysEventCount
        });

        return res.json({ success: true, data: progress });
    } catch (error) {
        console.error('Get Progress Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getProgress
};