class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.speed = 1;
    this.lives = 3;
  }

  dibujar() {
    image(playerImg, this.x, this.y, this.width, this.height);
  }

  mover() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 10;
    } if (this.x >= 485) {
      this.x -= 10;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 10;
    } if (this.x <= -5) {
      this.x += 10;
    }

  }
}
