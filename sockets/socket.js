const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Sizzla'));
bands.addBand(new Band('Capleton'));
bands.addBand(new Band('Buju'));
bands.addBand(new Band('Damian Marley'));

// Sockets messages
// http://localhost:3000/socket.io/socket.io.js
io.on('connection', client => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands());

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

    client.on('new-message', (payload) => {
        // Send to all clients
        // io.emit('new-message', payload);
        // Send to all clients except to client emitted the original message
        client.broadcast.emit('message-response', payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


});