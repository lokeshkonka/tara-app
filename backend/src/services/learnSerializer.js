const LearnLevel = require('../models/learnLevel.model');

// PHASE 4: Learn serializer.
// Maps Mongo docs to the exact shapes the mobile app's ILearnRepository /
// LearnContext expect (see Tara/src/types/learn.ts).

const toCategory = (cat) => ({
    id: cat.id,
    labelKey: cat.labelKey,
    icon: cat.icon
});

// LearnLesson. `completedCount` is the number of the module's levels the user
// has finished; progress is 0..1, isCompleted when all levels are done.
const toLesson = (mod, completedCount) => ({
    id: mod.id,
    level: mod.level,
    titleKey: mod.titleKey,
    descriptionKey: mod.descriptionKey,
    categoryId: mod.categoryId,
    expression: mod.expression,
    xp: mod.xp,
    durationMinutes: mod.durationMinutes,
    progress: Math.min(1, completedCount / mod.totalLevels),
    isCompleted: completedCount >= mod.totalLevels,
    totalLevels: mod.totalLevels
});

// LevelNodeDetail status/progress given a per-level progress record.
// Sequencing: completed levels first, then the first incomplete level is
// 'inProgress', everything after it is 'locked'.
const toLevelNode = (level, record, pendingSeen) => {
    let status = 'locked';
    let progressFraction = 0;
    if (record && record.status === 'completed') {
        status = 'completed';
        progressFraction = 1;
    } else if (!pendingSeen) {
        status = 'inProgress';
        pendingSeen = true;
    }
    return {
        id: level.id,
        levelNumber: level.levelNumber,
        titleKey: level.titleKey,
        descriptionKey: level.descriptionKey,
        durationMinutes: level.durationMinutes,
        xp: level.xpReward,
        status,
        progressFraction
    };
};

// LearnLessonDetail built from a module + its ordered levels + progress records.
const toLessonDetail = (mod, levels, progressMap) => {
    let pendingSeen = false;
    const levelNodes = levels.map((lvl) => {
        const node = toLevelNode(lvl, progressMap.get(lvl.id), pendingSeen);
        if (node.status === 'inProgress') pendingSeen = true;
        return node;
    });

    return {
        id: mod.id,
        categoryId: mod.categoryId,
        titleKey: mod.titleKey,
        descriptionKey: mod.descriptionKey,
        durationMinutes: mod.durationMinutes,
        totalLevels: mod.totalLevels,
        totalXp: mod.xp,
        whyItMattersKey: mod.whyItMattersKey,
        learningOutcomes: (mod.learningOutcomes || []).map((o) => ({
            id: o.id,
            textKey: o.textKey
        })),
        taraQuoteKey: mod.taraQuoteKey,
        taraExpression: mod.taraExpression,
        levels: levelNodes
    };
};

// LevelDefinition. Only returned when a schema payload has been seeded;
// otherwise null, which tells the mobile app to fall back to its bundled
// lesson packages for level play content.
const toLevelDefinition = (level) => {
    if (!level || !level.schemaPayload) return null;
    const payload = level.schemaPayload;
    return {
        id: level.id,
        lessonId: level.moduleId,
        levelNumber: level.levelNumber,
        title: payload.title || level.titleKey,
        subtitle: payload.subtitle,
        xpReward: level.xpReward,
        phases: payload.phases || []
    };
};

module.exports = {
    toCategory,
    toLesson,
    toLessonDetail,
    toLevelDefinition,
    toLevelNode
};