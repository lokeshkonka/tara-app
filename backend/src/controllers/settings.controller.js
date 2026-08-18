const crypto = require('crypto');
const User = require('../models/user.model');
const Device = require('../models/device.model');
const {
    toNotificationSettings,
    toAccessibilitySettings,
    toSecuritySettings
} = require('../services/settingsSerializer');

// PHASE 1: Settings service (/api/v1/settings/*).
// Reads/writes the embedded user.settings subdocument and the Device collection.

// ── Shared helpers ──────────────────────────────────────────────────────────

// Scrypt-hash a PIN so we never store/return the raw code.
// Stored format: "<salt>:<hash>". Verification (pin unlock) can reuse this via
// a future endpoint; for now we only persist + toggle `pinEnabled`.
const hashPin = (pin) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(String(pin), salt, 64).toString('hex');
    return `${salt}:${hash}`;
};

// Loads the user doc (404 if missing). Settings controllers share this.
const loadUser = async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return null;
    }
    return user;
};

// Accepts an object of { key, validator } pairs and returns { value, invalid }
// where `value` is the merged result applied to the current settings object.
const applyValidated = (current, body, validators) => {
    const result = { ...current };
    for (const [key, validate] of Object.entries(validators)) {
        if (body[key] !== undefined) {
            if (validate(body[key])) {
                result[key] = body[key];
            } else {
                return { invalid: key };
            }
        }
    }
    return { value: result };
};

// ── Notification settings ──────────────────────────────────────────────────

const getNotificationSettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;
        return res.json({ success: true, data: toNotificationSettings(user.settings.notifications) });
    } catch (error) {
        console.error('Get Notification Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateNotificationSettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;

        const isBool = (v) => typeof v === 'boolean';
        const result = applyValidated(user.settings.notifications, req.body || {}, {
            dailyReminders: isBool,
            dailyReminderTime: (v) => typeof v === 'string' && v.length <= 10,
            newLessons: isBool,
            streakAlerts: isBool,
            communityReplies: isBool,
            weeklyTips: isBool,
            pushEnabled: isBool,
            smsAlerts: isBool,
            soundEnabled: isBool
        });

        if (result.invalid) {
            return res.status(400).json({ success: false, message: `Invalid value for ${result.invalid}` });
        }

        user.settings.notifications = result.value;
        await user.save();

        return res.json({ success: true, data: toNotificationSettings(user.settings.notifications) });
    } catch (error) {
        console.error('Update Notification Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── Accessibility settings ─────────────────────────────────────────────────

const getAccessibilitySettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;
        return res.json({ success: true, data: toAccessibilitySettings(user.settings.accessibility) });
    } catch (error) {
        console.error('Get Accessibility Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateAccessibilitySettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;

        const isBool = (v) => typeof v === 'boolean';
        const result = applyValidated(user.settings.accessibility, req.body || {}, {
            textScale: (v) => ['standard', 'large', 'extraLarge'].includes(v),
            highContrast: isBool,
            screenReaderOptimized: isBool,
            audioAutoPlay: isBool,
            voiceInputSensitivity: (v) => ['normal', 'high'].includes(v),
            reducedMotion: isBool
        });

        if (result.invalid) {
            return res.status(400).json({ success: false, message: `Invalid value for ${result.invalid}` });
        }

        user.settings.accessibility = result.value;
        await user.save();

        return res.json({ success: true, data: toAccessibilitySettings(user.settings.accessibility) });
    } catch (error) {
        console.error('Update Accessibility Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── Security settings ───────────────────────────────────────────────────────

const getSecuritySettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;

        // Devices sorted by most-recent activity first; serializer marks the
        // first one as isCurrent.
        const devices = await Device.find({ userId: user._id, isRevoked: false })
            .sort({ lastActive: -1 });

        return res.json({ success: true, data: toSecuritySettings(user.settings.security, devices) });
    } catch (error) {
        console.error('Get Security Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateSecuritySettings = async (req, res) => {
    try {
        const user = await loadUser(req, res);
        if (!user) return;

        const body = req.body || {};
        const isBool = (v) => typeof v === 'boolean';
        const current = user.settings.security;

        // PIN handling: if a new PIN is supplied (and pinEnabled), hash it.
        if (body.pinEnabled === true && typeof body.pinCode === 'string' && body.pinCode.length >= 4) {
            current.pinEnabled = true;
            current.pinHash = hashPin(body.pinCode);
        } else if (body.pinEnabled === true && !current.pinHash) {
            return res.status(400).json({
                success: false,
                message: 'pinCode (min 4 chars) is required to enable the PIN lock'
            });
        }

        if (body.pinEnabled === false) {
            current.pinEnabled = false;
            // Keep the hash so re-enabling with the same PIN could be checked later.
        }

        for (const key of ['biometricsEnabled', 'twoFactorEnabled', 'showNameOnLeaderboard', 'shareAnonymousImpact']) {
            if (body[key] !== undefined) {
                if (isBool(body[key])) {
                    current[key] = body[key];
                } else {
                    return res.status(400).json({ success: false, message: `Invalid value for ${key}` });
                }
            }
        }

        user.settings.security = current;
        await user.save();

        const devices = await Device.find({ userId: user._id, isRevoked: false })
            .sort({ lastActive: -1 });

        return res.json({ success: true, data: toSecuritySettings(user.settings.security, devices) });
    } catch (error) {
        console.error('Update Security Settings Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// DELETE /api/v1/settings/devices/:deviceId
// Removes a device from this user's active device list (remote sign-out).
const logoutDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const deleted = await Device.findOneAndDelete({ _id: deviceId, userId: req.user.userId });

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Device not found' });
        }

        return res.json({ success: true, data: null, message: 'Device removed' });
    } catch (error) {
        console.error('Logout Device Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getNotificationSettings,
    updateNotificationSettings,
    getAccessibilitySettings,
    updateAccessibilitySettings,
    getSecuritySettings,
    updateSecuritySettings,
    logoutDevice
};