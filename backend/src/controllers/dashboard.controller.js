const FarmTimelineEvent = require('../models/farmTimelineEvent.model');
const UserDailyXp = require('../models/userDailyXp.model');
const { toDashboardSummary } = require('../services/dashboardSerializer');

// PHASE 5: Dashboard service (/api/v1/dashboard/*).
// All responses use the `{ success, data }` envelope expected by the mobile
// app's domain ApiClient (src/services/api/apiClient.ts reads json.data).

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const dateKey = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Date keys for the trailing N days (inclusive of today), oldest first.
const lastNDateKeys = (n) => {
    const keys = [];
    for (let i = n - 1; i >= 0; i -= 1) {
        const d = startOfDay();
        d.setDate(d.getDate() - i);
        keys.push(dateKey(d));
    }
    return keys;
};

// GET /api/v1/dashboard/summary -> DashboardSummary
const getSummary = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todayStart = startOfDay();
        const weekStart = startOfDay();
        weekStart.setDate(weekStart.getDate() - 6);

        const [todayEvent, completedPractices, dailyXpRows] = await Promise.all([
            FarmTimelineEvent.findOne({ userId, createdAt: { $gte: todayStart } })
                .sort({ createdAt: -1 }),
            FarmTimelineEvent.countDocuments({ userId, createdAt: { $gte: weekStart } }),
            UserDailyXp.find({ userId, date: { $in: lastNDateKeys(7) } }).select('xp')
        ]);

        const xpEarnedThisWeek = dailyXpRows.reduce((sum, row) => sum + (row.xp || 0), 0);

        return res.json({
            success: true,
            data: toDashboardSummary({ todayEvent, completedPractices, xpEarnedThisWeek })
        });
    } catch (error) {
        console.error('Get Dashboard Summary Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getSummary
};