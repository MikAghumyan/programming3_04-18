var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [{
  writer: 'server',
  color: '#FFFFFF',
  message: 'Hello. This is the first message'
}];
var players
app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('./public/index.html');
});
server.listen(3000);

//listen on every connection
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('playerName', (data) => {
    io.sockets.emit('new_message', {
      message: data.message,
      user: data.user,
      color: data.color
    });
  });
  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', {
      message: data.message,
      user: data.user
    });
  });

  //listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      user: 'user'
    })
  });
})