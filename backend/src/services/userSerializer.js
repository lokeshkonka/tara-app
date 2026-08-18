// Maps a Mongoose User document to the AuthUser shape the mobile client expects.
const toAuthUser = (user) => ({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    avatarUrl: user.profilePicture || undefined,
    provider: 'google',
    createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
    updatedAt: user.updatedAt
        ? user.updatedAt.toISOString()
        : user.createdAt
            ? user.createdAt.toISOString()
            : undefined,
    profile: {
        language: user.language
    }
});

// PHASE 1: superset profile returned by GET/PUT /api/v1/user/profile.
// The mobile app reads the SAME endpoint from two different repositories:
//   - IUserRepository.getProfile()         -> UserProfile  (name/language/xp/...)
//   - ISettingsRepository.getAccountProfile() -> AccountProfile (fullName/phone/farm/...)
// Returning every field keeps both consumers working without frontend changes.
const toProfile = (user, farm) => ({
    id: user._id.toString(),
    name: user.name,
    fullName: user.name,
    email: user.email,
    phone: user.phone || '',
    language: user.language,
    userType: user.userType,
    avatarExpression: user.avatarExpression,
    avatarUrl: user.profilePicture || undefined,
    xp: user.xp,
    level: user.level,
    streakDays: user.streakDays,
    badges: user.badges || [],
    farmLocation: farm
        ? farm.farmLocation ||
          [farm.villagePanchayat, farm.district, farm.state].filter(Boolean).join(', ')
        : '',
    villagePanchayat: farm ? farm.villagePanchayat || '' : '',
    farmSizeAcres: farm ? farm.sizeAcres : 0,
    primaryCrops: farm ? farm.crops || [] : [],
    state: farm ? farm.state || '' : '',
    district: farm ? farm.district || '' : '',
    soilHealthScore: farm ? farm.soilHealthScore : 75,
    activePractices: farm ? farm.activePractices || [] : [],
    joinedDate: user.createdAt ? formatJoinedDate(user.createdAt) : undefined,
    createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
    updatedAt: user.updatedAt ? user.updatedAt.toISOString() : undefined
});

// "Joined August 2026" — matches the display style of the frontend dummy data.
const formatJoinedDate = (date) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `Joined ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// PHASE 1: farm profile shape for GET/PUT /api/v1/user/farm-profile.
const toFarmProfile = (farm) => ({
    sizeAcres: farm.sizeAcres,
    crops: farm.crops || [],
    state: farm.state || '',
    district: farm.district || '',
    soilHealthScore: farm.soilHealthScore,
    activePractices: farm.activePractices || []
});

module.exports = { toAuthUser, toProfile, toFarmProfile };