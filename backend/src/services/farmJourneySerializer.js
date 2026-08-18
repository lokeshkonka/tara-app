const FarmTimelineEvent = require('../models/farmTimelineEvent.model');
const CommunityPost = require('../models/communityPost.model');
const User = require('../models/user.model');

// PHASE 3: Farm Journey serializer.
// Turns Mongo docs into the exact shapes the mobile app's
// IFarmJourneyRepository / FarmJourneyContext expect:
//   - FarmTimelineEvent  { id, date, title, description, category, imageUrl?,
//                          taraNote, healthDelta, metricsEffect? }
//   - AchievementBadge   { id, title, description, category, iconName,
//                          isUnlocked, unlockedDate?, xpReward, progress, maxProgress }
//   - FarmHealthMetrics  { overallScore, soilOrganicMatterScore, waterEfficiencyScore,
//                          biologicalDiversityScore, cropResilienceScore,
//                          activePracticesCount, acresProtected }

const CATEGORY_LABELS = {
    soil: 'soil',
    water: 'water',
    organic: 'organic',
    pest: 'pest',
    energy: 'energy'
};

// "Today" / "Yesterday" / "12 Aug" style labels (matches dummy timeline data).
const formatDateLabel = (date) => {
    const d = new Date(date);
    const now = new Date();
    const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
    const daysDiff = Math.round((startOfDay(now) - startOfDay(d)) / 86400000);

    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return 'Yesterday';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const formatFullDate = (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const toTimelineEvent = (evt) => ({
    id: evt._id.toString(),
    date: formatDateLabel(evt.createdAt || evt._id.getTimestamp()),
    title: evt.title,
    description: evt.description,
    category: evt.category,
    imageUrl: evt.imageUrl || undefined,
    taraNote: evt.taraNote,
    healthDelta: evt.healthDelta,
    metricsEffect: evt.metricsEffect
});

// ── Achievement catalog (ids/titles/icons mirror the FE dummy data) ─────────
// Each badge's progress is derived from live stats; maxProgress is the target.
const ACHIEVEMENT_CATALOG = [
    {
        id: 'badge-first-step',
        title: 'First Step',
        description: 'Completed your first sustainable farming practice.',
        category: 'practice',
        iconName: 'emoji-events',
        xpReward: 50,
        maxProgress: 1,
        progressOf: (s) => Math.min(s.totalEvents, 1)
    },
    {
        id: 'badge-consistent-grower',
        title: 'Consistent Grower',
        description: 'Maintained a 7-day daily learning streak.',
        category: 'streak',
        iconName: 'local-fire-department',
        xpReward: 100,
        maxProgress: 7,
        progressOf: (s) => Math.min(s.streakDays, 7)
    },
    {
        id: 'badge-water-guardian',
        title: 'Water Guardian',
        description: 'Implemented 5 active water-saving practices on your farm.',
        category: 'practice',
        iconName: 'water-drop',
        xpReward: 150,
        maxProgress: 5,
        progressOf: (s) => Math.min(s.waterEvents, 5)
    },
    {
        id: 'badge-organic-champion',
        title: 'Organic Champion',
        description: 'Replaced 100% synthetic fertilizer with bio-compost.',
        category: 'practice',
        iconName: 'compost',
        xpReward: 200,
        maxProgress: 1,
        progressOf: (s) => Math.min(s.organicEvents, 1)
    },
    {
        id: 'badge-soil-guardian',
        title: 'Soil Guardian',
        description: 'Mastered all 5 levels of the Soil Health learning pathway.',
        category: 'learning',
        iconName: 'eco',
        xpReward: 250,
        maxProgress: 5,
        progressOf: (s) => Math.min(s.level, 5)
    },
    {
        id: 'badge-community-contributor',
        title: 'Community Contributor',
        description: 'Shared 20 verified practices and tips with fellow farmers.',
        category: 'community',
        iconName: 'groups',
        xpReward: 180,
        maxProgress: 20,
        progressOf: (s) => Math.min(s.postsCount, 20)
    },
    {
        id: 'badge-community-mentor',
        title: 'Community Mentor',
        description: 'Help 50 farmers and answer 30 questions in your Panchayat.',
        category: 'community',
        iconName: 'verified',
        xpReward: 400,
        maxProgress: 50,
        progressOf: (s) => Math.min(s.postsCount + s.repliesCount, 50)
    },
    {
        id: 'badge-master-harvester',
        title: 'Master Harvester',
        description: 'Harvest 3 consecutive seasons with zero synthetic chemical residue.',
        category: 'practice',
        iconName: 'spa',
        xpReward: 500,
        maxProgress: 3,
        progressOf: (s) => Math.min(s.organicEvents, 3)
    }
];

// Live per-user counters used by both achievements and farm health.
const computeStats = async (userId) => {
    const [timeline, posts, user] = await Promise.all([
        FarmTimelineEvent.find({ userId }),
        CommunityPost.find({ authorId: userId }),
        User.findById(userId)
    ]);

    const stats = {
        totalEvents: timeline.length,
        waterEvents: timeline.filter((e) => e.category === 'water').length,
        organicEvents: timeline.filter((e) => e.category === 'organic').length,
        postsCount: posts.length,
        repliesCount: posts.reduce((sum, p) => sum + (p.replies ? p.replies.length : 0), 0),
        streakDays: user ? user.streakDays || 0 : 0,
        level: user ? user.level || 1 : 1,
        xp: user ? user.xp || 0 : 0
    };
    return stats;
};

// FarmHealthMetrics computed from farm profile + live timeline stats.
const toHealthMetrics = (farm, stats) => {
    const soilOrganicMatterScore = Math.max(0, Math.min(100, farm ? farm.soilHealthScore : 75));
    const waterEfficiencyScore = Math.max(0, Math.min(100, 55 + stats.waterEvents * 3));
    const biologicalDiversityScore = Math.max(0, Math.min(100, 50 + (farm && farm.crops ? farm.crops.length : 0) * 8));
    const cropResilienceScore = Math.max(0, Math.min(100, Math.round(55 + soilOrganicMatterScore / 5)));
    const overallScore = Math.round(
        (soilOrganicMatterScore + waterEfficiencyScore + biologicalDiversityScore + cropResilienceScore) / 4
    );

    return {
        overallScore,
        soilOrganicMatterScore,
        waterEfficiencyScore,
        biologicalDiversityScore,
        cropResilienceScore,
        activePracticesCount:
            (farm && farm.activePractices ? farm.activePractices.length : 0) + stats.totalEvents,
        acresProtected: farm && farm.sizeAcres ? farm.sizeAcres : 0
    };
};

// AchievementBadge[] — combines the catalog, live progress and the persisted
// unlock records. Stats + unlocked records are passed in by the controller
// (which already loaded them and may have auto-unlocked newly-earned badges).
const toAchievements = (stats, unlockedMap) =>
    ACHIEVEMENT_CATALOG.map((badge) => {
        const progress = badge.progressOf(stats);
        const record = unlockedMap.get(badge.id);
        const isUnlocked = !!record || progress >= badge.maxProgress;
        return {
            id: badge.id,
            title: badge.title,
            description: badge.description,
            category: badge.category,
            iconName: badge.iconName,
            isUnlocked,
            unlockedDate: record ? formatFullDate(record.unlockedAt) : undefined,
            xpReward: badge.xpReward,
            progress,
            maxProgress: badge.maxProgress
        };
    });

module.exports = {
    CATEGORY_LABELS,
    ACHIEVEMENT_CATALOG,
    computeStats,
    toTimelineEvent,
    toHealthMetrics,
    toAchievements
};