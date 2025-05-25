class Enemy {
  constructor(x, y, speed = 5, img = null) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
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

  colisionaConJugador(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.w > player.x &&
      this.y < player.y + player.height &&
      this.y + this.h > player.y
    );
  }
}
