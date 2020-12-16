const { io } = require('../index');

// Sockets messages
// http://localhost:3000/socket.io/socket.io.js
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // With client.on we can listen events, in this case
    // message event.
    client.on('message', (payload) => {
        console.log(payload);

        // If we want to emit or send a message  to all
        // clients, we can use io.emit() or if we want just
        // sending a message to one client, we can use
        // client.emit()
        io.emit('message', {
            admin: 'Everything is Ok!'
        });
    });


});