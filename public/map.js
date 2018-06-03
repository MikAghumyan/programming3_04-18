var side = 32;
var campSide = 64;
var score = 0;

function setup() {
    if (gotData) {
        createCanvas(side * 16, side * 16);

        //players' Source and objects
        thisCampImg = loadImage(thisPlayer.campImg);
        otherCamp1Img = loadImage(otherPlayers[0].campImg);
        otherCamp2Img = loadImage(otherPlayers[1].campImg);
        otherCamp3Img = loadImage(otherPlayers[2].campImg);

        thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
        otherPlayersImg = [loadImage(otherPlayers[0].img[otherPlayers[0].imgIndex]), loadImage(otherPlayers[1].img[otherPlayers[1].imgIndex]), loadImage(otherPlayers[2].img[otherPlayers[2].imgIndex])];

        thisCargoImg = loadImage('./Resources/cargo_gold_1.png');
        otherCargoImg = [loadImage('./Resources/cargo_gold_1.png'), loadImage('./Resources/cargo_gold_1.png'), loadImage('./Resources/cargo_gold_1.png')];

        // other source
        grassImg = loadImage('./Resources/grass.png');

        obstacle = loadImage("./Resources/obstacle_1.png");
        energy = loadImage("./Resources/power.png");
        gold = loadImage('./Resources/gold.png');
        portalImg = loadImage('./Resources/portal.png');
    }
}

