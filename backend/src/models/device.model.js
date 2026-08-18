const mongoose = require('mongoose');

// PHASE 1: device model for the "Logged in devices" security feature.
// Mirrors the plan's user_devices table. A default device is auto-created when
// a user first signs up (see auth.controller). FCM push token is reserved for
// the later notifications phase.
const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        default: 'Mobile Device'
    },
    type: {
        type: String,
        enum: ['mobile', 'tablet', 'desktop'],
        default: 'mobile'
    },
    location: {
        type: String,
        default: ''
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    fcmPushToken: {
        type: String,
        default: null
    },
    isRevoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

deviceSchema.index({ userId: 1, isRevoked: 1 });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;