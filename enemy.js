class Enemy {
  constructor(x, y, speed = 5) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
    this.speed = speed; // velocidad personalizada

  }

  update() {
    this.x += direccionEnemigo * this.speed;
  }

  bajar() {
    this.y += this.h;
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

}
