const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_WEB_CLIENT_ID );

// Google ID Token verification
const verifyGoogleToken = async (idToken) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken,

            // Audience check:
            audience: process.env.GOOGLE_WEB_CLIENT_ID
        });
        const payload = ticket.getPayload();

        return {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            profilePicture: payload.picture
        };

    } catch (error) {
        throw new Error('Invalid Google ID token');
    }
};

module.exports = verifyGoogleToken;