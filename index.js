// Import necessary modules
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const RateLimiter = require('limiter').RateLimiter;

// Constants
const port = 3000;
const maxRequests_min = 250;
const maxRequestWindowMS_min = 60000;

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Rate limiter
const limiterMin = new RateLimiter({ tokensPerInterval: maxRequests_min, interval: maxRequestWindowMS_min });

// WebSocket connection error handler
function handleWebSocketError(err) {
    console.error('WebSocket encountered an error:', err);
}

// Create WebSocket connection
function createWebSocketConnection(port) {
    const ws = new WebSocket(`ws://localhost:${port}`);
    ws.on('error', handleWebSocketError);
    return ws;
}

// WebSocket connection
let ws;

// Express routes
app.post('/open-ws', async (req, res) => {
    try {
        const { port } = req.body;
        ws = createWebSocketConnection(port);

        ws.on('open', function open() {
            console.log('Connected to WebSocket server as a client.');
            res.send({ message: 'WebSocket connection established' });
        });

        ws.on('close', function close() {
            console.log('WebSocket connection closed.');
        });

        ws.on('error', function error(err) {
            console.error('WebSocket connection error:', err);
            res.status(500).send({ error: 'WebSocket connection error' });
        });

    } catch (err) {
        console.error('Error establishing WebSocket connection:', err);
        res.status(500).send({ error: 'Failed to establish WebSocket connection' });
    }
});


app.get('/send-message', async (req, res) => {
    try {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket connection is not open');
        }

        const message = { message: 'some message' };

        ws.send(JSON.stringify(message), (error) => {
            if (error) {
                console.error('Error sending message:', error);
                return res.status(500).send({ error: 'Failed to send message' });
            }
            res.send({ message: 'Message sent successfully' });
        });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).send({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});
