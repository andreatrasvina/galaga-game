// enemy.js
class Enemy {
  constructor(x, y, speed = 5, img = null) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.speed = speed;
    this.img = img;
    this.color = color(255, 0, 0); // fallback si no hay imagen
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

  // Nuevo método: Verifica si el enemigo colisiona con el jugador
  colisionaConJugador(player) {
    // Cálculo de colisión simple basado en rectángulos (puedes ajustar si tus imágenes tienen formas más complejas)
    return (
      this.x < player.x + player.width &&
      this.x + this.w > player.x &&
      this.y < player.y + player.height &&
      this.y + this.h > player.y
    );
  }
}
