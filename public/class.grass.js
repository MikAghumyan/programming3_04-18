class Grass extends LivingCreature{
  constructor(x, y, index) {
    super(x,y,index,directions);
    this.multiply = Math.round(Math.random() * 8);
    this.speed = 8;
    matrix[this.y][this.x] = this.index;

  }
    mul() {
        this.multiply++;
        this.direction = random(this.yntrelVandak(0));
        if (this.multiply >= this.speed && this.direction) {
            var newGrass = new Grass(this.direction[0], this.direction[1], this.index);
            newGrass.parentX = this.x;
            newGrass.parentY = this.y;
            grassArr.push(newGrass);
            matrix[this.direction[1]][this.direction[0]] = this.index;
            this.multiply = 0;
        }
    }
}
