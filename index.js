// Require environment variables
require('dotenv').config();

// Set constants
const PORT = process.env.PORT || 3000;

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname +'/views/index.html');
});

io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('message', function(message){
    io.emit('message', message);
  });
});

// Start server
http.listen(PORT, function(){
  console.log('listening on port', PORT);
});
