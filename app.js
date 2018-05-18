var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var messages = [{
  writer: 'server',
  color: '#FFFFFF',
  message: 'Hello. This is the first message'
}];
var players;

// Nuber of connected users
var userNum = 0;


app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('./public/index.html');
});
server.listen(3000);

//listen on every connection
io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    console.log('new message:' + data);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++userNum;
    addedUser = true;
    socket.emit('login', {
      numUsers: userNum
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: userNum
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --userNum;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: userNum
      });
    }
  });
})