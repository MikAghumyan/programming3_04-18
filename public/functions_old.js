function drawPlayer(player) { // Draw the player
    image(player, thisPlayer.truckCoords.y, thisPlayer.truckCoords.y);
    if (playerHasGold) {
        image(cargo_gold, thisPlayer.truckCoords.y + (side / 8), thisPlayer.truckCoords.y + (side / 8), side - (side / 4), side - (side / 4));
    }
}

function drawResources() { // Draw the resources
    for (var coords of obstacles) {
        image(obstacle, coords.x, coords.y);
    }
    for (var coords of gold) {
        image(golds, coords.x, coords.y);
    }
    image(thisCampImg, thisPlayer.campCoords.x, thisPlayer.campCoords.y);
}

// Detect the collision
function Collision_right(coords, _side) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;
    var playerOX = thisPlayer.truckCoords.x + (_side / 2);
    var playerOY = thisPlayer.truckCoords.y + (_side / 2);

    var objectOX = obstacleX + (_side / 2);
    var objectOY = obstacleY + (_side / 2);

    if (objectOX - playerOX <= _side && objectOX - playerOX >= 0) {
        if (Math.abs(playerOY - objectOY) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_left(coords, _side) {
    console.log('bye');
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = thisPlayer.truckCoords.x + (_side / 2);
    var playerOY = thisPlayer.truckCoords.y + (_side / 2);

    var objectOX = obstacleX + (_side / 2);
    var objectOY = obstacleY + (_side / 2);

    if (playerOX - objectOX <= _side && playerOX - objectOX >= 0) {
        if (Math.abs(playerOY - objectOY) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords, _side) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = thisPlayer.truckCoords.x + (_side / 2);
    var playerOY = thisPlayer.truckCoords.y + (_side / 2);

    var objectOX = obstacleX + (_side / 2);
    var objectOY = obstacleY + (_side / 2);

    if (playerOY - objectOY <= _side && playerOY - objectOY >= 0) {
        if (Math.abs(playerOX - objectOX) < _side) {
            return true;
        }
    }
    return false;
}

function Collision_down(coords, _side) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = thisPlayer.truckCoords.x + (_side / 2);
    var playerOY = thisPlayer.truckCoords.y + (_side / 2);

    var objectOX = obstacleX + (_side / 2);
    var objectOY = obstacleY + (_side / 2);

    if (objectOY - playerOY <= _side && objectOY - playerOY >= 0) {
        if (Math.abs(playerOX - objectOX) < _side) {
            return true;
        }
    }
    return false;
}