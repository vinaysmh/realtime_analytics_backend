const express = require('express');
const router = express.Router();
const generateMockData = require('./mockDataGenerator');

// GET /api/ → Welcome message
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Real-Time Analytics API'
    });
});

// GET /api/analytics → Return mock analytics data
router.get('/analytics', (req, res) => {
    try {
        const data = generateMockData();
        res.json(data);
    } catch (error) {
        console.error('Error generating mock data:', error.message);
        res.status(500).json({ error: 'Failed to generate analytics data' });
    }
});

module.exports = router;
