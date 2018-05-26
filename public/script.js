console.log("1234567890");
var side = 32;
var campSide = 64;
var score = 0;
var obstacles = [{
    x: 10 * side,
    y: 10 * side
}];
var golds = [{
    x: 5 * side,
    y: 6 * side
}];

var playerHasGold = false;
console.log(thisPlayer.campImg);

function setup() {
    if (gotData) {
        createCanvas(side * 16, side * 16);
        grassImg = loadImage('./Resources/grass.png');
        thisCampImg = loadImage(thisPlayer.campImg);
        thisPlayerImg = loadImage(thisPlayer.img[0]);

        obstacle = loadImage("./Resources/obstacle_1.png");
        gold = loadImage('./Resources/gold.png');
        cargo_gold = loadImage('./Resources/cargo_gold_1.png');
    }
}

function draw() {
    if (gotData) {
        background(grassImg, 0, 0); // Clear the screen

        drawPlayer(thisPlayerImg); // Draw the thisPlayerImg
        drawResources(); // Draw the resources
        // Add elses in this if contruction to lock diagonal movement
        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && thisPlayer.truckCoords.x < (width - side)) {
            for (var coords of obstacles) {
                if (Collision_right(coords, side)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_right(coords, side)) {
                    playerHasGold = true;
                    golds.splice(i, 1);
                }
            }
            if (Collision_right(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (playerHasGold) {
                cargo_gold = loadImage('./Resources/cargo_gold_3.png');
            }
            thisPlayer.truckCoords.x += side / 8;
            thisPlayerImg = loadImage(thisPlayer.img[2]);
        }
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && thisPlayer.truckCoords.x > 0) {
            console.log('hello');
            for (var coords of obstacles) {
                if (Collision_left(coords, side)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_left(coords, side)) {
                    playerHasgold = true;
                    golds.splice(i, 1);
                }
            }
            if (Collision_left(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (playerHasGold) {
                cargo_gold = loadImage('./Resources/cargo_gold_1.png');
            }
            thisPlayer.truckCoords.x -= side / 8;
            thisPlayerImg = loadImage(thisPlayer.img[0]);
        }
        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && thisPlayer.truckCoords.y > 0) {
            for (var coords of obstacles) {
                if (Collision_up(coords, side)) return;
            }
            for (var i in golds) {
                var coords = golds[i];

                if (Collision_up(coords, side)) {
                    playerHasGold = true;
                    golds.splice(i, 1);
                }
            }
            if (Collision_up(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (playerHasGold) {
                cargo_gold = loadImage('./Resources/cargo_gold_2.png');
            }
            thisPlayer.truckCoords.y -= side / 8;
            thisPlayerImg = loadImage(thisPlayer.img[1]);
        }
        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && thisPlayer.truckCoords.y < (height - side)) {
            for (var coords of obstacles) {
                if (Collision_down(coords, side)) return;
            }
            for (var i in golds) {
                var coords = golds[i];

                if (Collision_down(coords, side)) {
                    playerHasGold = true;
                    golds.splice(i, 1);
                }
            }
            if (Collision_down(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (playerHasGold) {
                cargo_gold = loadImage('./Resources/cargo_gold_4.png');
            }
            thisPlayer.truckCoords.y += side / 8;
            thisPlayerImg = loadImage(thisPlayer.img[3]);
        }
    }
}