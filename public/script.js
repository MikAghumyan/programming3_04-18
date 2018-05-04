//requests
// var Grass = require("./class.grass.js").default.default;
// var GrassEater = require("./class.eatgrass.js");
// var Predator = require("./class.predator.js");

function genMatrix(w, h) {
    var matrix = [];
    for(var y = 0; y < h; y++) {
        matrix[y] = [];
        for(var x = 0; x < w; x++) {
            var r = random(100);
            if     (r < 20) r = 0;
            else if(r < 65) r = 1;
            else if(r < 90) r = 2;
            else if(r < 100)r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var matrix;
var w = 30;
var h = 30;
var side = 24;
var grassArr = [], GrassEaterArr = [], predatorArr = [];

function setup() {
    matrix = genMatrix(w, h);
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 1) {
                grassArr.push(new Grass(x*1, y*1, 1));
                console.log(grassArr['index']);
            }
            else if(matrix[y][x] == 2) {
                GrassEaterArr.push(new GrassEater(x*1, y*1, 2));
                console.log(GrassEaterArr['index']);
            }
            else if(matrix[y][x] == 3) {
                predatorArr.push(new predator(x*1, y*1, 3));
                console.log(predatorArr['index']);
            }
        }
    }
}

function draw() {
    background("#acacac");
    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if(matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 2) {
                fill("yellow");
            }
            else if(matrix[y][x] == 3) {
                fill("red");
            }
           // rect(x * side, y * side, side, side);
           console.log();
        }
    }

    for(var i in grassArr) {
        grassArr[i].mul();
    }

    for(var i in GrassEaterArr) {
        GrassEaterArr[i]. spawn();
        GrassEaterArr[i].eat();
        GrassEaterArr[i].die();
    }

    for(var i in predatorArr) {
        predatorArr[i]. spawn();
        predatorArr[i].eat();
        predatorArr[i].die();
    }

}