const User = require('../models/user.model');
const FarmProfile = require('../models/farmProfile.model');
const { toProfile, toFarmProfile } = require('../services/userSerializer');

// PHASE 1: User & Profile service (/api/v1/user/*).
// All responses use the `{ success, data }` envelope expected by the mobile
// app's domain ApiClient (src/services/api/apiClient.ts reads json.data).

// GET /api/v1/user/profile -> superset of UserProfile + AccountProfile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const farm = await FarmProfile.findOne({ userId: user._id });

        return res.json({ success: true, data: toProfile(user, farm) });
    } catch (error) {
        console.error('Get Profile Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/v1/user/profile
// Accepts both UserProfile partials (name/language/userType/avatarExpression/phone)
// and AccountProfile partials (fullName/farmLocation/villagePanchayat/farmSizeAcres/
// primaryCrops/avatarUrl) since the app sends both to this single endpoint.
const updateProfile = async (req, res) => {
    try {
        const body = req.body || {};

        // ── Map identity/profile fields ─────────────────────────────────────
        const userUpdate = {};
        if (body.name !== undefined) userUpdate.name = body.name;
        if (body.fullName !== undefined) userUpdate.name = body.fullName;
        if (body.language !== undefined) userUpdate.language = body.language;
        if (body.userType !== undefined) userUpdate.userType = body.userType;
        if (body.avatarExpression !== undefined) userUpdate.avatarExpression = body.avatarExpression;
        if (body.phone !== undefined) userUpdate.phone = body.phone;
        if (body.avatarUrl !== undefined) userUpdate.profilePicture = body.avatarUrl;

        // ── Map farm fields ────────────────────────────────────────────────
        const farmUpdate = {};
        if (body.villagePanchayat !== undefined) farmUpdate.villagePanchayat = body.villagePanchayat;
        if (body.state !== undefined) farmUpdate.state = body.state;
        if (body.district !== undefined) farmUpdate.district = body.district;
        if (body.farmSizeAcres !== undefined) farmUpdate.sizeAcres = body.farmSizeAcres;
        if (body.primaryCrops !== undefined) farmUpdate.crops = body.primaryCrops;
        if (body.farmLocation !== undefined) farmUpdate.farmLocation = body.farmLocation;

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: userUpdate },
            { returnDocument: 'after' }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let farm = await FarmProfile.findOne({ userId: user._id });
        if (Object.keys(farmUpdate).length > 0) {
            farm = await FarmProfile.findOneAndUpdate(
                { userId: user._id },
                { $set: farmUpdate },
                { upsert: true, returnDocument: 'after' }
            );
        }

        return res.json({ success: true, data: toProfile(user, farm) });
    } catch (error) {
        console.error('Update Profile Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/v1/user/farm-profile -> FarmProfile shape
const getFarmProfile = async (req, res) => {
    try {
        let farm = await FarmProfile.findOne({ userId: req.user.userId });

        // Lazy-create a default farm so subsequent updates are clean upserts.
        if (!farm) {
            farm = await FarmProfile.create({ userId: req.user.userId });
        }

        return res.json({ success: true, data: toFarmProfile(farm) });
    } catch (error) {
        console.error('Get Farm Profile Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/v1/user/farm-profile
const updateFarmProfile = async (req, res) => {
    try {
        const body = req.body || {};

        const farmUpdate = {};
        if (body.sizeAcres !== undefined) farmUpdate.sizeAcres = body.sizeAcres;
        if (body.crops !== undefined) farmUpdate.crops = body.crops;
        if (body.state !== undefined) farmUpdate.state = body.state;
        if (body.district !== undefined) farmUpdate.district = body.district;
        if (body.soilHealthScore !== undefined) farmUpdate.soilHealthScore = body.soilHealthScore;
        if (body.activePractices !== undefined) farmUpdate.activePractices = body.activePractices;

        const farm = await FarmProfile.findOneAndUpdate(
            { userId: req.user.userId },
            { $set: farmUpdate },
            { upsert: true, returnDocument: 'after' }
        );

        return res.json({ success: true, data: toFarmProfile(farm) });
    } catch (error) {
        console.error('Update Farm Profile Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/v1/user/xp  body: { amount }
// Adds XP and recomputes level using the same formula as the app's dummy repo
// (level = floor(xp / 200) + 1). Returns the NEW total XP as the payload, which
// is exactly what IUserRepository.addXp() expects (Promise<number>).
const addXp = async (req, res) => {
    try {
        const amount = Number(req.body && req.body.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'amount must be a positive number'
            });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.xp += amount;
        user.level = Math.floor(user.xp / 200) + 1;
        await user.save();

        return res.json({ success: true, data: user.xp });
    } catch (error) {
        console.error('Add XP Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile, getFarmProfile, updateFarmProfile, addXp };