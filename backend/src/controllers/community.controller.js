const User = require('../models/user.model');
const FarmProfile = require('../models/farmProfile.model');
const Panchayat = require('../models/panchayat.model');
const VoiceStory = require('../models/voiceStory.model');
const VoiceStoryLike = require('../models/voiceStoryLike.model');
const VoiceStoryBookmark = require('../models/voiceStoryBookmark.model');
const CommunityPost = require('../models/communityPost.model');
const PostLike = require('../models/postLike.model');
const {
    toPanchayat,
    toVoiceStory,
    toContribution,
    farmLocation
} = require('../services/communitySerializer');

// PHASE 2: Community & Voice Stories service (/api/v1/community/*).
// Responses use the { success, data } envelope expected by the app's domain
// ApiClient. All routes are protected by authMiddleware.

// GET /api/v1/community/panchayats
const getPanchayats = async (req, res) => {
    try {
        const panchayats = await Panchayat.find().sort({ name: 1 });
        return res.json({ success: true, data: panchayats.map(toPanchayat) });
    } catch (error) {
        console.error('Get Panchayats Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/community/voice-stories?category=soil
const getVoiceStories = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category && category !== 'all' ? { category } : {};
        const stories = await VoiceStory.find(filter).sort({ createdAt: -1 });

        // Batch-load authors + farms to avoid an N+1 query per story.
        const authorIds = [...new Set(stories.map((s) => s.authorId.toString()))];
        const [users, farms, likes, bookmarks] = await Promise.all([
            User.find({ _id: { $in: authorIds } }),
            FarmProfile.find({ userId: { $in: authorIds } }),
            VoiceStoryLike.find({ userId: req.user.userId, storyId: { $in: stories.map((s) => s._id) } }),
            VoiceStoryBookmark.find({ userId: req.user.userId, storyId: { $in: stories.map((s) => s._id) } })
        ]);

        const userMap = new Map(users.map((u) => [u._id.toString(), u]));
        const farmMap = new Map(farms.map((f) => [f.userId.toString(), f]));
        const likedSet = new Set(likes.map((l) => l.storyId.toString()));
        const bookmarkedSet = new Set(bookmarks.map((b) => b.storyId.toString()));

        const data = stories.map((s) =>
            toVoiceStory(
                s,
                userMap.get(s.authorId.toString()),
                farmMap.get(s.authorId.toString()),
                likedSet.has(s._id.toString()),
                bookmarkedSet.has(s._id.toString())
            )
        );

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Get Voice Stories Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/community/voice-stories/:storyId/like  (toggle)
const likeStory = async (req, res) => {
    try {
        const { storyId } = req.params;

        const story = await VoiceStory.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Voice story not found' });
        }

        const existing = await VoiceStoryLike.findOne({ userId: req.user.userId, storyId: story._id });
        if (existing) {
            await existing.deleteOne();
            story.likesCount = Math.max(0, (story.likesCount || 0) - 1);
            await story.save();
            return res.json({ success: true, data: { liked: false } });
        }

        await VoiceStoryLike.create({ userId: req.user.userId, storyId: story._id });
        story.likesCount = (story.likesCount || 0) + 1;
        await story.save();
        return res.json({ success: true, data: { liked: true } });
    } catch (error) {
        console.error('Like Story Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/community/voice-stories/:storyId/bookmark  (toggle)
const bookmarkStory = async (req, res) => {
    try {
        const { storyId } = req.params;

        const story = await VoiceStory.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Voice story not found' });
        }

        const existing = await VoiceStoryBookmark.findOne({ userId: req.user.userId, storyId: story._id });
        if (existing) {
            await existing.deleteOne();
            return res.json({ success: true, data: { bookmarked: false } });
        }

        await VoiceStoryBookmark.create({ userId: req.user.userId, storyId: story._id });
        return res.json({ success: true, data: { bookmarked: true } });
    } catch (error) {
        console.error('Bookmark Story Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/community/posts?type=question
const getContributions = async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type && type !== 'all' ? { type } : {};
        const posts = await CommunityPost.find(filter).sort({ createdAt: -1 });

        const authorIds = [...new Set(posts.map((p) => p.authorId.toString()))];
        const [users, farms, likes] = await Promise.all([
            User.find({ _id: { $in: authorIds } }),
            FarmProfile.find({ userId: { $in: authorIds } }),
            PostLike.find({ userId: req.user.userId, postId: { $in: posts.map((p) => p._id) } })
        ]);

        const userMap = new Map(users.map((u) => [u._id.toString(), u]));
        const farmMap = new Map(farms.map((f) => [f.userId.toString(), f]));
        const likedSet = new Set(likes.map((l) => l.postId.toString()));

        const data = posts.map((p) =>
            toContribution(
                p,
                userMap.get(p.authorId.toString()),
                farmMap.get(p.authorId.toString()),
                likedSet.has(p._id.toString())
            )
        );

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Get Contributions Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/community/posts  body: { type, category, title, content, imageUrl? }
const createContribution = async (req, res) => {
    try {
        const { type, category, title, content, imageUrl } = req.body || {};

        const validTypes = ['practice', 'tip', 'story', 'question'];
        const validCategories = ['soil', 'water', 'organic', 'pest', 'seeds', 'general'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid type' });
        }
        if (!validCategories.includes(category)) {
            return res.status(400).json({ success: false, message: 'Invalid category' });
        }
        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'title and content are required' });
        }

        const post = await CommunityPost.create({
            authorId: req.user.userId,
            type,
            category,
            title,
            content,
            imageUrl: imageUrl || ''
        });

        const [author, authorFarm] = await Promise.all([
            User.findById(req.user.userId),
            FarmProfile.findOne({ userId: req.user.userId })
        ]);

        return res.status(201).json({ success: true, data: toContribution(post, author, authorFarm, false) });
    } catch (error) {
        console.error('Create Contribution Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/community/posts/:postId/like  (toggle)
const likeContribution = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const existing = await PostLike.findOne({ userId: req.user.userId, postId: post._id });
        if (existing) {
            await existing.deleteOne();
            post.likesCount = Math.max(0, (post.likesCount || 0) - 1);
            await post.save();
            return res.json({ success: true, data: { liked: false } });
        }

        await PostLike.create({ userId: req.user.userId, postId: post._id });
        post.likesCount = (post.likesCount || 0) + 1;
        await post.save();
        return res.json({ success: true, data: { liked: true } });
    } catch (error) {
        console.error('Like Contribution Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/community/posts/:postId/replies  body: { text }
const addReply = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body || {};

        if (!text || typeof text !== 'string' || !text.trim()) {
            return res.status(400).json({ success: false, message: 'text is required' });
        }

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const [author, authorFarm] = await Promise.all([
            User.findById(req.user.userId),
            FarmProfile.findOne({ userId: req.user.userId })
        ]);

        post.replies.push({
            authorId: req.user.userId,
            authorName: author ? author.name : 'Tara Farmer',
            authorLocation: authorFarm ? farmLocation(authorFarm) : '',
            authorAvatarUrl: author ? author.profilePicture || '' : '',
            text: text.trim(),
            isTaraVerified: false,
            likesCount: 0
        });
        await post.save();

        return res.status(201).json({ success: true, data: null, message: 'Reply added' });
    } catch (error) {
        console.error('Add Reply Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/community/impact/user
const getUserImpact = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const farm = await FarmProfile.findOne({ userId: user._id });
        // The user's panchayat is resolved via their farm profile location.
        const panchayat = farm && farm.villagePanchayat
            ? await Panchayat.findOne({ name: farm.villagePanchayat, state: farm.state })
            : null;

        const [posts, farmersHelpedCount, higherXp] = await Promise.all([
            CommunityPost.find({ authorId: user._id }),
            CommunityPost.countDocuments({ 'replies.authorId': user._id }),
            User.countDocuments({ xp: { $gt: user.xp } })
        ]);

        const practicesSharedCount = posts.filter((p) => ['practice', 'tip'].includes(p.type)).length;
        const questionsAnsweredCount = posts.filter((p) => p.type === 'question').length;

        const communityRank = higherXp + 1;
        const totalFarmersInPanchayat = panchayat ? panchayat.membersCount : 0;
        const reputationTitle =
            user.level >= 5 ? 'Mentor Farmer' : user.level >= 3 ? 'Community Leader' : 'Rising Farmer';
        const progressToMentorPct = Math.min(100, Math.round((user.level / 5) * 100));

        // Collective impact attributed to the user's share of the panchayat.
        // (Per-user field-level tracking is a later phase; totals come from the
        //  panchayat aggregate.)
        const data = {
            communityRank,
            totalFarmersInPanchayat,
            reputationTitle,
            progressToMentorPct,
            practicesSharedCount,
            questionsAnsweredCount,
            farmersHelpedCount,
            acresInfluenced: panchayat ? panchayat.totalSoilProtectedAcres : 0,
            fertilizerReducedKg: panchayat ? panchayat.totalFertilizerReducedKg : 0,
            waterSavedLiters: panchayat ? panchayat.totalWaterSavedLiters : 0,
            soilProtectedAcres: panchayat ? panchayat.totalSoilProtectedAcres : 0
        };

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Get User Impact Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/community/impact/panchayat/:panchayatId
const getPanchayatImpact = async (req, res) => {
    try {
        const panchayat = await Panchayat.findById(req.params.panchayatId);
        if (!panchayat) {
            return res.status(404).json({ success: false, message: 'Panchayat not found' });
        }

        const data = {
            totalMembers: panchayat.membersCount || 0,
            totalPracticesAdopted: panchayat.activePracticesCount || 0,
            totalFertilizerReducedKg: panchayat.totalFertilizerReducedKg || 0,
            totalWaterSavedLiters: panchayat.totalWaterSavedLiters || 0,
            totalSoilProtectedAcres: panchayat.totalSoilProtectedAcres || 0,
            activeChallengesCount: panchayat.activeChallengesCount || 0
        };

        return res.json({ success: true, data });
    } catch (error) {
        console.error('Get Panchayat Impact Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/community/leaderboard?timeframe=weekly&scope=panchayat
const getLeaderboard = async (req, res) => {
    try {
        const { timeframe = 'weekly', scope = 'panchayat' } = req.query;

        // NOTE: a per-timeframe XP ledger is a later phase; total XP is the
        // current rank basis. `timeframe` is accepted for API-compat.

        const users = await User.find().sort({ xp: -1 }).limit(100);
        const farms = await FarmProfile.find({ userId: { $in: users.map((u) => u._id) } });
        const farmMap = new Map(farms.map((f) => [f.userId.toString(), f]));

        const reqFarm = farmMap.get(req.user.userId.toString());
        const reqPanchayat = reqFarm ? reqFarm.villagePanchayat || '' : '';

        let entries = users.map((u) => {
            const f = farmMap.get(u._id.toString());
            return {
                id: u._id.toString(),
                name: u.name,
                location: f ? [f.district, f.state].filter(Boolean).join(', ') : '',
                panchayat: f ? f.villagePanchayat || '' : '',
                avatarUrl: u.profilePicture || undefined,
                xp: u.xp,
                streakDays: u.streakDays,
                badge: u.badges && u.badges.length > 0 ? u.badges[0] : '',
                level: u.level,
                isCurrentUser: u._id.toString() === req.user.userId.toString()
            };
        });

        // Restrict to the caller's panchayat when scope=panchayat.
        if (scope === 'panchayat') {
            entries = entries.filter((e) => e.panchayat === reqPanchayat);
        }

        entries = entries.map((e, i) => ({ ...e, rank: i + 1 }));

        return res.json({ success: true, data: entries });
    } catch (error) {
        console.error('Get Leaderboard Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getPanchayats,
    getVoiceStories,
    likeStory,
    bookmarkStory,
    getContributions,
    createContribution,
    likeContribution,
    addReply,
    getUserImpact,
    getPanchayatImpact,
    getLeaderboard
};