const LearnCategory = require('../models/learnCategory.model');
const LearnModule = require('../models/learnModule.model');
const LearnLevel = require('../models/learnLevel.model');

// PHASE 4: idempotent dev seed for the Learn module.
// Runs automatically on server start (see server.js). Only seeds when there are
// no categories yet, so it never overwrites authored content. The module list
// mirrors the frontend dummy data (Tara/src/data/dummy/learnData.ts) and the
// level ids match the bundled lesson packages (soil-level-1..5,
// basics-level-1..10) so progress/unlock bookkeeping lines up with play.

const CATEGORIES = [
    { id: 'all', labelKey: 'learn.category.all', icon: 'apps', displayOrder: 0 },
    { id: 'soil', labelKey: 'learn.category.soil', icon: 'eco', displayOrder: 1 },
    { id: 'water', labelKey: 'learn.category.water', icon: 'water-drop', displayOrder: 2 },
    { id: 'compost', labelKey: 'learn.category.compost', icon: 'layers', displayOrder: 3 },
    { id: 'pest', labelKey: 'learn.category.pest', icon: 'bug-report', displayOrder: 4 },
    { id: 'crops', labelKey: 'learn.category.crops', icon: 'grass', displayOrder: 5 },
    { id: 'basics', labelKey: 'learn.category.basics', icon: 'school', displayOrder: 6 }
];

const MODULES = [
    {
        id: 'soil-level-1', level: 1, titleKey: 'lesson.title.soil', descriptionKey: 'lesson.desc.soil',
        categoryId: 'soil', expression: 'excited', xp: 360, durationMinutes: 26, totalLevels: 5, displayOrder: 1,
        levelPrefix: 'soil-level-'
    },
    {
        id: 'soil-health-package-2', level: 2, titleKey: 'lesson.title.soil2', descriptionKey: 'lesson.desc.soil2',
        categoryId: 'soil', expression: 'happy', xp: 360, durationMinutes: 26, totalLevels: 5, displayOrder: 2,
        levelPrefix: 'soil2-level-'
    },
    {
        id: 'water-management', level: 1, titleKey: 'lesson.title.water', descriptionKey: 'lesson.desc.water',
        categoryId: 'water', expression: 'happy', xp: 180, durationMinutes: 20, totalLevels: 4, displayOrder: 1,
        levelPrefix: 'water-level-'
    },
    {
        id: 'organic-compost', level: 1, titleKey: 'lesson.title.compost', descriptionKey: 'lesson.desc.compost',
        categoryId: 'compost', expression: 'thinking', xp: 160, durationMinutes: 18, totalLevels: 4, displayOrder: 1,
        levelPrefix: 'compost-level-'
    },
    {
        id: 'pest-control', level: 1, titleKey: 'lesson.title.pest', descriptionKey: 'lesson.desc.pest',
        categoryId: 'pest', expression: 'surprised', xp: 190, durationMinutes: 22, totalLevels: 4, displayOrder: 1,
        levelPrefix: 'pest-level-'
    },
    {
        id: 'crop-rotation', level: 1, titleKey: 'lesson.title.crops', descriptionKey: 'lesson.desc.crops',
        categoryId: 'crops', expression: 'excited', xp: 170, durationMinutes: 20, totalLevels: 4, displayOrder: 1,
        levelPrefix: 'crops-level-'
    },
    {
        id: 'farming-basics', level: 1, titleKey: 'lesson.title.farming_basics', descriptionKey: 'lesson.desc.farming_basics',
        categoryId: 'basics', expression: 'excited', xp: 500, durationMinutes: 50, totalLevels: 10, displayOrder: 1,
        levelPrefix: 'basics-level-'
    }
];

const seedIfEmpty = async () => {
    const categoryCount = await LearnCategory.countDocuments();
    if (categoryCount > 0) {
        console.log('[seed] Learn data already present, skipping.');
        return;
    }

    console.log('[seed] Inserting learn curriculum demo data...');

    await LearnCategory.insertMany(CATEGORIES);

    const levelsToInsert = [];
    for (const m of MODULES) {
        const moduleDoc = {
            id: m.id,
            level: m.level,
            titleKey: m.titleKey,
            descriptionKey: m.descriptionKey,
            categoryId: m.categoryId,
            expression: m.expression,
            xp: m.xp,
            durationMinutes: m.durationMinutes,
            totalLevels: m.totalLevels,
            displayOrder: m.displayOrder,
            whyItMattersKey: `lesson.${m.id}.detail.whyItMatters`,
            taraQuoteKey: `lesson.${m.id}.detail.taraQuote`,
            taraExpression: m.expression,
            learningOutcomes: [1, 2, 3].map((n) => ({
                id: `outcome-${n}`,
                textKey: `lesson.${m.id}.outcome.${n}`
            }))
        };
        await LearnModule.create(moduleDoc);

        for (let n = 1; n <= m.totalLevels; n += 1) {
            levelsToInsert.push({
                id: `${m.levelPrefix}${n}`,
                moduleId: m.id,
                levelNumber: n,
                titleKey: `lesson.${m.id}.level${n}.title`,
                descriptionKey: `lesson.${m.id}.level${n}.desc`,
                durationMinutes: 5,
                xpReward: 30,
                schemaPayload: null
            });
        }
    }
    await LearnLevel.insertMany(levelsToInsert);

    console.log(`[seed] Learn curriculum ready (${CATEGORIES.length} categories, ${MODULES.length} modules, ${levelsToInsert.length} levels).`);
};

module.exports = { seedIfEmpty };