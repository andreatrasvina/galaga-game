class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 4;
      this.speed = 10;
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
  }