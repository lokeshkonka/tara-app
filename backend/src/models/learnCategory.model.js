const mongoose = require('mongoose');

// PHASE 4: learn category.
// Maps to the FE LearnCategory type ({ id, labelKey, icon }). labelKey is an
// i18n key resolved on the mobile app, exactly like the dummy data.
const learnCategorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    labelKey: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'apps'
    },
    displayOrder: {
        type: Number,
        default: 0
    }
});

const LearnCategory = mongoose.model('LearnCategory', learnCategorySchema);

module.exports = LearnCategory;