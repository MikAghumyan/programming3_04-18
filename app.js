var express = require('express');
var path = require('path');
var app = express();
//characters

global.EatGrass = require('./classes/classEatgrass');
global.Grass = require('./classes/classGrass');
global.Predator = require('./classes/classPredator');

// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(){
  res.redircet("public");
});
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});