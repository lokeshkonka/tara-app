const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const Device = require('../models/device.model');
const verifyGoogleToken = require('../services/googleAuth');
const { hashRefreshToken } = require('../services/jwtService');
const { createSession } = require('../services/sessionService');
const { toAuthUser } = require('../services/userSerializer');

// login controller
const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: 'Google ID token is required'
            });
        }

        // verify google ID token
        const googleUser = await verifyGoogleToken(idToken);

        const existingUser = await User.findOne({ googleId: googleUser.googleId });

        if (existingUser) {
            // Update last login time
            existingUser.lastLogin = new Date();
            await existingUser.save();

            const session = await createSession(existingUser);

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                session
            });
        }

        // create new user if login first time
        const newUser = await User.create({
            googleId: googleUser.googleId,
            email: googleUser.email,
            name: googleUser.name,
            profilePicture: googleUser.profilePicture,
            // Default language
            language: 'en'
        });

        // PHASE 1: seed a default device so the Security > Active devices list
        // has an entry for a brand-new account.
        await Device.create({
            userId: newUser._id,
            name: 'Mobile Device',
            type: 'mobile',
            location: '',
            lastActive: new Date()
        });

        const session = await createSession(newUser);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            session
        });
    } catch (error) {
        console.error('Google Login Error:', error);

        return res.status(401).json({
            success: false,
            message: error.message === 'Invalid Google ID token'
                ? error.message
                : 'Authentication failed'
        });
    }
};

// verify user controller
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user: toAuthUser(user)
        });
    } catch (error) {
        console.error('Get Current User Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// refresh session controller
const refreshSession = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required'
            });
        }

        const tokenDoc = await RefreshToken.findOne({ tokenHash: hashRefreshToken(refreshToken) });

        if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
            if (tokenDoc) {
                await tokenDoc.deleteOne();
            }
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }

        const user = await User.findById(tokenDoc.userId);
        if (!user) {
            await tokenDoc.deleteOne();
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Rotate: invalidate the old refresh token and issue a new one
        await tokenDoc.deleteOne();

        const session = await createSession(user);

        return res.status(200).json({
            success: true,
            message: 'Session refreshed',
            session
        });
    } catch (error) {
        console.error('Refresh Session Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// logout controller
const logout = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { refreshToken } = req.body || {};

        if (refreshToken) {
            await RefreshToken.deleteOne({ userId, tokenHash: hashRefreshToken(refreshToken) });
        } else {
            await RefreshToken.deleteMany({ userId });
        }

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// update preferences controller
const updatePreferences = async (req, res) => {
    try {
        const { language } = req.body;

        if (!language || typeof language !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'language is required and must be a string'
            });
        }

        const allowed = ['en', 'hi', 'ml', 'te', 'ta', 'kn'];
        if (!allowed.includes(language)) {
            return res.status(400).json({
                success: false,
                message: `language must be one of: ${allowed.join(', ')}`
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { language },
            { returnDocument: 'after' }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Preferences updated',
            user: toAuthUser(user)
        });
    } catch (error) {
        console.error('Update Preferences Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { googleLogin, getCurrentUser, refreshSession, logout, updatePreferences };
