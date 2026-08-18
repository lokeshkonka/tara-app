const mongoose = require('mongoose');

// PHASE 1: farm profile model.
// One-to-one with User (unique userId). Maps to the mobile app's FarmProfile
// type (sizeAcres/crops/state/district/soilHealthScore/activePractices) and
// also stores the structured fields AccountProfile needs
// (villagePanchayat, primaryCrops alias, farmLocation display string).
const farmProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    sizeAcres: {
        type: Number,
        default: 1.0
    },
    crops: {
        type: [String],
        default: []
    },
    state: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        default: ''
    },
    villagePanchayat: {
        type: String,
        default: ''
    },
    // Free-form display string ("Kalyan Rural, Maharashtra"); when absent the
    // serializer derives it from village/district/state.
    farmLocation: {
        type: String,
        default: ''
    },
    soilHealthScore: {
        type: Number,
        default: 75
    },
    activePractices: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const FarmProfile = mongoose.model('FarmProfile', farmProfileSchema);

module.exports = FarmProfile;