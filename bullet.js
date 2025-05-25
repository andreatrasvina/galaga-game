class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.speed = 12;
  }

  mover() {
    this.y -= this.speed;
  }

  desaparece() {
    return this.y < 0;
  }

  dibujar() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.r * 2);
  }

  colision(enemigo) {
    let closestX = constrain(this.x, enemigo.x, enemigo.x + enemigo.w);
    let closestY = constrain(this.y, enemigo.y, enemigo.y + enemigo.h);

    //calcula distancia entre ese punto y el centro del circulo 
    let distancia = dist(this.x, this.y, closestX, closestY);

    //si es menor que el radio hay colision
    return distancia < this.r;
  }
}
