var socket = io.connect('http://localhost:3000');


function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
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

}