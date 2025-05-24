class Enemy {
  constructor(x, y, speed = 5, img = null) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.speed = speed;
    this.img = img;
    this.color = color(255, 0, 0);
  }

  update() {
    this.x += direccionEnemigo * this.speed;
  }

  bajar() {
    this.y += 20;
  }

  show() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}
