var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket = io.connect('http://localhost:3000');

function setup() {
    socket.on('send sizes',function(sizes){
        createCanvas(sizes.side * sizes.w, sizes.side * sizes.h);
        background("#acacac");
        frameRate(5);
    });
}

function draw() {
    background("#acacac");
    socket.on('send matrix', function (matrix) {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 0) {
                    fill("#acacac");
                } else if (matrix[y][x] == 1) {
                    fill("green");
                } else if (matrix[y][x] == 2) {
                    fill("yellow");
                } else if (matrix[y][x] == 3) {
                    fill("red");
                }
                // rect(x * side, y * side, side, side);
                console.log();
            }
        }
    });
}