var _parentClass = require('./classMain.js');
var ParentClass = _parentClass.Parent;
module.exports = class predator extends ParentClass{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 24;
        this.multiply = Math.round(Math.random() * 16);

    }
    
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var cell = random(super.chooseCell(0));
        if (cell && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 3;
        }
    }

    eat() {
        this.energy--;
        var cell = random(super.chooseCell(2));
        if (cell && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 3;
            for (var i in GrassEaterArr) {
                if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                    GrassEaterArr.splice(i, 1);
                }
            }
        }
        else this.move();
    }

     spawn() {
        var cell = random(super.chooseCell(0));
        if (cell && this.energy >= this.speed) {
            this.energy = 1;
            var newpredator = new predator(cell[0], cell[1], 3);
            predatorArr.push(newpredator);
        }
    }

    die() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}