var express = require('express');
var path = require('path');
var app = express();

//characters
var _EatGrass = require('./classEatgrass.js');
var _Grass = require('./classGrass.js');
var _Predator = require('./classPredator.js');

global.EatGrass = new _EatGrass();
global.Grass = new _Grass();
global.Predator = new _Predator();


/*/ Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(){
  res.redircet("public");
});
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});*/