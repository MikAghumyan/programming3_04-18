var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket = io.connect('http://localhost:3000');


//characters
var _EatGrass = require('./classEatgrass.js');
var _Grass = require('./classGrass.js');
var _Predator = require('./classPredator.js');

global.EatGrass = new _EatGrass();
global.Grass = new _Grass();
global.Predator = new _Predator();

//che lav et errory chi berum mi rope
function genMatrix(w, h) {
  var matrix = [];
  for (var y = 0; y < h; y++) {
    matrix[y] = [];
    for (var x = 0; x < w; x++) {
      var r = random(100);
      if (r < 20) r = 0;
      else if (r < 65) r = 1;
      else if (r < 90) r = 2;
      else if (r < 100) r = 3;
      matrix[y][x] = r;
    }
  }
  return matrix;
}

// Define the port to run on


app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function () {
  res.redircet("public");
});
// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('index.html');
});

io.on('connection', function (socket) {
  var w = 30;
  var h = 30;
  var side = 24;
  var grassArr = [],
    GrassEaterArr = [],
    predatorArr = [];

  matrix = genMatrix(w, h);
  for (var y in matrix) {
    for (var x in matrix[y]) {
      if (matrix[y][x] == 1) {
        grassArr.push(new Grass(x * 1, y * 1, 1));
        console.log(grassArr['index']);
      } else if (matrix[y][x] == 2) {
        GrassEaterArr.push(new GrassEater(x * 1, y * 1, 2));
        console.log(GrassEaterArr['index']);
      } else if (matrix[y][x] == 3) {
        predatorArr.push(new predator(x * 1, y * 1, 3));
        console.log(predatorArr['index']);
      }
    }
  }
  io.sockets.emit('send sizes', {
    'w': w,
    'h': h,
    'side': side
  });
  socket.setInterval(function () {
    io.sockets.emit('send matrix', matrix);
    for (var i in grassArr) {
      grassArr[i].mul();
    }

    for (var i in GrassEaterArr) {
      GrassEaterArr[i].spawn();
      GrassEaterArr[i].eat();
      GrassEaterArr[i].die();
    }

    for (var i in predatorArr) {
      predatorArr[i].spawn();
      predatorArr[i].eat();
      predatorArr[i].die();
    }
  }, 1000);
});
//aaa es xia xarnvel irar