function drawPlayer() { // draw the player
    image(thisPlayerImg, thisPlayer.truckCoords.x, thisPlayer.truckCoords.y);
    if (playerHasGold) {
        image(cargo_gold, thisPlayer.truckCoords.x + (side / 8), thisPlayer.truckCoords.y + (side / 8), side - (side / 4), side - (side / 4));
    }
}

function drawResources() { // draw the resources
    for (const coords of obstacles) {
        image(obstacle, coords.x, coords.y);
    }
    for (const coords of golds) {
        image(gold, coords.x, coords.y);
    }
    image(thisCampImg, thisPlayer.campCoords.x, thisPlayer.campCoords.y);
}

function Collision_right(coords, _side) {
    var playerX = thisPlayer.truckCoords.x + (side / 2);
    var playerY = thisPlayer.truckCoords.y + (side / 2);

    var objectX = coords.x + (_side / 2);
    var objectY = coords.y + (_side / 2);

    if (objectX - playerX <= _side && objectX - playerX >= 0) {
        if (Math.abs(playerY - objectY) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_left(coords, _side) {
    var playerX = thisPlayer.truckCoords.x + (side / 2);
    var playerY = thisPlayer.truckCoords.y + (side / 2);

    var objectX = coords.x + (_side / 2);
    var objectY = coords.y + (_side / 2);

    if (playerX - objectX <= _side && playerX - objectX >= 0) {
        if (Math.abs(playerY - objectY) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords, _side) {
    var playerX = thisPlayer.truckCoords.x + (side / 2);
    var playerY = thisPlayer.truckCoords.y + (side / 2);

    var objectX = coords.x + (_side / 2);
    var objectY = coords.y + (_side / 2);

    if (PlayerY - objectY <= _side && playerY - objectY >= 0) {
        if (Math.abs(playerX - objectX) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords, _side) {
    var playerX = thisPlayer.truckCoords.x + (side / 2);
    var playerY = thisPlayer.truckCoords.y + (side / 2);

    var objectX = coords.x + (_side / 2);
    var objectY = coords.y + (_side / 2);

    if (objectY - PlayerY <= _side && objectY - playerY >= 0) {
        if (Math.abs(playerX - objectX) < _side) {
            return true;
        }
    }
    return false;
}