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
    if (keyIsPressed) {
      if (keyCode == RIGHT_ARROW) {
        this.x += 5;
      } else if (keyCode == LEFT_ARROW) {
        this.x -= 5;
      }
    }
  }
}
