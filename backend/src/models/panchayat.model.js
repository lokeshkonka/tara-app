const mongoose = require('mongoose');

// PHASE 2: Panchayat (village cluster) aggregate.
// Mirrors the plan's panchayats table. Holds the collective impact metrics the
// Community > Impact screens render.
const panchayatSchema = new mongoose.Schema({
    // Stable human-readable key for seeding/idempotency (e.g. "wayanad-panchayat")
    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    membersCount: {
        type: Number,
        default: 0
    },
    activePracticesCount: {
        type: Number,
        default: 0
    },
    sustainabilityScore: {
        type: Number,
        default: 80
    },
    totalFertilizerReducedKg: {
        type: Number,
        default: 0
    },
    totalWaterSavedLiters: {
        type: Number,
        default: 0
    },
    totalSoilProtectedAcres: {
        type: Number,
        default: 0
    },
    activeChallengesCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Panchayat = mongoose.model('Panchayat', panchayatSchema);

module.exports = Panchayat;