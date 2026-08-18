const User = require('../models/user.model');
const FarmProfile = require('../models/farmProfile.model');
const FarmTimelineEvent = require('../models/farmTimelineEvent.model');
const UserAchievement = require('../models/userAchievement.model');
const {
    ACHIEVEMENT_CATALOG,
    computeStats,
    toTimelineEvent,
    toHealthMetrics,
    toAchievements
} = require('../services/farmJourneySerializer');

// PHASE 3: Farm Journey service (/api/v1/farm-journey/*).
// All responses use the `{ success, data }` envelope expected by the mobile
// app's domain ApiClient (src/services/api/apiClient.ts reads json.data).

// GET /api/v1/farm-journey/timeline
const getTimelineEvents = async (req, res) => {
    try {
        const events = await FarmTimelineEvent.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });
        return res.json({ success: true, data: events.map(toTimelineEvent) });
    } catch (error) {
        console.error('Get Timeline Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/farm-journey/timeline  body: { title, description, category, metricsEffect? }
const addTimelineEvent = async (req, res) => {
    try {
        const body = req.body || {};
        const title = typeof body.title === 'string' ? body.title.trim() : '';
        const category = body.category;
        const validCategories = ['soil', 'water', 'organic', 'pest', 'energy'];

        if (!title) {
            return res.status(400).json({ success: false, message: 'title is required' });
        }
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: `category must be one of ${validCategories.join(', ')}`
            });
        }

        const evt = await FarmTimelineEvent.create({
            userId: req.user.userId,
            title,
            description: typeof body.description === 'string' ? body.description.trim() : '',
            category,
            metricsEffect: typeof body.metricsEffect === 'string' ? body.metricsEffect : 'Improves overall soil biological activity'
        });

        // Persist the practice on the farm profile (adds to activePractices and
        // nudges soil health up, capped at 100) so the health metrics reflect it.
        const farm = await FarmProfile.findOne({ userId: req.user.userId });
        if (farm) {
            farm.activePractices = Array.from(new Set([...(farm.activePractices || []), category]));
            if (farm.soilHealthScore < 100) {
                farm.soilHealthScore = Math.min(100, farm.soilHealthScore + 1);
            }
            await farm.save();
        }

        return res.status(201).json({ success: true, data: toTimelineEvent(evt) });
    } catch (error) {
        console.error('Add Timeline Event Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/farm-journey/achievements
const getAchievements = async (req, res) => {
    try {
        const [stats, unlockedRecords] = await Promise.all([
            computeStats(req.user.userId),
            UserAchievement.find({ userId: req.user.userId })
        ]);
        const unlockedMap = new Map(unlockedRecords.map((r) => [r.achievementId, r]));

        // Auto-persist unlock records for badges that have just been earned so
        // their unlockedDate becomes stable across requests.
        const newlyEarned = ACHIEVEMENT_CATALOG.filter(
            (badge) => badge.progressOf(stats) >= badge.maxProgress && !unlockedMap.has(badge.id)
        );
        for (const badge of newlyEarned) {
            const rec = await UserAchievement.create({
                userId: req.user.userId,
                achievementId: badge.id,
                unlockedAt: new Date()
            });
            unlockedMap.set(badge.id, rec);
        }

        return res.json({ success: true, data: toAchievements(stats, unlockedMap) });
    } catch (error) {
        console.error('Get Achievements Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/farm-journey/achievements/:badgeId/claim
// Marks a badge as unlocked (upsert). Matches the FE dummy behaviour where
// claiming simply unlocks; gating claim on "earned" is a later refinement.
const claimBadge = async (req, res) => {
    try {
        const badgeId = req.params.badgeId;
        const badge = ACHIEVEMENT_CATALOG.find((b) => b.id === badgeId);
        if (!badge) {
            return res.status(404).json({ success: false, message: 'Unknown badge' });
        }

        await UserAchievement.findOneAndUpdate(
            { userId: req.user.userId, achievementId: badgeId },
            { $setOnInsert: { unlockedAt: new Date() } },
            { upsert: true }
        );

        return res.json({ success: true, data: null });
    } catch (error) {
        console.error('Claim Badge Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/farm-journey/health
const getFarmHealth = async (req, res) => {
    try {
        const [farm, stats] = await Promise.all([
            FarmProfile.findOne({ userId: req.user.userId }),
            computeStats(req.user.userId)
        ]);
        return res.json({ success: true, data: toHealthMetrics(farm, stats) });
    } catch (error) {
        console.error('Get Farm Health Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getTimelineEvents,
    addTimelineEvent,
    getAchievements,
    claimBadge,
    getFarmHealth
};