function draw() { //es drawy p5i momentnerica p5y anyndhat krknuma esi intervalov
    if (gotData) {

        var energyP = document.getElementById('energy');
        var scoreP = document.getElementById('score');

        for(x = 0;x < 16;x++){
            for(y = 0;y < 16;y++){
                image(grassImg,x*side,y*side,side,side);
            }
        }
        drawResources();// Draw the resources


        drawPlayer(thisPlayerImg, thisPlayer.truckCoords.x, thisPlayer.truckCoords.y, thisPlayer.hasGold, thisCargoImg); // Draw the thisPlayerImg

        for (let i = 0; i < otherPlayersImg.length; i++) {
            drawPlayer(otherPlayersImg[i], otherPlayers[i].truckCoords.x, otherPlayers[i].truckCoords.y, otherPlayers[i].hasGold, otherCargoImg[i]);
        }
        
        // Add elses in this if contruction to lock diagonal movement
        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && thisPlayer.truckCoords.x < (width - side) && energyCount > 0) {
            for (const coords of obstacles) {
                if (Collision_right(coords, side)) return;
            }
            for (const coords of portal) {
                if (Collision_right(coords, side)){
                    thisPlayer.truckCoords.x = portal[coords.otherPart].x;
                    thisPlayer.truckCoords.y = portal[coords.otherPart].y;
                }
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
                        golds.splice(i, 1);
                        socket.emit('splice gold', i);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_right(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            if (Collision_right(thisPlayer.campCoords, campSide)) {
                if (thisPlayer.hasGold) {
                    socket.emit('new goldsCount', {
                        color: thisPlayer.color,
                        count: ++thisPlayer.goldsCount
                    });
                    thisPlayer.hasGold = false;
                }
                return;
            }
            thisPlayer.truckCoords.x += side / 8;

            thisPlayer.imgIndex = 2;
            thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
            if (thisPlayer.hasGold) {
                thisCargoImg = loadImage('./Resources/cargo_gold_' + thisPlayer.imgIndex + '.png');
            }

            energyCount -= 0.4;
            socket.emit('move', {
                x: thisPlayer.truckCoords.x,
                y: thisPlayer.truckCoords.y,
                color: thisPlayer.color,
                hasGold: thisPlayer.hasGold,
                imgIndex: thisPlayer.imgIndex
            });
        }
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && thisPlayer.truckCoords.x > 0 && energyCount > 0) {
            for (const coords of obstacles) {
                if (Collision_left(coords, side)) return;
            }
            for (const coords of portal) {
                if (Collision_left(coords, side)){
                    thisPlayer.truckCoords.x = portal[coords.otherPart].x;
                    thisPlayer.truckCoords.y = portal[coords.otherPart].y;
                }
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
                        golds.splice(i, 1);
                        socket.emit('splice gold', i);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_left(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            if (Collision_left(thisPlayer.campCoords, campSide)) {
                if (thisPlayer.hasGold) {
                    socket.emit('new goldsCount', {
                        color: thisPlayer.color,
                        count: ++thisPlayer.goldsCount
                    });
                    thisPlayer.hasGold = false;
                }
                return;
            }
            thisPlayer.truckCoords.x -= side / 8;
            thisPlayer.imgIndex = 0;
            thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
            if (thisPlayer.hasGold) {
                thisCargoImg = loadImage('./Resources/cargo_gold_' + thisPlayer.imgIndex + '.png');
            }

            energyCount -= 0.4;
            socket.emit('move', {
                x: thisPlayer.truckCoords.x,
                y: thisPlayer.truckCoords.y,
                color: thisPlayer.color,
                hasGold: thisPlayer.hasGold,
                imgIndex: thisPlayer.imgIndex
            });
        }
        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && thisPlayer.truckCoords.y > 0 && energyCount > 0) {
            for (const coords of obstacles) {
                if (Collision_up(coords, side)) return;
            }
            for (const coords of portal) {
                if (Collision_up(coords, side)){
                    thisPlayer.truckCoords.x = portal[coords.otherPart].x;
                    thisPlayer.truckCoords.y = portal[coords.otherPart].y;
                }
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
                        golds.splice(i, 1);
                        socket.emit('splice gold', i);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_up(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            if (Collision_up(thisPlayer.campCoords, campSide)) {
                if (thisPlayer.hasGold) {
                    socket.emit('new goldsCount', {
                        color: thisPlayer.color,
                        count: ++thisPlayer.goldsCount
                    });
                    thisPlayer.hasGold = false;
                }
                return;
            }
            thisPlayer.truckCoords.y -= side / 8;
            thisPlayer.imgIndex = 1;
            thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
            if (thisPlayer.hasGold) {
                thisCargoImg = loadImage('./Resources/cargo_gold_' + thisPlayer.imgIndex + '.png');
            }

            energyCount -= 0.4;
            socket.emit('move', {
                x: thisPlayer.truckCoords.x,
                y: thisPlayer.truckCoords.y,
                color: thisPlayer.color,
                hasGold: thisPlayer.hasGold,
                imgIndex: thisPlayer.imgIndex
            });
        }
        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && thisPlayer.truckCoords.y < (height - side) && energyCount > 0) {
            for (const coords of obstacles) {
                if (Collision_down(coords, side)) return;
            }
            for (const coords of portal) {
                if (Collision_down(coords, side)){
                    thisPlayer.truckCoords.x = portal[coords.otherPart].x;
                    thisPlayer.truckCoords.y = portal[coords.otherPart].y;
                }
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
                        golds.splice(i, 1);
                        socket.emit('splice gold', i);
                    }
                }
            }
            for (const i in energies) {
                var coords = energies[i];
                if (Collision_down(coords, side)) {
                    energyCount += 10;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            if (Collision_down(thisPlayer.campCoords, campSide)) {
                if (thisPlayer.hasGold) {
                    socket.emit('new goldsCount', {
                        color: thisPlayer.color,
                        count: ++thisPlayer.goldsCount
                    });
                    thisPlayer.hasGold = false;
                }
                return;
            }
            thisPlayer.truckCoords.y += side / 8;
            thisPlayer.imgIndex = 3;
            thisPlayerImg = loadImage(thisPlayer.img[thisPlayer.imgIndex]);
            if (thisPlayer.hasGold) {
                thisCargoImg = loadImage('./Resources/cargo_gold_' + thisPlayer.imgIndex + '.png');
            }

            energyCount -= 0.4;
            socket.emit('move', {
                x: thisPlayer.truckCoords.x,
                y: thisPlayer.truckCoords.y,
                color: thisPlayer.color,
                hasGold: thisPlayer.hasGold,
                imgIndex: thisPlayer.imgIndex
            });
        }
        energyCount += 0.15;
        energyP.innerText = 'Energy: ' + Math.floor(energyCount);
        scoreP.innerText = 'Score: ' + thisPlayer.goldsCount;
    }
    else{
        background('#C0AB8E',0,0);
    }
}

socket.on('new data', function (data) {
    golds = data.gold;
    energies = data.energy;
    obstacles = data.obstacles;
});
socket.on('player\'s new Data', (data) => {
    for (const playerIndex in otherPlayers) {
        var player = otherPlayers[playerIndex];
        if (player.color === data.color) {
            player.hasGold = data.hasGold;
            player.imgIndex = data.imgIndex;
            player.truckCoords.x = data.x;
            player.truckCoords.y = data.y;
            player.imgIndex = data.imgIndex;
            otherPlayersImg[playerIndex] = loadImage(player.img[player.imgIndex]);
            otherCargoImg[playerIndex] = loadImage('./Resources/cargo_gold_' + player.imgIndex + '.png');
        }
    }
});
socket.on('portal',(data)=>{
    for(var i in data){
        portal[i] = data[i];
    }
});
socket.on('end',(data) => {
    gotData = false;
});