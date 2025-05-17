
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.speed = 1;
    this.lives = 3;
  }

  dibujar() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  mover() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 10;
    } if (this.x >= 480) {
      this.x -= 10;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 10;
    } if (this.x <= 0) {
      this.x += 10;
    }

  }
}
