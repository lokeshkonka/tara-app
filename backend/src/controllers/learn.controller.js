const User = require('../models/user.model');
const LearnCategory = require('../models/learnCategory.model');
const LearnModule = require('../models/learnModule.model');
const LearnLevel = require('../models/learnLevel.model');
const UserLevelProgress = require('../models/userLevelProgress.model');
const UserDailyXp = require('../models/userDailyXp.model');
const {
    toCategory,
    toLesson,
    toLessonDetail,
    toLevelDefinition
} = require('../services/learnSerializer');

// PHASE 4: Learn & Progress service (/api/v1/learn/*).
// All responses use the `{ success, data }` envelope expected by the mobile
// app's domain ApiClient (src/services/api/apiClient.ts reads json.data).

const dateKey = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dateKeyPlusDays = (key, days) => {
    const d = new Date(`${key}T00:00:00`);
    d.setDate(d.getDate() + days);
    return dateKey(d);
};

// GET /api/v1/learn/summary -> { todayXp }
const getSummary = async (req, res) => {
    try {
        const today = dateKey();
        const daily = await UserDailyXp.findOne({ userId: req.user.userId, date: today });
        return res.json({ success: true, data: { todayXp: daily ? daily.xp : 0 } });
    } catch (error) {
        console.error('Get Learn Summary Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/learn/categories
const getCategories = async (req, res) => {
    try {
        const categories = await LearnCategory.find().sort({ displayOrder: 1 });
        return res.json({ success: true, data: categories.map(toCategory) });
    } catch (error) {
        console.error('Get Learn Categories Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/learn/lessons -> LearnLesson[] with per-user progress
const getLessons = async (req, res) => {
    try {
        const [modules, progress] = await Promise.all([
            LearnModule.find().sort({ displayOrder: 1 }),
            UserLevelProgress.find({
                userId: req.user.userId,
                status: 'completed'
            }).select('levelId')
        ]);

        // Robust grouping: level id -> module id via a level lookup.
        const levels = await LearnLevel.find({ moduleId: { $in: modules.map((m) => m.id) } }).select('id moduleId');
        const levelModuleMap = new Map(levels.map((l) => [l.id, l.moduleId]));
        const counts = new Map();
        for (const p of progress) {
            const moduleId = levelModuleMap.get(p.levelId);
            if (!moduleId) continue;
            counts.set(moduleId, (counts.get(moduleId) || 0) + 1);
        }

        return res.json({
            success: true,
            data: modules.map((m) => toLesson(m, counts.get(m.id) || 0))
        });
    } catch (error) {
        console.error('Get Learn Lessons Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/learn/lessons/:moduleId -> LearnLessonDetail
const getLessonDetail = async (req, res) => {
    try {
        const mod = await LearnModule.findOne({ id: req.params.moduleId });
        if (!mod) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        const [levels, progress] = await Promise.all([
            LearnLevel.find({ moduleId: mod.id }).sort({ levelNumber: 1 }),
            UserLevelProgress.find({ userId: req.user.userId })
        ]);
        const progressMap = new Map(progress.map((p) => [p.levelId, p]));

        return res.json({
            success: true,
            data: toLessonDetail(mod, levels, progressMap)
        });
    } catch (error) {
        console.error('Get Learn Lesson Detail Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/learn/levels/:levelId?lang=en -> LevelDefinition | null
const getLevelDefinition = async (req, res) => {
    try {
        const level = await LearnLevel.findOne({ id: req.params.levelId });
        return res.json({ success: true, data: toLevelDefinition(level) });
    } catch (error) {
        console.error('Get Level Definition Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/learn/levels/:levelId/complete  body: { xpEarned }
// Marks the level complete, awards XP, updates the daily XP + streak, and
// unlocks the next level in the module's sequence.
const completeLevelStep = async (req, res) => {
    try {
        const levelId = req.params.levelId;
        const level = await LearnLevel.findOne({ id: levelId });
        if (!level) {
            return res.status(404).json({ success: false, message: 'Level not found' });
        }

        const xpEarned = Math.max(0, Math.round(Number((req.body && req.body.xpEarned) || 0)));

        // 1. Persist completion (idempotent upsert; attempts only counts first completion).
        const existingProgress = await UserLevelProgress.findOne({ userId: req.user.userId, levelId });
        await UserLevelProgress.findOneAndUpdate(
            { userId: req.user.userId, levelId },
            {
                $set: { status: 'completed', completedAt: new Date() },
                $inc: { attempts: existingProgress && existingProgress.status === 'completed' ? 0 : 1 }
            },
            { upsert: true }
        );

        // 2. Award XP + maintain streak on the user.
        const user = await User.findById(req.user.userId);
        if (user) {
            user.xp = (user.xp || 0) + xpEarned;
            user.level = Math.floor(user.xp / 200) + 1;

            const today = dateKey();
            const yesterday = dateKeyPlusDays(today, -1);
            if (user.lastActiveDate === today) {
                // already active today
            } else if (user.lastActiveDate === yesterday) {
                user.streakDays = (user.streakDays || 0) + 1;
            } else {
                user.streakDays = 1;
            }
            user.lastActiveDate = today;
            await user.save();

            // 3. Daily XP tally for LearnSummary.todayXp.
            await UserDailyXp.updateOne(
                { userId: user._id, date: today },
                { $inc: { xp: xpEarned } },
                { upsert: true }
            );
        }

        // 4. Unlock the next level in sequence.
        let nextLevelId = null;
        const nextLevel = await LearnLevel.findOne({
            moduleId: level.moduleId,
            levelNumber: level.levelNumber + 1
        });
        if (nextLevel) {
            const nextProgress = await UserLevelProgress.findOne({
                userId: req.user.userId,
                levelId: nextLevel.id
            });
            if (!nextProgress || nextProgress.status !== 'completed') {
                await UserLevelProgress.updateOne(
                    { userId: req.user.userId, levelId: nextLevel.id },
                    { $setOnInsert: { status: 'available', attempts: 1 } },
                    { upsert: true }
                );
            }
            nextLevelId = nextLevel.id;
        }

        return res.json({ success: true, data: { nextLevelId } });
    } catch (error) {
        console.error('Complete Level Step Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/learn/lessons/:moduleId/complete
// Marks every level of the module complete and returns the updated lesson.
const completeLesson = async (req, res) => {
    try {
        const mod = await LearnModule.findOne({ id: req.params.moduleId });
        if (!mod) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        const levels = await LearnLevel.find({ moduleId: mod.id }).select('id');
        for (const level of levels) {
            await UserLevelProgress.updateOne(
                { userId: req.user.userId, levelId: level.id },
                { $set: { status: 'completed', completedAt: new Date() } },
                { upsert: true }
            );
        }

        return res.json({
            success: true,
            data: toLesson(mod, levels.length)
        });
    } catch (error) {
        console.error('Complete Lesson Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getSummary,
    getCategories,
    getLessons,
    getLessonDetail,
    getLevelDefinition,
    completeLevelStep,
    completeLesson
};