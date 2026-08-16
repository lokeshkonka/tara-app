const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');

const app = express();

// enable CORS for all origins
app.use(cors());

// json middleware with a body size limit
app.use(express.json({ limit: '1mb' }));

// rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' }
});

// auth route
app.use('/api/auth', authLimiter, authRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// centralized error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);

    res.status(500).json({
        success: false,
        message: 'Server error'
    });
});

module.exports = app;
