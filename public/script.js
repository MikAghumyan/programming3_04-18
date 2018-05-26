var side = 32;
var campSide = 64;
var obstacles = [{
    x: 10 * 32,
    y: 10 * 32
}];
var golds = [{
    x: 5 * 32,
    y: 6 * 32
}];
var playerHasGold = false

function setup() {
    if (gotData) {
        createCanvas(16 * 32, 16 * 32);
        grassImg = loadImage('./Resources/grass.png');
        obstacle = loadImage('./Resources/obstacle_1.png');
        gold = loadImage('./Resources/gold.png');
        cargo_gold = loadImage('./Resources/cargo_gold_1.png');

        //thisPlayerImgs
        thisCampImg = loadImage(thisPlayer.campImg);
        thisPlayerImg = loadImage(thisPlayer.img[0]);
    }
}

function draw() {
    if (gotData) {
        background(grassImg, 0, 0);

        drawPlayer();
        drawResources();
        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && thisPlayer.truckCoords.x < (width - side)) {
            for (const coords of obstacles) {
                if (Collision_right(coords, side)) return;
            }
            for (var i in golds) {
                var coords = gold[i];
                if (Collision_right(coords, side)) {
                    playerHasGold = true;
                    gold.splice(i, 1);
                }
            }
            if (Collision_right(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (playerHasGold) {
                cargo_gold = loadImage('./Resources/cargo_gold_3.png');
            }
        }
    }
}