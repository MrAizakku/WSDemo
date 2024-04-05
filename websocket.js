const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    console.log('A new client has connected!');

    ws.on('message', function incoming(message) {
        console.log(`Received message: ${message}`);
    });

    ws.send('Welcome to the WebSocket Server!');
});

server.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

const port = process.env.PORT || 3030;

server.listen(port, function listening() {
    console.log(`Server is listening on port ${port}`);
});
