// PHASE 2: serializers for /api/v1/community/*.
// Each maps Mongo docs to the exact shape the app's ICommunityRepository types
// expect (types/community.ts). Author info is resolved from User + FarmProfile
// docs passed in (controllers batch-load these to avoid N+1 queries).

const LANGUAGE_NAMES = {
    en: 'English', hi: 'Hindi', ml: 'Malayalam', te: 'Telugu',
    ta: 'Tamil', kn: 'Kannada', mr: 'Marathi', pa: 'Punjabi',
    gu: 'Gujarati', bn: 'Bengali'
};

const toPanchayat = (p) => ({
    id: p._id.toString(),
    name: p.name,
    district: p.district,
    state: p.state,
    membersCount: p.membersCount || 0,
    activePracticesCount: p.activePracticesCount || 0,
    sustainabilityScore: p.sustainabilityScore || 80
});

const authorName = (user) => (user ? user.name : 'Tara Farmer');

const toVoiceStory = (story, user, farm, isLiked, isBookmarked) => ({
    id: story._id.toString(),
    author: {
        name: authorName(user),
        village: farm ? farm.villagePanchayat || '' : '',
        state: farm ? farm.state || '' : '',
        avatarUrl: user ? user.profilePicture || undefined : undefined,
        languageCode: user ? user.language || 'en' : 'en',
        languageName: LANGUAGE_NAMES[user ? user.language : 'en'] || 'English'
    },
    title: story.title,
    description: story.description,
    audioUrl: story.audioUrl,
    durationSeconds: story.durationSeconds || 0,
    durationFormatted: story.durationFormatted || '0:00',
    category: story.category,
    likesCount: story.likesCount || 0,
    isLiked: !!isLiked,
    isBookmarked: !!isBookmarked,
    playsCount: story.playsCount || 0,
    waveformSample: story.waveformSample || [],
    transcript: story.transcript || '',
    taraTakeaway: story.taraTakeaway || '',
    createdAt: story.createdAt ? story.createdAt.toISOString() : new Date().toISOString()
});

// Display location string ("Village, District, State").
const farmLocation = (farm) =>
    [farm.villagePanchayat, farm.district, farm.state].filter(Boolean).join(', ');

const toReply = (r) => ({
    id: r._id.toString(),
    authorName: r.authorName,
    authorLocation: r.authorLocation || '',
    authorAvatarUrl: r.authorAvatarUrl || undefined,
    text: r.text,
    isTaraVerified: !!r.isTaraVerified,
    createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
    likesCount: r.likesCount || 0,
    isLiked: false
});

const toContribution = (post, user, farm, isLiked) => ({
    id: post._id.toString(),
    author: {
        name: authorName(user),
        location: farm ? farmLocation(farm) : '',
        avatarUrl: user ? user.profilePicture || undefined : undefined,
        badge: user && user.badges && user.badges.length > 0 ? user.badges[0] : undefined
    },
    type: post.type,
    category: post.category,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl || undefined,
    likesCount: post.likesCount || 0,
    isLiked: !!isLiked,
    repliesCount: post.replies ? post.replies.length : 0,
    replies: (post.replies || []).map(toReply),
    taraVerifiedAnswer: post.taraVerifiedAnswer || undefined,
    createdAt: post.createdAt ? post.createdAt.toISOString() : new Date().toISOString()
});

module.exports = {
    LANGUAGE_NAMES,
    toPanchayat,
    toVoiceStory,
    toContribution,
    farmLocation
};