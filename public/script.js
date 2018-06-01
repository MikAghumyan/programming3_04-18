var side = 32;
var campSide = 64;
var score = 0;
var newSelectedGold;
var newUsedEnergy;

function setup() {
    if (gotData) {
        createCanvas(side * 16, side * 16);
        grassImg = loadImage('./Resources/grass.png');
        thisCampImg = loadImage(thisPlayer.campImg);
        thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
        thisCargo_gold = loadImage('./Resources/cargo_gold_1.png');

        otherPlayersImg = [loadImage(otherPlayers[0].img[otherPlayers[0].imgIndex]), loadImage(otherPlayers[1].img[otherPlayers[1].imgIndex]), loadImage(otherPlayers[2].img[otherPlayers[2].imgIndex])];
        otherPlayersCargoImg = [loadImage('./Resources/cargo_gold_1.png'), loadImage('./Resources/cargo_gold_1.png'), loadImage('./Resources/cargo_gold_1.png')];
        otherCamp1Img = loadImage(otherPlayers[0].campImg);
        otherCamp2Img = loadImage(otherPlayers[1].campImg);
        otherCamp3Img = loadImage(otherPlayers[2].campImg);

        obstacle = loadImage("./Resources/obstacle_1.png");
        energy = loadImage("./Resources/power.png");
        gold = loadImage('./Resources/gold.png');
    }
}

function draw() { //es drawy p5i momentnerica p5y anyndhat krknuma esi intervalov
    if (gotData) {

        coordsChanged = false;
        background(grassImg, 0, 0); // Clear the screen
        const energyP = document.getElementById('energy');
        drawPlayer(thisPlayerImg, thisPlayer.truckCoords.x, thisPlayer.truckCoords.y, thisPlayer.hasGold, thisCargo_gold); // Draw the thisPlayerImg

        for (var i = 0; i < otherPlayersImg.length; i++) {
            drawPlayer(otherPlayersImg[i], otherPlayers[i].truckCoords.x, otherPlayers[i].truckCoords.y, otherPlayers[i].hasGold, otherPlayersCargoImg[i]);
        }

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
            if (!(thisPlayer.hasGold)) {
                for (const i in golds) {
                    var coords = golds[i];
                    if (Collision_right(coords, side)) {
                        thisPlayer.hasGold = true;
                        newSelectedGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_right(coords, side)) {
                    newUsedEnergy = true;
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_right(thisPlayer.campCoords, campSide)) {
                thisPlayer.hasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (thisPlayer.hasGold) {
                    thisCargo_gold = loadImage('./Resources/cargo_gold_3.png');
                }

                thisPlayer.truckCoords.x += side / 8;
                thisPlayer.imgIndex = 2;
                thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
                energyCount -= 0.4;
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
            if (!(thisPlayer.hasGold)) {
                for (const i in golds) {
                    var coords = golds[i];
                    if (Collision_left(coords, side)) {
                        thisPlayer.hasGold = true;
                        newSelectedGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_left(coords, side)) {
                    newUsedEnergy = true;
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_left(thisPlayer.campCoords, campSide)) {
                thisPlayer.hasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (thisPlayer.hasGold) {
                    thisCargo_gold = loadImage('./Resources/cargo_gold_1.png');
                }

                thisPlayer.truckCoords.x -= side / 8;
                thisPlayer.imgIndex = 0;
                thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
                energyCount -= 0.4;
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
            if (!(thisPlayer.hasGold)) {
                for (const i in golds) {
                    var coords = golds[i];

                    if (Collision_up(coords, side)) {
                        thisPlayer.hasGold = true;
                        newSelectedGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_up(coords, side)) {
                    newUsedEnergy = true;
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_up(thisPlayer.campCoords, campSide)) {
                thisPlayer.hasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (thisPlayer.hasGold) {
                    thisCargo_gold = loadImage('./Resources/cargo_gold_2.png');
                }

                thisPlayer.truckCoords.y -= side / 8;
                thisPlayer.imgIndex = 1;
                thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
                energyCount -= 0.4;
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
            if (!(thisPlayer.hasGold)) {
                for (const i in golds) {
                    var coords = golds[i];

                    if (Collision_down(coords, side)) {
                        thisPlayer.hasGold = true;
                        newSelectedGold = true;
                        golds.splice(i, 1);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_down(coords, side)) {
                    newUsedEnergy = true;
                    energyCount += 10;
                    energies.splice(i, 1);
                }
            }
            if (Collision_down(thisPlayer.campCoords, campSide)) {
                thisPlayer.hasGold = false;
                return;
            }
            if (energyCount > 0) {
                if (thisPlayer.hasGold) {
                    thisCargo_gold = loadImage('./Resources/cargo_gold_4.png');
                }

                thisPlayer.truckCoords.y += side / 8;
                thisPlayer.imgIndex = 3;
                thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
                imgIndex = 3;
                energyCount -= 0.4;
                coordsChanged = true;
            }
        }
        energyCount += 0.2;
        energyP.innerText = 'energy: ' + Math.floor(energyCount);

    }
}
setInterval(() => {
    if (coordsChanged) {
        socket.emit('send_new_playerCoords', {
            color: thisPlayer.color,
            coords: thisPlayer.truckCoords,
            imageIndex: thisPlayer.imgIndex,
            hasGold: thisPlayer.hasGold
        });
    }
    socket.on('new_Coords', function (data) {
        var selectedPlayer = 0;
        while (selectedPlayer < otherPlayers.length) {
            if (otherPlayers[selectedPlayer].color === data.color) {
                otherPlayers[selectedPlayer].truckCoords.x = data.coords.x;
                otherPlayers[selectedPlayer].truckCoords.y = data.coords.y;
                break;
            }
            selectedPlayer++;
        }
        otherPlayers[selectedPlayer].imgIndex = data.imageIndex;
        otherPlayersImg[selectedPlayer] = loadImage(otherPlayers[selectedPlayer].img[data.imageIndex]);
        otherPlayers[selectedPlayer].hasGold = data.hasGold;
        otherPlayersCargoImg[selectedPlayer] = loadImage('./Resources/cargo_gold_' + String(data.imageIndex + 1) + '.png');
        if (newSelectedGold) {
            socket.emit('new_goldsArr',golds);
            newSelectedGold = false;
        }
        if(newUsedEnergy){
            socket.emit('new_energiesArr',energies);
            newUsedEnergy = false;
        }
        socket.on('new_goldArr_fromServer',(index) => {
            golds.splice(index,1);
        });
        socket.on('new_energiesArr_fromServer',(index) => {
            energies.splice(index,1);
        });
    });
}, 500);