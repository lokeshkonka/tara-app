// PHASE 5: Progress serializer.
// Turns live user stats + farm profile into the exact shape the mobile app's
// IProgressRepository / ProgressContext expect:
//   - ProgressData { greenScore, greenScoreMax, level, metrics, badges, dailyGoal }
//
// ProgressData / ProgressMetric / Badge / DailyGoal live in
// Tara/src/types/progress.ts. Metric ids and badge ids match the FE themes
// exactly (ImpactMetrics.tsx / BadgesRow.tsx key their colors on these ids).

const DAILY_PRACTICE_TARGET = 3;
const GREEN_SCORE_MAX = 1200;

// The five badges rendered on the Home progress card, mirroring the dummy data.
// Unlock state is derived from live stats so real activity lights them up.
const PROGRESS_BADGES = (farm, stats) => [
    {
        id: 'soil-guardian',
        name: 'Soil Guardian',
        icon: 'eco',
        unlocked: stats.level >= 5
    },
    {
        id: 'water-saver',
        name: 'Water Saver',
        icon: 'water-drop',
        unlocked: stats.waterEvents >= 1
    },
    {
        id: 'eco-grower',
        name: 'Eco Grower',
        icon: 'spa',
        unlocked: stats.organicEvents >= 1
    },
    {
        id: 'biodiversity',
        name: 'Biodiversity',
        icon: 'forest',
        unlocked: (farm && farm.crops ? farm.crops.length : 0) >= 3
    },
    {
        id: 'pollinator',
        name: 'Pollinator',
        icon: 'bug-report',
        unlocked: stats.totalEvents >= 5
    }
];

const toProgress = ({ farm, stats, health, todaysEventCount }) => {
    const level = stats.level || 1;
    const overallScore = health.overallScore || 0;
    const greenScore = Math.min(GREEN_SCORE_MAX, Math.round(overallScore * 8 + (level - 1) * 20));

    const metrics = [
        {
            id: 'soil-health',
            title: 'Soil Health',
            value: health.soilOrganicMatterScore,
            unit: '%',
            percentage: health.soilOrganicMatterScore
        },
        {
            id: 'water-saving',
            title: 'Water Saving',
            value: health.waterEfficiencyScore,
            unit: '%',
            percentage: health.waterEfficiencyScore
        },
        {
            id: 'biodiversity',
            title: 'Biodiversity',
            value: health.biologicalDiversityScore,
            unit: '%',
            percentage: health.biologicalDiversityScore
        }
    ];

    return {
        greenScore,
        greenScoreMax: GREEN_SCORE_MAX,
        level,
        metrics,
        badges: PROGRESS_BADGES(farm, stats),
        dailyGoal: {
            completed: todaysEventCount,
            total: DAILY_PRACTICE_TARGET
        }
    };
};

module.exports = {
    DAILY_PRACTICE_TARGET,
    GREEN_SCORE_MAX,
    toProgress
};