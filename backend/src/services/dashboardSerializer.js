// PHASE 5: Dashboard serializer.
// Turns live user activity into the exact shape the mobile app's
// IDashboardRepository / DashboardContext expect:
//   - DashboardSummary { todaysPractice: PracticeItem | null,
//                        completedPractices, totalPractices, xpEarnedThisWeek }
//
// PracticeItem (Tara/src/types/farm.ts):
//   { id, title, description, category: 'soil'|'pest'|'water'|'compost',
//     difficulty: 'easy'|'medium'|'advanced', xpGain, completed,
//     image?, durationMinutes? }
// `image` is intentionally omitted: the app's card renders a blank image slot.

const WEEKLY_PRACTICE_TARGET = 8;

// PracticeItem templates used both for the daily suggestion (when the farmer
// has not logged anything today) and for the difficulty/xp metadata applied to
// logged timeline events (whose model only stores title/description/category).
const PRACTICE_TEMPLATES = {
    soil: {
        title: 'Mulch 5 plants',
        description: 'Protect soil moisture and improve health.',
        difficulty: 'easy',
        xpGain: 40,
        durationMinutes: 10
    },
    water: {
        title: 'Set up a drip irrigation line',
        description: 'Save water and deliver it straight to the roots.',
        difficulty: 'medium',
        xpGain: 50,
        durationMinutes: 15
    },
    pest: {
        title: 'Apply neem oil spray',
        description: 'Protect crops naturally from pests.',
        difficulty: 'medium',
        xpGain: 45,
        durationMinutes: 12
    },
    compost: {
        title: 'Turn the compost pile',
        description: 'Speed up decomposition for richer soil.',
        difficulty: 'advanced',
        xpGain: 60,
        durationMinutes: 20
    }
};

// Farm timeline categories (soil/water/organic/pest/energy) -> PracticeItem
// categories (soil/water/pest/compost). organic maps to compost, energy to soil.
const EVENT_TO_PRACTICE_CATEGORY = {
    soil: 'soil',
    water: 'water',
    pest: 'pest',
    organic: 'compost',
    energy: 'soil'
};

const dayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now - start) / 86400000);
};

// The daily mission: if the farmer already logged a practice today, surface it
// as completed; otherwise offer the next practice in a rotating catalog.
const toPracticeItem = (todayEvent) => {
    if (todayEvent) {
        const category = EVENT_TO_PRACTICE_CATEGORY[todayEvent.category] || 'soil';
        const template = PRACTICE_TEMPLATES[category] || PRACTICE_TEMPLATES.soil;
        return {
            id: todayEvent._id.toString(),
            title: todayEvent.title,
            description: todayEvent.description || template.description,
            category,
            difficulty: template.difficulty,
            xpGain: template.xpGain,
            completed: true,
            durationMinutes: template.durationMinutes
        };
    }

    const categories = Object.keys(PRACTICE_TEMPLATES);
    const category = categories[dayOfYear() % categories.length];
    const template = PRACTICE_TEMPLATES[category];
    return {
        id: `daily-${category}`,
        title: template.title,
        description: template.description,
        category,
        difficulty: template.difficulty,
        xpGain: template.xpGain,
        completed: false,
        durationMinutes: template.durationMinutes
    };
};

const toDashboardSummary = ({ todayEvent, completedPractices, xpEarnedThisWeek }) => ({
    todaysPractice: toPracticeItem(todayEvent),
    completedPractices,
    totalPractices: WEEKLY_PRACTICE_TARGET,
    xpEarnedThisWeek
});

module.exports = {
    WEEKLY_PRACTICE_TARGET,
    toPracticeItem,
    toDashboardSummary
};
