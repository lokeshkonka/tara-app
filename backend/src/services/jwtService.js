const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    return jwt.sign(
        {
            userId: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '15m'
        }
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const hashRefreshToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = { generateAccessToken, generateRefreshToken, hashRefreshToken };
