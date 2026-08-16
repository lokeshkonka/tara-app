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

module.exports = { toAuthUser };
