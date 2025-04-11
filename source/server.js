const express = require('express');
const http = require('http');
const cors = require('cors');
const { setupWebSocket } = require('./socket');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

// Use port from environment for Render deployment
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Real-Time Analytics API'
    });
});

// API base route
app.use('/api', routes);

// Handle undefined API routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Setup WebSocket server
setupWebSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
    console.log(`WebSocket Server listening on ws://localhost:${PORT}`);
});
