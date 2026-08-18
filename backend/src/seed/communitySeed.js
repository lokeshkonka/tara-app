const User = require('../models/user.model');
const Panchayat = require('../models/panchayat.model');
const VoiceStory = require('../models/voiceStory.model');
const CommunityPost = require('../models/communityPost.model');

// PHASE 2: idempotent dev seed for the Community module.
// Runs automatically on server start (see server.js). Only seeds when there is
// no Panchayat data yet, so it never overwrites real content. The sample
// author is a lightweight system user so voice stories/posts have someone to
// be attributed to in the demo.
const seedIfEmpty = async () => {
    const panchayatCount = await Panchayat.countDocuments();
    if (panchayatCount > 0) {
        console.log('[seed] Community data already present, skipping.');
        return;
    }

    console.log('[seed] Inserting community demo data...');

    // 1. Panchayats
    const panchayats = await Panchayat.insertMany([
        {
            key: 'dombivli-panchayat',
            name: 'Dombivli Panchayat',
            district: 'Kalyan',
            state: 'Maharashtra',
            membersCount: 24,
            activePracticesCount: 18,
            sustainabilityScore: 82,
            totalFertilizerReducedKg: 340,
            totalWaterSavedLiters: 125000,
            totalSoilProtectedAcres: 18.5,
            activeChallengesCount: 3
        },
        {
            key: 'wayanad-panchayat',
            name: 'Wayanad Panchayat',
            district: 'Wayanad',
            state: 'Kerala',
            membersCount: 19,
            activePracticesCount: 15,
            sustainabilityScore: 88,
            totalFertilizerReducedKg: 210,
            totalWaterSavedLiters: 98000,
            totalSoilProtectedAcres: 14.2,
            activeChallengesCount: 2
        }
    ]);

    // 2. System seed author for demo content.
    const seedAuthor = await User.create({
        googleId: 'seed-community-author',
        email: 'community@tara-app.org',
        name: 'Tara Community',
        profilePicture: '',
        language: 'en',
        xp: 0,
        badges: ['Community Voice']
    });

    const panchayatById = new Map(panchayats.map((p) => [p.key, p._id]));

    // 3. Sample voice stories (one per visible category).
    await VoiceStory.insertMany([
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('dombivli-panchayat'),
            title: 'Jeevamrit Soil Drench',
            description: 'How I make and apply jeevamrit every 15 days to boost soil biology.',
            audioUrl: 'https://cdn.tara-app.org/audio/voice-stories/jeevamrit.mp3',
            durationSeconds: 45,
            durationFormatted: '0:45',
            category: 'soil',
            languageCode: 'hi',
            waveformSample: [30, 55, 80, 45, 90, 60, 40, 75, 50, 85, 65, 35, 70, 45, 90, 60],
            transcript: 'I mix 10 litres of cow dung, 10 litres cow urine and 2 kg jaggery with 200 litres water...',
            taraTakeaway: 'Apply jeevamrit at 200 L/acre every 15 days during the growing season.',
            likesCount: 12,
            playsCount: 87
        },
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('wayanad-panchayat'),
            title: 'Drip Irrigation on a Budget',
            description: 'Affordable drip setup for small plots using local pipes and bottle caps.',
            audioUrl: 'https://cdn.tara-app.org/audio/voice-stories/drip.mp3',
            durationSeconds: 58,
            durationFormatted: '0:58',
            category: 'water',
            languageCode: 'ml',
            waveformSample: [20, 65, 90, 55, 30, 80, 70, 45, 60, 95, 50, 35, 75, 40, 85, 55],
            transcript: 'You do not need expensive kits. A gravity tank and micro-tubes can water 500 plants...',
            taraTakeaway: 'Gravity drip irrigation can cut water use by up to 60% on small plots.',
            likesCount: 8,
            playsCount: 54
        },
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('dombivli-panchayat'),
            title: 'Making Compost at Home',
            description: 'Kitchen and farm waste to rich compost in 45 days.',
            audioUrl: 'https://cdn.tara-app.org/audio/voice-stories/compost.mp3',
            durationSeconds: 40,
            durationFormatted: '0:40',
            category: 'organic',
            languageCode: 'hi',
            waveformSample: [45, 30, 70, 85, 40, 60, 90, 50, 25, 75, 55, 65, 35, 80, 45, 70],
            transcript: 'Layer green and brown waste, add a handful of soil, and turn every 5 days...',
            taraTakeaway: 'Turn the pile every 5 days and keep it moist for fast, odour-free compost.',
            likesCount: 15,
            playsCount: 112
        },
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('wayanad-panchayat'),
            title: 'Neem Spray for Pests',
            description: 'Simple neem oil recipe against leaf-eating caterpillars.',
            audioUrl: 'https://cdn.tara-app.org/audio/voice-stories/neem.mp3',
            durationSeconds: 33,
            durationFormatted: '0:33',
            category: 'pest',
            languageCode: 'ml',
            waveformSample: [60, 35, 50, 85, 45, 70, 90, 30, 55, 75, 40, 65, 80, 25, 60, 50],
            transcript: 'Mix 5 ml neem oil and a drop of soap in a litre of water, spray in the evening...',
            taraTakeaway: 'Spray neem solution in the evening to avoid leaf burn and protect bees.',
            likesCount: 9,
            playsCount: 66
        }
    ]);

    // 4. Sample posts (a question with a Tara-verified answer, and a practice).
    await CommunityPost.insertMany([
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('dombivli-panchayat'),
            type: 'question',
            category: 'soil',
            title: 'When is the best time to apply Jeevamrit?',
            content: 'Should I apply it in the morning or evening, and how often during flowering?',
            likesCount: 5,
            taraVerifiedAnswer: {
                text: 'Apply jeevamrit in the early morning or evening when the soil is cool, and repeat every 15 days through flowering.',
                verifiedBy: 'Tara Agronomist',
                actionableStep: 'Schedule jeevamrit application for 6-8 AM on alternate Sundays.'
            }
        },
        {
            authorId: seedAuthor._id,
            panchayatId: panchayatById.get('wayanad-panchayat'),
            type: 'practice',
            category: 'water',
            title: 'Switched to drip irrigation',
            content: 'Installed a 500-litre gravity drip setup for my banana + pepper plot. Water bill cut almost half!',
            likesCount: 11
        }
    ]);

    console.log('[seed] Community demo data ready.');
};

module.exports = { seedIfEmpty };