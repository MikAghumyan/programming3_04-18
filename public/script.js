var side = 32;
var campSide = 64;
var score = 0;

var playerHasGold = false;

function setup() {
    if (gotData) {
        createCanvas(side * 16, side * 16);
        grassImg = loadImage('./Resources/grass.png');
        thisCampImg = loadImage(thisPlayer.campImg);
        thisPlayerImg = loadImage(thisPlayer.img[0]);

        otherPlayer1Img = loadImage(otherPlayers[0].img[0]);
        otherPlayer2Img = loadImage(otherPlayers[1].img[0]);
        otherPlayer3Img = loadImage(otherPlayers[2].img[0]);
        otherCamp1Img = loadImage(otherPlayers[0].campImg);
        otherCamp2Img = loadImage(otherPlayers[1].campImg);
        otherCamp3Img = loadImage(otherPlayers[2].campImg);

        obstacle = loadImage("./Resources/obstacle_1.png");
        energy = loadImage("./Resources/power.png");
        gold = loadImage('./Resources/gold.png');
        cargo_gold = loadImage('./Resources/cargo_gold_1.png');
    }
}

function draw() { //es drawy p5i momentnerica p5y anyndhat krknuma esi intervalov
    if (gotData) {
        coordsChanged = false;
        background(grassImg, 0, 0); // Clear the screen
        const energyP = document.getElementById('energy');
        drawPlayer(thisPlayerImg, thisPlayer.truckCoords.x, thisPlayer.truckCoords.y, true); // Draw the thisPlayerImg

        drawPlayer(otherPlayer1Img, otherPlayers[0].truckCoords.x, otherPlayers[0].truckCoords.y, false);
        drawPlayer(otherPlayer2Img, otherPlayers[1].truckCoords.x, otherPlayers[1].truckCoords.y, false);
        drawPlayer(otherPlayer3Img, otherPlayers[2].truckCoords.x, otherPlayers[2].truckCoords.y, false);

        drawResources(); // Draw the resources
        // Add elses in this if contruction to lock diagonal movement
        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && thisPlayer.truckCoords.x < (width - side)) {
            for (const coords of obstacles) {
                if (Collision_right(coords, side)) return;
            }
            for (const player of otherPlayers) {
                if (Collision_right(player.campCoords, campSide)) return;
                if (Collision_right(player.truckCoords, side)) return;
            }
            if (!(playerHasGold)) {
                for (const i in golds) {
                    var coords = golds[i];
                    if (Collision_right(coords, side)) {
                        playerHasGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_right(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_right(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (playerHasGold) {
                    cargo_gold = loadImage('./Resources/cargo_gold_3.png');
                }

                thisPlayer.truckCoords.x += side / 8;
                thisPlayerImg = loadImage(thisPlayer.img[2]);
                energyCount -= 0.5;
                coordsChanged = true;
            }
        }
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && thisPlayer.truckCoords.x > 0) {
            for (const coords of obstacles) {
                if (Collision_left(coords, side)) return;
            }
            for (const player of otherPlayers) {
                if (Collision_left(player.campCoords, campSide)) return;
                if (Collision_left(player.truckCoords, side)) return;
            }
            if (!(playerHasGold)) {
                for (const i in golds) {
                    var coords = golds[i];
                    if (Collision_left(coords, side)) {
                        playerHasGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_left(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_left(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (playerHasGold) {
                    cargo_gold = loadImage('./Resources/cargo_gold_1.png');
                }

                thisPlayer.truckCoords.x -= side / 8;
                thisPlayerImg = loadImage(thisPlayer.img[0]);
                energyCount -= 0.5;
                coordsChanged = true;
            }
        }
        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && thisPlayer.truckCoords.y > 0) {
            for (const coords of obstacles) {
                if (Collision_up(coords, side)) return;
            }
            for (const player of otherPlayers) {
                if (Collision_up(player.campCoords, campSide)) return;
                if (Collision_up(player.truckCoords, side)) return;
            }
            if (!(playerHasGold)) {
                for (const i in golds) {
                    var coords = golds[i];

                    if (Collision_up(coords, side)) {
                        playerHasGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_up(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_up(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (playerHasGold) {
                    cargo_gold = loadImage('./Resources/cargo_gold_2.png');
                }

                thisPlayer.truckCoords.y -= side / 8;
                thisPlayerImg = loadImage(thisPlayer.img[1]);
                energyCount -= 0.5;
                coordsChanged = true;
            }
        }
        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && thisPlayer.truckCoords.y < (height - side)) {
            for (const coords of obstacles) {
                if (Collision_down(coords, side)) return;
            }
            for (const player of otherPlayers) {
                if (Collision_down(player.campCoords, campSide)) return;
                if (Collision_down(player.truckCoords, side)) return;
            }
            if (!(playerHasGold)) {
                for (const i in golds) {
                    var coords = golds[i];

                    if (Collision_down(coords, side)) {
                        playerHasGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_down(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_down(thisPlayer.campCoords, campSide)) {
                playerHasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (playerHasGold) {
                    cargo_gold = loadImage('./Resources/cargo_gold_4.png');
                }

                thisPlayer.truckCoords.y += side / 8;
                thisPlayerImg = loadImage(thisPlayer.img[3]);
                energyCount -= 0.5;
                coordsChanged = true;
            }
        }
        energyCount += 0.1;
        energyP.innerText = 'energy: ' + Math.floor(energyCount);
    }
}