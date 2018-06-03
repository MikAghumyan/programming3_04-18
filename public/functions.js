function drawPlayer(player,x,y,playerHasGold,cargo_gold) { // Draw the player
    image(player, x, y);
    if (playerHasGold) {
        image(cargo_gold, x + (side / 8), y + (side / 8), side - (side / 4), side - (side / 4));
    }
}

function drawResources() { // Draw the resources
    for (var coords of obstacles) {
        image(obstacle, coords.x, coords.y);
    }
    for (var coords of energies) {
        image(energy,coords.x,coords.y);
    }
    for (var coords of golds) {
        image(gold, coords.x, coords.y);
    }
    for(var coords of portal){
        image(portalImg,coords.x,coords.y);
    }
    image(thisCampImg, thisPlayer.campCoords.x, thisPlayer.campCoords.y);
    image(otherCamp1Img, otherPlayers[0].campCoords.x,otherPlayers[0].campCoords.y);
    image(otherCamp2Img, otherPlayers[1].campCoords.x,otherPlayers[1].campCoords.y);
    image(otherCamp3Img, otherPlayers[2].campCoords.x,otherPlayers[2].campCoords.y);
}

// Detect the collision
function Collision_right(coords, _side) {
    var playerOX = thisPlayer.truckCoords.x + (side / 2);
    var playerOY = thisPlayer.truckCoords.y + (side / 2);

    var objectOX = coords.x + (_side / 2);
    var objectOY = coords.y + (_side / 2);
    if (_side == 64) {
       var s = 48;
    }
    else {
       var s = 32;
    }
    if (objectOX - playerOX <= s && objectOX - playerOX >= 0) {
        if (Math.abs(playerOY - objectOY) < s) {
            return true;
        }
    }
    return false;
}

function Collision_left(coords, _side) {
    var playerOX = thisPlayer.truckCoords.x + (side / 2);
    var playerOY = thisPlayer.truckCoords.y + (side / 2);

    var objectOX = coords.x + (_side / 2);
    var objectOY = coords.y + (_side / 2);
    if (_side == 64) {
       var s = 48;
    }
    else {
       var s = 32;
    }

    if (playerOX - objectOX <= s && playerOX - objectOX >= 0) {
        if (Math.abs(playerOY - objectOY) < s) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords, _side) {
    var playerOX = thisPlayer.truckCoords.x + (side / 2);
    var playerOY = thisPlayer.truckCoords.y + (side / 2);

    var objectOX = coords.x + (_side / 2);
    var objectOY = coords.y + (_side / 2);
    if (_side == 64) {
        var s = 48;
    }
    else {
       var s = 32;
    }
    if (playerOY - objectOY <= s && playerOY - objectOY >= 0) {
        if (Math.abs(playerOX - objectOX) < s) {
            return true;
        }
    }
    return false;
}

function Collision_down(coords, _side) {
    var playerOX = thisPlayer.truckCoords.x + (side / 2);
    var playerOY = thisPlayer.truckCoords.y + (side / 2);

    var objectOX = coords.x + (_side / 2);
    var objectOY = coords.y + (_side / 2);
    if (_side == 64) {
       var s = 48;
    }
    else {
       var s = 32;
    }
    if (objectOY - playerOY <= s && objectOY - playerOY >= 0) {
        if (Math.abs(playerOX - objectOX) < s) {
            return true;
        }
    }
    return false;
}