var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];
var Players = [{
  name: '',
  color: 'red',
  campCoords: {
    x: 0,
    y: 0
  },
  truckCoords: {
    x: 2 * 32,
    y: 2 * 32
  },
  campImg: './Resources/camp_red.png',
  img: ['./Resources/player_red_1.png', './Resources/player_red_2.png', './Resources/player_red_3.png', './Resources/player_red_4.png'],
  imgIndex: 2,
  hasGold: false,
  goldsCount: 0
}, {
  name: '',
  color: 'blue',
  campCoords: {
    x: 14 * 32,
    y: 0
  },
  truckCoords: {
    x: 13 * 32,
    y: 64
  },
  campImg: './Resources/camp_blue.png',
  img: ['./Resources/player_blue_1.png', './Resources/player_blue_2.png', './Resources/player_blue_3.png', './Resources/player_blue_4.png'],
  imgIndex: 0,
  hasGold: false,
  goldsCount: 0
}, {
  name: '',
  color: 'green',
  campCoords: {
    x: 0,
    y: 14 * 32
  },
  truckCoords: {
    x: 2 * 32,
    y: 13 * 32
  },
  campImg: './Resources/camp_green.png',
  img: ['./Resources/player_green_1.png', './Resources/player_green_2.png', './Resources/player_green_3.png', './Resources/player_green_4.png'],
  imgIndex: 2,
  hasGold: false,
  goldsCount: 0
}, {
  name: '',
  color: 'yellow',
  campCoords: {
    x: 14 * 32,
    y: 14 * 32
  },
  truckCoords: {
    x: 13 * 32,
    y: 13 * 32
  },
  campImg: './Resources/camp_yellow.png',
  img: ['./Resources/player_yellow_1.png', './Resources/player_yellow_2.png', './Resources/player_yellow_3.png', './Resources/player_yellow_4.png'],
  imgIndex: 0,
  hasGold: false,
  goldsCount: 0
}];
var unavailableCoords = ['0 0', '0 32', '32 0', '32 32', '64 64',
  '448 0', '480 0', '448 32', '480 32', '416 64',
  '0 448', '32 448', '0 480', '32 480', '64 416',
  '448 448', '448 480', '480 448', '480 480', '416 416'
];
var allCoordinates = [];
var resources = [];
var GoldArr = [];
var EnergyArr = [];
var ObstalceArr = [];
var side = 32;

var hasPortal = false;
portalCoords = [{
  x: 0,
  y: 0,
  otherPart: 1
}, {
  x: 0,
  y: 0,
  otherPart: 0
}];

var goldCount = 15;
var energyCount = 10;
var obstacleCount = 20;

function generateMap() {
  for (var i = 0; i < 15; i++) {
    var x = Math.floor((Math.random() * 15) + 1) * side;
    var y = Math.floor((Math.random() * 15) + 1) * side;
    if (!(unavailableCoords.includes(x + ' ' + y))) {
      GoldArr.push({
        x: x,
        y: y
      })
      allCoordinates.push(x + ' ' + y);
      unavailableCoords.push(x + ' ' + y);
    } else i--;
  }
  for (var i = 0; i < 10; i++) {
    var x = Math.floor((Math.random() * 15) + 1) * side;
    var y = Math.floor((Math.random() * 15) + 1) * side;
    if (!(unavailableCoords.includes(x + ' ' + y))) {
      EnergyArr.push({
        x: x,
        y: y
      })
      allCoordinates.push(x + ' ' + y);
      unavailableCoords.push(x + ' ' + y);
    } else i--;
  }
  for (var i = 0; i < 20; i++) {
    var x = Math.floor((Math.random() * 15) + 1) * side;
    var y = Math.floor((Math.random() * 15) + 1) * side;
    if (!(unavailableCoords.includes(x + ' ' + y))) {
      ObstalceArr.push({
        x: x,
        y: y
      })
      allCoordinates.push(x + ' ' + y);
      unavailableCoords.push(x + ' ' + y);
    } else i--;
  }
}

app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('./public/index.html');
});
const port = process.env.PORT || 3000;
server.listen(port);
console.log('port: ' + port);

//listen on every connection
io.on('connection', (socket) => {
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.emit('new message', {
    username: 'server',
    message: 'Waiting for other players.'
  })
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
    users.push({
      name: username,
      color: Players[users.length].color
    });
    console.log(users);
    addedUser = true;
    socket.emit('login', {
      numUsers: users.length
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: users.length
    });
    if (users.length >= 4) {
      io.sockets.emit('new message', {
        username: 'server',
        message: 'GAME STARTED'
      });
      for (var i = 0; i < users.length; i++) {
        Players[i].name = users[i].name;
      }
      io.sockets.emit('send_colors', users);
      console.log('data sent');
      generateMap();
      io.sockets.emit('send_resources', {
        obstacles: ObstalceArr,
        golds: GoldArr,
        energy: EnergyArr
      });
      io.sockets.emit('send_data', Players);
    }
  });

  setInterval(() => {
    if (!(hasPortal)) {
      for (i = 0; i < 2; i++) {
        var x = Math.floor((Math.random() * 15) + 1) * side;
        var y = Math.floor((Math.random() * 15) + 1) * side;
        if (!(unavailableCoords.includes(x + ' ' + y))) {
          portalCoords[i].x = x;
          portalCoords[i].y = y;
          io.sockets.emit('portal', portalCoords);
        } else i--;
      }
      hasPortal = true;
    } else {
      io.sockets.emit('portal', portalCoords);
      hasPortal = false;
    }
  }, 10000);

  socket.on('move', function (data) {
    for (var player of Players) {
      if (player.color == data.color) {
        player = data;
        socket.broadcast.emit('player\'s new Data', player);
      }
    };
    socket.broadcast.emit('new data', {
      gold: GoldArr,
      energy: EnergyArr,
      obstacles: ObstalceArr
    });
  });

  socket.on('splice gold', function (index) {
    for (coordsI = 0; coordsI < unavailableCoords.length; coordsI++) {
      if (unavailableCoords[coordsI] === String(GoldArr[index].x + ' ' + GoldArr[index].y)) unavailableCoords.splice(coordsI, 1);
    }
    GoldArr.splice(index, 1);
  });
  socket.on('splice energy', function (index) {
    for (coordsI = 0; coordsI < unavailableCoords.length; coordsI++) {
      if (unavailableCoords[coordsI] === String(EnergyArr[index].x + ' ' + EnergyArr[index].y)) unavailableCoords.splice(coordsI, 1);
    }
    EnergyArr.splice(index, 1);
  });

  socket.on('new goldsCount', function (data) {
    for (var player of Players) {
      if (player.color === data.color) {
        player.goldsCount = data.count;
      }
    }
    console.log(String(Players[0].goldsCount + Players[1].goldsCount + Players[2].goldsCount + Players[3].goldsCount));
    if ((Players[0].goldsCount + Players[1].goldsCount + Players[2].goldsCount + Players[3].goldsCount) >= 15) {
      var bestScore = 0;
      var winner = '';
      for (const player of Players) {
        if (player.goldsCount > bestScore) {
          bestScore = player.goldsCount;
          winner = player.name;
        }
      }

      io.sockets.emit('new message', {
        username: 'server',
        message: 'GAME OVER'
      });
      io.sockets.emit('new message', {
        username: 'server',
        message: 'The winner is ' + winner
      });
      io.sockets.emit('end', '');
    }
  });
  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --users.length;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: users.length
      });
    }
  });
});