// Require environment variables
require('dotenv').config();

// Set constants
const PORT = process.env.PORT || 3000;

// Require packages
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Index route
app.get('/', function(req, res) {
  res.sendFile(__dirname +'/views/index.html');
});

// Listen to socket connection
io.on('connection', function(socket) {
  console.log('A user connected');

  // Listen to socket message and fire event to browser
  socket.on('message', function(message){
    io.emit('message', message);
  });
});

// Start server
http.listen(PORT, function(){
  console.log('listening on port', PORT);
});
