const WebSocket = require('ws');
const generateMockData = require('./mockDataGenerator');

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (req, socket, head) => {
        try {
            // Use protocol-relative base URL for flexibility in cloud
            const { pathname } = new URL(req.url, `http://${req.headers.host}`);

            // Normalize path by removing trailing slashes
            const rawPath = pathname.replace(/\/+$/, '');
            const normalizedPath = rawPath === '' ? '/' : rawPath;

            const allowedPaths = ['/', '/api', '/api/analytics'];

            if (!allowedPaths.includes(normalizedPath)) {
                socket.destroy();
                return;
            }

            wss.handleUpgrade(req, socket, head, (ws) => {
                ws._path = normalizedPath;
                wss.emit('connection', ws, req);
            });
        } catch (error) {
            socket.destroy(); // Malformed URL or unexpected issue
        }
    });

    wss.on('connection', (ws) => {
        const path = ws._path;

        if (path === '/api/analytics') {
            const sendData = () => {
                const data = generateMockData();
                ws.send(JSON.stringify(data));
            };

            sendData(); // Send immediately
            const interval = setInterval(sendData, 1500);

            ws.on('close', () => {
                clearInterval(interval);
                console.log(`WebSocket disconnected on ${path}`);
            });
        } else {
            // Send a welcome message in case of invalid path
            ws.send(JSON.stringify({
                message: 'Welcome to the Real-Time Analytics API'
            }));
        }

        ws.on('error', (err) => {
            console.error(`WebSocket error on ${path}:`, err.message);
        });

        console.log(`WebSocket client connected on ${path}`);
    });
}

module.exports = { setupWebSocket };
