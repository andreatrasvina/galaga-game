class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
  }

  update() {
    this.x += direccionEnemigo * 2;

    // Si toca los bordes del canvas, cambia dirección y baja
    if (this.x <= 0 || this.x + this.w >= width) {
      direccionEnemigo *= -1;
      this.y += this.h;
    }
  }


  bajar() {
    this.y += this.h;
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class EnemyZigZag {
  constructor(x, y, speed = 2, canShoot = false, resistencia = 1) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
    this.speed = speed;
    this.canShoot = canShoot;
    this.resistencia = resistencia;
  }

  show() {
    if (this.resistencia > 1) {
      fill(255, 165, 0); // naranja para enemigo resistente
    } else {
      fill(0, 255, 0); // verde normal
    }
    rect(this.x, this.y, this.w, this.h);
  }

  colision(bullet) {
    return (
      bullet.x > this.x &&
      bullet.x < this.x + this.w &&
      bullet.y > this.y &&
      bullet.y < this.y + this.h
    );
  }

}

