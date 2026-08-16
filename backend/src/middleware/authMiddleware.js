const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {

        // fetch token from Authorization header
        const authHeader = req.headers.authorization;

        // Check kar rahe hain ki Authorization header hai ya nahi
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            });
        }

        const parts = authHeader.split(' ');

        // Header ka format check kar rahe hain
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: 'Invalid authorization format'
            });
        }

        const token = parts[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // attach userID to request from decoded token
        req.user = {
            userId: decoded.userId
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authMiddleware;