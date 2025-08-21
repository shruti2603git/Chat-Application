// Import the Express framework
const express = require('express');
const app = express();

// Create an HTTP server using the Express app
const http = require('http').createServer(app);

// Initialize Socket.IO with the HTTP server
const io = require('socket.io')(http);

// Built-in Node.js module for working with file and directory paths
const path = require('path');

// Serve static files (like index.html, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Handle socket connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'chat message' events from clients
  socket.on('chat message', (msg) => {
    // Broadcast the received message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle socket disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set the port for the server (default to 3000 if not set in environment)
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming connections
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
