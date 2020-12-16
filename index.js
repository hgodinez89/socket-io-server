const express = require('express');
const path = require('path');

require('dotenv').config();

// Express app
const app = express();

// Node server for Socket.io using the express configuration
const server = require('http').createServer(app);

// It exports to has available in socket.js
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

// Public path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${process.env.PORT}`);
});